import React, { useState } from 'react';
import { CartItem, ViewTab } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onRestoreDemoCart: () => void;
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (msg: string) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  gstin: string;
  companyName: string;
  onUpdateGstInfo: (gstin: string, company: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onRestoreDemoCart,
  onNavigate,
  onShowToast,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  gstin,
  companyName,
  onUpdateGstInfo
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [isGstExpanded, setIsGstExpanded] = useState(!!gstin);
  const [localGstin, setLocalGstin] = useState(gstin);
  const [localCompany, setLocalCompany] = useState(companyName);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountRate = appliedCoupon ? 0.1 : 0; // 10% coupon discount
  const discountAmount = Math.round(subtotal * discountRate);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.12); // 12% GST
  const grandTotal = taxableAmount + gstAmount;

  const totalPieces = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (couponInput.toUpperCase() === 'BULK10' || couponInput.toUpperCase() === 'EVERBRIGHT') {
      onApplyCoupon(couponInput.toUpperCase());
      onShowToast(`Coupon ${couponInput.toUpperCase()} applied: 10% Off!`);
      setCouponInput('');
    } else {
      onShowToast('Invalid coupon code. Try code "BULK10"');
    }
  };

  const handleSaveGst = () => {
    onUpdateGstInfo(localGstin, localCompany);
    onShowToast('✓ GST & Legal Entity details verified for Tax Invoice');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pb-20">
        <div className="w-20 h-20 rounded-full bg-[#ecf4ff] flex items-center justify-center text-[#2f6388] mb-3">
          <span className="material-symbols-outlined text-[40px]">shopping_bag</span>
        </div>
        <h2 className="font-['Montserrat'] font-bold text-lg text-[#0e1d29] mb-1">Your Uniform Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-xs mb-5">
          Select uniforms from our catalog or restore sample institutional procurement items to test the checkout flow.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-5 py-2.5 bg-[#9e2016] text-white rounded text-xs font-bold shadow-sm active:scale-95"
          >
            Explore Catalog
          </button>
          <button
            onClick={onRestoreDemoCart}
            className="px-5 py-2.5 bg-white text-[#2f6388] border border-[#a3d4fe] rounded text-xs font-bold hover:bg-[#ecf4ff]"
          >
            Restore Demo Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Free Shipping Meter Banner */}
      <div className="bg-[#E8F8F5] px-4 py-2.5 border-b border-[#A3E4D7] flex items-center justify-between text-xs text-[#117A65]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span className="font-semibold">Pan-India Express Freight: <strong>FREE</strong> for this order</span>
        </div>
        <span className="font-bold text-[11px] bg-[#A3E4D7]/50 px-2 py-0.5 rounded">100% Unlocked</span>
      </div>

      {/* Cart Title & Action Strip */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="font-['Montserrat'] font-bold text-lg text-[#0e1d29]">Workwear Procurement Cart</h1>
          <span className="text-xs text-slate-500">{totalPieces} Pieces across {cart.length} Item Sets</span>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-slate-400 hover:text-[#9e2016] flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
          <span>Clear All</span>
        </button>
      </div>

      {/* Cart Items List */}
      <div className="px-4 py-3 flex flex-col gap-3">
        {cart.map(item => {
          const lineTotal = item.price * item.qty;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex gap-3 relative"
            >
              {/* Product Thumbnail */}
              <div className="w-20 h-24 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.tierBadge && (
                  <span className="absolute bottom-1 left-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-1 rounded">
                    {item.tierBadge}
                  </span>
                )}
              </div>

              {/* Information & Actions */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] leading-tight truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-[#9e2016] p-1"
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">Size: {item.size}</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">Color: {item.color}</span>
                  </div>
                </div>

                {/* Price & Quantity Stepper */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-1">
                  <div>
                    <span className="font-['Montserrat'] font-bold text-sm text-[#9e2016]">
                      ₹{lineTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      ₹{item.price} / pc
                    </span>
                  </div>

                  <div className="flex items-center bg-slate-100 rounded border border-slate-200">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l"
                    >
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Bulk Coupon Section */}
      <section className="mx-4 my-2 p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0e1d29]">
            <span className="material-symbols-outlined text-[#9e2016] text-[18px]">sell</span>
            <span>Corporate Bulk Coupon</span>
          </div>
          <span className="text-[11px] text-[#2f6388] font-bold">Use code 'BULK10'</span>
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-[#E8F8F5] p-2.5 rounded-lg border border-[#A3E4D7]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#117A65] text-[18px]">check_circle</span>
              <div className="text-xs">
                <span className="font-bold text-[#117A65]">{appliedCoupon}</span> applied (10% Off)
              </div>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-xs text-red-600 hover:underline font-semibold"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter BULK10"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs uppercase bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#2f6388] hover:bg-[#1a5276] text-white text-xs font-bold rounded transition-colors"
            >
              Apply
            </button>
          </form>
        )}
      </section>

      {/* GST Claim & Corporate Invoicing Accordion */}
      <section className="mx-4 my-2 p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isGstExpanded}
            onChange={(e) => setIsGstExpanded(e.target.checked)}
            className="w-4 h-4 rounded text-[#9e2016] accent-[#9e2016]"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0e1d29]">Claim GST Input Tax Credit (ITC)</span>
            <span className="text-[10px] text-slate-500">Provide legal entity details for official B2B tax invoice</span>
          </div>
        </label>

        {isGstExpanded && (
          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">GSTIN Number (15 Digits)</label>
              <input
                type="text"
                placeholder="e.g. 07AAAAA0000A1Z5"
                value={localGstin}
                onChange={(e) => setLocalGstin(e.target.value.toUpperCase())}
                className="w-full px-3 py-1.5 text-xs font-mono uppercase bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Registered Company Name</label>
              <input
                type="text"
                placeholder="e.g. Apex Security Solutions Pvt. Ltd."
                value={localCompany}
                onChange={(e) => setLocalCompany(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveGst}
              className="mt-1 py-1.5 bg-[#ecf4ff] hover:bg-[#daeafb] text-[#2f6388] text-xs font-bold rounded transition-colors"
            >
              Verify & Save GST Credentials
            </button>
          </div>
        )}
      </section>

      {/* Comprehensive Order Summary */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
        <h3 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29] pb-2 border-b border-slate-100">
          Payment Breakdown
        </h3>

        <div className="flex justify-between text-xs text-slate-600">
          <span>Items Subtotal ({totalPieces} pcs)</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-xs text-slate-600">
          <span>Standard Pan-India Delivery</span>
          <span className="text-[#117A65] font-bold">FREE</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-xs text-[#117A65]">
            <span>Corporate Coupon Rebate</span>
            <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between text-xs text-slate-600">
          <span>Estimated GST (12% Workwear Rate)</span>
          <span>₹{gstAmount.toLocaleString('en-IN')}</span>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
          <div>
            <span className="font-['Montserrat'] font-bold text-base text-[#0e1d29]">Total Payable</span>
            <span className="text-[10px] text-slate-400 block">(Inclusive of All Taxes)</span>
          </div>
          <span className="font-['Montserrat'] font-bold text-xl text-[#9e2016]">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </section>

      {/* Enterprise Trust Badges */}
      <div className="mx-4 my-2 grid grid-cols-3 gap-2 text-center text-slate-600">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
          <span className="material-symbols-outlined text-[18px] text-[#2f6388] mb-0.5">lock</span>
          <span className="text-[10px] font-semibold leading-tight">256-Bit SSL Security</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
          <span className="material-symbols-outlined text-[18px] text-[#2f6388] mb-0.5">published_with_changes</span>
          <span className="text-[10px] font-semibold leading-tight">7-Day Fit Guarantee</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
          <span className="material-symbols-outlined text-[18px] text-[#2f6388] mb-0.5">receipt_long</span>
          <span className="text-[10px] font-semibold leading-tight">Instant GST Invoice</span>
        </div>
      </div>

      {/* Sticky Mobile Checkout Dock */}
      <div className="fixed bottom-14 inset-x-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Total Payable</span>
          <span className="font-['Montserrat'] font-bold text-lg text-[#9e2016]">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={() => onNavigate('checkout')}
          className="flex-1 h-11 bg-[#9e2016] hover:bg-[#c0392b] text-white font-bold text-xs rounded shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Proceed to Checkout</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
