seatnow-fe/
├─ public/ // Public assets, directly accessible via URL
│ ├─ images/ // Static images: banner, empty-state, placeholders
│ ├─ icons/ // SVG/PNG icons
│ ├─ logo/ // Core logo, white logo, favicon source
│ └─ favicon.ico // Browser tab icon
│
├─ src/
│ ├─ app/ // Application bootstrap layer
│ │ ├─ router.jsx // All application routes declaration
│ │ ├─ providers.jsx // Global providers: QueryClient, Router, Toast, Auth...
│ │ └─ store.js // Root store (Zustand/Redux)
│ │
│ ├─ assets/ // Asset import qua bundler Vite
│ │ ├─ images/ // Ảnh cần import trong component
│ │ ├─ illustrations/ // Illustration cho onboarding, auth, empty state
│ │ └─ logos/ // Logo dạng import module
│ │
│ ├─ shared/ // Các phần dùng lại toàn app
│ │ ├─ ui/ // UI component thuần, không gắn domain
│ │ │ ├─ Button.jsx // Nút bấm chuẩn dùng toàn app
│ │ │ ├─ Input.jsx // Input chuẩn
│ │ │ ├─ Select.jsx // Dropdown/select chuẩn
│ │ │ ├─ Textarea.jsx // Ô nhập nhiều dòng
│ │ │ ├─ Modal.jsx // Modal dùng chung
│ │ │ ├─ Drawer.jsx // Drawer trượt cạnh
│ │ │ ├─ Badge.jsx // Badge trạng thái
│ │ │ ├─ Tabs.jsx // Tabs chuyển nội dung
│ │ │ ├─ Table.jsx // Table UI dùng lại
│ │ │ ├─ EmptyState.jsx // Trạng thái không có dữ liệu
│ │ │ ├─ LoadingSpinner.jsx // Màn hình loading toàn trang cao cấp
│ │ │ ├─ ConfirmDialog.jsx // Hộp xác nhận xóa/duyệt/hủy
│ │ │ ├─ Pagination.jsx // Phân trang dùng chung
│ │ │ ├─ StatusChip.jsx // Chip màu cho status booking/payment/user
│ │ │ └─ MediaLightbox.jsx // Lightbox xem ảnh fullscreen: swipe, thumbnail strip, arrow nav, ESC đóng
│ │ │
│ │ ├─ layout/ // Layout và khung trang
│ │ │ ├─ MainLayout.jsx // Layout mặc định cho trang public
│ │ │ ├─ AuthLayout.jsx // Layout cho login/register/otp
│ │ │ ├─ CustomerLayout.jsx // Layout cho user đã đăng
│ │ │ ├─ CustomerNavbar.jsx // Thanh điều hướng đầu trang cho user đã đăng nhập
│ │ │ ├─ OwnerMainLayout.jsx // Layout cấp tài khoản owner (portal)
│ │ │ ├─ RestaurantWorkspaceLayout.jsx // Layout khi owner vào 1 nhà hàng cụ thể
│ │ │ ├─ AdminLayout.jsx // Layout dashboard admin
│ │ │ ├─ Navbar.jsx // Thanh điều hướng đầu trang
│ │ │ ├─ Footer.jsx // Chân trang
│ │ │ ├─ SidebarOwnerMain.jsx // Sidebar cho owner portal
│ │ │ ├─ SidebarRestaurantWorkspace.jsx // Sidebar cho workspace nhà hàng
│ │ │ ├─ SidebarAdmin.jsx // Sidebar riêng cho admin
│ │ │ ├─ OwnerTopbar.jsx // Topbar cho owner portal
│ │ │ └─ RestaurantTopbar.jsx // Topbar cho restaurant workspace
│ │ │
│ │ ├─ guards/
│ │ │ ├─ ProtectedRoute.jsx // Chặn route nếu chưa đăng nhập
│ │ │ └─ RoleGuard.jsx // Chặn route theo vai trò CUSTOMER/OWNER/ADMIN
│ │ │
│ │ ├─ feedback/
│ │ │ ├─ ErrorBoundary.jsx // Bắt lỗi runtime ở component tree
│ │ │ ├─ ErrorState.jsx // UI hiển thị lỗi phong cách Glassmorphism
│ │ │ ├─ SuccessState.jsx // UI hiển thị khi thao tác thành công
│ │ │ └─ NoPermission.jsx // UI khi không có quyền truy cập
│ │ │
│ │ ├─ hooks/
│ │ │ ├─ useDebounce.js // Debounce input/filter/search
│ │ │ ├─ usePagination.js // Logic phân trang
│ │ │ ├─ useQueryParams.js // Đọc/ghi query params URL
│ │ │ ├─ useUserLocation.js // Lấy vị trí hiện tại của user
│ │ │ └─ useDisclosure.js // Mở/đóng modal/drawer/popover
│ │ │
│ │ ├─ components/
│ │ │ └─ ScrollToTop.jsx // Tự động cuộn lên đầu trang khi điều hướng
│ │ │ └─ Pagination.jsx // Phân trang
│ │ │ └─ AIFloatingButton.jsx // Nút AI nổi
│ │ │
│ │ └─ utils/
│ │ ├─ formatCurrency.js // Format tiền tệ
│ │ ├─ formatDateTime.js // Format ngày giờ
│ │ ├─ getStatusColor.js // Mapping status -> màu
│ │ ├─ buildQueryString.js // Build query string cho filter/search
│ │ ├─ parseApiError.js // Chuẩn hóa lỗi trả về từ BE
│ │ ├─ normalizePhone.js // Chuẩn hóa số điện thoại sang định dạng +84 (E.164)
│ │ ├─ slugify.js // Chuyển đổi tên sang slug SEO-friendly
│ │ └─ downloadFile.js // Tải file/report từ response
│ │
│ ├─ config/ // Cấu hình toàn app
│ │ ├─ env.js // Đọc và chuẩn hóa biến môi trường
│ │ ├─ routes.js // Khai báo path constant
│ │ ├─ roles.js // Enum role
│ │ ├─ nav.public.js // Menu cho public/customer
│ │ ├─ nav.owner-main.js // Menu cho owner portal
│ │ ├─ nav.restaurant-workspace.js // Menu cho restaurant workspace
│ │ └─ nav.admin.js // Menu cho admin
│ │
│ ├─ constants/ // Hằng số domain
│ │ ├─ bookingStatus.js // PENDING/CONFIRMED/ARRIVED/...
│ │ ├─ paymentStatus.js // pending/completed/failed
│ │ ├─ tableStatus.js // available/unavailable/maintenance
│ │ ├─ tableTypes.js // standard/vip/outdoor
│ │ ├─ userRoles.js // CUSTOMER/RESTAURANT_OWNER/ADMIN
│ │ ├─ cuisines.js // Danh sách cuisine filter
│ │ ├─ priceRanges.js // Mapping price range 1-4
│ │ └─ restaurantStatus.js // pending, active, suspended
│ │
│ ├─ lib/ // Tầng low-level, dùng chung cho features
│ │ ├─ axios.js // Axios instance + interceptors + attach token
│ │ ├─ socket.js // Cấu hình Socket.io tập trung qua Gateway (7000) - (New)
│ │ ├─ queryClient.js // TanStack Query client
│ │ ├─ storage.js // localStorage/sessionStorage helpers
│ │ ├─ cloudinary.js // Hàm low-level upload ảnh trên Cloudinary
│ │ ├─ firebase.js // Cấu hình Firebase SDK (Auth Google)
│ │ ├─ leaflet.js // Helper config Leaflet
│ │ └─ utils.js // Các helper functions nhỏ lẻ cho lib
│ │
│ │
│ ├─ features/ // Mỗi domain là một feature riêng
│ │ ├─ auth/
│ │ │ ├─ api.js // API auth: login/register/verify/forgot
│ │ │ ├─ hooks.js // useLogin, useRegister, useVerifyOtp...
│ │ │ ├─ store.js // Auth store: token, user, session
│ │ │ ├─ schemas.js // Validate form auth
│ │ │ ├─ pages/
│ │ │ │ ├─ LoginPage.jsx // Trang đăng nhập
│ │ │ │ ├─ RegisterPage.jsx // Trang đăng ký tài khoản khách hàng
│ │ │ │ ├─ ForgotPasswordPage.jsx // Trang quên mật khẩu 2 bước: nhập Phone → OTP → nhận mật khẩu mới qua Email
│ │ │ │ ├─ OwnerJoinPage.jsx // Trang placeholder "Join with us" cho chủ nhà hàng
│ │ │ │ └─ VerifyOtpPage.jsx // Trang xác thực OTP (đăng ký) - chưa triển khai
│ │ │ └─ components/
│ │ │ ├─ LoginForm.jsx // Form đăng nhập với validation Zod
│ │ │ ├─ RegisterForm.jsx // Form đăng ký với validation Zod
│ │ │ └─ OtpForm.jsx // Form nhập OTP (đăng ký)
│ │ │
│ │ ├─ profile/
│ │ │ ├─ api.js // API profile user
│ │ │ ├─ hooks.js // Hook lấy/cập nhật profile
│ │ │ ├─ pages/
│ │ │ │ └─ ProfilePage.jsx // Trang hồ sơ cá nhân (Bento Layout)
│ │ │ └─ components/
│ │ │ ├─ ProfileSidebar.jsx // Sidebar điều hướng (New)
│ │ │ ├─ ProfileHero.jsx // Thẻ Hero định danh (New)
│ │ │ ├─ LoyaltyCard.jsx // Thẻ tích điểm màu Gold (New)
│ │ │ ├─ InfoSummary.jsx // Tổng hợp thông tin định danh (New)
│ │ │ ├─ InfoCard.jsx // Thẻ thông tin con (New)
│ │ │ ├─ RecentOrders.jsx // Danh sách đơn hàng gần nhất (Real Data) - (New)
│ │ │ ├─ SettingsForm.jsx // Thành phần Container quản lý logic cập nhật Profile
│ │ │ ├─ ProfileForm.jsx // Component UI cho biểu mẫu nhập liệu Profile (New)
│ │ │ ├─ AvatarUploader.jsx // Component UI cho việc upload/chọn avatar (New)
│ │ │ ├─ PasswordForm.jsx // Form đổi mật khẩu (New)
│ │ │ ├─ schemas.js // Schema validation cho Profile (New)
│ │ │
│ │ ├─ restaurants/
│ │ │ ├─ api.js // API list/detail/availability/menu (Kết nối qua Gateway :7000)
│ │ │ ├─ hooks.js // React Query hooks: useRestaurants, useRestaurant, useRestaurantMenu
│ │ │ ├─ pages/
│ │ │ │ ├─ RestaurantListPage.jsx // Trang khám phá nhà hàng (Real-time Filtering)
│ │ │ │ ├─ RestaurantDetailPage.jsx // Trang chi tiết: ưu tiên data MongoDB (summary) cho rating
│ │ │ │ ├─ RestaurantMenuPage.jsx // Trang thực đơn đầy đủ
│ │ │ └─ components/
│ │ │ ├─ RestaurantCard.jsx // Card dùng trong danh sách (RestaurantListPage)
│ │ │ ├─ RestaurantFilters.jsx // Bộ lọc: Location, Cuisine, Price, Rating
│ │ │ ├─ RestaurantHeader.jsx // Header tích hợp thanh Search keyword
│ │ │ ├─ RestaurantHero.jsx // Header chi tiết nhà hàng (Detail)
│ │ │ ├─ RestaurantGallery.jsx // Gallery ảnh nhà hàng (Detail)
│ │ │ ├─ RestaurantInfo.jsx // Thông tin mô tả/tiện ích/địa chỉ (Detail)
│ │ │ ├─ RestaurantMenu.jsx // Toàn bộ thực đơn (MenuPage) - click card mở MenuItemModal
│ │ │ ├─ RestaurantMenuPreview.jsx // Preview 4 món (Detail) - click card mở MenuItemModal
│ │ │ ├─ MenuItemModal.jsx // Popup chi tiết món ăn: gallery ảnh swipe, allergens, tags, prep time
│ │ │ ├─ RestaurantPolicies.jsx // Chính sách nhà hàng (Detail)
│ │ │ └─ AvailabilityPanel.jsx // Kiểm tra bàn trống & đặt bàn (Detail)
│ │ │
│ │ ├─ booking/
│ │ │ ├─ api.js // API create booking, history, detail, cancel, pay deposit
│ │ │ ├─ hooks.js // Hook booking queries/mutations
│ │ │ ├─ store.js // State tạm cho flow đặt bàn nhiều bước
│ │ │ ├─ schemas.js // Validate form booking
│ │ │ ├─ pages/
│ │ │ │ ├─ CreateBookingPage.jsx // Trang đặt bàn (Cinema Style) - (New)
│ │ │ │ ├─ BookingHistoryPage.jsx // Lịch sử booking user
│ │ │ │ └─ BookingDetailPage.jsx // Chi tiết booking
│ │ │ └─ components/
│ │ │ ├─ TableSelector.jsx // Chọn bàn kiểu rạp phim (New)
│ │ │ ├─ FloorFilter.jsx // Bộ lọc tầng/khu vực (New)
│ │ │ ├─ TimeSlotPicker.jsx // Chọn khung giờ & Ngày (Lịch tháng) - (New)
│ │ │ ├─ BookingHeader.jsx // Header trang đặt bàn (New)
│ │ │ ├─ BookingSummary.jsx // Tóm tắt đặt bàn (Sidebar) - (New)
│ │ │ ├─ BookingForm.jsx // Form nhập thông tin khách hàng (Guest/User) - (New)
│ │ │ ├─ BookingInfoSection.jsx // Chi tiết Nhà hàng/Khách/Đặt bàn (New)
│ │ │ ├─ BookingFinancialSummary.jsx // Tóm tắt tiền cọc & ghi chú (New)
│ │ │ ├─ BookingStatusTimeline.jsx // Thanh tiến trình trạng thái (New)
│ │ │ ├─ BookingQRCode.jsx // Hiển thị QR check-in (New)
│ │ │ ├─ BookingStatusBadge.jsx // Badge trạng thái booking
│ │ │ ├─ BookingCard.jsx // Thẻ hiển thị một đơn đặt bàn
│ │ │ ├─ BookingFilter.jsx // Bộ lọc tabs: Upcoming, Completed, Canceled
│ │ │ ├─ BookingEmptyState.jsx // Giao diện khi không có đơn hàng (New)
│ │ │ ├─ CapacityChecker.jsx // Kiểm tra sức chứa bàn
│ │ │ ├─ DepositSummary.jsx // Tóm tắt tiền cọc
│ │ │ └─ CancelBookingDialog.jsx // Xác nhận hủy booking
│ │ │
│ │ ├─ reviews/
│ │ │ ├─ api.js // API lấy danh sách review, tóm tắt (summary), tạo review
│ │ │ ├─ hooks.js // useRestaurantReviews, useRestaurantReviewSummary
│ │ │ ├─ pages/ // (trống - chưa có trang riêng)
│ │ │ └─ components/
│ │ │ ├─ ReviewSection.jsx // Smart Container: fetch, logic phân trang, hiển thị tổng hợp
│ │ │ ├─ ReviewForm.jsx // Form gửi đánh giá (chưa hoàn thiện)
│ │ │ ├─ ReviewCard.jsx // Thẻ hiển thị một bài đánh giá đơn lẻ
│ │ │ ├─ ReviewList.jsx // Danh sách đánh giá + Skeletons
│ │ │ └─ RatingSummary.jsx // Tổng hợp rating trung bình & Star breakdown
│ │ │
│ │ ├─ owner/
│ │ │ ├─ portal/ // Cấp tài khoản owner - Quản lý danh sách nhà hàng
│ │ │ │ ├─ api.js // API portal: list restaurants, create new, notifications
│ │ │ │ ├─ pages/
│ │ │ │ │ ├─ OwnerHomePage.jsx // Welcome page cho owner
│ │ │ │ │ ├─ OwnerRestaurantsPage.jsx // Danh sách nhà hàng của owner
│ │ │ │ │ └─ CreateRestaurantPage.jsx // Form đăng ký nhà hàng mới
│ │ │ │ └─ components/
│ │ │ │ ├─ RestaurantCard.jsx // Card hiển thị trạng thái (pending/active/suspended)
│ │ │ │ ├─ EmptyRestaurantsState.jsx // Khi owner chưa có nhà hàng
│ │ │ │ └─ RestaurantStatusBadge.jsx // Badge màu cho pending/active/suspended
│ │ │ │
│ │ │ └─ workspace/ // Cấp từng nhà hàng cụ thể (sau khi đã chọn)
│ │ │ ├─ dashboard/
│ │ │ │ ├─ api.js // API dashboard của 1 nhà hàng
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ RestaurantDashboardPage.jsx // Dashboard chi tiết 1 nhà hàng
│ │ │ │ └─ components/
│ │ │ │ ├─ RevenueChart.jsx
│ │ │ │ ├─ BookingOverviewCard.jsx
│ │ │ │ └─ WalletOverviewCard.jsx
│ │ │ │
│ │ │ ├─ restaurant-profile/
│ │ │ │ ├─ api.js
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ OwnerRestaurantProfilePage.jsx
│ │ │ │ └─ components/
│ │ │ │ ├─ RestaurantProfileForm.jsx
│ │ │ │ └─ DepositPolicyForm.jsx
│ │ │ │
│ │ │ ├─ menu/
│ │ │ │ ├─ api.js
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ OwnerMenuPage.jsx
│ │ │ │ └─ components/
│ │ │ │ ├─ MenuTable.jsx
│ │ │ │ └─ MenuItemForm.jsx
│ │ │ │
│ │ │ ├─ tables/
│ │ │ │ ├─ api.js
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ OwnerTablesPage.jsx
│ │ │ │ └─ components/
│ │ │ │ ├─ TableList.jsx
│ │ │ │ └─ TableForm.jsx
│ │ │ │
│ │ │ ├─ bookings/
│ │ │ │ ├─ api.js
│ │ │ │ ├─ pages/
│ │ │ │ │ ├─ OwnerRestaurantBookingsPage.jsx
│ │ │ │ │ └─ OwnerBookingDetailPage.jsx
│ │ │ │ └─ components/
│ │ │ │ ├─ BookingTable.jsx
│ │ │ │ └─ BookingStatusActions.jsx
│ │ │ │
│ │ │ ├─ revenue/
│ │ │ │ ├─ api.js
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ OwnerRestaurantRevenuePage.jsx
│ │ │ │ └─ components/
│ │ │ │ ├─ RevenueChart.jsx
│ │ │ │ └─ RevenueFilter.jsx
│ │ │ │
│ │ │ └─ wallet/ // Của từng nhà hàng
│ │ │ ├─ api.js // API rút tiền, lịch sử giao dịch nhà hàng
│ │ │ ├─ pages/
│ │ │ │ └─ OwnerRestaurantWalletPage.jsx
│ │ │ └─ components/
│ │ │ ├─ WalletBalanceCard.jsx
│ │ │ ├─ TransactionTable.jsx
│ │ │ └─ WithdrawalForm.jsx
│ │ │
│ │ ├─ admin/
│ │ │ ├─ dashboard/
│ │ │ │ ├─ api.js // API dashboard admin
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ AdminDashboardPage.jsx // Trang dashboard admin
│ │ │ │ └─ components/
│ │ │ │ ├─ StatsCards.jsx // Card tổng users/restaurants/bookings
│ │ │ │ ├─ RevenueChart.jsx // Biểu đồ doanh thu admin
│ │ │ │ └─ SystemSummary.jsx // Tóm tắt hệ thống
│ │ │ │
│ │ │ ├─ users/
│ │ │ │ ├─ api.js // API quản lý users/owner
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ AdminUsersPage.jsx // Trang user management
│ │ │ │ └─ components/
│ │ │ │ ├─ UserTable.jsx // Bảng người dùng
│ │ │ │ ├─ CreateOwnerForm.jsx // Form tạo tài khoản owner
│ │ │ │ └─ ResetPasswordDialog.jsx // Dialog reset mật khẩu owner
│ │ │ │
│ │ │ ├─ restaurants/
│ │ │ │ ├─ api.js // API duyệt/suspend nhà hàng
│ │ │ │ ├─ pages/
│ │ │ │ │ ├─ PendingRestaurantsPage.jsx // Danh sách nhà hàng chờ duyệt
│ │ │ │ │ └─ AdminRestaurantsPage.jsx // Danh sách tất cả nhà hàng
│ │ │ │ └─ components/
│ │ │ │ ├─ PendingRestaurantTable.jsx // Bảng pending
│ │ │ │ └─ ApproveRestaurantDialog.jsx // Dialog duyệt nhà hàng
│ │ │ │
│ │ │ ├─ bookings/
│ │ │ │ ├─ api.js // API tra cứu booking hệ thống
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ AdminBookingsPage.jsx // Trang audit booking
│ │ │ │ └─ components/
│ │ │ │ └─ BookingAuditTable.jsx // Bảng booking toàn hệ thống
│ │ │ │
│ │ │ ├─ transactions/
│ │ │ │ ├─ api.js // API tra cứu giao dịch
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ AdminTransactionsPage.jsx // Trang giao dịch toàn hệ thống
│ │ │ │ └─ components/
│ │ │ │ └─ TransactionAuditTable.jsx // Bảng audit giao dịch
│ │ │ │
│ │ │ ├─ withdrawals/
│ │ │ │ ├─ api.js // API duyệt/từ chối rút tiền
│ │ │ │ ├─ pages/
│ │ │ │ │ └─ AdminWithdrawalsPage.jsx // Trang duyệt withdrawal
│ │ │ │ └─ components/
│ │ │ │ ├─ WithdrawalTable.jsx // Bảng yêu cầu rút
│ │ │ │ └─ WithdrawalDecisionDialog.jsx // Dialog approve/reject
│ │ │ │
│ │ │ └─ commissions/
│ │ │ ├─ api.js // API đối soát commission
│ │ │ ├─ pages/
│ │ │ │ └─ CommissionSettlementPage.jsx // Trang đối soát hoa hồng
│ │ │ └─ components/
│ │ │ ├─ SettlementFilters.jsx
│ │ │ └─ SettlementResultTable.jsx
│ │ │
│ │ ├─ ai-assistant/
│ │ │ ├─ api.js // API hỏi đáp AI cho khách vãng lai & customer
│ │ │ ├─ hooks.js // usePublicAI quản lý luồng chat vãng lai
│ │ │ ├─ pages/
│ │ │ │ └─ AIAssistantPage.jsx // Trang trợ lý ảo thiết kế Premium
│ │ │ └─ components/
│ │ │ ├─ ChatBox.jsx // (Đã tích hợp vào AIAssistantPage)
│ │ │ ├─ PromptSuggestions.jsx // (Đã tích hợp vào AIAssistantPage)
│ │ │ └─ MessageBubble.jsx // (Đã tích hợp vào AIAssistantPage)
│ │ │
│ │ ├─ map/
│ │ │ ├─ api.js // API near-me/geocoding nội bộ
│ │ │ ├─ hooks.js // Hook map state, query params
│ │ │ ├─ utils/
│ │ │ │ ├─ buildPublicMapUrl.js // Build URL nhúng map public
│ │ │ │ └─ mapMessage.js // Chuẩn hóa message gửi/nhận
│ │ │ ├─ pages/
│ │ │ │ ├─ ExploreMapPage.jsx // Trang khám phá trên map
│ │ │ │ └─ RestaurantMapPage.jsx // Trang xem route đến 1 nhà hàng
│ │ │ └─ components/
│ │ │ ├─ PublicMapEmbed.jsx // Component nhúng map
│ │ │ ├─ UserLocationButton.jsx // Nút lấy vị trí
│ │ │ ├─ RoutePreviewPanel.jsx // Panel preview
│ │ │ └─ LocationPickerModal.jsx // Modal chọn điểm
│ │ │
│ │ ├─ media/
│ │ │ ├─ api.js // Gọi upload Cloudinary
│ │ │ ├─ hooks.js // useImageUpload, useMultipleUpload
│ │ │ ├─ utils/
│ │ │ │ └─ optimizeCloudinaryUrl.js // Tạo URL thumbnail/resize
│ │ │ └─ components/
│ │ │ ├─ ImageUploader.jsx // Input upload ảnh
│ │ │ ├─ ImageDropzone.jsx // Kéo-thả ảnh
│ │ │ ├─ ImagePreviewList.jsx // Preview nhiều ảnh
│ │ │ └─ CloudinaryImage.jsx // Ảnh render tối ưu
│ │ ├─ guest/
│ │ │ ├─ api.js // Lời gọi API tra cứu đơn
│ │ │ ├─ hooks.js // React Query hooks
│ │ │ ├─ pages/
│ │ │ │ └─ TrackBookingPage.jsx // Trang tra cứu đặt bàn cho khách vãng lai
│ │ │ └─ components/
│ │ │ ├─ BookingLookupForm.jsx // Form tra cứu đặt bàn
│ │ │ └─ BookingResultCard.jsx // Thẻ hiển thị kết quả đặt bàn
│ │ │
│ │ ├─ static/
│ │ │ └─ pages/
│ │ │ ├─ PolicyPage.jsx // Trang chính sách & điều khoản
│ │ │ └─ ContactPage.jsx // Trang liên hệ
│ │ │
│ │ └─ home/
│ │ ├─ pages/
│ │ │ └─ HomePage.jsx // Trang landing/home
│ │ └─ components/
│ │ ├─ HeroSection.jsx // Hero đón khách
│ │ ├─ FeaturedRestaurants.jsx // Carousel nổi bật - tự fetch & lọc review thật từ MongoDB
│ │ ├─ RestaurantCard.jsx // Card độc lập - tự đồng bộ rating MongoDB, tránh dữ liệu SQL ảo
│ │ ├─ WhyChooseUs.jsx // Các ưu điểm của hệ thống
│ │ ├─ HowItWorks.jsx // Quy trình 3 bước đặt bàn
│ │ ├─ Testimonials.jsx // Đánh giá của khách hàng tiêu biểu
│ │ └─ CTASection.jsx // Lời kêu gọi hành động (Register/App download)
│ │
│ │
│ ├─ styles/
│ │ └─ tailwind.css // Entry chính cho Tailwind + Custom CSS utilities (Glass effect, scrollbar)
│ │
│ │
│ ├─ App.jsx // Root component
│ └─ main.jsx // Entry point
│
├─ .env // Biến môi trường
├─ .env.development // Biến môi trường dev
├─ .env.production // Biến môi trường production
├─ index.html // HTML root
├─ package.json // Scripts
├─ postcss.config.js // Cấu hình PostCSS
├─ tailwind.config.js // Cấu hình Tailwind
└─ vite.config.js // Cấu hình Vite
