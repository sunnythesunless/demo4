import React, { useState } from 'react';
import { CartItem, ViewTab } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  gstin: string;
  companyName: string;
  appliedCoupon: string | null;
  onNavigate: (tab: ViewTab) => void;
  onOrderPlaced: (orderId: string, finalTotal: number, addressDetails: any) => void;
  onShowToast: (msg: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  gstin,
  companyName,
  appliedCoupon,
  onNavigate,
  onOrderPlaced,
  onShowToast
}) => {
  // Address form fields
  const [fullName, setFullName] = useState('Col. Rajesh Malhotra');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('procurement@apexsecurity.in');
  const [orgName, setOrgName] = useState(companyName || 'Apex Security Solutions Pvt. Ltd.');
  const [orgGstin, setOrgGstin] = useState(gstin || '07AABCA1234F1Z9');
  const [address1, setAddress1] = useState('Building 4B, Sector 62, Cyber City');
  const [address2, setAddress2] = useState('Near Metro Station');
  const [city, setCity] = useState('Noida');
  const [state, setState] = useState('Uttar Pradesh');
  const [pinCode, setPinCode] = useState('201301');

  // Shipping speed
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment tab
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('apexsecurity@icici');
  const [isUpiVerified, setIsUpiVerified] = useState(true);

  // Card fields
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  // Order summary accordion
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountRate = appliedCoupon ? 0.1 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const shippingCharge = shippingMethod === 'express' ? 150 : 0;
  const taxableAmount = subtotal - discountAmount + shippingCharge;
  const gstAmount = Math.round(taxableAmount * 0.12);
  const finalPayable = taxableAmount + gstAmount;

  const handleVerifyUpi = () => {
    if (!upiId.includes('@')) {
      onShowToast('Please enter a valid VPA ID (e.g. name@upi)');
      return;
    }
    setIsUpiVerified(true);
    onShowToast('✓ Corporate UPI ID Verified: Apex Security Solutions Pvt. Ltd.');
  };

  const handlePlaceOrder = () => {
    if (!fullName || !phone || !address1 || !pinCode) {
      onShowToast('Please fill in required delivery address fields');
      return;
    }

    const newOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    onOrderPlaced(newOrderId, finalPayable, {
      fullName,
      phone,
      email,
      orgName,
      orgGstin,
      address1,
      city,
      state,
      pinCode,
      shippingMethod,
      paymentMethod
    });
    onShowToast(`✓ Order ${newOrderId} placed successfully!`);
    onNavigate('order-confirmation');
  };

  return (
    <div className="flex flex-col w-full pb-32">
      {/* 4-Step Progress Indicator */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-sm mx-auto text-xs">
          <div className="flex items-center gap-1 text-[#117A65] font-semibold">
            <span className="w-5 h-5 rounded-full bg-[#117A65] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>Cart</span>
          </div>
          <div className="w-6 h-0.5 bg-[#117A65]" />
          <div className="flex items-center gap-1 text-[#9e2016] font-bold">
            <span className="w-5 h-5 rounded-full bg-[#9e2016] text-white flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Delivery</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Payment</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">4</span>
            <span>Done</span>
          </div>
        </div>
      </div>

      {/* Accordion Order Summary Preview */}
      <section className="mx-4 my-3 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          className="w-full p-3.5 flex items-center justify-between bg-slate-50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2f6388] text-[20px]">receipt_long</span>
            <span className="font-['Montserrat'] font-bold text-xs text-[#0e1d29]">
              Consignment Items ({cart.length} item kinds, {cart.reduce((s, i) => s + i.qty, 0)} pcs)
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#9e2016] font-bold text-xs">
            <span>₹{finalPayable.toLocaleString('en-IN')}</span>
            <span className="material-symbols-outlined text-[18px]">
              {isSummaryExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </div>
        </button>

        {isSummaryExpanded && (
          <div className="p-3.5 border-t border-slate-100 flex flex-col gap-2 text-xs">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between py-1 border-b border-slate-50">
                <span className="truncate max-w-[200px] text-slate-700">{item.name} (x{item.qty})</span>
                <span className="font-semibold text-[#0e1d29]">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="pt-2 flex flex-col gap-1 text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#117A65]">
                  <span>Bulk Rebate</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (12%)</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Delivery Address Form */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="material-symbols-outlined text-[#9e2016] text-[20px]">pin_drop</span>
          <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Consignment Delivery Address</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div>
            <label className="text-slate-500 font-medium block mb-1">Full Contact Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">Contact Phone (+91) *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-slate-500 font-medium block mb-1">Corporate / Work Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">Organization / Legal Entity</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">GSTIN Number (Tax ITC)</label>
            <input
              type="text"
              value={orgGstin}
              onChange={(e) => setOrgGstin(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 bg-slate-50 font-mono uppercase rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-slate-500 font-medium block mb-1">Address Line 1 (Facility / Building) *</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-slate-500 font-medium block mb-1">Address Line 2 (Area, Landmark)</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">City *</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-500 font-medium block mb-1">State *</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="text-slate-500 font-medium block mb-1">PIN Code *</label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Courier Speed Options */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <span className="material-symbols-outlined text-[#2f6388] text-[20px]">local_shipping</span>
          <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Delivery Method</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label
            onClick={() => setShippingMethod('standard')}
            className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
              shippingMethod === 'standard'
                ? 'border-[#9e2016] bg-[#9e2016]/5 ring-1 ring-[#9e2016]'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              checked={shippingMethod === 'standard'}
              onChange={() => setShippingMethod('standard')}
              className="mt-0.5 accent-[#9e2016]"
            />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#0e1d29]">Standard Ground Express (Blue Dart)</span>
              <span className="text-slate-500">Delivered within 3-5 business days</span>
              <span className="text-[#117A65] font-bold mt-1">FREE</span>
            </div>
          </label>

          <label
            onClick={() => setShippingMethod('express')}
            className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
              shippingMethod === 'express'
                ? 'border-[#9e2016] bg-[#9e2016]/5 ring-1 ring-[#9e2016]'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              checked={shippingMethod === 'express'}
              onChange={() => setShippingMethod('express')}
              className="mt-0.5 accent-[#9e2016]"
            />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#0e1d29]">Air Priority Next-Day Dispatch</span>
              <span className="text-slate-500">Fastest air route with dedicated tracking</span>
              <span className="text-[#9e2016] font-bold mt-1">₹150 Flat Fee</span>
            </div>
          </label>
        </div>
      </section>

      {/* Payment Method Selector */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <span className="material-symbols-outlined text-[#9e2016] text-[20px]">credit_card</span>
          <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Settlement & Payment Method</h2>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPaymentMethod('upi')}
            className={`py-2 rounded transition-all ${
              paymentMethod === 'upi' ? 'bg-white text-[#9e2016] shadow-xs' : 'text-slate-600'
            }`}
          >
            UPI
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`py-2 rounded transition-all ${
              paymentMethod === 'card' ? 'bg-white text-[#9e2016] shadow-xs' : 'text-slate-600'
            }`}
          >
            Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('netbanking')}
            className={`py-2 rounded transition-all ${
              paymentMethod === 'netbanking' ? 'bg-white text-[#9e2016] shadow-xs' : 'text-slate-600'
            }`}
          >
            NetBanking
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('cod')}
            className={`py-2 rounded transition-all ${
              paymentMethod === 'cod' ? 'bg-white text-[#9e2016] shadow-xs' : 'text-slate-600'
            }`}
          >
            COD
          </button>
        </div>

        {/* Method Sub-Forms */}
        {paymentMethod === 'upi' && (
          <div className="flex flex-col gap-2.5 pt-1 text-xs">
            <span className="text-slate-600">Enter Virtual Payment Address (VPA) or scan QR upon next step:</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="companyname@okhdfcbank"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setIsUpiVerified(false);
                }}
                className="flex-1 px-3 py-2 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:bg-white"
              />
              <button
                type="button"
                onClick={handleVerifyUpi}
                className="px-3 py-2 bg-[#2f6388] text-white font-bold rounded hover:bg-[#1a5276]"
              >
                {isUpiVerified ? '✓ Verified' : 'Verify'}
              </button>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="bg-slate-100 px-2 py-1 rounded">Google Pay</span>
              <span className="bg-slate-100 px-2 py-1 rounded">PhonePe</span>
              <span className="bg-slate-100 px-2 py-1 rounded">Paytm UPI</span>
              <span className="bg-slate-100 px-2 py-1 rounded">BHIM</span>
            </div>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="flex flex-col gap-2 pt-1 text-xs">
            <div>
              <label className="text-slate-500 block mb-1">Corporate Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-500 block mb-1">Expiry MM/YY</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">CVV / CVC</label>
                <input
                  type="password"
                  maxLength={4}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div className="flex flex-col gap-2 pt-1 text-xs">
            <span className="text-slate-600">Select Corporate Net Banking Portal:</span>
            <div className="grid grid-cols-3 gap-2">
              {['HDFC Corporate', 'ICICI Corporate', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Others'].map(bank => (
                <button
                  key={bank}
                  type="button"
                  className="p-2 border rounded text-slate-700 hover:border-[#9e2016] text-center font-medium bg-slate-50"
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="bg-[#FFF9E6] p-3 rounded-lg border border-[#FFE082] text-xs text-[#7A5800]">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span>Cash / Pay On Delivery Guidelines</span>
            </div>
            <p>
              Available for delivery consignments up to ₹25,000. Mobile OTP verification will be triggered upon delivery arrival.
            </p>
          </div>
        )}
      </section>

      {/* Sticky Mobile Place Order Bar */}
      <div className="fixed bottom-14 inset-x-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Total Payable</span>
          <span className="font-['Montserrat'] font-bold text-lg text-[#9e2016]">
            ₹{finalPayable.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="flex-1 h-11 bg-[#9e2016] hover:bg-[#c0392b] text-white font-bold text-xs rounded shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">lock</span>
          <span>Place Order Now</span>
        </button>
      </div>
    </div>
  );
};
