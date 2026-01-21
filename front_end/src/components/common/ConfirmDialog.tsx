/**
 * 확인 다이얼로그 컴포넌트
 */
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'default';
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  variant = 'default',
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmButtonClass =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700'
      : 'bg-blue-600 hover:bg-blue-700';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md text-white ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
