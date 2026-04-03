Giữ nguyên gần như toàn bộ:

public, assets, shared, config, constants, lib

auth, profile, restaurants, booking, reviews, map, media, home

phần admin cơ bản vẫn ổn

Cần sửa mạnh nhất:

shared/layout/OwnerLayout.jsx

shared/layout/SidebarOwner.jsx

toàn bộ features/owner/*

features/wallet/* nếu bám đúng BE là customer không có wallet, chỉ restaurant có wallet riêng và admin có logic tài chính riêng.

Cái chưa khớp với flow BE hiện tại

Structure hiện tại của bạn đang ngầm hiểu owner side kiểu:

owner vào là có dashboard

owner quản lý một restaurant context khá trực tiếp

Trong khi flow BE thật của bạn là:

owner đăng ký tài khoản

login vào owner side có thể chưa có nhà hàng

owner tạo nhà hàng

admin duyệt

owner có thể có nhiều nhà hàng

mỗi nhà hàng có ví riêng

dashboard từng nhà hàng giống nhau

=> vậy FE phải có 2 lớp rõ ràng:

1) Lớp owner account portal

Dành cho:

owner home

nhà hàng của tôi

tạo nhà hàng mới

trạng thái chờ duyệt / bị từ chối

thông báo, hồ sơ owner

2) Lớp restaurant workspace

Dành cho từng nhà hàng cụ thể:

dashboard

profile

menu

tables

bookings

revenue

wallet

Structure hiện tại của bạn chưa tách 2 lớp này đủ rõ.

Những chỗ mình khuyên sửa
1) Tách OwnerLayout thành 2 layout

Hiện tại bạn đang có:

shared/layout/OwnerLayout.jsx

shared/layout/SidebarOwner.jsx

Cách này hơi chung chung, chưa phản ánh multi-restaurant owner.

Nên đổi thành:
shared/layout/
  OwnerMainLayout.jsx              // layout cấp tài khoản owner
  RestaurantWorkspaceLayout.jsx    // layout khi owner đã chọn 1 nhà hàng
  SidebarOwnerMain.jsx             // sidebar cho owner portal
  SidebarRestaurantWorkspace.jsx   // sidebar cho workspace nhà hàng
  OwnerTopbar.jsx
  RestaurantTopbar.jsx
Vì sao?

Vì:

owner portal và restaurant workspace là 2 ngữ cảnh khác nhau

menu khác nhau

topbar khác nhau

restaurant workspace cần có restaurant switcher

2) Tách lại features/owner

Hiện tại features/owner của bạn đang là:

dashboard

restaurant-profile

menu

tables

bookings

revenue

Cách này hợp với case “1 owner ~ 1 restaurant”, nhưng với case của bạn thì nên tách rõ owner-level và restaurant-level.

Nên đổi thành:
features/owner/
  portal/                          // cấp tài khoản owner
    api.js
    pages/
      OwnerHomePage.jsx
      OwnerRestaurantsPage.jsx
      CreateRestaurantPage.jsx
      OwnerNotificationsPage.jsx
      OwnerAccountPage.jsx
    components/
      OwnerWelcomeCard.jsx
      RestaurantCard.jsx
      PendingApprovalCard.jsx
      RejectedRestaurantCard.jsx
      RestaurantStatusBadge.jsx

  workspace/                       // cấp từng nhà hàng
    dashboard/
      api.js
      pages/
        RestaurantDashboardPage.jsx
      components/
        RevenueChart.jsx
        BookingOverviewCard.jsx
        WalletOverviewCard.jsx

    restaurant-profile/
      api.js
      pages/
        OwnerRestaurantProfilePage.jsx
      components/
        RestaurantProfileForm.jsx
        DepositPolicyForm.jsx

    menu/
      api.js
      pages/
        OwnerMenuPage.jsx
      components/
        MenuTable.jsx
        MenuItemForm.jsx
        MenuItemModal.jsx

    tables/
      api.js
      pages/
        OwnerTablesPage.jsx
      components/
        TableList.jsx
        TableForm.jsx
        TableCard.jsx
        TableLayoutEditor.jsx

    bookings/
      api.js
      pages/
        OwnerRestaurantBookingsPage.jsx
        OwnerBookingDetailPage.jsx
      components/
        BookingTable.jsx
        BookingStatusActions.jsx
        BookingFilters.jsx

    revenue/
      api.js
      pages/
        OwnerRestaurantRevenuePage.jsx
      components/
        RevenueFilter.jsx
        RevenueChart.jsx
        RevenueSummaryCards.jsx

    wallet/
      api.js
      pages/
        OwnerRestaurantWalletPage.jsx
      components/
        WalletBalanceCard.jsx
        TransactionTable.jsx
        WithdrawalForm.jsx

    shared/
      components/
        RestaurantSwitcher.jsx
        RestaurantContextHeader.jsx
Điểm quan trọng:

portal/ = nơi quản lý danh sách các nhà hàng

workspace/ = nơi quản trị 1 nhà hàng cụ thể

dashboard hiện tại của bạn nhiều khả năng chỉ cần đổi tên từ OwnerDashboardPage thành RestaurantDashboardPage

3) features/wallet nên xem lại

Hiện bạn đang có features/wallet/ khá generic như thể ví là 1 tính năng chung cho user.

Nhưng theo flow BE bạn mô tả trước đó:

customer không có wallet

restaurant có wallet riêng

admin có logic commission / giao dịch / withdrawal

=> mình khuyên:

Nếu bám đúng BE:

Bỏ features/wallet ở cấp global
và chuyển thành:

features/owner/workspace/wallet/
features/admin/transactions/
features/admin/withdrawals/
features/admin/commissions/
Hoặc nếu vẫn muốn dùng reusable UI:

thì giữ component chung ở:

shared/finance/

rồi từng feature gọi lại.

Tóm lại:

features/wallet/ như hiện tại là hơi lệch nghiệp vụ nếu customer không có ví.

4) Thêm owner states pages / components

Structure hiện tại chưa thấy rõ các màn hình cho:

owner chưa có nhà hàng

nhà hàng pending approval

nhà hàng rejected

nhà hàng suspended

Trong BE flow của bạn, đây là những trạng thái rất quan trọng. Nên thêm.

Tối thiểu nên có:
features/owner/portal/components/
  EmptyRestaurantsState.jsx
  PendingApprovalCard.jsx
  RejectedRestaurantCard.jsx
  SuspendedRestaurantCard.jsx
5) Route naming nên chỉnh

Hiện naming kiểu:

OwnerDashboardPage.jsx

OwnerRevenuePage.jsx

OwnerBookingsPage.jsx

dễ khiến codebase hiểu rằng đây là trang ở cấp owner account. Nhưng thực ra chúng là trang của 1 restaurant cụ thể.

Nên đổi tên rõ hơn:

OwnerDashboardPage → RestaurantDashboardPage

OwnerRevenuePage → OwnerRestaurantRevenuePage

OwnerBookingsPage → OwnerRestaurantBookingsPage

Để sau này không loạn scope.

6) nav.config.js cũng nên tách

Hiện bạn có 1 file nav.config.js. Với mô hình mới, menu owner không còn chỉ một loại nữa.

Nên tách:
config/
  nav.public.js
  nav.owner-main.js
  nav.restaurant-workspace.js
  nav.admin.js

Như vậy:

owner portal menu và restaurant workspace menu sẽ không lẫn nhau.

Bản structure mình khuyên chỉnh lại

Dưới đây là phiên bản rút gọn, chỉ tập trung vào phần cần sửa:

src/
  shared/
    layout/
      MainLayout.jsx
      AuthLayout.jsx
      CustomerLayout.jsx
      OwnerMainLayout.jsx
      RestaurantWorkspaceLayout.jsx
      AdminLayout.jsx
      Navbar.jsx
      Footer.jsx
      SidebarOwnerMain.jsx
      SidebarRestaurantWorkspace.jsx
      SidebarAdmin.jsx
      OwnerTopbar.jsx
      RestaurantTopbar.jsx
      AdminTopbar.jsx

  config/
    nav.public.js
    nav.owner-main.js
    nav.restaurant-workspace.js
    nav.admin.js

  features/
    owner/
      portal/
        api.js
        pages/
          OwnerHomePage.jsx
          OwnerRestaurantsPage.jsx
          CreateRestaurantPage.jsx
          OwnerNotificationsPage.jsx
          OwnerAccountPage.jsx
        components/
          OwnerWelcomeCard.jsx
          RestaurantCard.jsx
          PendingApprovalCard.jsx
          SuspendedRestaurantCard.jsx
          EmptyRestaurantsState.jsx
          RestaurantStatusBadge.jsx

      workspace/
        shared/
          components/
            RestaurantSwitcher.jsx
            RestaurantContextHeader.jsx

        dashboard/
          api.js
          pages/
            RestaurantDashboardPage.jsx

        restaurant-profile/
          api.js
          pages/
            OwnerRestaurantProfilePage.jsx

        menu/
          api.js
          pages/
            OwnerMenuPage.jsx

        tables/
          api.js
          pages/
            OwnerTablesPage.jsx

        bookings/
          api.js
          pages/
            OwnerRestaurantBookingsPage.jsx
            OwnerBookingDetailPage.jsx

        revenue/
          api.js
          pages/
            OwnerRestaurantRevenuePage.jsx

        wallet/
          api.js
          pages/
            OwnerRestaurantWalletPage.jsx


Chốt ngắn gọn
Không cần đập đi làm lại

Structure hiện tại đủ tốt để tiếp tục.

Nhưng nên sửa 4 điểm chính

OwnerLayout → tách thành OwnerMainLayout và RestaurantWorkspaceLayout

features/owner → tách thành portal và workspace

features/wallet → bỏ hoàn toàn ở cấp global (vì customer không có ví), chuyển vào features/owner/workspace/wallet. Admin quản lý tài chính tại features/admin/*.

đổi tên các page owner hiện tại để phản ánh đúng scope “restaurant-level”

Status nhà hàng chỉ bao gồm: pending, active, suspended.

Mức độ ưu tiên

Nên sửa ngay trước khi code sâu phần owner UI, vì càng để lâu càng dễ loạn route, layout, state, breadcrumb, nav.

Nếu bạn muốn, mình sẽ viết tiếp cho bạn bản structure hoàn chỉnh full cây thư mục sau khi đã chỉnh owner multi-restaurant, có comment ngay bên cạnh từng file luôn.