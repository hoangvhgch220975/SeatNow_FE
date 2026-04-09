import React from 'react';
import { Outlet, useParams } from 'react-router';
import SidebarRestaurantWorkspace from './SidebarRestaurantWorkspace';
import RestaurantTopbar from './RestaurantTopbar';
import { useWorkspaceDashboard } from '@/features/owner/workspace/dashboard/hooks';

/**
 * @file RestaurantWorkspaceLayout.jsx
 * @description Layout chính cho không gian làm việc của từng nhà hàng (Workspace).
 * Chứa Sidebar và Topbar chung, quản lý trạng thái tải thông tin nhà hàng.
 */
const RestaurantWorkspaceLayout = () => {
  const { idOrSlug } = useParams();
  
  // Lấy thông tin cơ bản của nhà hàng để hiển thị trên Sidebar/Topbar
  const { restaurant, isLoading } = useWorkspaceDashboard(idOrSlug);

  return (
    <div className="min-h-screen bg-slate-50 flex font-body">
      {/* Sidebar cố định bên trái */}
      <SidebarRestaurantWorkspace 
        restaurantName={restaurant?.name} 
        isLoading={isLoading} 
      />

      {/* Vùng nội dung chính bên phải */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* Topbar cố định bên trên */}
        <RestaurantTopbar 
          restaurantName={restaurant?.name} 
          isLoading={isLoading} 
        />

        {/* Nội dung trang thay đổi theo route */}
        <main className="flex-1 pt-28 px-8 pb-12">
          {/* Outlet render các trang con (Overview, Profile, v.v.) */}
          <Outlet context={{ restaurant, isLoading }} />
        </main>
      </div>
    </div>
  );
};

export default RestaurantWorkspaceLayout;
