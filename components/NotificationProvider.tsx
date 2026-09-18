'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  leaving: boolean;
}

interface NotificationContextProps {
  notify: (type: NotificationType, title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotify must be used within NotificationProvider');
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const idRef = useRef(0);

  const notify = useCallback((type: NotificationType, title: string, message: string) => {
    const id = ++idRef.current;
    const newNotification: NotificationItem = { id, type, title, message, leaving: false };

    setNotifications(prev => [...prev, newNotification]);

    // 自动关闭（4秒）
    setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, leaving: true } : n));
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 300);
    }, 4000);
  }, []);

  const handleClose = useCallback((id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, leaving: true } : n));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  }, []);

  const styles = {
    success: { border: 'border-l-4 border-emerald-500', icon: <CheckCircle2 className="text-emerald-500" size={20} />, bg: 'bg-white' },
    error: { border: 'border-l-4 border-[#B41615]', icon: <XCircle className="text-[#B41615]" size={20} />, bg: 'bg-white' },
    warning: { border: 'border-l-4 border-amber-500', icon: <AlertTriangle className="text-amber-500" size={20} />, bg: 'bg-white' },
    info: { border: 'border-l-4 border-blue-500', icon: <Info className="text-blue-500" size={20} />, bg: 'bg-white' },
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      
      {/* 全局通知容器 */}
      <div className="fixed top-6 right-4 left-4 sm:left-auto sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto w-full sm:w-[400px] p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-neutral-100 flex items-start gap-3 transform transition-all duration-300 ease-out ${
              n.leaving ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
            } ${styles[n.type].border} ${styles[n.type].bg}`}
          >
            <div className="mt-0.5 flex-shrink-0">{styles[n.type].icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-neutral-900">{n.title}</h4>
                <button onClick={() => handleClose(n.id)} className="text-neutral-400 hover:text-neutral-600 transition-colors flex-shrink-0">
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed break-words">{n.message}</p>
            </div>
            {/* 自动消失进度条 */}
            <div className={`absolute bottom-0 left-0 h-0.5 ${n.type === 'error' ? 'bg-[#B41615]' : n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ animation: 'autoClose 4s linear forwards' }} />
          </div>
        ))}
      </div>
      
      {/* 注入进度条动画 */}
      <style jsx>{`
        @keyframes autoClose {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </NotificationContext.Provider>
  );
};