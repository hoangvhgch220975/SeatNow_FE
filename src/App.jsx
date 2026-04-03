import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './shared/components/PageTransition.jsx';

/**
 * @file App.jsx
 * @description Root Component. Đơn giản là một "vỏ bọc" Outlet cho toàn ứng dụng.
 * Tầng Layout thực tế sẽ được phân nhánh ở cấp Router.
 */
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <>
      <Toaster 
        position="top-center" 
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{
          duration: 2000,
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
