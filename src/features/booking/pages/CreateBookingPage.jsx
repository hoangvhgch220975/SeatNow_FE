import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ROUTES } from '../../../config/routes.js';
import { useRestaurant, useRestaurantTables } from '../../restaurants/hooks.js';
import { useRestaurantAvailability, useCreateBooking, useCancelBooking, useCancelBookingByGuest, useModifyBooking } from '../hooks.js';
import { useAuthStore } from '../../auth/store.js';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import ErrorState from '../../../shared/feedback/ErrorState';
import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';
import { bookingSocket, connectSockets, disconnectSockets } from '../../../lib/socket.js';

import FloorFilter from '../components/FloorFilter';
import TimeSlotPicker from '../components/TimeSlotPicker';
import TableSelector from '../components/TableSelector';
import BookingSummary from '../components/BookingSummary';
import BookingHeader from '../components/BookingHeader';

// 1. Import Payment Feature
import PaymentModal from '../../payment/components/PaymentModal';
import { calculateDepositAmount } from '../components/DepositSummary';

/**
 * @file CreateBookingPage.jsx
 * @description Trang đặt bàn với giao diện chọn bàn độc đáo (Cinema-style).
 * Sử dụng Mock Data cho giai đoạn đầu của dự án.
 */
const CreateBookingPage = () => {
  const { t } = useTranslation();
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, token } = useAuthStore();

  // 1. Fetch dữ liệu nhà hàng & Bàn
  const { data: restaurantData, isLoading: isLoadingRest, isError: isErrorRest } = useRestaurant(idOrSlug);
  const restaurant = restaurantData?.data || restaurantData;
  const restaurantId = restaurant?.id;

  const { data: tablesData, isLoading: isLoadingTables, isError: isErrorTables } = useRestaurantTables(restaurantId);

  const location = useLocation();
  const modifyState = location.state?.modifyBookingItem;
  const isModifying = !!modifyState;
  const oldBookingId = modifyState?.id;
  const modifyBookingMutation = useModifyBooking();
  const [isReplacingLoading, setIsReplacingLoading] = useState(false);

  // 2. State quản lý luồng đặt bàn
  const [selectedDate, setSelectedDate] = useState(() => {
    let raw = modifyState?.reservation?.rawDate;
    if (!raw) {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    // Nếu là chuỗi ISO full, bóc lấy phần Date
    return raw.includes('T') ? raw.split('T')[0] : raw;
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(() => {
    let raw = modifyState?.reservation?.rawTime;
    if (!raw) return null;
    // Nếu là chuỗi ISO full, bóc lấy HH:mm
    if (raw.includes('T')) {
      const timePart = raw.split('T')[1];
      return timePart ? timePart.substring(0, 5) : null;
    }
    // Nếu đã là HH:mm:ss, bóc lấy HH:mm
    return raw.substring(0, 5);
  });
  const [activeFloor, setActiveFloor] = useState(null); 
  const [selectedTable, setSelectedTable] = useState(() => {
    if (modifyState?.reservation?.tableId) {
       return { 
         id: modifyState.reservation.tableId, 
         ...(modifyState.reservation.tableInfo || {}) 
       };
    }
    return null;
  });
  const [partySize, setPartySize] = useState(modifyState?.reservation?.partySize || 2);
  const [specialRequests, setSpecialRequests] = useState(
    modifyState?.notes && modifyState.notes !== "No special requests provided." ? modifyState.notes : ''
  );
  
  // State cho Guest Info
  const [guestInfo, setGuestInfo] = useState({
    guestName: modifyState?.guest?.fullName !== "Verified Member" ? (modifyState?.guest?.fullName || '') : '',
    guestEmail: modifyState?.guest?.email !== "Email in profile" ? (modifyState?.guest?.email || '') : '',
    guestPhone: modifyState?.guest?.phone !== "Phone in profile" ? (modifyState?.guest?.phone || '') : ''
  });

  // Trạng thái đồng bộ tức thì (Zero-Latency) từ Socket
  const [realtimeStatuses, setRealtimeStatuses] = useState({});

  // 3. Cấu hình Khu vực (Areas) - Khớp chính xác với Tables.location trong DB (Table stucture.md)
  const AVAILABLE_AREAS = useMemo(() => [
    { id: '1st Floor', label: '1st Floor' },
    { id: '2nd Floor', label: '2nd Floor' },
    { id: '3rd Floor', label: '3rd Floor' },
    { id: '4th Floor', label: '4th Floor' },
    { id: '5th Floor', label: '5th Floor' },
    { id: 'Rooftop', label: 'Rooftop' },
    { id: 'Terrace', label: 'Terrace' },
    { id: 'Outdoor', label: 'Outdoor' }
  ], []);

  // 4. Phân loại Khu vực (Area Category) để chọn layout
  const getAreaCategory = (areaId) => {
    if (!areaId) return 'FLOOR';
    if (areaId.includes('Floor')) return 'FLOOR';
    if (areaId.includes('Rooftop')) return 'ROOFTOP';
    if (areaId.includes('Terrace')) return 'TERRACE';
    if (areaId.includes('Outdoor')) return 'OUTDOOR';
    return 'FLOOR';
  };

  // 5. Khôi phục logic tạo bàn mẫu (Deterministic Mock) để lấp đầy sơ đồ
  const deterministicTables = useMemo(() => {
    const raw = tablesData?.data || tablesData;
    let baseTables = [];
    
    // Nếu có dữ liệu thật từ Backend, lấy làm gốc
    if ((Array.isArray(raw) && raw.length > 0) || (Array.isArray(raw?.items) && raw.items.length > 0)) {
      baseTables = Array.isArray(raw) ? raw : raw.items;
      // Vẫn trả về baseTables nếu đã có dữ liệu thật để đảm bảo tính chính xác
      return baseTables;
    }

    if (!restaurantId) return [];

    // Nếu không có dữ liệu bàn thực, tạo bàn giả để demo giao diện
    const fakeTables = [];
    AVAILABLE_AREAS.forEach(area => {
      const category = getAreaCategory(area.id);
      const categorySeed = restaurantId.split('-').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 
                          category.split('').reduce((acc, char) => acc + (char.charCodeAt(0) * 2), 0);
      
      let count = 12 + (categorySeed % 8);
      if (category === 'OUTDOOR') count = 8 + (categorySeed % 6);
      
      for (let i = 0; i < count; i++) {
        fakeTables.push({
          id: `fake-${restaurantId}-${category}-${i}`,
          tableNumber: (category === 'FLOOR' ? 100 : (category === 'ROOFTOP' ? 500 : 800)) + i + 1,
          capacity: [2, 4, 6, 8][(categorySeed + i) % 4],
          type: (categorySeed + i) % 6 === 0 ? 'vip' : ((categorySeed + i) % 8 === 1 ? 'outdoor' : 'standard'),
          location: area.id,
          status: 'available',
          category: category
        });
      }
    });

    return fakeTables;
  }, [tablesData, restaurantId, AVAILABLE_AREAS]);

  // 5. Fetch tính khả dụng (Real-time Availability)
  const { data: availabilityData, isFetching: isFetchingAvailability } = useRestaurantAvailability(restaurantId, {
    date: selectedDate,
    time: selectedTimeSlot,
    guests: partySize
  });

  const availableTables = useMemo(() => {
    const raw = availabilityData?.data || availabilityData;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.items)) return raw.items;
    return [];
  }, [availabilityData]);

  // 6. Xử lý danh sách tầng (Floors)
  const floors = useMemo(() => {
    if (!activeFloor && AVAILABLE_AREAS.length > 0) {
      setActiveFloor(AVAILABLE_AREAS[0].id);
    }
    return AVAILABLE_AREAS;
  }, [AVAILABLE_AREAS, activeFloor]);

  // 7. Kết hợp dữ liệu bàn (Full Map + Availability + Socket)
  const displayTables = useMemo(() => {
    const floorTables = deterministicTables.filter(t => (t.location || '1st Floor') === activeFloor);
    
    // Helper để chuẩn hóa định dạng so khớp
    const normalizeDate = (d) => d?.toString().substring(0, 10);
    const normalizeTime = (t) => t?.toString().substring(0, 5);

    return floorTables.map(t => {
      const tableId = String(t.id).toLowerCase();
      const isFake = tableId.includes('fake');
      
      // 1. Tạo Key kết hợp: date_time_id (Ví dụ: "2026-12-20_19:30_uuid")
      const compositeKey = `${normalizeDate(selectedDate)}_${normalizeTime(selectedTimeSlot)}_${tableId}`;
      const realtimeStatus = realtimeStatuses[compositeKey];
      
      // 2. Kiểm tra tính khả dụng từ API
      const hasLoadedAvailability = !!availabilityData;
      const isAvailableByBE = (isFake || !selectedDate || !selectedTimeSlot || !hasLoadedAvailability) 
        ? true 
        : availableTables.some(at => String(at.id).toLowerCase() === tableId || String(at.tableNumber).toLowerCase() === String(t.tableNumber).toLowerCase());
      
      const isCurrentlySelected = selectedTable?.id === t.id;
      let finalStatus = t.status; 

      if (!isCurrentlySelected) {
        // 1. Nếu API báo bàn này đang KHẢ DỤNG (Source of Truth quan trọng nhất cho Booking)
        if (isAvailableByBE) {
          // Chỉ bị ghi đè nếu Socket báo đang có người GIỮ (held) - vì socket nhanh hơn API trong 2s đầu
          if (realtimeStatus === 'held') {
            finalStatus = 'held';
          } else {
            finalStatus = 'available'; // Xóa bỏ mọi trạng thái Occupied cũ từ Socket
          }
        } 
        // 2. Nếu API báo KHÔNG khả dụng
        else {
          // Ưu tiên Socket báo 'held' (đang giữ), nếu không thì mặc định là 'occupied' (đã đặt)
          finalStatus = realtimeStatus === 'held' ? 'held' : 'occupied';
        }
      } else {
        finalStatus = 'available';
      }
      
      return {
        ...t,
        category: getAreaCategory(activeFloor),
        status: finalStatus
      };
    });
  }, [deterministicTables, activeFloor, availableTables, availabilityData, realtimeStatuses, selectedTable, selectedDate, selectedTimeSlot]);

  const createBookingMutation = useCreateBooking();

  // 6. Lifecycle cho Socket.IO - Duy trì kết nối ổn định
  React.useEffect(() => {
    if (!restaurantId) return;

    connectSockets(token);
    
    const onConnect = () => {
        bookingSocket.emit('joinRestaurant', restaurantId);
    };

    if (bookingSocket.connected) onConnect();
    bookingSocket.on('connect', onConnect);

    const handleTableStatusChanged = (payload) => {
      const normalizeDate = (d) => d?.toString().substring(0, 10);
      const normalizeTime = (t) => t?.toString().substring(0, 5);
      
      // Tạo Key kết hợp để lưu trữ chính xác cho từng khung giờ
      const tableId = String(payload.tableId).toLowerCase();
      const storageKey = `${normalizeDate(payload.bookingDate)}_${normalizeTime(payload.bookingTime)}_${tableId}`;
      
      setRealtimeStatuses(prev => ({
        ...prev,
        [storageKey]: payload.status
      }));
    };

    const handleAvailabilityChange = (payload) => {
        queryClient.invalidateQueries(['booking-restaurants', 'availability', restaurantId]);
    };

    // 💰 Tín hiệu Thanh toán Thành công từ Backend (Real-time Socket)
    const handlePaymentSuccessSocket = (payload) => {
      // payload: { bookingId, status: 'paid' }
      if (payload.status === 'paid' || payload.status === 'success') {
        const incomingId = payload.bookingId || payload.id;
        
        // Kiểm tra xem có đúng là đơn hàng đang chờ thanh toán không
        if (incomingId === pendingBookingId || !pendingBookingId) {
          setShowPaymentModal(false);
          handleBookingSuccess(incomingId);
        }
      }
    };

    bookingSocket.on('tableStatusChanged', handleTableStatusChanged);
    bookingSocket.on('availabilityChanged', handleAvailabilityChange);
    bookingSocket.on('payment_success', handlePaymentSuccessSocket);

    return () => {
      bookingSocket.off('connect', onConnect);
      bookingSocket.off('tableStatusChanged', handleTableStatusChanged);
      bookingSocket.off('availabilityChanged', handleAvailabilityChange);
      bookingSocket.off('payment_success', handlePaymentSuccessSocket);
      bookingSocket.emit('leaveRestaurant', restaurantId);
      // Chỉ ngắt kết nối khi thoát hẳn trang
      disconnectSockets(); 
    };
  }, [token, restaurantId, queryClient]);

  // Tự động xóa cache trạng thái thời gian thực khi đổi Ngày/Giờ
  React.useEffect(() => {
    setRealtimeStatuses({});
  }, [selectedDate, selectedTimeSlot]);

  // Tự động nhả bàn khi F5 hoặc đóng trình duyệt
  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (selectedTable && lastHoldInfo.current.tableId) {
        bookingSocket.emit('releaseHold', {
          restaurantId,
          tableId: lastHoldInfo.current.tableId,
          bookingDate: lastHoldInfo.current.date,
          bookingTime: lastHoldInfo.current.time
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [selectedTable, restaurantId]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBookingId, setPendingBookingId] = useState(null);
  const [pendingDepositAmount, setPendingDepositAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Ref để ghi nhớ Ngày/Giờ đã dùng để Lock bàn
  const lastHoldInfo = React.useRef({ date: null, time: null, tableId: null });

  // 7. Xử lý sự kiện (Event Handlers) theo logic code.md
  const handleSelectTable = async (table) => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error(t('booking.create.toast.select_date_time'));
      return;
    }

    if (isProcessing) return;

    const currentTableId = String(table.id).toLowerCase();
    const selectedId = selectedTable?.id ? String(selectedTable.id).toLowerCase() : null;

    // Nếu chọn bàn mới hoặc thay đổi lựa chọn
    if (selectedId !== currentTableId) {
        setIsProcessing(true);
        try {
            // 1. Nhả bàn cũ (Nếu có) - PHẢI ĐỢI (Await)
            if (selectedTable && lastHoldInfo.current.tableId) {
                const oldId = String(lastHoldInfo.current.tableId).toLowerCase();
                await new Promise((resolve) => {
                    bookingSocket.emit('releaseHold', {
                      restaurantId,
                      tableId: lastHoldInfo.current.tableId,
                      bookingDate: lastHoldInfo.current.date,
                      bookingTime: lastHoldInfo.current.time
                    }, (res) => {
                        resolve(res);
                    });
                });
                setRealtimeStatuses(prev => ({ ...prev, [oldId]: 'available' }));
            }

            // 2. Giữ bàn mới
            const payload = {
              restaurantId,
              tableId: table.id,
              bookingDate: selectedDate,
              bookingTime: selectedTimeSlot
            };

            const response = await new Promise((resolve) => {
              bookingSocket.emit('holdTable', payload, (res) => {
                resolve(res);
              });
            });

            if (response?.success) {
                setSelectedTable(table);
                lastHoldInfo.current = { date: selectedDate, time: selectedTimeSlot, tableId: table.id };
                setRealtimeStatuses(prev => ({ ...prev, [currentTableId]: 'held' }));
                toast.success(t('booking.create.toast.table_held', { number: table.tableNumber }));
            } else {
                toast.error(response?.error || t('booking.create.toast.table_busy'));
            }
        } catch (error) {
            console.error('❌ [Socket Error]:', error);
        } finally {
            setIsProcessing(false);
        }
    } else {
        // 3. Bỏ chọn bàn hiện tại
        setIsProcessing(true);
        bookingSocket.emit('releaseHold', {
          restaurantId,
          tableId: table.id,
          bookingDate: lastHoldInfo.current.date,
          bookingTime: lastHoldInfo.current.time
        }, (res) => {
          setSelectedTable(null);
          setRealtimeStatuses(prev => ({ ...prev, [currentTableId]: 'available' }));
          lastHoldInfo.current = { date: null, time: null, tableId: null };
          setIsProcessing(false);
        });
    }
  };

  const handleGuestInfoChange = (field, value) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
  };

  // Ref để chống trùng lặp chuyển hướng (Tránh Socket & Broadcast cùng kích hoạt)
  const hasRedirectedRef = React.useRef(false);

  /**
   * Xử lý điều hướng sau khi hoàn tất đặt bàn (Thành công)
   */
  const handleBookingSuccess = (bookingId) => {
    if (hasRedirectedRef.current) return; // Đã xử lý rồi -> Bỏ qua
    hasRedirectedRef.current = true;

    // 1. Hiển thị thông báo và giữ spinner
    setIsProcessing(true);
    toast.success(t('booking.create.toast.redirecting'));
    
    // 2. Xóa thông tin hold ngay lập tức
    lastHoldInfo.current = { date: null, time: null, tableId: null };
    
    // 3. Đợi 2 giây rồi mới chuyển hướng
    setTimeout(() => {
      setIsProcessing(false);
      
      if (isAuthenticated) {
        // Thành viên -> Xem chi tiết đơn hàng
        navigate(ROUTES.BOOKING_DETAIL(bookingId));
      } else {
        // Khách -> Về trang chủ
        navigate(ROUTES.HOME);
      }
    }, 2000);
  };

  /**
   * Xử lý xác nhận đặt bàn chính
   */
  const handleConfirmBooking = async () => {
    if (!selectedTable || !selectedTimeSlot) {
      toast.error(t('booking.create.toast.select_date_time'));
      return;
    }

    // Lấy ID thật sự (Mã máy/GUID) thay vì Slug dùng ở URL
    const realRestaurantId = restaurant?._id || restaurant?.id || restaurant?.Id;

    try {
      setIsProcessing(true);
      
      // -- TRƯỜNG HỢP 1: MODIFY ĐẶT BÀN (Sử dụng API Modify mới) --
      if (isModifying && oldBookingId) {
        setIsReplacingLoading(true);
        
        // Xác thực số điện thoại cho khách vãng lai
        const phoneToVerify = guestInfo.guestPhone || modifyState?.guest?.phone;
        if (!isAuthenticated && !phoneToVerify) {
           toast.error(t('booking.create.toast.identity_required'));
           setIsProcessing(false);
           setIsReplacingLoading(false);
           return;
        }

        const modifyPayload = {
          id: oldBookingId,
          bookingDate: selectedDate,
          bookingTime: selectedTimeSlot,
          numGuests: partySize,
          tableId: selectedTable?.id,
          specialRequests: specialRequests,
          // Bổ sung đầy đủ thông tin khách để thỏa mãn backend validation
          // Quan trọng: Luôn gửi SĐT (kể cả với Member) để Backend đối soát record chính xác
          guestName: !isAuthenticated ? (guestInfo.guestName || modifyState?.guest?.fullName) : undefined,
          guestPhone: guestInfo.guestPhone || modifyState?.guest?.phone || modifyState?.reservation?.guestPhone,
          guestEmail: !isAuthenticated ? (guestInfo.guestEmail || modifyState?.guest?.email) : undefined
        };

        const modifyResult = await modifyBookingMutation.mutateAsync(modifyPayload);
        setIsReplacingLoading(false);
        
        // Thành công: Chuyển thẳng về trang thành công (không cần đóng cọc do Backend tự chuyển giao dịch)
        // Lấy ID của đơn hàng MỚI từ kết quả trả về (Backend trả về { booking: row, ... })
        const newBookingId = modifyResult?.booking?.id || modifyResult?.id || oldBookingId;
        handleBookingSuccess(newBookingId);
        return;
      }

      // -- TRƯỜNG HỢP 2: TẠO MỚI ĐẶT BÀN (Luồng cũ) --
      
      // Nếu là khách vãng lai, yêu cầu đầy đủ thông tin để tạo mới đơn
      if (!isAuthenticated && (!guestInfo.guestName || !guestInfo.guestPhone)) {
        toast.error(t('booking.create.toast.guest_info_required'));
        setIsProcessing(false);
        return;
      }

      // Chuẩn bị dữ liệu gửi lên API (Payload) cho tạo mới
      const payload = {
        restaurantId: realRestaurantId,
        tableId: selectedTable.id,
        bookingDate: selectedDate,
        bookingTime: selectedTimeSlot,
        numGuests: partySize,
        specialRequests: specialRequests,
        guestName: !isAuthenticated ? guestInfo.guestName : undefined,
        guestPhone: !isAuthenticated ? guestInfo.guestPhone : undefined,
        guestEmail: !isAuthenticated ? guestInfo.guestEmail : undefined
      };

      const result = await createBookingMutation.mutateAsync(payload);
      
      // Lấy ID cực kỳ linh hoạt để tránh lỗi "Success but Error Toast"
      // Thử mọi trường hợp dựa trên LOG: result.booking.id, result.data.id...
      const rawData = result?.data || result;
      const bookingId = rawData?.booking?.id || rawData?.booking?._id || rawData?.id || result?.booking?.id || (typeof result === 'string' ? result : null);

      if (!bookingId) {
        console.error('⚠️ [API Response Debug]:', result);
        throw new Error(t('booking.create.toast.id_retrieve_error'));
      }
      
      setPendingBookingId(bookingId);

      // Bước 2: Kiểm tra tiền cọc từ kết quả Server (Nguồn sự thật chính xác nhất)
      const isDepositNeeded = rawData?.depositRequired || result?.depositRequired || false;
      const amountToPay = rawData?.depositAmount || result?.depositAmount || 0;
      
      if (isDepositNeeded && amountToPay > 0) {
        // Có tiền cọc thực tế từ Server -> Mở Modal thanh toán
        setPendingDepositAmount(amountToPay);
        setIsProcessing(false);
        setShowPaymentModal(true);
      } else {
        // Không cần đặt cọc (Dù FE có thể tính là có) -> Kết thúc thành công ngay
        setIsProcessing(false);
        handleBookingSuccess(bookingId);
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      console.error('❌ [Booking Flow Error Detail]:', {
        status: error.response?.status,
        data: error.response?.data,
        message: serverMessage
      });
      setIsProcessing(false);
      setIsReplacingLoading(false);
      toast.error(serverMessage || 'Failed to complete reservation flow.');
    }
  };

  // 💰 Trình lắng nghe Thanh toán Thành công (Thoát treo giao diện)
  React.useEffect(() => {
    // Kênh 1: BroadcastChannel (Nhận Loa từ Layout - Xuyên Tab nội bộ)
    const paymentChannel = new BroadcastChannel('seatnow_payment');
    
    // Kênh 2: postMessage (Dành cho các popup gửi tin trực tiếp được)
    const handlePaymentMessage = (event) => {
      if (event.data?.type === 'PAYMENT_SUCCESS' || event.data?.status === 'SUCCESS') {
        processSuccess(event.data?.bookingId || event.data?.id);
      }
    };

    // Hàm xử lý "Thoát treo" và hoàn tất đơn hàng
    const processSuccess = (bookingId) => {
      if (hasRedirectedRef.current) return;
      
      setIsProcessing(false);
      // setShowPaymentModal(false); // GỠ BỎ: Để Modal tự đóng sau khi hiện tick xanh
      
      const finalId = bookingId || pendingBookingId;
      if (finalId) {
        handleBookingSuccess(finalId);
      } else {
        navigate(ROUTES.HOME);
      }
    };

    // Khi Layout "Phát Loa" ở Tab khác, Tab này sẽ nghe thấy ở đây
    paymentChannel.onmessage = (event) => {
      if (event.data?.status === 'SUCCESS') {
        processSuccess(event.data?.bookingId);
      }
    };
    
    window.addEventListener('message', handlePaymentMessage);
    
    return () => {
      window.removeEventListener('message', handlePaymentMessage);
      paymentChannel.close();
    };
  }, [pendingBookingId, handleBookingSuccess, navigate]); 

  if (isReplacingLoading) return (
    <LoadingSpinner message={t('booking.create.loading_modifying')} />
  );

  if (isLoadingRest || isLoadingTables) return (
    <LoadingSpinner message={t('booking.create.loading_rest')} />
  );
  if (isErrorRest || isErrorTables || !restaurant) return <ErrorState message={t('booking.create.error_not_found')} />;

  return (
    <div className="bg-surface -mt-12 pb-24">
      {/* 1. Phần tiêu đề (Header) */}
      <BookingHeader restaurant={restaurant} isModifying={isModifying} />


      <main className="max-w-7xl mx-auto px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Cột trái: Bộ lọc & Sơ đồ bàn */}
          <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left-4 duration-700 stagger-100">
            
            {/* Bước 1: Chọn Ngày & Giờ */}
            <section className="space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-outline-variant/5">
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl font-black">event_available</span>
                  </div>
                  <h2 className="text-xl font-black text-on-surface">{t('booking.create.select_date_time')}</h2>
               </div>
               <TimeSlotPicker 
                 selectedDate={selectedDate} 
                 onSelectDate={setSelectedDate}
                 selectedTimeSlot={selectedTimeSlot}
                 onSelectSlot={setSelectedTimeSlot}
                 openingHours={restaurant.openingHours} // Truyền giờ mở cửa thực tế
               />
            </section>

            {/* Bước 2: Chọn Khu vực & Bàn */}
            <section className="space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-outline-variant/5">
                <div className="flex items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl font-black">table_view</span>
                      </div>
                      <h2 className="text-xl font-black text-on-surface">{t('booking.create.experience_way')}</h2>
                   </div>
                   
                   <FloorFilter 
                    floors={floors} 
                    activeFloor={activeFloor} 
                    onSelectFloor={(f) => {
                        setActiveFloor(f);
                        setSelectedTable(null); // Reset bàn khi đổi tầng
                    }} 
                   />
                </div>

                <TableSelector 
                  tables={displayTables}
                  selectedTableId={selectedTable?.id}
                  onSelectTable={handleSelectTable}
                />
                
                {isFetchingAvailability && (
                  <div className="flex justify-center pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div>
                      {t('booking.create.syncing_availability')}
                    </div>
                  </div>
                )}
            </section>

            {/* Bước 3: Yêu cầu đặc biệt */}
            <section className="space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-outline-variant/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl font-black">edit_note</span>
                  </div>
                  <h2 className="text-xl font-black text-on-surface">{t('booking.create.special_requests')}</h2>
                </div>
                <textarea 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-50 border-none outline-none rounded-[1.25rem] p-6 focus:ring-4 focus:ring-primary/10 transition-all text-on-surface-variant font-medium placeholder:text-slate-300 min-h-[140px] resize-none text-sm" 
                  placeholder={t('booking.create.special_requests_placeholder')} 
                />
            </section>
          </div>

          {/* Cột phải: Sidebar Tóm tắt đơn hàng */}
          <aside className="w-full lg:w-[420px] animate-in fade-in slide-in-from-right-4 duration-700">
            <BookingSummary 
              restaurant={restaurant}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              partySize={partySize}
              onUpdatePartySize={setPartySize}
              selectedTable={selectedTable}
              onConfirm={handleConfirmBooking}
              isProcessing={isProcessing}
              onCancel={() => navigate(ROUTES.RESTAURANT_DETAIL(idOrSlug))}
              isAuthenticated={isAuthenticated}
              guestInfo={guestInfo}
              onGuestInfoChange={handleGuestInfoChange}
              isModifying={isModifying}
            />
          </aside>
        </div>
      </main>

      {/* 4. Modal thanh toán (Chỉ hiện khi có tiền cọc) */}
      {showPaymentModal && pendingBookingId && (
        <PaymentModal 
          bookingId={pendingBookingId}
          amount={pendingDepositAmount}
          onSuccess={() => {
            setShowPaymentModal(false);
            handleBookingSuccess(pendingBookingId);
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default CreateBookingPage;
