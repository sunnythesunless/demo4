import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#0e1d29] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs border border-slate-700 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#117A65] text-[18px]">verified</span>
          <span className="font-medium leading-tight">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
