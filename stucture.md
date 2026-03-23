seatnow-fe/
├─ public/ // Tài nguyên public, truy cập trực tiếp qua URL
│  ├─ images/ // Ảnh tĩnh chung: banner, empty-state, placeholder
│  ├─ icons/ // Icon svg/png không cần import qua src
│  ├─ logo/ // Logo chính, logo trắng, favicon source
│  └─ favicon.ico // Icon tab trình duyệt
│
├─ src/
│  ├─ app/ // Tầng khởi tạo app
│  │  ├─ router.jsx // Khai báo toàn bộ routes của ứng dụng
│  │  ├─ providers.jsx // Gom các Provider: QueryClient, Router, Toast, Auth...
│  │  └─ store.js // Store root nếu bạn dùng Zustand/Redux toàn cục
│  │
│  ├─ assets/ // Asset import qua bundler Vite
│  │  ├─ images/ // Ảnh cần import trong component
│  │  ├─ illustrations/ // Illustration cho onboarding, auth, empty state
│  │  └─ logos/ // Logo dạng import module
│  │
│  ├─ shared/ // Các phần dùng lại toàn app
│  │  ├─ ui/ // UI component thuần, không gắn domain
│  │  │  ├─ Button.jsx // Nút bấm chuẩn dùng toàn app
│  │  │  ├─ Input.jsx // Input chuẩn
│  │  │  ├─ Select.jsx // Dropdown/select chuẩn
│  │  │  ├─ Textarea.jsx // Ô nhập nhiều dòng
│  │  │  ├─ Modal.jsx // Modal dùng chung
│  │  │  ├─ Drawer.jsx // Drawer trượt cạnh
│  │  │  ├─ Badge.jsx // Badge trạng thái
│  │  │  ├─ Tabs.jsx // Tabs chuyển nội dung
│  │  │  ├─ Table.jsx // Table UI dùng lại
│  │  │  ├─ EmptyState.jsx // Trạng thái không có dữ liệu
│  │  │  ├─ LoadingSpinner.jsx // Loading spinner/skeleton đơn giản
│  │  │  ├─ ConfirmDialog.jsx // Hộp xác nhận xóa/duyệt/hủy
│  │  │  ├─ Pagination.jsx // Phân trang dùng chung
│  │  │  └─ StatusChip.jsx // Chip màu cho status booking/payment/user
│  │  │
│  │  ├─ layout/ // Layout và khung trang
│  │  │  ├─ MainLayout.jsx // Layout mặc định cho trang public
│  │  │  ├─ AuthLayout.jsx // Layout cho login/register/otp
│  │  │  ├─ CustomerLayout.jsx // Layout cho user đã đăng nhập
│  │  │  ├─ OwnerLayout.jsx // Layout dashboard chủ nhà hàng
│  │  │  ├─ AdminLayout.jsx // Layout dashboard admin
│  │  │  ├─ Navbar.jsx // Thanh điều hướng đầu trang
│  │  │  ├─ Footer.jsx // Chân trang
│  │  │  ├─ SidebarOwner.jsx // Sidebar riêng cho owner
│  │  │  ├─ SidebarAdmin.jsx // Sidebar riêng cho admin
│  │  │  └─ TopbarDashboard.jsx // Topbar trong dashboard
│  │  │
│  │  ├─ guards/
│  │  │  ├─ ProtectedRoute.jsx // Chặn route nếu chưa đăng nhập
│  │  │  └─ RoleGuard.jsx // Chặn route theo vai trò CUSTOMER/OWNER/ADMIN
│  │  │
│  │  ├─ feedback/
│  │  │  ├─ ErrorBoundary.jsx // Bắt lỗi runtime ở component tree
│  │  │  ├─ ErrorState.jsx // UI hiển thị khi request lỗi
│  │  │  ├─ SuccessState.jsx // UI hiển thị khi thao tác thành công
│  │  │  └─ NoPermission.jsx // UI khi không có quyền truy cập
│  │  │
│  │  ├─ hooks/
│  │  │  ├─ useDebounce.js // Debounce input/filter/search
│  │  │  ├─ usePagination.js // Logic phân trang
│  │  │  ├─ useQueryParams.js // Đọc/ghi query params URL
│  │  │  ├─ useUserLocation.js // Lấy vị trí hiện tại của user
│  │  │  └─ useDisclosure.js // Mở/đóng modal/drawer/popover
│  │  │
│  │  └─ utils/
│  │     ├─ formatCurrency.js // Format tiền tệ
│  │     ├─ formatDateTime.js // Format ngày giờ
│  │     ├─ getStatusColor.js // Mapping status -> màu
│  │     ├─ buildQueryString.js // Build query string cho filter/search
│  │     ├─ parseApiError.js // Chuẩn hóa lỗi trả về từ BE
│  │     └─ downloadFile.js // Tải file/report từ response
│  │
│  ├─ config/ // Cấu hình toàn app
│  │  ├─ env.js // Đọc và chuẩn hóa biến môi trường
│  │  ├─ routes.js // Khai báo path constant
│  │  ├─ roles.js // Enum role
│  │  └─ nav.config.js // Cấu hình menu navbar/sidebar
│  │
│  ├─ constants/ // Hằng số domain
│  │  ├─ bookingStatus.js // PENDING/CONFIRMED/ARRIVED/...
│  │  ├─ paymentStatus.js // pending/completed/failed
│  │  ├─ tableStatus.js // available/unavailable/maintenance
│  │  ├─ tableTypes.js // standard/vip/outdoor
│  │  ├─ userRoles.js // CUSTOMER/RESTAURANT_OWNER/ADMIN
│  │  ├─ cuisines.js // Danh sách cuisine filter
│  │  └─ priceRanges.js // Mapping price range 1-4
│  │
│  ├─ lib/ // Tầng low-level, dùng chung cho features
│  │  ├─ axios.js // Axios instance + interceptors + attach token
│  │  ├─ queryClient.js // TanStack Query client
│  │  ├─ storage.js // localStorage/sessionStorage helpers
│  │  ├─ cloudinary.js // Hàm low-level upload ảnh trên Cloudinary
│  │  └─ leaflet.js // Helper import/config Leaflet nếu cần
│  │
│  ├─ features/ // Mỗi domain là một feature riêng
│  │  ├─ auth/
│  │  │  ├─ api.js // API auth: login/register/verify/forgot
│  │  │  ├─ hooks.js // useLogin, useRegister, useVerifyOtp...
│  │  │  ├─ store.js // Auth store: token, user, session
│  │  │  ├─ schemas.js // Validate form auth
│  │  │  ├─ pages/
│  │  │  │  ├─ LoginPage.jsx // Trang đăng nhập
│  │  │  │  ├─ RegisterPage.jsx // Trang đăng ký
│  │  │  │  ├─ VerifyOtpPage.jsx // Trang xác thực OTP
│  │  │  │  └─ ForgotPasswordPage.jsx // Trang quên mật khẩu
│  │  │  └─ components/
│  │  │     ├─ LoginForm.jsx // Form login
│  │  │     ├─ RegisterForm.jsx // Form đăng ký
│  │  │     └─ OtpForm.jsx // Form nhập OTP
│  │  │
│  │  ├─ profile/
│  │  │  ├─ api.js // API profile user
│  │  │  ├─ hooks.js // Hook lấy/cập nhật profile
│  │  │  ├─ pages/
│  │  │  │  └─ ProfilePage.jsx // Trang hồ sơ cá nhân
│  │  │  └─ components/
│  │  │     ├─ ProfileForm.jsx // Form cập nhật tên/sđt/email...
│  │  │     └─ AvatarUploader.jsx // Upload/chọn avatar
│  │  │
│  │  ├─ restaurants/
│  │  │  ├─ api.js // API list/detail/near-me/availability
│  │  │  ├─ hooks.js // Hook lấy danh sách, chi tiết, filter
│  │  │  ├─ pages/
│  │  │  │  ├─ RestaurantListPage.jsx // Trang danh sách nhà hàng
│  │  │  │  ├─ RestaurantDetailPage.jsx // Trang chi tiết nhà hàng
│  │  │  │  └─ NearMePage.jsx // Trang nhà hàng gần tôi
│  │  │  └─ components/
│  │  │     ├─ RestaurantCard.jsx // Card item nhà hàng
│  │  │     ├─ RestaurantFilters.jsx // Bộ lọc giá/cuisine/keyword
│  │  │     ├─ RestaurantHero.jsx // Header chi tiết nhà hàng
│  │  │     ├─ RestaurantGallery.jsx // Gallery ảnh nhà hàng
│  │  │     ├─ RestaurantInfo.jsx // Thông tin mô tả/giờ mở cửa/địa chỉ
│  │  │     ├─ RestaurantMenu.jsx // Danh sách món ăn
│  │  │     ├─ ReviewList.jsx // Danh sách review
│  │  │     └─ AvailabilityPanel.jsx // Kiểm tra bàn trống theo ngày/giờ/số khách
│  │  │
│  │  ├─ booking/
│  │  │  ├─ api.js // API create booking, history, detail, cancel, pay deposit
│  │  │  ├─ hooks.js // Hook booking queries/mutations
│  │  │  ├─ store.js // State tạm cho flow đặt bàn nhiều bước
│  │  │  ├─ schemas.js // Validate form booking
│  │  │  ├─ pages/
│  │  │  │  ├─ CreateBookingPage.jsx // Trang đặt bàn
│  │  │  │  ├─ BookingHistoryPage.jsx // Lịch sử booking user
│  │  │  │  └─ BookingDetailPage.jsx // Chi tiết booking
│  │  │  └─ components/
│  │  │     ├─ BookingForm.jsx // Form chọn ngày/giờ/số khách/yêu cầu
│  │  │     ├─ TableSelector.jsx // Chọn bàn phù hợp
│  │  │     ├─ CapacityChecker.jsx // Kiểm tra sức chứa bàn
│  │  │     ├─ DepositSummary.jsx // Tóm tắt tiền cọc
│  │  │     ├─ BookingQRCode.jsx // Hiển thị QR check-in
│  │  │     ├─ BookingStatusBadge.jsx // Badge trạng thái booking
│  │  │     └─ CancelBookingDialog.jsx // Xác nhận hủy booking
│  │  │
│  │  ├─ reviews/
│  │  │  ├─ api.js // API tạo review/lấy rating
│  │  │  ├─ hooks.js // Hook review query/mutation
│  │  │  ├─ pages/
│  │  │  │  └─ CreateReviewPage.jsx // Trang gửi đánh giá
│  │  │  └─ components/
│  │  │     ├─ ReviewForm.jsx // Form đánh giá + upload ảnh review
│  │  │     └─ RatingSummary.jsx // Tổng hợp rating trung bình
│  │  │
│  │  ├─ wallet/
│  │  │  ├─ api.js // API ví, lịch sử giao dịch, rút tiền
│  │  │  ├─ hooks.js // Hook wallet queries/mutations
│  │  │  ├─ pages/
│  │  │  │  ├─ WalletPage.jsx // Trang tổng quan ví
│  │  │  │  ├─ TransactionsPage.jsx // Trang lịch sử giao dịch
│  │  │  │  └─ WithdrawalRequestPage.jsx // Trang yêu cầu rút tiền
│  │  │  └─ components/
│  │  │     ├─ WalletBalanceCard.jsx // Card số dư ví
│  │  │     ├─ TransactionTable.jsx // Bảng giao dịch
│  │  │     └─ WithdrawalForm.jsx // Form gửi yêu cầu rút tiền
│  │  │
│  │  ├─ owner/
│  │  │  ├─ dashboard/
│  │  │  │  ├─ api.js // API dashboard owner
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ OwnerDashboardPage.jsx // Trang dashboard chủ nhà hàng
│  │  │  │  └─ components/
│  │  │  │     ├─ RevenueChart.jsx // Biểu đồ doanh thu
│  │  │  │     ├─ BookingOverviewCard.jsx // Card tổng số booking
│  │  │  │     └─ WalletOverviewCard.jsx // Card ví nhà hàng
│  │  │  │
│  │  │  ├─ restaurant-profile/
│  │  │  │  ├─ api.js // API cập nhật profile nhà hàng
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ OwnerRestaurantProfilePage.jsx // Trang chỉnh profile nhà hàng
│  │  │  │  └─ components/
│  │  │  │     ├─ RestaurantProfileForm.jsx // Form tên, mô tả, địa chỉ, ảnh, giờ mở cửa
│  │  │  │     └─ DepositPolicyForm.jsx // Form chính sách đặt cọc
│  │  │  │
│  │  │  ├─ menu/
│  │  │  │  ├─ api.js // API CRUD menu item
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ OwnerMenuPage.jsx // Trang quản lý menu
│  │  │  │  └─ components/
│  │  │  │     ├─ MenuTable.jsx // Bảng danh sách món
│  │  │  │     ├─ MenuItemForm.jsx // Form thêm/sửa món
│  │  │  │     └─ MenuItemModal.jsx // Modal bọc form món
│  │  │  │
│  │  │  ├─ tables/
│  │  │  │  ├─ api.js // API CRUD bàn
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ OwnerTablesPage.jsx // Trang quản lý bàn
│  │  │  │  └─ components/
│  │  │  │     ├─ TableList.jsx // Danh sách bàn dạng table/card
│  │  │  │     ├─ TableForm.jsx // Form thêm/sửa bàn
│  │  │  │     ├─ TableCard.jsx // Card hiển thị 1 bàn
│  │  │  │     └─ TableLayoutEditor.jsx // TÙY CHỌN: editor layout
│  │  │  │
│  │  │  ├─ bookings/
│  │  │  │  ├─ api.js // API booking phía owner
│  │  │  │  ├─ pages/
│  │  │  │  │  ├─ OwnerBookingsPage.jsx // Danh sách booking của nhà hàng
│  │  │  │  │  └─ OwnerBookingDetailPage.jsx // Chi tiết booking phía owner
│  │  │  │  └─ components/
│  │  │  │     ├─ BookingTable.jsx // Bảng booking
│  │  │  │     ├─ BookingStatusActions.jsx // Nút xác nhận/đã đến/hủy/hoàn thành
│  │  │  │     └─ BookingFilters.jsx // Bộ lọc theo trạng thái/ngày
│  │  │  │
│  │  │  └─ revenue/
│  │  │     ├─ api.js // API thống kê doanh thu
│  │  │     ├─ pages/
│  │  │     │  └─ OwnerRevenuePage.jsx // Trang doanh thu nhà hàng
│  │  │     └─ components/
│  │  │        ├─ RevenueFilter.jsx // Lọc ngày/tuần/tháng/quý/năm
│  │  │        ├─ RevenueChart.jsx // Biểu đồ doanh thu
│  │  │        └─ RevenueSummaryCards.jsx // Card tổng hợp doanh thu
│  │  │
│  │  ├─ admin/
│  │  │  ├─ dashboard/
│  │  │  │  ├─ api.js // API dashboard admin
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ AdminDashboardPage.jsx // Trang dashboard admin
│  │  │  │  └─ components/
│  │  │  │     ├─ StatsCards.jsx // Card tổng users/restaurants/bookings
│  │  │  │     ├─ RevenueChart.jsx // Biểu đồ doanh thu admin
│  │  │  │     └─ SystemSummary.jsx // Tóm tắt hệ thống
│  │  │  │
│  │  │  ├─ users/
│  │  │  │  ├─ api.js // API quản lý users/owner
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ AdminUsersPage.jsx // Trang user management
│  │  │  │  └─ components/
│  │  │  │     ├─ UserTable.jsx // Bảng người dùng
│  │  │  │     ├─ CreateOwnerForm.jsx // Form tạo tài khoản owner
│  │  │  │     └─ ResetPasswordDialog.jsx // Dialog reset mật khẩu owner
│  │  │  │
│  │  │  ├─ restaurants/
│  │  │  │  ├─ api.js // API duyệt/suspend nhà hàng
│  │  │  │  ├─ pages/
│  │  │  │  │  ├─ PendingRestaurantsPage.jsx // Danh sách nhà hàng chờ duyệt
│  │  │  │  │  └─ AdminRestaurantsPage.jsx // Danh sách tất cả nhà hàng
│  │  │  │  └─ components/
│  │  │  │     ├─ PendingRestaurantTable.jsx // Bảng pending
│  │  │  │     └─ ApproveRestaurantDialog.jsx // Dialog duyệt nhà hàng
│  │  │  │
│  │  │  ├─ bookings/
│  │  │  │  ├─ api.js // API tra cứu booking hệ thống
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ AdminBookingsPage.jsx // Trang audit booking
│  │  │  │  └─ components/
│  │  │  │     └─ BookingAuditTable.jsx // Bảng booking toàn hệ thống
│  │  │  │
│  │  │  ├─ transactions/
│  │  │  │  ├─ api.js // API tra cứu giao dịch
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ AdminTransactionsPage.jsx // Trang giao dịch toàn hệ thống
│  │  │  │  └─ components/
│  │  │  │     └─ TransactionAuditTable.jsx // Bảng audit giao dịch
│  │  │  │
│  │  │  ├─ withdrawals/
│  │  │  │  ├─ api.js // API duyệt/từ chối rút tiền
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ AdminWithdrawalsPage.jsx // Trang duyệt withdrawal
│  │  │  │  └─ components/
│  │  │  │     ├─ WithdrawalTable.jsx // Bảng yêu cầu rút
│  │  │  │     └─ WithdrawalDecisionDialog.jsx // Dialog approve/reject
│  │  │  │
│  │  │  └─ commissions/
│  │  │     ├─ api.js // API đối soát commission
│  │  │     ├─ pages/
│  │  │     │  └─ CommissionSettlementPage.jsx // Trang settle commission theo quý
│  │  │     └─ components/
│  │  │        ├─ SettlementFilters.jsx // Lọc quý/năm/restaurant
│  │  │        ├─ DryRunPanel.jsx // Khu xem thử trước khi chạy real-run
│  │  │        └─ SettlementResultTable.jsx // Bảng kết quả đối soát
│  │  │
│  │  ├─ ai-assistant/
│  │  │  ├─ api.js // API hỏi đáp AI
│  │  │  ├─ pages/
│  │  │  │  └─ AIAssistantPage.jsx // Trang trợ lý ảo
│  │  │  └─ components/
│  │  │     ├─ ChatBox.jsx // Khung chat chính
│  │  │     ├─ PromptSuggestions.jsx // Gợi ý câu hỏi nhanh
│  │  │     └─ MessageBubble.jsx // Bong bóng hội thoại
│  │  │
│  │  ├─ map/
│  │  │  ├─ api.js // API near-me/geocoding nội bộ
│  │  │  ├─ hooks.js // Hook map state, query params
│  │  │  ├─ utils/
│  │  │  │  ├─ buildPublicMapUrl.js // Build URL nhúng map public
│  │  │  │  └─ mapMessage.js // Chuẩn hóa message gửi/nhận
│  │  │  ├─ pages/
│  │  │  │  ├─ ExploreMapPage.jsx // Trang khám phá trên map
│  │  │  │  └─ RestaurantMapPage.jsx // Trang xem route đến 1 nhà hàng
│  │  │  └─ components/
│  │  │     ├─ PublicMapEmbed.jsx // Component nhúng map
│  │  │     ├─ UserLocationButton.jsx // Nút lấy vị trí
│  │  │     ├─ RoutePreviewPanel.jsx // Panel preview
│  │  │     └─ LocationPickerModal.jsx // Modal chọn điểm
│  │  │
│  │  ├─ media/
│  │  │  ├─ api.js // Gọi upload Cloudinary
│  │  │  ├─ hooks.js // useImageUpload, useMultipleUpload
│  │  │  ├─ utils/
│  │  │  │  └─ optimizeCloudinaryUrl.js // Tạo URL thumbnail/resize
│  │  │  └─ components/
│  │  │     ├─ ImageUploader.jsx // Input upload ảnh
│  │  │     ├─ ImageDropzone.jsx // Kéo-thả ảnh
│  │  │     ├─ ImagePreviewList.jsx // Preview nhiều ảnh
│  │  │     └─ CloudinaryImage.jsx // Ảnh render tối ưu
│  │  │
│  │  └─ home/
│  │     ├─ pages/
│  │     │  └─ HomePage.jsx // Trang landing/home
│  │     └─ components/
│  │        ├─ HeroSection.jsx // Hero đầu trang
│  │        ├─ FeatureSection.jsx // Khối giới thiệu tính năng
│  │        ├─ PopularRestaurants.jsx // Khối nhà hàng nổi bật
│  │        ├─ WhyChooseUs.jsx // Lý do chọn nền tảng
│  │        └─ CTASection.jsx // Call-to-action cuối trang
│  │
│  ├─ styles/
│  │  ├─ index.css // CSS global
│  │  └─ tailwind.css // Entry cho Tailwind
│  │
│  ├─ App.jsx // Root component
│  └─ main.jsx // Entry point
│
├─ .env // Biến môi trường
├─ .env.development // Biến môi trường dev
├─ .env.production // Biến môi trường production
├─ index.html // HTML root
├─ package.json // Scripts
├─ postcss.config.js // Cấu hình PostCSS
├─ tailwind.config.js // Cấu hình Tailwind
└─ vite.config.js // Cấu hình Vite
