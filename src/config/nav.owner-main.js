import { ROUTES } from './routes.js';

export const OWNER_MAIN_NAV = [
  { 
    label: 'Portfolio Overview', 
    path: ROUTES.OWNER_HOME, 
    icon: 'dashboard' 
  },
  { 
    label: 'All Venues', 
    path: ROUTES.OWNER_RESTAURANTS, 
    icon: 'storefront' 
  },
  { 
    label: 'Global Analytics', 
    path: ROUTES.OWNER_ANALYTICS, 
    icon: 'analytics',
  },
];
