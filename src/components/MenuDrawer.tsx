import React from 'react';
import { ViewTab } from '../types';
import { LOGO_URL } from '../data/mockData';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ViewTab) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Everbright" className="h-6 w-auto" />
            <span className="font-['Montserrat'] font-bold text-base text-[#0e1d29]">Everbright Uniforms</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation links */}
        <div className="p-4 flex flex-col gap-4 text-sm">
          {/* Quick navigation */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Core Sections</span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => { onNavigate('home'); onClose(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#9e2016] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span>Home Storefront</span>
              </button>
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#9e2016] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                <span>Complete Uniform Catalog</span>
              </button>
              <button
                onClick={() => { onNavigate('custom-bulk-order'); onClose(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#9e2016] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">groups_2</span>
                <span>Institutional Bulk RFQ</span>
              </button>
              <button
                onClick={() => { onNavigate('tracking'); onClose(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#9e2016] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">timeline</span>
                <span>Live Consignment Tracker</span>
              </button>
              <button
                onClick={() => { onNavigate('cart'); onClose(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#9e2016] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Shopping Cart</span>
              </button>
              <button
                onClick={() => { onNavigate('account'); onClose(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#9e2016] text-left transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                <span>Enterprise & Retail Portal</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Sectors */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Workwear Lines</span>
            <div className="flex flex-col gap-1 text-xs text-slate-600">
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="py-1.5 px-3 text-left hover:text-[#9e2016] flex items-center justify-between"
              >
                <span>1. Security Guard Sets</span>
                <span className="text-[10px] text-slate-400">48+ items</span>
              </button>
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="py-1.5 px-3 text-left hover:text-[#9e2016] flex items-center justify-between"
              >
                <span>2. Hospital Scrubs & Coats</span>
                <span className="text-[10px] text-slate-400">35+ items</span>
              </button>
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="py-1.5 px-3 text-left hover:text-[#9e2016] flex items-center justify-between"
              >
                <span>3. Hotel & Chef Coats</span>
                <span className="text-[10px] text-slate-400">42+ items</span>
              </button>
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="py-1.5 px-3 text-left hover:text-[#9e2016] flex items-center justify-between"
              >
                <span>4. High-Vis Overalls</span>
                <span className="text-[10px] text-slate-400">29+ items</span>
              </button>
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="py-1.5 px-3 text-left hover:text-[#9e2016] flex items-center justify-between"
              >
                <span>5. Corporate Blazers & Suits</span>
                <span className="text-[10px] text-slate-400">24+ items</span>
              </button>
              <button
                onClick={() => { onNavigate('catalog'); onClose(); }}
                className="py-1.5 px-3 text-left hover:text-[#9e2016] flex items-center justify-between"
              >
                <span>6. Polos & Headwear</span>
                <span className="text-[10px] text-slate-400">18+ items</span>
              </button>
            </div>
          </div>

          {/* Quick Contact & WhatsApp */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp 9876543210</span>
            </a>
            <div className="text-[11px] text-slate-500 text-center">
              ISO 9001:2015 Certified Uniform Manufacturer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
