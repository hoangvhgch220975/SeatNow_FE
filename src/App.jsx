import React, { useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import PageTransition from './shared/components/PageTransition.jsx';
import { useAuthStore } from './features/auth/store';

/**
 * @file App.jsx
 * @description Root Component. Quản lý các sự kiện toàn cục và chuyển cảnh trang.
 */

function App() {
  const location = useLocation();
  const element = useOutlet();
  const { logout } = useAuthStore();

  // ✅ Lắng nghe sự kiện Logout tự động khi Token hết hạn (phát ra từ axios interceptor)
  useEffect(() => {
    const handleUnauthorized = () => {
      console.warn('⚠️ [Session] Token expired or invalid. Redirecting to login...');
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [logout]);

  return (
    <>
      <Toaster 
        position="top-center" 
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{
          duration: 5000, // Mặc định 5s cho các thông báo chung
          success: {
            duration: 2000, // 2s cho thông báo thành công
          },
          error: {
            duration: 2000, // 2s cho thông báo thất bại
          },
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {element && (
          <PageTransition key={location.pathname}>
            {element}
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
