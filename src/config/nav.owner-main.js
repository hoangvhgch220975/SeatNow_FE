import { ROUTES } from './routes.js';

export const OWNER_MAIN_NAV = [
  { 
    label: 'owner_portal.sidebar.nav_portfolio_overview', 
    path: ROUTES.OWNER_HOME, 
    icon: 'dashboard' 
  },
  { 
    label: 'owner_portal.sidebar.nav_all_venues', 
    path: ROUTES.OWNER_RESTAURANTS, 
    icon: 'storefront' 
  },
  { 
    label: 'owner_portal.sidebar.nav_global_analytics', 
    path: ROUTES.OWNER_ANALYTICS, 
    icon: 'analytics',
  },
];
