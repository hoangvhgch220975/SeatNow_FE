import { useMutation } from '@tanstack/react-query';
import { aiApi } from './api.js';
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../auth/store.js';

/**
 * @file hooks.js
 * @description Hệ thống quản lý hội thoại AI tích hợp lịch sử và phiên làm việc (Sessions) đồng bộ Redis.
 */

const STORAGE_KEY_PREFIX = 'seatnow_ai_sessions_';

export const useAIAssistant = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  // KIỂM TRA ĐỘ SẴN SÀNG CỦA AUTH
  const isAuthReady = !isAuthenticated || (isAuthenticated && user !== null);
  
  // Xác định vai trò
  const isCustomer = isAuthenticated && user?.role?.toUpperCase() === 'CUSTOMER';
  const userId = isCustomer ? (user?.id || user?._id) : 'guest';
  const displayName = user?.fullName || user?.name || 'Friend';

  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionKey, setSessionKey] = useState(null);

  /**
   * @description Đồng bộ hóa nội dung hội thoại với bản trên Redis (Ground Truth)
   * Giúp xóa bỏ tình trạng chat cũ vẫn hiện khi Redis đã bị xóa.
   */
  const syncWithServerHistory = async (targetSessionId) => {
    try {
      const response = await aiApi.getCustomerHistory();
      const serverHistory = response.data?.history || response.data || [];
      
      if (serverHistory.length > 0) {
          setChatHistory(serverHistory);
          setSessions(prev => prev.map(s => 
              s.id === targetSessionId ? { ...s, messages: serverHistory } : s
          ));
      } else {
          // NẾU REDIS RỖNG -> Xóa trắng UI theo yêu cầu người dùng
          setChatHistory(prev => [prev[0]]); // Giữ lại câu chào đầu tiên
          setSessions(prev => prev.map(s => 
              s.id === targetSessionId ? { ...s, messages: [s.messages[0]] } : s
          ));
      }
    } catch (e) {
      console.warn("[SYNC] No Redis history found for this user yet.");
    }
  };

  // 1. Load lịch sử từ localStorage khi khởi tạo
  useEffect(() => {
    if (!isAuthReady) return;

    if (!isCustomer) {
      startNewChat(true);
      return;
    }

    const key = `${STORAGE_KEY_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    let loadedSessions = [];

    if (saved) {
      try {
        loadedSessions = JSON.parse(saved);
        setSessions(loadedSessions);
      } catch (e) {
        console.error("Failed to load AI history", e);
      }
    }

    if (loadedSessions.length > 0) {
      const latest = loadedSessions[0];
      setActiveSessionId(latest.id);
      setChatHistory(latest.messages);
      
      // THỰC HIỆN ĐỒNG BỘ VỚI REDIS NGAY LÚC NÀY
      if (isCustomer) {
          syncWithServerHistory(latest.id);
      }
    } else {
      startNewChat(true);
    }
  }, [userId, isAuthReady]);

  // 2. Tự động lưu sessions vào storage
  useEffect(() => {
    if (isCustomer && sessions.length > 0) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(sessions));
    }
  }, [sessions, userId, isCustomer]);

  const updateSessionHistory = (newHistory) => {
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const firstUserMsg = newHistory.find(m => m.role === 'user')?.message;
        const newTitle = firstUserMsg ? (firstUserMsg.slice(0, 30) + '...') : 'New Conversation';
        return { ...s, messages: newHistory, title: newTitle, timestamp: new Date().toISOString() };
      }
      return s;
    }));
  };

  const startNewChat = useCallback(async (isInitial = false) => {
    if (isCustomer && !isInitial) {
      try { await aiApi.clearCustomerHistory(); } catch(e) {}
    }

    const newId = crypto.randomUUID();
    const welcomeMsg = { 
      role: 'model', 
      message: isCustomer 
        ? `Greetings ${displayName}! I am your SeatNow Executive Concierge. How may I assist you today?`
        : "Welcome! I am your AI Restaurant Concierge. How can I help you today?"
    };

    const newSession = {
      id: newId,
      title: 'New Conversation',
      messages: [welcomeMsg],
      timestamp: new Date().toISOString()
    };

    setChatHistory([welcomeMsg]);
    setActiveSessionId(newId);
    setSessionKey(null);
    
    setSessions(prev => [newSession, ...prev]);
  }, [isCustomer, displayName]);

  const loadSession = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setActiveSessionId(sessionId);
      setChatHistory(session.messages);
      // Khi load session cũ, ta nên sync lại với Redis nếu là Customer
      if (isCustomer) syncWithServerHistory(sessionId);
    }
  };

  const mutation = useMutation({
    mutationFn: async (message) => {
      let currentKey = sessionKey;
      if (isCustomer && !currentKey && userId) currentKey = `ai:customer:${userId}`;

      const res = isCustomer 
        ? await aiApi.customerChat(message, currentKey)
        : await aiApi.publicRecommend(message, currentKey);
      
      if (res?.session_key) setSessionKey(res.session_key);
      const result = res?.data?.reply || res?.recommendations || res?.reply || res?.message || res?.data || res?.content || res;
      return typeof result === 'string' ? result : JSON.stringify(result);
    },
    onSuccess: (reply) => {
      const aiMsg = { role: 'model', message: reply };
      setChatHistory(prev => {
        const newHistory = [...prev, aiMsg];
        updateSessionHistory(newHistory);
        return newHistory;
      });
    }
  });

  const addUserMessage = (message) => {
    const userMsg = { role: 'user', message };
    setChatHistory(prev => {
      const newHistory = [...prev, userMsg];
      updateSessionHistory(newHistory);
      return newHistory;
    });
  };

  const clearHistory = async () => {
    if (isCustomer) {
      try {
        await aiApi.clearCustomerHistory();
        const welcomeMsg = [
          { role: 'model', message: `Confirmed. Your memory has been reset in Redis. Ready for a new experience.` }
        ];
        setChatHistory(welcomeMsg);
        setSessions(prev => prev.map(s => 
          s.id === activeSessionId ? { ...s, messages: welcomeMsg, title: 'Blank Slate' } : s
        ));
      } catch (e) {
        console.error("Failed to clear Redis history", e);
      }
    }
  };

  /**
   * @description Xóa phiên chat và đồng bộ xóa luôn cả trên Redis
   */
  const deleteSession = async (sessionId) => {
    // 1. Xóa trên Server (Redis) - CHỈ CHO CUSTOMER
    if (isCustomer) {
      try { await aiApi.clearCustomerHistory(); } catch (e) { console.error("Redis sync deletion failed", e); }
    }

    // 2. Xóa trên UI (localStorage)
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) startNewChat(true); // Tạo chat mới hoàn toàn sạch
  };

  const recommendMutation = useMutation({
    mutationFn: (message) => aiApi.customerRecommend(message),
    onSuccess: (response) => {
      // Bóc tách dữ liệu linh hoạt (kết quả từ FastAPI có thể lồng trong .data)
      const result = response?.recommendations || response?.data?.recommendations || response?.message || response?.data || response;
      const aiResponse = typeof result === 'string' ? result : (result?.message || "No recommendations found.");
      
      const aiMsg = { role: 'model', message: aiResponse };
      setChatHistory(prev => {
         const newHistory = [...prev, aiMsg];
         updateSessionHistory(newHistory);
         return newHistory;
      });
    },
    onError: (error) => {
      console.error("[Recommend API Error]", error);
      setChatHistory(prev => [...prev, { role: 'model', message: "Sorry, I couldn't fetch recommendations right now." }]);
    }
  });

  const sendRecommend = (message) => {
    if (!message || !message.trim() || recommendMutation.isPending) return;
    addUserMessage(`✨ [Executive Search]: ${message}`);
    recommendMutation.mutate(message);
  };

  return {
    chatHistory,
    sendMessage: mutation.mutate,
    sendRecommend: sendRecommend, // Sử dụng hàm wrapper mới
    addUserMessage,
    clearHistory,
    isLoading: mutation.isPending || recommendMutation.isPending,
    isCustomer,
    sessions,
    activeSessionId,
    startNewChat,
    loadSession,
    deleteSession,
    isAuthReady 
  };
};

export const usePublicAI = () => useAIAssistant();
