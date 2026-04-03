import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../config/routes.js';
import App from '../App.jsx';
import MainLayout from '../shared/layout/MainLayout.jsx';
import HomePage from '../features/home/pages/HomePage.jsx';
import RestaurantListPage from '../features/restaurants/pages/RestaurantListPage.jsx';
import RestaurantDetailPage from '../features/restaurants/pages/RestaurantDetailPage.jsx';
import RestaurantMenuPage from '../features/restaurants/pages/RestaurantMenuPage.jsx';
import TrackBookingPage from '../features/guest/pages/TrackBookingPage.jsx';
import PolicyPage from '../features/static/pages/PolicyPage.jsx';
import ContactPage from '../features/static/pages/ContactPage.jsx';
import AuthLayout from '../shared/layout/AuthLayout.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import RegisterPage from '../features/auth/pages/RegisterPage.jsx';
import CustomerDashboard from '../features/dashboard/pages/CustomerDashboard.jsx';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage.jsx';

/**
 * Cấu trúc Routing Router cấp Root của toàn App 
 * Áp dụng Data Router setup mới nhất của React-Router v7
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root Shell (chứa Outlet gốc)
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
            path: '/restaurants/:idOrSlug/menu',
            element: <RestaurantMenuPage />,
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
            path: ROUTES.CUSTOMER_DASHBOARD,
            element: <CustomerDashboard />,
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
      // { element: <CustomerLayout />, children: [...] } // Layout cho Customer portal sẽ thêm sau
      // { element: <OwnerLayout />, children: [...] } // Layout cho Owner portal sẽ thêm sau
      // { element: <AdminLayout />, children: [...] } // Layout cho Admin dashboard sẽ thêm sau
    ],
  },
  {
    path: '*',
    element: <div className="text-center p-20 text-xl">404 - Not Found</div>
  }
]);
