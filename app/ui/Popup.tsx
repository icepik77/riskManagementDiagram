// components/Popup.tsx
import React from 'react';

interface PopupProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = ({ title, onClose, onConfirm, isOpen }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
      <div className={`bg-white p-6 rounded shadow-md ${isOpen ? 'animate-scaleIn' : 'animate-scaleOut'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="mb-4">
          {/* Дополнительный контент по необходимости */}
        </div>
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded`}
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            className={`px-4 py-2 ml-10 bg-purple-600 hover:bg-green-600 text-white font-semibold rounded`}
            onClick={onConfirm}
          >
            Подтвердить
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes scaleOut {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(0);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-in-out;
        }

        .animate-scaleOut {
          animation: scaleOut 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Popup;
