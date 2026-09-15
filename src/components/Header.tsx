import React from 'react';
import { ViewTab } from '../types';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: ViewTab;
  onNavigate: (tab: ViewTab) => void;
  cartCount: number;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  cartCount,
  onOpenMenu
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#9e2016] text-white py-1.5 px-4 shadow-sm flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="material-symbols-outlined text-[15px] text-[#ffdad5] shrink-0">local_shipping</span>
          <p className="font-medium truncate text-[11px]">
            Pan-India Delivery <span className="opacity-60 mx-1">|</span> Bulk Discounts Up to 40% <span className="opacity-60 mx-1">|</span> Direct Support:{' '}
            <a className="underline font-semibold tracking-wide" href="tel:9876543210">9876543210</a>
          </p>
        </div>
        <span className="inline-flex items-center text-[10px] font-bold uppercase bg-[#c0392b] text-[#ffe5e1] px-2 py-0.5 rounded-full shrink-0">
          GST Ready
        </span>
      </div>

      {/* Main App Bar */}
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            id="mobile-menu-btn"
            aria-label="Menu"
            onClick={onOpenMenu}
            className="w-10 h-10 flex items-center justify-center text-[#0e1d29] hover:text-[#9e2016] rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <button
            id="header-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 text-left cursor-pointer"
          >
            <img
              alt="Everbright Uniform Logo"
              className="h-7 w-auto object-contain"
              src={LOGO_URL}
            />
            <span className="font-['Montserrat'] font-bold text-lg tracking-tight text-[#0e1d29] ml-1">
              Everbright
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="header-search-btn"
            aria-label="Search catalog"
            onClick={() => onNavigate('catalog')}
            className="w-10 h-10 flex items-center justify-center text-[#0e1d29] hover:text-[#9e2016] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            id="header-cart-btn"
            aria-label="Cart"
            onClick={() => onNavigate('cart')}
            className="relative w-10 h-10 flex items-center justify-center text-[#0e1d29] hover:text-[#9e2016] transition-colors"
          >
            <span className="material-symbols-outlined text-[23px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-[#9e2016] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            id="header-account-btn"
            aria-label="User Account"
            onClick={() => onNavigate('account')}
            className="w-8 h-8 rounded-full bg-[#9e2016] flex items-center justify-center text-white hover:bg-[#c0392b] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
