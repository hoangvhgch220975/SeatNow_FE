/**
 * Tập trung tất cả đường dẫn navigate path vào một chỗ.
 * Tránh việc hard-code URL string rải rác.
 */
export const ROUTES = {
  // --- PUBLIC & CUSTOMER ---
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_OWNER: '/register-owner',
  VERIFY_OTP: '/verify-otp',
  FORGOT_PASSWORD: '/forgot-password',
  
  PROFILE: '/profile',
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  RESTAURANT_LIST: '/restaurants',
  RESTAURANT_DETAIL: (idOrSlug) => `/restaurants/${idOrSlug}`,
  RESTAURANT_MENU: (idOrSlug) => `/restaurants/${idOrSlug}/menu`,
  NEAR_ME: '/near-me',
  TRACK_BOOKING: '/track-booking',
  POLICIES: '/policies',
  CONTACT: '/contact',
  
  CREATE_BOOKING: (id) => `/restaurants/${id}/book`,
  BOOKING_HISTORY: '/my-bookings',
  BOOKING_DETAIL: (id) => `/my-bookings/${id}`,
  
  // --- OWNER PORTAL ---
  OWNER_HOME: '/owner',
  OWNER_RESTAURANTS: '/owner/restaurants',
  CREATE_RESTAURANT: '/owner/restaurants/new',
  
  // --- OWNER WORKSPACE (Dynamic param :restaurantId) ---
  WORKSPACE_DASHBOARD: (id) => `/owner/restaurants/${id}/dashboard`,
  WORKSPACE_PROFILE: (id) => `/owner/restaurants/${id}/profile`,
  WORKSPACE_MENU: (id) => `/owner/restaurants/${id}/menu`,
  WORKSPACE_TABLES: (id) => `/owner/restaurants/${id}/tables`,
  WORKSPACE_BOOKINGS: (id) => `/owner/restaurants/${id}/bookings`,
  WORKSPACE_REVENUE: (id) => `/owner/restaurants/${id}/revenue`,
  WORKSPACE_WALLET: (id) => `/owner/restaurants/${id}/wallet`,

  // --- ADMIN ---
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_RESTAURANTS_PENDING: '/admin/restaurants/pending',
  ADMIN_RESTAURANTS: '/admin/restaurants',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_WITHDRAWALS: '/admin/withdrawals',
  ADMIN_COMMISSIONS: '/admin/commissions',
  
  // --- AI ASSISTANT ---
  AI_CHAT: '/ai-assistant',
  ADMIN_AI_CHAT: '/admin/ai-assistant',

  // --- MAP ROUTING ---
  MAP_EXPLORE: '/map/explore',
  MAP_ROUTE: (id) => `/map/route/${id}`
};
