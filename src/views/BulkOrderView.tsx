import React, { useState } from 'react';
import { ViewTab } from '../types';

interface BulkOrderViewProps {
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (msg: string) => void;
}

export const BulkOrderView: React.FC<BulkOrderViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [selectedSector, setSelectedSector] = useState('Security & Facility Guards');
  const [headcount, setHeadcount] = useState(75);
  const [hasLogoEmbroidery, setHasLogoEmbroidery] = useState(true);
  const [hasReflectiveStripes, setHasReflectiveStripes] = useState(false);
  const [companyName, setCompanyName] = useState('Apex Facility Management');
  const [contactName, setContactName] = useState('Col. Rajesh Malhotra');
  const [contactPhone, setContactPhone] = useState('9876543210');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const calculateQuote = () => {
    let baseRate = 1299;
    if (selectedSector.includes('Hospital')) baseRate = 899;
    if (selectedSector.includes('Chef')) baseRate = 1450;
    if (selectedSector.includes('Industrial')) baseRate = 1850;
    if (selectedSector.includes('Corporate')) baseRate = 3200;
    if (selectedSector.includes('Custom')) baseRate = 499;

    let discountPercent = 15;
    if (headcount >= 250) discountPercent = 40;
    else if (headcount >= 100) discountPercent = 30;
    else if (headcount >= 50) discountPercent = 22;

    const unitPrice = Math.round(baseRate * (1 - discountPercent / 100));
    const subtotal = unitPrice * headcount;
    const gst = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + gst;

    return { baseRate, unitPrice, discountPercent, subtotal, gst, grandTotal };
  };

  const quote = calculateQuote();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      onShowToast(`✓ Uploaded headcount matrix: ${file.name}`);
    }
  };

  const handleDownloadPdf = () => {
    onShowToast(`Generating formal proforma quote for ${companyName}...`);
    setTimeout(() => {
      onShowToast(`✓ Proforma quote EBU-RFQ-${Math.floor(1000 + Math.random() * 9000)}.pdf downloaded!`);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#23323e] via-[#2f6388] to-[#9e2016] text-white px-4 py-6 text-center shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
          B2B Institutional Sales
        </span>
        <h1 className="font-['Montserrat'] font-bold text-xl mt-1.5 text-white">
          Wholesale Rate Requisition & RFQ Estimator
        </h1>
        <p className="text-xs text-slate-200 mt-1 max-w-sm mx-auto leading-relaxed">
          Order for 25 to 1,000+ staff members with volume price slabs, Tajima logo embroidery, and sample swatch kits.
        </p>
      </section>

      <div className="p-4 flex flex-col gap-4">
        {/* Step 1: Select Sector */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9e2016] text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Workforce Sector</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: 'Security & Facility Guards', icon: 'local_police' },
              { label: 'Hospital & Clinical Scrubs', icon: 'medical_services' },
              { label: 'Hotel & Chef Uniforms', icon: 'restaurant' },
              { label: 'Industrial & High-Vis', icon: 'precision_manufacturing' },
              { label: 'Corporate Front Desk', icon: 'business_center' },
              { label: 'Custom Promotional Tees', icon: 'apparel' },
            ].map(item => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedSector(item.label)}
                className={`p-2.5 rounded-lg border text-left flex items-start gap-2 transition-all ${
                  selectedSector === item.label
                    ? 'border-[#9e2016] bg-[#9e2016]/5 ring-1 ring-[#9e2016]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-[#2f6388] shrink-0">
                  {item.icon}
                </span>
                <span className="font-medium text-[#0e1d29] leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Employee Headcount Slider */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#9e2016] text-white flex items-center justify-center text-[10px] font-bold">2</span>
              <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Total Employee Headcount</h2>
            </div>
            <span className="font-['Montserrat'] font-bold text-base text-[#9e2016]">
              {headcount} Uniform Sets
            </span>
          </div>

          <input
            type="range"
            min="25"
            max="1000"
            step="25"
            value={headcount}
            onChange={(e) => setHeadcount(Number(e.target.value))}
            className="w-full accent-[#9e2016] h-2 bg-slate-200 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>25 pcs (15% off)</span>
            <span>100 pcs (30% off)</span>
            <span>250+ pcs (40% off VIP)</span>
          </div>

          {/* Add-on custom options */}
          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasLogoEmbroidery}
                onChange={(e) => setHasLogoEmbroidery(e.target.checked)}
                className="w-4 h-4 rounded text-[#9e2016] accent-[#9e2016]"
              />
              <span>Include Custom Chest Logo Embroidery (Tajima High-Density)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasReflectiveStripes}
                onChange={(e) => setHasReflectiveStripes(e.target.checked)}
                className="w-4 h-4 rounded text-[#9e2016] accent-[#9e2016]"
              />
              <span>Include 3M Industrial Reflective Safety Stripes (+₹80/unit)</span>
            </label>
          </div>
        </section>

        {/* Step 3: Headcount Matrix / File Upload */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9e2016] text-white flex items-center justify-center text-[10px] font-bold">3</span>
            <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Upload Staff Sizes / Measurement Matrix</h2>
          </div>
          <p className="text-xs text-slate-500">Upload your Excel, CSV, or PDF employee roster for automatic size allocation.</p>

          <label className="border-2 border-dashed border-slate-300 hover:border-[#2f6388] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50">
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".xlsx,.xls,.csv,.pdf" />
            <span className="material-symbols-outlined text-[32px] text-[#2f6388] mb-1">cloud_upload</span>
            <span className="text-xs font-semibold text-slate-700">
              {uploadedFile ? `✓ ${uploadedFile}` : 'Click to select or drag & drop matrix file'}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Supports .xlsx, .csv, .pdf (Max 15MB)</span>
          </label>
        </section>

        {/* Step 4: Company Credentials */}
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#9e2016] text-white flex items-center justify-center text-[10px] font-bold">4</span>
            <h2 className="font-['Montserrat'] font-bold text-sm text-[#0e1d29]">Company Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-slate-500 block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Procurement Officer Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-200"
              />
            </div>
          </div>
        </section>

        {/* Quote Calculation Result Card */}
        <section className="p-4 rounded-xl bg-gradient-to-br from-[#ecf4ff] to-[#daeafb] border border-[#a3d4fe] flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-[#a3d4fe]/40">
            <div>
              <span className="text-[11px] text-slate-600 font-semibold uppercase block">
                Estimated B2B Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-['Montserrat'] font-bold text-2xl text-[#9e2016]">
                  ₹{quote.unitPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs line-through text-slate-400">
                  ₹{quote.baseRate}
                </span>
                <span className="text-xs text-[#117A65] font-bold">
                  ({quote.discountPercent}% Wholesale Discount)
                </span>
              </div>
            </div>
            <span className="bg-[#117A65] text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
              Free Setup & Logo
            </span>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal ({headcount} pieces)</span>
              <span>₹{quote.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>GST Component (12% Tax Credit)</span>
              <span>₹{quote.gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#0e1d29] pt-1 border-t border-[#a3d4fe]/40">
              <span>Estimated Proforma Total</span>
              <span className="text-[#9e2016]">₹{quote.grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleDownloadPdf}
              className="h-11 rounded bg-white hover:bg-slate-50 text-[#0e1d29] font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9e2016]">download</span>
              <span>Download Formal PDF Quote</span>
            </button>
            <a
              href={`https://wa.me/919876543210?text=Hello%20Everbright%2C%20I%20need%20a%20bulk%20quote%20for%20${headcount}%20uniforms%20for%20${encodeURIComponent(companyName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Submit RFQ via WhatsApp</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
