import React from 'react';
import { ViewTab } from '../types';

interface BottomNavProps {
  currentTab: ViewTab;
  onNavigate: (tab: ViewTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  cartCount
}) => {
  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <a
        id="floating-whatsapp-btn"
        aria-label="WhatsApp Support"
        href="https://wa.me/919876543210?text=Hello%20Everbright%20Uniforms%2C%20I%20am%20interested%20in%20workwear%20and%20institutional%20procurement."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-20 z-40 w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[26px]">chat</span>
      </a>

      {/* Bottom Bar Navigation */}
      <nav
        id="app-bottom-nav"
        className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]"
      >
        <div className="flex justify-around items-center h-14 px-1 max-w-lg mx-auto">
          {/* Home */}
          <button
            id="nav-home-btn"
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-11 transition-colors duration-150 ${
              currentTab === 'home'
                ? 'text-[#9e2016] font-semibold'
                : 'text-slate-500 hover:text-[#9e2016]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[21px]"
              style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
            >
              storefront
            </span>
            <span className="text-[11px] leading-tight">Home</span>
          </button>

          {/* Catalog */}
          <button
            id="nav-catalog-btn"
            onClick={() => onNavigate('catalog')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-11 transition-colors duration-150 ${
              currentTab === 'catalog' || currentTab === 'product-detail'
                ? 'text-[#9e2016] font-semibold'
                : 'text-slate-500 hover:text-[#9e2016]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[21px]"
              style={{ fontVariationSettings: currentTab === 'catalog' || currentTab === 'product-detail' ? "'FILL' 1" : "'FILL' 0" }}
            >
              inventory_2
            </span>
            <span className="text-[11px] leading-tight">Products</span>
          </button>

          {/* Bulk Order */}
          <button
            id="nav-bulk-order-btn"
            onClick={() => onNavigate('custom-bulk-order')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-11 transition-colors duration-150 ${
              currentTab === 'custom-bulk-order'
                ? 'text-[#9e2016] font-semibold'
                : 'text-slate-500 hover:text-[#9e2016]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[21px]"
              style={{ fontVariationSettings: currentTab === 'custom-bulk-order' ? "'FILL' 1" : "'FILL' 0" }}
            >
              groups_2
            </span>
            <span className="text-[11px] leading-tight">Bulk Order</span>
          </button>

          {/* Cart */}
          <button
            id="nav-cart-btn"
            onClick={() => onNavigate('cart')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-11 transition-colors duration-150 ${
              currentTab === 'cart' || currentTab === 'checkout' || currentTab === 'order-confirmation'
                ? 'text-[#9e2016] font-semibold'
                : 'text-slate-500 hover:text-[#9e2016]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[21px]"
                style={{ fontVariationSettings: currentTab === 'cart' ? "'FILL' 1" : "'FILL' 0" }}
              >
                shopping_bag
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#9e2016] text-white font-bold text-[9px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center leading-none px-0.5">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-tight">Cart</span>
          </button>

          {/* Account */}
          <button
            id="nav-account-btn"
            onClick={() => onNavigate('account')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-11 transition-colors duration-150 ${
              currentTab === 'account' || currentTab === 'tracking'
                ? 'text-[#9e2016] font-semibold'
                : 'text-slate-500 hover:text-[#9e2016]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[21px]"
              style={{ fontVariationSettings: currentTab === 'account' ? "'FILL' 1" : "'FILL' 0" }}
            >
              account_circle
            </span>
            <span className="text-[11px] leading-tight">Account</span>
          </button>
        </div>
      </nav>
    </>
  );
};
