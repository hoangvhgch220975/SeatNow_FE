import { ROUTES } from './routes.js';

/**
 * Menu bar dành riêng cho phân hệ Workspace của một nhà hàng cụ thể.
 * Chứa Parameter [restaurantId] để linh động render menu tương ứng cho nhà hàng mình click vô
 */
export const getWorkspaceNav = (restaurantId) => [
  { label: 'Dashboard Report', path: ROUTES.WORKSPACE_DASHBOARD(restaurantId) },
  { label: 'Profile & Deposits', path: ROUTES.WORKSPACE_PROFILE(restaurantId) },
  { label: 'Menu Items', path: ROUTES.WORKSPACE_MENU(restaurantId) },
  { label: 'Table Layout Management', path: ROUTES.WORKSPACE_TABLES(restaurantId) },
  { label: 'Booking Schedule', path: ROUTES.WORKSPACE_BOOKINGS(restaurantId) },
  { label: 'Revenue Statistics', path: ROUTES.WORKSPACE_REVENUE(restaurantId) },
  { label: 'Wallet & Withdrawals', path: ROUTES.WORKSPACE_WALLET(restaurantId) },
];
