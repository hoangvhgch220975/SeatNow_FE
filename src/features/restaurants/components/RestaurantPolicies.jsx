import React from 'react';

/**
 * @file RestaurantPolicies.jsx
 * @description Hiển thị các chính sách nhà hàng (đặt chỗ, hủy chỗ, trang phục).
 */
const RestaurantPolicies = ({ policies }) => {
  return (
    <div className="p-8 border-2 border-primary/10 rounded-xl space-y-6 bg-surface-container-lowest">
      <h3 className="font-bold flex items-center gap-2 text-on-surface">
        <span className="material-symbols-outlined text-primary">info</span>
        Dining Policies
      </h3>
      <ul className="text-sm text-on-surface-variant space-y-3">
        {policies.map((policy, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-primary">•</span>
            <span dangerouslySetInnerHTML={{ __html: policy }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantPolicies;
