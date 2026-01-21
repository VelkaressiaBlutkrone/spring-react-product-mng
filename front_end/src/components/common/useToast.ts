/**
 * 토스트 메시지 훅
 * Fast Refresh를 위해 컴포넌트와 분리
 */
import { useContext } from 'react';
import { ToastContext } from './ToastContext';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};