import React, { useState } from 'react';
import { ViewTab } from '../types';
import { TRACKING_MAP_IMAGE } from '../data/mockData';

interface OrderTrackingViewProps {
  orderId?: string;
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (msg: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orderId = 'ORD-2024-001',
  onNavigate,
  onShowToast
}) => {
  const [searchId, setSearchId] = useState(orderId || 'ORD-2024-001');
  const [isManifestOpen, setIsManifestOpen] = useState(true);

  const awbNumber = 'BD-88492019-IN';

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(awbNumber);
    onShowToast(`AWB ${awbNumber} copied to clipboard`);
  };

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    onShowToast(`Tracking refreshed for ${searchId.toUpperCase()}`);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Search Bar for Order ID */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <form onSubmit={handleSearchOrder} className="flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-2024-001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs uppercase font-mono text-[#0e1d29] focus:outline-none focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#2f6388] text-white rounded text-xs font-bold hover:bg-[#1a5276] transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {/* Live Estimated Delivery Card */}
      <section className="mx-4 my-3 p-4 rounded-xl bg-gradient-to-r from-[#005683] to-[#2f6388] text-white shadow-md flex flex-col gap-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
            Blue Dart Aviation Express
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-slate-200">
            AWB: {awbNumber}
            <button onClick={handleCopyAwb} className="hover:text-white p-0.5">
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
            </button>
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-200 block">Estimated Arrival</span>
          <h2 className="font-['Montserrat'] text-xl font-bold text-white">
            Tomorrow, by 2:00 PM
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            Consignment is currently in transit between New Delhi Hub & Noida Delivery Center.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-[#25D366] h-full w-4/5 rounded-full animate-pulse" />
        </div>
      </section>

      {/* Live Courier Transit Map Card */}
      <section className="mx-4 my-2 rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="relative w-full h-44 bg-slate-100">
          <img
            src={TRACKING_MAP_IMAGE}
            alt="Consignment transit route"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 text-white text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#25D366] animate-ping" />
              <span className="font-semibold">Live GPS: Vehicle DL-1VA-9421 (In Flight / Road Link)</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Origin Manufacturing Facility</span>
              <strong className="text-slate-800">Plot 42, Okhla Phase-III, New Delhi</strong>
            </div>
            <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Destination Facility</span>
              <strong className="text-slate-800">Sector 62, Cyber City, Noida</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step ISO Milestone Quality Timeline */}
      <section className="mx-4 my-2 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9e2016] text-[20px]">timeline</span>
            <h3 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Consignment Milestones</h3>
          </div>
          <span className="text-[10px] bg-[#E8F8F5] text-[#117A65] font-bold px-2 py-0.5 rounded">
            Stage 4 of 5
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {/* Milestone 1 */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#117A65] text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">1. Order Placed & Payment Settled</span>
              <p className="text-[11px] text-slate-500">Corporate PO logged, GST invoice queued. (Oct 26, 09:30 AM)</p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#117A65] text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">2. Fabric Allocated & Cut (Batch #402-B)</span>
              <p className="text-[11px] text-slate-500">240 GSM heavy twill pulled from warehouse inventory. (Oct 26, 02:15 PM)</p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#117A65] text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">3. Stitched, Quality Inspected & Packed</span>
              <p className="text-[11px] text-slate-500">Passed 10-point seam stress test. Sealed in weather-proof bags. (Oct 27, 11:00 AM)</p>
            </div>
          </div>

          {/* Milestone 4 (Active) */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#9e2016] text-white flex items-center justify-center text-[11px] font-bold ring-4 ring-[#9e2016]/20 animate-pulse">
              ●
            </div>
            <div>
              <span className="text-xs font-bold text-[#9e2016] block">4. Shipped via Blue Dart Aviation [Active]</span>
              <p className="text-[11px] text-slate-600 font-medium">Handed over to courier hub; outbound transit scan recorded. (Oct 27, 04:45 PM)</p>
            </div>
          </div>

          {/* Milestone 5 (Pending) */}
          <div className="relative">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[11px] font-bold">
              5
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block">5. Out for Delivery & Dock Gate Handover</span>
              <p className="text-[11px] text-slate-400">Scheduled for tomorrow morning. Marshall will call upon arrival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consignment Manifest & Packaged Items */}
      <section className="mx-4 my-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setIsManifestOpen(!isManifestOpen)}
          className="w-full p-3.5 flex items-center justify-between bg-slate-50 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2f6388] text-[20px]">inventory</span>
            <span className="font-['Montserrat'] font-bold text-xs text-[#0e1d29]">
              Consignment Manifest & Sealed Packages
            </span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">
            {isManifestOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isManifestOpen && (
          <div className="p-3.5 border-t border-slate-100 flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
              <span className="text-slate-600">Seal Bag Tag #1: <strong>EBU-SEAL-88219</strong></span>
              <span className="text-[#117A65] font-bold text-[10px]">Tamper Proof Intact</span>
            </div>

            <div className="space-y-1.5 pt-1 text-slate-700">
              <div className="flex justify-between border-b border-slate-50 pb-1">
                <span>Tactical Security Guard Set (Navy, Size L)</span>
                <strong>2 Sets</strong>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1">
                <span>Medical Antibacterial Scrub (Teal, Size M)</span>
                <strong>1 Set</strong>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1">
                <span>Executive Chef Coat Master (White, Size XL)</span>
                <strong>1 Set</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Support and Reschedule Action */}
      <div className="mx-4 mt-2 p-3.5 bg-slate-100 rounded-xl flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-[#0e1d29] block">Need Special Dock Loading?</span>
          <span className="text-slate-500">Provide gate pass instructions or request delay.</span>
        </div>
        <a
          href={`https://wa.me/919876543210?text=Hello%20Dispatch%20Team%2C%20regarding%20AWB%20${awbNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-3 py-1.5 rounded font-bold hover:bg-[#20b858] transition-colors"
        >
          Contact Marshall
        </a>
      </div>
    </div>
  );
};
