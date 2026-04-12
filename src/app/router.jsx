import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../config/routes.js';
import App from '../App.jsx';
import ErrorPage from '../shared/components/ErrorPage.jsx';
import MainLayout from '../shared/layout/MainLayout.jsx';
import HomePage from '../features/home/pages/HomePage.jsx';
import RestaurantListPage from '../features/restaurants/pages/RestaurantListPage.jsx';
import RestaurantDetailPage from '../features/restaurants/pages/RestaurantDetailPage.jsx';
import RestaurantMenuPage from '../features/restaurants/pages/RestaurantMenuPage.jsx';
import TrackBookingPage from '../features/guest/pages/TrackBookingPage.jsx';
import PolicyPage from '../features/static/pages/PolicyPage.jsx';
import ContactPage from '../features/static/pages/ContactPage.jsx';
import AuthLayout from '../shared/layout/AuthLayout.jsx';
import AdminLayout from '../shared/layout/AdminLayout.jsx';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import RegisterPage from '../features/auth/pages/RegisterPage.jsx';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage.jsx';
import OwnerJoinPage from '../features/auth/pages/OwnerJoinPage.jsx';
import AIAssistantPage from '../features/ai-assistant/pages/AIAssistantPage.jsx';
import CustomerLayout from '../shared/layout/CustomerLayout.jsx';
import ProfilePage from '../features/profile/pages/ProfilePage.jsx';
import OwnerProfilePage from '../features/profile/pages/OwnerProfilePage.jsx';
import BookingHistoryPage from '../features/booking/pages/BookingHistoryPage.jsx';
import BookingDetailPage from '../features/booking/pages/BookingDetailPage.jsx';
import CreateBookingPage from '../features/booking/pages/CreateBookingPage.jsx';
import OwnerMainLayout from '../shared/layout/OwnerMainLayout.jsx';
import OwnerHomePage from '../features/owner/portal/pages/OwnerHomePage.jsx';
import OwnerRestaurantsPage from '../features/owner/portal/pages/OwnerRestaurantsPage.jsx';
import GlobalAnalyticsPage from '../features/owner/portal/pages/GlobalAnalyticsPage.jsx';
import CreateRestaurantPage from '../features/owner/portal/pages/CreateRestaurantPage.jsx';
import PartnerPolicyPage from '../features/static/pages/PartnerPolicyPage.jsx';
import RestaurantWorkspaceLayout from '../shared/layout/RestaurantWorkspaceLayout.jsx';
import RestaurantWorkspaceDashboard from '../features/owner/workspace/dashboard/pages/OwnerDashboardPage.jsx';
import OwnerRestaurantProfilePage from '../features/owner/workspace/restaurant-profile/pages/OwnerRestaurantProfilePage.jsx';
import OwnerMenuPage from '../features/owner/workspace/menu/pages/OwnerMenuPage.jsx';
import OwnerTablesPage from '../features/owner/workspace/tables/pages/OwnerTablesPage.jsx';
import OwnerBookingsPage from '../features/owner/workspace/bookings/pages/OwnerBookingsPage.jsx';


/**
 * Cấu trúc Routing Router cấp Root của toàn App 
 * Áp dụng Data Router setup mới nhất của React-Router v7
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root Shell (chứa Outlet gốc)
    errorElement: <ErrorPage />, // Trang xử lý lỗi toàn cục
    children: [
      {
        /* 
          LAYOUT CHO NGƯỜI DÙNG VÃNG LAI (PUBLIC)
          Bao gồm Navbar và Footer chuẩn cho Guest/Customer vãng lai
        */
        element: <MainLayout />, 
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ROUTES.RESTAURANT_LIST,
            element: <RestaurantListPage />,
          },
          {
            path: '/restaurants/:idOrSlug',
            element: <RestaurantDetailPage />,
          },
          {
            path: '/restaurants/:idOrSlug/booking',
            element: <CreateBookingPage />,
          },
          {
            path: '/restaurants/:idOrSlug/menu',
            element: <RestaurantMenuPage />,
          },
          {
            path: ROUTES.AI_CHAT,
            element: <AIAssistantPage />,
          },
          {
            path: ROUTES.TRACK_BOOKING,
            element: <TrackBookingPage />,
          },
          {
            path: ROUTES.POLICIES,
            element: <PolicyPage />,
          },
          {
            path: ROUTES.CONTACT,
            element: <ContactPage />,
          },
          {
            path: ROUTES.OWNER_JOIN,
            element: <OwnerJoinPage />,
          },
        ],
      },
      {
        /* 
          LAYOUT CHO CÁC TRANG XÁC THỰC (AUTH)
          Sử dụng nền Mesh và giao diện tối giản riêng biệt
        */
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTES.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: ROUTES.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
        ]
      },
      {
        /* 
          LAYOUT CHO CUSTOMER (LOGGED-IN)
          Sử dụng Navbar hiện đại từ thiết kế mới
        */
        element: <CustomerLayout />,
        children: [
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: ROUTES.BOOKING_HISTORY,
            element: <BookingHistoryPage />,
          },
          {
            path: '/my-bookings/:id',
            element: <BookingDetailPage />,
          },

          // Có thể thêm các trang như Wallet, Settings ở đây sau này
        ]
      },
      {
        /* 
          LAYOUT CHO OWNER (QUẢN LÝ DANH MỤC)
          Dành cho chủ nhà hàng truy cập PORTAL tổng thể.
        */
        element: <OwnerMainLayout />,
        children: [
          {
            path: ROUTES.OWNER_HOME,
            element: <OwnerHomePage />,
          },
          {
            path: ROUTES.OWNER_PROFILE,
            element: <OwnerProfilePage />,
          },
          {
            path: ROUTES.OWNER_RESTAURANTS,
            element: <OwnerRestaurantsPage />,
          },
          {
            path: ROUTES.OWNER_ANALYTICS,
            element: <GlobalAnalyticsPage />,
          },
          {
            path: ROUTES.OWNER_POLICIES,
            element: <PartnerPolicyPage />,
          },
          {
            path: ROUTES.CREATE_RESTAURANT,
            element: <CreateRestaurantPage />,
          },
        ]
      },
      {
        /* 
          LAYOUT CHO RESTAURANT WORKSPACE (QUẢN LÝ TỪNG NHÀ HÀNG)
          Dành cho chủ nhà hàng truy cập không gian quản lý chi tiết cho 1 cơ sở cụ thể.
        */
        element: <RestaurantWorkspaceLayout />,
        children: [
          {
            // WORKSPACE_DASHBOARD: (idOrSlug) => `/owner/restaurants/${idOrSlug}/dashboard`
            path: ROUTES.WORKSPACE_DASHBOARD(':idOrSlug'),
            element: <RestaurantWorkspaceDashboard />,
          },
          // WORKSPACE_PROFILE: (idOrSlug) => `/owner/restaurants/${idOrSlug}/profile`
          {
            path: ROUTES.WORKSPACE_PROFILE(':idOrSlug'),
            element: <OwnerRestaurantProfilePage />,
          },
          // WORKSPACE_MENU: (idOrSlug) => `/owner/restaurants/${idOrSlug}/menu`
          {
            path: ROUTES.WORKSPACE_MENU(':idOrSlug'),
            element: <OwnerMenuPage />,
          },
          // WORKSPACE_TABLES: (idOrSlug) => `/owner/restaurants/${idOrSlug}/tables`
          {
            path: ROUTES.WORKSPACE_TABLES(':idOrSlug'),
            element: <OwnerTablesPage />,
          },
          {
            // WORKSPACE_BOOKINGS: (idOrSlug) => `/owner/restaurants/${idOrSlug}/bookings`
            path: ROUTES.WORKSPACE_BOOKINGS(':idOrSlug'),
            element: <OwnerBookingsPage />,
          },
          // Các route con khác của workspace sẽ thêm tại đây
        ]
      },
      {
        /* 
          LAYOUT CHO ADMIN (QUẢN TRỊ VIÊN)
          Dành cho Root Admin truy cập hệ thống quản trị trung tâm.
        */
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.ADMIN_DASHBOARD,
            element: <AdminDashboardPage />,
          },
        ]
      },
    ],
  },
  {
    path: '*',
    element: <div className="text-center p-20 text-xl">404 - Not Found</div>
  }
]);
