import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

// Cấu hình Đa Ngôn Ngữ (i18n) - Phải import trước khi render (Vietnamese comment)
import './lib/i18n.js';

// Root CSS: import tailwind entry which includes base styles
import './styles/tailwind.css';

// Context Providers global
import { AppProviders } from './app/providers.jsx';

// Data Router Instance
import { router } from './app/router.jsx';

/**
 * 🚀 Entry file của ứng dụng. Render ra DOM
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
