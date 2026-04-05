import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routes.js';
import { useRestaurant, useRestaurantTables } from '../../restaurants/hooks.js';
import { useRestaurantAvailability, useCreateBooking } from '../hooks.js';
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
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, token } = useAuthStore();

  // 1. Fetch dữ liệu nhà hàng & Bàn
  const { data: restaurantData, isLoading: isLoadingRest, isError: isErrorRest } = useRestaurant(idOrSlug);
  const restaurant = restaurantData?.data || restaurantData;
  const restaurantId = restaurant?.id;

  const { data: tablesData, isLoading: isLoadingTables, isError: isErrorTables } = useRestaurantTables(restaurantId);

  // 2. State quản lý luồng đặt bàn
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [activeFloor, setActiveFloor] = useState(null); 
  const [selectedTable, setSelectedTable] = useState(null);
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  
  // State cho Guest Info
  const [guestInfo, setGuestInfo] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: ''
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
        if (realtimeStatus) {
          finalStatus = realtimeStatus;
        } else if (!isAvailableByBE) {
          finalStatus = t.status === 'available' ? 'held' : 'occupied';
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
        console.log('🏠 [Socket] Gia nhập room:', restaurantId);
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
      
      console.log(`⚡ [Socket Event] Cập nhật Key: ${storageKey} -> ${payload.status}`);
      
      setRealtimeStatuses(prev => ({
        ...prev,
        [storageKey]: payload.status
      }));
    };

    const handleAvailabilityChange = (payload) => {
        console.log('🔄 [Socket Event] availabilityChanged');
        queryClient.invalidateQueries(['booking-restaurants', 'availability', restaurantId]);
    };

    bookingSocket.on('tableStatusChanged', handleTableStatusChanged);
    bookingSocket.on('availabilityChanged', handleAvailabilityChange);

    return () => {
      console.log('🔌 [Socket] Dọn dẹp kết nối...');
      bookingSocket.off('connect', onConnect);
      bookingSocket.off('tableStatusChanged', handleTableStatusChanged);
      bookingSocket.off('availabilityChanged', handleAvailabilityChange);
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
  const [isProcessing, setIsProcessing] = useState(false);

  // Ref để ghi nhớ Ngày/Giờ đã dùng để Lock bàn
  const lastHoldInfo = React.useRef({ date: null, time: null, tableId: null });

  // 7. Xử lý sự kiện (Event Handlers) theo logic code.md
  const handleSelectTable = async (table) => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Please select a Date and Time Slot first.');
      return;
    }

    if (isProcessing) return;

    const currentTableId = String(table.id).toLowerCase();
    const selectedId = selectedTable?.id ? String(selectedTable.id).toLowerCase() : null;

    console.log('🎯 [User Action] Chọn bàn:', table.tableNumber, '(ID:', currentTableId, ')');

    // Nếu chọn bàn mới hoặc thay đổi lựa chọn
    if (selectedId !== currentTableId) {
        setIsProcessing(true);
        try {
            // 1. Nhả bàn cũ (Nếu có) - PHẢI ĐỢI (Await)
            if (selectedTable && lastHoldInfo.current.tableId) {
                const oldId = String(lastHoldInfo.current.tableId).toLowerCase();
                console.log('⌛ [Socket] Đang nhả bàn cũ:', oldId);
                await new Promise((resolve) => {
                    bookingSocket.emit('releaseHold', {
                      restaurantId,
                      tableId: lastHoldInfo.current.tableId,
                      bookingDate: lastHoldInfo.current.date,
                      bookingTime: lastHoldInfo.current.time
                    }, (res) => {
                        console.log('✅ [Socket] Đã nhả bàn cũ thành công');
                        resolve(res);
                    });
                });
                setRealtimeStatuses(prev => ({ ...prev, [oldId]: 'available' }));
            }

            // 2. Giữ bàn mới
            console.log('🔒 [Socket] Đang gửi lệnh Giữ bàn mới:', currentTableId);
            const payload = {
              restaurantId,
              tableId: table.id,
              bookingDate: selectedDate,
              bookingTime: selectedTimeSlot
            };

            const response = await new Promise((resolve) => {
              bookingSocket.emit('holdTable', payload, (res) => {
                console.log('📥 [Socket] Phản hồi giữ bàn:', res);
                resolve(res);
              });
            });

            if (response?.success) {
                setSelectedTable(table);
                lastHoldInfo.current = { date: selectedDate, time: selectedTimeSlot, tableId: table.id };
                setRealtimeStatuses(prev => ({ ...prev, [currentTableId]: 'held' }));
                toast.success(`Table ${table.tableNumber} is held for you.`);
            } else {
                toast.error(response?.error || 'Table is busy!');
            }
        } catch (error) {
            console.error('❌ [Socket Error]:', error);
        } finally {
            setIsProcessing(false);
        }
    } else {
        // 3. Bỏ chọn bàn hiện tại
        setIsProcessing(true);
        console.log('🔓 [Socket] Đang hủy giữ bàn hiện tại:', currentTableId);
        bookingSocket.emit('releaseHold', {
          restaurantId,
          tableId: table.id,
          bookingDate: lastHoldInfo.current.date,
          bookingTime: lastHoldInfo.current.time
        }, (res) => {
          console.log('✅ [Socket] Đã hủy giữ bàn xong');
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

  /**
   * Xử lý điều hướng sau khi hoàn tất đặt bàn (Thành công)
   */
  const handleBookingSuccess = (bookingId) => {
    toast.success('Reservation confirmed successfully!');
    // Xóa thông tin hold sau khi đã book thành công
    lastHoldInfo.current = { date: null, time: null, tableId: null };
    
    // Điều hướng dựa trên vai trò: Guest về Home, Member về Profile/Booking Detail
    if (isAuthenticated) {
      navigate(`/profile`);
    } else {
      navigate('/');
    }
  };

  /**
   * Xử lý xác nhận đặt bàn chính
   */
  const handleConfirmBooking = async () => {
    if (!selectedTable || !selectedTimeSlot) {
      toast.error('Please select both a time slot and a table.');
      return;
    }

    const totalDeposit = calculateDepositAmount(restaurant, partySize);

    // Chuẩn bị dữ liệu gửi lên API (Payload)
    const payload = {
      restaurantId: restaurant.id,
      tableId: selectedTable.id,
      bookingDate: selectedDate,
      bookingTime: selectedTimeSlot,
      numGuests: partySize,
      specialRequests
    };

    // Nếu là khách vãng lai (Guest), bổ sung thông tin liên lạc
    if (!isAuthenticated) {
      if (!guestInfo.guestName || !guestInfo.guestPhone) {
        toast.error('Please provide your name and phone number.');
        return;
      }
      payload.guestName = guestInfo.guestName;
      payload.guestPhone = guestInfo.guestPhone;
      payload.guestEmail = guestInfo.guestEmail;
    }

    try {
      setIsProcessing(true);
      // Bước 1: Luôn tạo Booking trước (Server sẽ quản lý trạng thái PENDING_PAYMENT nếu có cọc)
      const result = await createBookingMutation.mutateAsync(payload);
      const bookingId = result?.id || result?.data?.id;
      setPendingBookingId(bookingId);

      // Bước 2: Kiểm tra tiền cọc
      if (totalDeposit > 0) {
        // Có tiền cọc -> Mở Modal thanh toán
        setShowPaymentModal(true);
        setIsProcessing(false);
      } else {
        // Không tiền cọc -> Kết thúc thành công ngay
        setTimeout(() => {
          setIsProcessing(false);
          handleBookingSuccess(bookingId);
        }, 1500);
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error(error.response?.data?.message || 'Failed to create reservation.');
    }
  };

  if (isLoadingRest || isLoadingTables) return (
    <LoadingSpinner message="Curating your dining options..." />
  );
  if (isErrorRest || isErrorTables || !restaurant) return <ErrorState message="Could not find restaurant details." />;

  return (
    <div className="bg-surface -mt-12 pb-24">
      {/* 1. Phần tiêu đề (Header) */}
      <BookingHeader restaurant={restaurant} />

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
                  <h2 className="text-xl font-black text-on-surface">Select Date & Time</h2>
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
                      <h2 className="text-xl font-black text-on-surface">Experience Your Way</h2>
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
                      Syncing availability...
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
                  <h2 className="text-xl font-black text-on-surface">Special Requests</h2>
                </div>
                <textarea 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-50 border-none outline-none rounded-[1.25rem] p-6 focus:ring-4 focus:ring-primary/10 transition-all text-on-surface-variant font-medium placeholder:text-slate-300 min-h-[140px] resize-none text-sm" 
                  placeholder="Tell us about allergies, anniversaries, or specific seating preferences..." 
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
              onCancel={() => navigate(ROUTES.RESTAURANT_DETAIL(idOrSlug))}
              isAuthenticated={isAuthenticated}
              guestInfo={guestInfo}
              onGuestInfoChange={handleGuestInfoChange}
            />
          </aside>
        </div>
      </main>

      {/* 4. Modal thanh toán (Chỉ hiện khi có tiền cọc) */}
      {showPaymentModal && pendingBookingId && (
        <PaymentModal 
          bookingId={pendingBookingId}
          amount={calculateDepositAmount(restaurant, partySize)}
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
