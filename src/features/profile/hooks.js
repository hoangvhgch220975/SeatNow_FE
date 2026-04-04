import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api.js';

/**
 * @file hooks.js
 * @description Quản lý dữ liệu người dùng tích hợp React Query.
 */

export const useProfileQuery = () => {
    return useQuery({
        queryKey: ['profile', 'me'],
        queryFn: async () => {
            try {
                const response = await profileApi.getMe();
                // Axios trả về body trong .data. Backend trả về User trong .data.data
                const userData = response.data?.data || response.data || response;
                return userData;
            } catch (error) {
                console.error("%c[🔍 PROFILE FETCH FAILED]", "color: white; background: #e74c3c; padding: 2px;", {
                    status: error.response?.status,
                    url: error.config?.url,
                    data: error.response?.data
                });
                throw error;
            }
        },
        retry: 1, // Chỉ thử lại 1 lần nếu lỗi 401 để kích hoạt refresh logic
        staleTime: 5 * 60 * 1000, // Cache dữ liệu trong 5 phút
    });
};
