import { ROUTES } from './routes.js';

export const ADMIN_NAV = [
  { label: 'Overview Dashboard', path: ROUTES.ADMIN_DASHBOARD },
  { label: 'Users Management', path: ROUTES.ADMIN_USERS },
  { label: 'Pending Restaurants', path: ROUTES.ADMIN_RESTAURANTS_PENDING },
  { label: 'System Restaurants', path: ROUTES.ADMIN_RESTAURANTS },
  { label: 'Withdrawal Requests', path: ROUTES.ADMIN_WITHDRAWALS },
  { label: 'Reconciliation & Commissions', path: ROUTES.ADMIN_COMMISSIONS },
  { label: 'Booking Tracking', path: ROUTES.ADMIN_BOOKINGS },
  { label: 'Transaction Tracking', path: ROUTES.ADMIN_TRANSACTIONS },
  { label: 'Admin AI Analytics', path: ROUTES.ADMIN_AI_CHAT },
];
