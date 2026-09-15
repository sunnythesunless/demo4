import React from 'react';
import { ViewTab } from '../types';

interface OrderConfirmationViewProps {
  orderId: string;
  orderTotal: number;
  addressDetails: any;
  orderItems: any[];
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (msg: string) => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  orderId = 'ORD-2024-001',
  orderTotal = 5389,
  addressDetails,
  orderItems,
  onNavigate,
  onShowToast
}) => {
  const displayOrderId = orderId || 'ORD-2024-001';

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(displayOrderId);
    onShowToast(`Copied ${displayOrderId} to clipboard`);
  };

  const handleDownloadInvoice = () => {
    onShowToast(`Downloading GST Tax Invoice for ${displayOrderId}...`);
    // Create printable simulation or window print
    setTimeout(() => {
      onShowToast(`✓ GST Tax Invoice (${displayOrderId}.pdf) generated!`);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Celebration Header Banner */}
      <section className="bg-gradient-to-b from-[#eafaf1] to-[#f7f9ff] px-4 pt-8 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#117A65] text-white flex items-center justify-center shadow-lg mb-3 animate-bounce">
          <span className="material-symbols-outlined text-[36px]">check</span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#117A65] bg-[#D4EFDF] px-3 py-0.5 rounded-full mb-1">
          B2B Order Confirmed
        </span>
        <h1 className="font-['Montserrat'] font-bold text-xl text-[#0e1d29]">
          Thank You For Your Procurement
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Your order has been allocated to our manufacturing and dispatch hub. An official GST tax invoice has been generated.
        </p>

        {/* Order Reference Pill */}
        <div className="mt-4 inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Order Reference:</span>
          <span className="font-mono font-bold text-sm text-[#9e2016]">{displayOrderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="text-slate-400 hover:text-[#9e2016] p-1 flex items-center"
            title="Copy Order ID"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
          </button>
        </div>
      </section>

      {/* Estimated Dispatch & Delivery Schedule */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[#2f6388]">
          <span className="material-symbols-outlined text-[20px]">schedule</span>
          <h3 className="font-['Montserrat'] font-bold text-xs uppercase tracking-wide">
            Consignment Delivery Schedule
          </h3>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-sm font-bold text-[#0e1d29]">Estimated: Tomorrow, by 2:00 PM</span>
            <span className="text-xs text-slate-500 block">Blue Dart Aviation Express (Air Priority)</span>
          </div>
          <span className="bg-[#E8F8F5] text-[#117A65] font-bold text-[10px] px-2 py-0.5 rounded">
            In Transit
          </span>
        </div>
      </section>

      {/* Address & Entity Details */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700 pb-1 border-b border-slate-100">
          <span className="material-symbols-outlined text-[18px] text-[#9e2016]">corporate_fare</span>
          <span className="font-['Montserrat'] font-bold">Consignee & Facility Address</span>
        </div>
        <div className="text-slate-600 space-y-0.5 pt-1">
          <strong className="text-slate-800 block">{addressDetails?.fullName || 'Col. Rajesh Malhotra'}</strong>
          <p>{addressDetails?.orgName || 'Apex Security Solutions Pvt. Ltd.'}</p>
          <p className="font-mono text-[11px] text-slate-500">GSTIN: {addressDetails?.orgGstin || '07AABCA1234F1Z9'}</p>
          <p>{addressDetails?.address1 || 'Building 4B, Sector 62, Cyber City'}</p>
          <p>{addressDetails?.city || 'Noida'}, {addressDetails?.state || 'Uttar Pradesh'} - {addressDetails?.pinCode || '201301'}</p>
          <p className="text-slate-500 pt-0.5">Phone: +91 {addressDetails?.phone || '9876543210'}</p>
        </div>
      </section>

      {/* Consignment Items */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <span className="font-['Montserrat'] font-bold text-slate-800">Purchased Items</span>
          <span className="text-slate-400">({orderItems?.length || 3} items)</span>
        </div>
        <div className="flex flex-col gap-2 pt-1">
          {(orderItems || []).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50">
              <div className="flex items-center gap-2 min-w-0">
                <img src={item.image} alt={item.name} className="w-9 h-10 object-cover rounded bg-slate-100 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-slate-800 block truncate">{item.name}</span>
                  <span className="text-[10px] text-slate-400">Qty: {item.qty} | Size: {item.size}</span>
                </div>
              </div>
              <span className="font-bold text-[#9e2016] shrink-0">
                ₹{(item.price * item.qty).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Settlement Breakdown */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <span className="font-['Montserrat'] font-bold text-slate-800">Settlement Info</span>
          <span className="text-[#117A65] font-bold">PAID</span>
        </div>
        <div className="flex justify-between text-slate-600 pt-1">
          <span>Method: Corporate UPI</span>
          <span>Settled (auto-reconciled)</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>GST Component (12%)</span>
          <span>Included</span>
        </div>
        <div className="flex justify-between font-bold text-sm text-[#0e1d29] pt-1 border-t border-slate-100">
          <span>Total Paid</span>
          <span className="text-[#9e2016]">₹{orderTotal.toLocaleString('en-IN')}</span>
        </div>
      </section>

      {/* Primary Action Buttons */}
      <div className="px-4 pt-3 flex flex-col gap-2.5">
        <button
          onClick={() => onNavigate('tracking')}
          className="w-full h-11 rounded bg-[#2f6388] hover:bg-[#1a5276] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">timeline</span>
          <span>Track Live Consignment (Blue Dart)</span>
        </button>

        <button
          onClick={handleDownloadInvoice}
          className="w-full h-11 rounded bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px] text-[#9e2016]">download</span>
          <span>Download GST Tax Invoice (PDF)</span>
        </button>

        <button
          onClick={() => onNavigate('catalog')}
          className="w-full py-2.5 text-xs text-[#2f6388] font-semibold hover:underline text-center"
        >
          Continue Procurement Catalog
        </button>
      </div>

      {/* Support Desk */}
      <div className="mt-4 mx-4 p-3 bg-slate-100 rounded-lg text-center text-xs text-slate-500">
        Questions regarding packaging or batch split? Call direct dispatch helpline: <strong>9876543210</strong>
      </div>
    </div>
  );
};
