import React, { useState } from 'react';
import { Product, ViewTab } from '../types';
import { PAIRED_ACCESSORIES } from '../data/mockData';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (tab: ViewTab) => void;
  onAddToCartWithDetails: (item: {
    productId: string;
    name: string;
    price: number;
    qty: number;
    size: string;
    color: string;
    image: string;
    tierBadge?: string;
  }) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onAddToCartWithDetails,
  onShowToast
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Navy Blue');
  const [selectedSize, setSelectedSize] = useState('L');
  const [qty, setQty] = useState(10);
  const [activeTab, setActiveTab] = useState<'specs' | 'size' | 'reviews'>('specs');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Gallery angles
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        product.image,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDEC9qTiNExLrAAqpS44TisGVwCWuLjxprbvVtpRimmjOLfNRbZZEaIM1HL1WNJE8-ly7HR6HxY73KllqzSOf_CPglQq1CIrbK5oUlyYHjOSCeFepeswn7NNGZPq2CFWZS1fmbXSzIzvh1b4hfJ2loHcRM7yIvF0hN4zhFtD84dwJ2Hag1uiPzUlfFlzK291oNn9gnENwjrmjuLzfEPDebJYIc_XFy5mEn4oFvb1UBCEYsqbzW1LFw',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBn68_lF0XEpxltPyY0bj32icgjib70Xvxq8ON7EH-IBVKiC-BbXhQtRRH-hfqchB6jW-YM0gq60JgrJzQXc-X3JWvKLRW0B9n_qhr6z0YwxpSzw3Wv7y1bkDpJErCu8EtbyK_RH_kvtvmpsZ0GerNYG1FEwdotP2VkMA2M_iRlY4WVSoRYW33iOV0mL4hgny_q-fMZFM968eALrrFHIiXSkRjDIs5N6PeHbK52aUWj_sGgRSVLEH8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCO71ayoxiPIdga2U1GDHWM4lYknDrmzZg7esoi-gcibi-WCY6Pcy9x05JDGa9MKy6q2E4IxLUZlXZlRgn7SMH2JruHYrp-d6LZxcpyEbzZtRBHsyHRYKVm-fo07ZLmrCwgPvEswgPU_gA0HNC_CzGU2GoN-_JS96vj7tn-gNSoG5tp7P5Bl1WHVw_8FGBwzUEL9bQpA58h6nAlKknHjRg9TzWE1PA3nbYKcpFKb7gGIRynO2Xy84Y'
      ];

  const colors = [
    { name: 'Navy Blue', hex: '#1B263B' },
    { name: 'Tactical Khaki', hex: '#C2B280' },
    { name: 'Jet Black', hex: '#1A1A1A' },
    { name: 'Steel Grey', hex: '#4A5568' }
  ];

  // Dynamic Tier Calculation
  const getTierInfo = (count: number) => {
    if (count >= 50) {
      return {
        unitPrice: 1099,
        tierName: '50+ Enterprise Tier',
        savings: 'Save 27% + Free Logo'
      };
    }
    if (count >= 10) {
      return {
        unitPrice: 1299,
        tierName: '10-49 Fleet Tier',
        savings: 'Save 13%'
      };
    }
    return {
      unitPrice: 1499,
      tierName: '1-9 Standard Tier',
      savings: 'Standard Rate'
    };
  };

  const currentTier = getTierInfo(qty);
  const subtotal = currentTier.unitPrice * qty;

  const handleAddMainProduct = () => {
    onAddToCartWithDetails({
      productId: product.id,
      name: product.name,
      price: currentTier.unitPrice,
      qty,
      size: selectedSize,
      color: selectedColor,
      image: galleryImages[0],
      tierBadge: currentTier.tierName
    });
    onShowToast(`Added ${qty}x ${product.name} (${selectedColor}, ${selectedSize}) to Cart`);
  };

  const handleBuyNow = () => {
    handleAddMainProduct();
    onNavigate('checkout');
  };

  const handleAddAccessory = (acc: typeof PAIRED_ACCESSORIES[0]) => {
    onAddToCartWithDetails({
      productId: acc.id,
      name: acc.name,
      price: acc.price,
      qty: 1,
      size: 'Standard',
      color: 'Default',
      image: acc.image,
      tierBadge: 'Accessory'
    });
    onShowToast(`Added ${acc.name} to Cart`);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Breadcrumb Navigation */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <button onClick={() => onNavigate('home')} className="hover:text-[#9e2016]">
          Home
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <button onClick={() => onNavigate('catalog')} className="hover:text-[#9e2016]">
          {product.category}
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#0e1d29] font-medium truncate max-w-[180px]">{product.name}</span>
      </div>

      {/* Media Gallery Section */}
      <section className="relative w-full bg-slate-100">
        <div className="relative w-full aspect-square max-h-[420px] bg-slate-200 overflow-hidden flex items-center justify-center">
          <img
            src={galleryImages[selectedImageIndex] || galleryImages[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-[#9e2016] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
              Govt. Certified Fabric
            </span>
            <span className="bg-white/95 text-[#9e2016] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs w-fit">
              32% OFF Bulk
            </span>
          </div>

          {/* Wishlist Toggle Button */}
          <button
            onClick={() => {
              setIsWishlisted(!isWishlisted);
              onShowToast(isWishlisted ? 'Removed from saved wishlist' : 'Saved to Procurement Wishlist');
            }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-slate-700 hover:text-[#9e2016] transition-colors"
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
                color: isWishlisted ? '#9e2016' : 'currentColor'
              }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Thumbnail Selector Strip (4 angles) */}
        <div className="p-3 bg-white flex items-center gap-2.5 overflow-x-auto border-b border-slate-100">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                selectedImageIndex === idx
                  ? 'border-[#9e2016] ring-2 ring-[#9e2016]/20'
                  : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Product Title & Basic Info */}
      <section className="px-4 py-4 bg-white flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">SKU: {product.sku || 'EBU-SEC-402'}</span>
          <span className="text-[#117A65] bg-[#E8F8F5] px-2 py-0.5 rounded font-bold text-[11px] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#117A65] animate-pulse" /> In Stock (Warehouse B)
          </span>
        </div>

        <h1 className="font-['Montserrat'] font-bold text-xl text-[#0e1d29] leading-tight">
          {product.name}
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          Heavy-duty twill weave with moisture-management inner lining, reinforced baton loops, and concealed radio pocket.
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center text-yellow-500">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-[#0e1d29]">4.8 / 5.0</span>
          <span className="text-xs text-slate-400">(124 Verified Enterprise Reviews)</span>
        </div>
      </section>

      {/* Dynamic Tier Pricing Card */}
      <section className="mx-4 my-3 p-4 rounded-xl bg-[#ecf4ff] border border-[#daeafb] flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9e2016] font-bold block">
              Tier Unit Cost
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-['Montserrat'] text-2xl font-bold text-[#0e1d29]">
                ₹{currentTier.unitPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs line-through text-slate-400">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#117A65] font-bold">
                {currentTier.savings}
              </span>
            </div>
          </div>
          <span className="text-[11px] bg-white text-[#2f6388] font-bold px-2 py-1 rounded shadow-xs border border-slate-200">
            GST ITC Eligible (12%)
          </span>
        </div>

        {/* B2B Volume Price Breakdown Table */}
        <div className="bg-white rounded-lg p-2.5 flex flex-col gap-1.5 text-xs">
          <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wide">
            Wholesale Quantity Tiers
          </span>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                qty < 10 ? 'bg-[#9e2016]/10 border-[#9e2016] font-bold' : 'bg-slate-50 border-slate-200'
              }`}
              onClick={() => setQty(5)}
            >
              <span className="block text-[11px] text-slate-500">1 - 9 pcs</span>
              <span className="text-sm font-bold text-[#0e1d29]">₹1,499</span>
              <span className="block text-[9px] text-slate-400">Standard</span>
            </div>
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                qty >= 10 && qty < 50 ? 'bg-[#9e2016]/10 border-[#9e2016] font-bold' : 'bg-slate-50 border-slate-200'
              }`}
              onClick={() => setQty(20)}
            >
              <span className="block text-[11px] text-slate-500">10 - 49 pcs</span>
              <span className="text-sm font-bold text-[#9e2016]">₹1,299</span>
              <span className="block text-[9px] text-[#117A65] font-bold">Save 13%</span>
            </div>
            <div
              className={`p-2 rounded border transition-all cursor-pointer ${
                qty >= 50 ? 'bg-[#9e2016]/10 border-[#9e2016] font-bold' : 'bg-slate-50 border-slate-200'
              }`}
              onClick={() => setQty(50)}
            >
              <span className="block text-[11px] text-slate-500">50+ pcs</span>
              <span className="text-sm font-bold text-[#9e2016]">₹1,099</span>
              <span className="block text-[9px] text-[#117A65] font-bold">Save 27% + Logo</span>
            </div>
          </div>
        </div>

        {/* Quantity Stepper + Presets */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Select Procurement Quantity:</span>
            <span className="text-xs text-[#9e2016] font-bold">{currentTier.tierName}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded-lg border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="w-14 text-center font-bold text-sm text-[#0e1d29]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {/* Quick Bulk Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setQty(10)}
                className="px-2.5 py-2 rounded bg-white text-xs font-semibold text-slate-700 border border-slate-200 hover:border-[#9e2016]"
              >
                +10 Bulk
              </button>
              <button
                type="button"
                onClick={() => setQty(25)}
                className="px-2.5 py-2 rounded bg-white text-xs font-semibold text-slate-700 border border-slate-200 hover:border-[#9e2016]"
              >
                +25 Fleet
              </button>
              <button
                type="button"
                onClick={() => setQty(50)}
                className="px-2.5 py-2 rounded bg-[#9e2016] text-xs font-bold text-white shadow-xs"
              >
                +50 VIP Tier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Colorways Selection */}
      <section className="px-4 py-3 bg-white flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Official Colorway:</span>
          <span className="text-xs text-[#2f6388] font-bold">{selectedColor}</span>
        </div>
        <div className="flex items-center gap-3">
          {colors.map(c => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedColor(c.name)}
              className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all ${
                selectedColor === c.name
                  ? 'border-[#9e2016] bg-[#9e2016]/5 ring-1 ring-[#9e2016]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: c.hex }} />
              <span className="text-xs font-medium text-slate-700">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Garment Size Selection & Guide Modal Trigger */}
      <section className="px-4 py-3 bg-white flex flex-col gap-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Garment Size:</span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-xs text-[#2f6388] font-semibold flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>Size Guide</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map(sz => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`w-12 h-10 rounded text-xs font-bold transition-all ${
                selectedSize === sz
                  ? 'bg-[#9e2016] text-white shadow-sm scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </section>

      {/* Institutional WhatsApp Custom Quote Box */}
      <section className="mx-4 my-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">chat</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#0e1d29] block">Need Logo Printing or 100+ Units?</span>
            <span className="text-[11px] text-slate-500">Get an instant customized proforma invoice.</span>
          </div>
        </div>
        <a
          href={`https://wa.me/919876543210?text=Hello%20Everbright%2C%20I%20need%20a%20quote%20for%20${qty}%20sets%20of%20${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold px-3 py-2 rounded shrink-0 transition-colors shadow-xs"
        >
          WhatsApp RFQ
        </a>
      </section>

      {/* Product Information Tabs */}
      <section className="px-4 py-3 bg-white flex flex-col gap-3 border-t border-slate-100">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors ${
              activeTab === 'specs'
                ? 'border-b-2 border-[#9e2016] text-[#9e2016]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Technical Specs
          </button>
          <button
            onClick={() => setActiveTab('size')}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors ${
              activeTab === 'size'
                ? 'border-b-2 border-[#9e2016] text-[#9e2016]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Fit & Measurements
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-[#9e2016] text-[#9e2016]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Client Reviews (124)
          </button>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed py-1">
          {activeTab === 'specs' && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Fabric Composition</span>
                  <strong className="text-slate-800">65% Poly / 35% Cotton Twill</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Weave Weight</span>
                  <strong className="text-slate-800">240 GSM Heavy Grade</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Wash Durability</span>
                  <strong className="text-slate-800">120+ Industrial Cycles</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Special Treatments</span>
                  <strong className="text-slate-800">Stain & Water Repellent</strong>
                </div>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 mt-1">
                <li>Triple-needle chain stitched seams along crotch and underarms</li>
                <li>Epaulet shoulder straps for badges, ranking stars, and cords</li>
                <li>Concealed dual chest pockets with velcro closures</li>
              </ul>
            </div>
          )}

          {activeTab === 'size' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-2 border-b">Size</th>
                    <th className="p-2 border-b">Chest (in)</th>
                    <th className="p-2 border-b">Waist (in)</th>
                    <th className="p-2 border-b">Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2 font-bold">S (38)</td>
                    <td className="p-2">38 - 40</td>
                    <td className="p-2">30 - 32</td>
                    <td className="p-2">17.5</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">M (40)</td>
                    <td className="p-2">40 - 42</td>
                    <td className="p-2">32 - 34</td>
                    <td className="p-2">18.5</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">L (42)</td>
                    <td className="p-2">42 - 44</td>
                    <td className="p-2">34 - 36</td>
                    <td className="p-2">19.5</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">XL (44)</td>
                    <td className="p-2">44 - 46</td>
                    <td className="p-2">36 - 38</td>
                    <td className="p-2">20.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-3">
              <div className="border-b border-slate-100 pb-2">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-800">Capt. SPS Rawat (G4S Fleet Manager)</strong>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
                <div className="flex text-yellow-500 py-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-slate-600 mt-1">
                  Ordered 180 sets for metro security deployment. The reinforced knee areas and waistband elastic hold up reliably.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <strong className="text-slate-800">Manoj Kumar (GMR Cargo Facility)</strong>
                  <span className="text-[10px] text-slate-400">1 week ago</span>
                </div>
                <div className="flex text-yellow-500 py-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-slate-600 mt-1">
                  Fabric stays crisp through 12-hour shifts. The dark navy color doesn't fade even after harsh industrial laundry.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Frequently Paired Together Accessories */}
      <section className="px-4 py-4 bg-slate-50 flex flex-col gap-3 border-t border-slate-200">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#9e2016] font-bold">Standard Duty Add-Ons</span>
          <h3 className="font-['Montserrat'] font-bold text-base text-[#0e1d29]">Frequently Paired Together</h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {PAIRED_ACCESSORIES.map(acc => (
            <div key={acc.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-100 mb-2">
                <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] text-[#2f6388] font-bold block">{acc.category}</span>
                <h4 className="font-medium text-xs text-[#0e1d29] line-clamp-1">{acc.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-['Montserrat'] font-bold text-xs text-[#9e2016]">₹{acc.price}</span>
                  <button
                    onClick={() => handleAddAccessory(acc)}
                    className="px-2 py-1 bg-[#ecf4ff] hover:bg-[#9e2016] hover:text-white text-[#2f6388] rounded text-[11px] font-bold transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Purchase Action Dock */}
      <div className="fixed bottom-14 inset-x-0 z-40 bg-white/95 backdrop-blur-md px-4 py-2.5 border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-medium">Subtotal ({qty} pcs)</span>
          <span className="font-['Montserrat'] font-bold text-base text-[#9e2016]">
            ₹{subtotal.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddMainProduct}
            className="h-10 px-4 rounded bg-[#ecf4ff] hover:bg-[#daeafb] text-[#2f6388] font-bold text-xs flex items-center gap-1.5 transition-colors border border-[#a3d4fe]/60"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="h-10 px-5 rounded bg-[#9e2016] hover:bg-[#c0392b] text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span>Buy Now</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-5 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-['Montserrat'] font-bold text-base text-[#0e1d29]">Garment Fit Guide</h4>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="py-3 text-xs text-slate-600 space-y-2">
              <p>Standard Indian Military & Security specifications. If wearing over thermal innerwear, order one size up.</p>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200 font-semibold text-slate-700">
                  <span>Size</span>
                  <span>Chest (in)</span>
                  <span>Waist (in)</span>
                </div>
                <div className="flex justify-between py-1"><span>S</span><span>38"</span><span>30"</span></div>
                <div className="flex justify-between py-1"><span>M</span><span>40"</span><span>32"</span></div>
                <div className="flex justify-between py-1"><span>L</span><span>42"</span><span>34"</span></div>
                <div className="flex justify-between py-1"><span>XL</span><span>44"</span><span>36"</span></div>
                <div className="flex justify-between py-1"><span>XXL</span><span>46"</span><span>38"</span></div>
              </div>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 bg-[#9e2016] text-white font-bold text-xs rounded hover:bg-[#c0392b]"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
