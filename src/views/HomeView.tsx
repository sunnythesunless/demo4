import React, { useState } from 'react';
import { ViewTab, Product } from '../types';
import { PRODUCTS, HERO_BG_IMAGE } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (tab: ViewTab) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onShowToast: (msg: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onShowToast,
}) => {
  // Size selection map for the 6 featured outfits
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    '101': 'M',
    '102': 'M',
    '103': 'M',
    '104': 'L',
    '105': '40',
    '106': 'M',
  });

  // Bulk slider calculation
  const [bulkQty, setBulkQty] = useState(100);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Calculate bulk unit price
  const calculateBulkPrice = (qty: number) => {
    if (qty >= 250) return { price: 549, discount: '40% Wholesale Rebate' };
    if (qty >= 100) return { price: 649, discount: '30% Wholesale Rebate' };
    if (qty >= 50) return { price: 719, discount: '20% Wholesale Rebate' };
    return { price: 799, discount: '10% Wholesale Rebate' };
  };

  const currentTier = calculateBulkPrice(bulkQty);

  const handleSizeClick = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCartClick = (p: Product) => {
    const size = selectedSizes[p.id] || p.sizes[0] || 'Standard';
    onAddToCart(p, size);
    onShowToast(`Added ${p.name} (Size ${size}) to Cart`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    onShowToast('✓ Fabric Swatch Kit & Catalog request logged! Check your inbox.');
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#23323e] text-[#e7f2ff]">
        <div className="relative w-full h-[400px] flex flex-col justify-end p-4">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_BG_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#23323e] via-[#23323e]/75 to-[#23323e]/30" />
          
          <div className="relative z-10 flex flex-col gap-2 pb-2">
            <div className="inline-flex items-center gap-1.5 self-start bg-[#2f6388] text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Certified Fabric Standards ISO 9001</span>
            </div>
            
            <h1 className="font-['Montserrat'] text-2xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
              Premium Uniforms for Every Profession
            </h1>
            
            <p className="text-sm text-slate-200 max-w-lg leading-relaxed line-clamp-2">
              Durable, stylish, and custom-tailored industrial, hospitality, medical, and corporate security workwear built for real daily duty.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 mt-1">
              <button
                id="hero-shop-catalog-btn"
                onClick={() => onNavigate('catalog')}
                className="flex items-center justify-center gap-1.5 bg-[#9e2016] text-white px-3 py-2.5 rounded shadow-md hover:bg-[#c0392b] transition-colors text-center font-semibold text-sm cursor-pointer"
              >
                <span>Shop Catalog</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                id="hero-bulk-quote-btn"
                onClick={() => onNavigate('custom-bulk-order')}
                className="flex items-center justify-center gap-1.5 bg-white text-[#2f6388] px-3 py-2.5 rounded shadow-md hover:bg-slate-100 transition-colors text-center font-semibold text-sm cursor-pointer"
              >
                <span>Bulk Quote</span>
                <span className="material-symbols-outlined text-[18px]">calculate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Mini Perks Scroller */}
      <section className="bg-[#ecf4ff] px-4 py-3 flex items-center justify-around gap-2 text-slate-700 text-center border-b border-[#daeafb]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#2f6388] text-[20px]">badge</span>
          <span className="text-xs font-semibold">Custom Monograms</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#2f6388] text-[20px]">shield</span>
          <span className="text-xs font-semibold">Reinforced Seams</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#2f6388] text-[20px]">receipt_long</span>
          <span className="text-xs font-semibold">B2B GST Invoicing</span>
        </div>
      </section>

      {/* Explore By Profession - 6 Categories Grid */}
      <section className="px-4 py-6 flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9e2016] font-bold">Catalog Range</span>
            <h2 className="font-['Montserrat'] font-bold text-lg text-[#0e1d29]">Explore By Profession</h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs text-[#2f6388] font-semibold flex items-center gap-0.5 hover:underline"
          >
            All Sectors <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Security */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex flex-col text-left bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e1efff] flex items-center justify-center text-[#9e2016] group-hover:bg-[#9e2016] group-hover:text-white transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">local_police</span>
            </div>
            <span className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] group-hover:text-[#9e2016] transition-colors leading-snug">
              Security Uniforms
            </span>
            <span className="text-xs text-slate-500 mt-1">48+ tailored styles</span>
            <span className="absolute top-2.5 right-2.5 bg-[#e1efff] text-[#275c81] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              Duty
            </span>
          </button>

          {/* 2. Medical */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex flex-col text-left bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e1efff] flex items-center justify-center text-[#9e2016] group-hover:bg-[#9e2016] group-hover:text-white transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">medical_services</span>
            </div>
            <span className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] group-hover:text-[#9e2016] transition-colors leading-snug">
              Hospital Scrubs
            </span>
            <span className="text-xs text-slate-500 mt-1">35+ clinical sets</span>
            <span className="absolute top-2.5 right-2.5 bg-[#e1efff] text-[#275c81] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              Sterile
            </span>
          </button>

          {/* 3. Hospitality */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex flex-col text-left bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e1efff] flex items-center justify-center text-[#9e2016] group-hover:bg-[#9e2016] group-hover:text-white transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <span className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] group-hover:text-[#9e2016] transition-colors leading-snug">
              Hotel & Chef Coats
            </span>
            <span className="text-xs text-slate-500 mt-1">42+ styles</span>
            <span className="absolute top-2.5 right-2.5 bg-[#e1efff] text-[#275c81] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              Culinary
            </span>
          </button>

          {/* 4. Industrial */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex flex-col text-left bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e1efff] flex items-center justify-center text-[#9e2016] group-hover:bg-[#9e2016] group-hover:text-white transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
            </div>
            <span className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] group-hover:text-[#9e2016] transition-colors leading-snug">
              Industrial Workwear
            </span>
            <span className="text-xs text-slate-500 mt-1">29+ heavy-duty</span>
            <span className="absolute top-2.5 right-2.5 bg-[#e1efff] text-[#275c81] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              High-Vis
            </span>
          </button>

          {/* 5. Corporate */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex flex-col text-left bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e1efff] flex items-center justify-center text-[#9e2016] group-hover:bg-[#9e2016] group-hover:text-white transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">business_center</span>
            </div>
            <span className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] group-hover:text-[#9e2016] transition-colors leading-snug">
              Corporate Suits
            </span>
            <span className="text-xs text-slate-500 mt-1">24+ blazer cuts</span>
            <span className="absolute top-2.5 right-2.5 bg-[#e1efff] text-[#275c81] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              Executive
            </span>
          </button>

          {/* 6. Custom Merchandise */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex flex-col text-left bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e1efff] flex items-center justify-center text-[#9e2016] group-hover:bg-[#9e2016] group-hover:text-white transition-colors mb-2">
              <span className="material-symbols-outlined text-[24px]">apparel</span>
            </div>
            <span className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] group-hover:text-[#9e2016] transition-colors leading-snug">
              T-Shirts & Caps
            </span>
            <span className="text-xs text-slate-500 mt-1">18+ promo items</span>
            <span className="absolute top-2.5 right-2.5 bg-[#e1efff] text-[#275c81] font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              Printable
            </span>
          </button>
        </div>
      </section>

      {/* Featured Products Section - 6 Products Vertical Stack */}
      <section className="px-4 py-4 flex flex-col gap-4" id="featured-catalog">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9e2016] font-bold">Field-Tested Gear</span>
            <h2 className="font-['Montserrat'] font-bold text-lg text-[#0e1d29]">Featured Uniform Outfits</h2>
          </div>
          <span className="text-slate-500 text-xs">6 Highlights</span>
        </div>

        <div className="flex flex-col gap-4">
          {featuredProducts.map(p => {
            const currentSize = selectedSizes[p.id] || p.sizes[0];
            const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 border border-slate-100"
              >
                {/* Product Image Box */}
                <div
                  className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => onSelectProduct(p)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-[#9e2016] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>{p.rating} ({p.reviewsCount} reviews)</span>
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                  <h3
                    onClick={() => onSelectProduct(p)}
                    className="font-['Montserrat'] font-semibold text-[15px] leading-tight text-[#0e1d29] cursor-pointer hover:text-[#9e2016] transition-colors"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {p.description}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-['Montserrat'] text-[18px] text-[#9e2016] font-bold">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs line-through text-slate-400">
                      ₹{p.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#117A65] bg-[#E8F8F5] px-1.5 py-0.5 rounded font-semibold">
                      Save {discountPercent}%
                    </span>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Select Size:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {p.sizes.map(size => {
                      const isSelected = currentSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeClick(p.id, size)}
                          className={`px-2.5 py-1 text-xs rounded transition-all active:scale-95 ${
                            isSelected
                              ? 'bg-[#2f6388] text-white font-bold'
                              : 'bg-slate-100 text-slate-700 hover:bg-[#2f6388] hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dual Buttons: Details & Add to Cart */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(p)}
                    className="py-2 px-3 rounded bg-[#ecf4ff] text-[#2f6388] font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[#daeafb] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddToCartClick(p)}
                    className="py-2 px-3 rounded bg-[#9e2016] hover:bg-[#c0392b] text-white font-semibold text-xs flex items-center justify-center gap-1 active:scale-[0.98] transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Bulk Quote Calculator Strip */}
      <section className="mx-4 my-4 p-4 rounded-xl bg-[#daeafb] text-[#0e1d29] flex flex-col gap-3 shadow-sm border border-[#a3d4fe]/30">
        <div className="flex items-center gap-2 text-[#9e2016] font-bold">
          <span className="material-symbols-outlined text-[22px]">calculate</span>
          <span className="font-['Montserrat'] text-base">Instant Bulk Quote Estimator</span>
        </div>
        <p className="text-xs text-slate-600">Ordering 50+ sets? Slide below to instantly estimate wholesale unit pricing tier:</p>
        
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span>Team Quantity: <strong className="text-[#9e2016] font-bold text-sm">{bulkQty} Pieces</strong></span>
            <span className="bg-[#E8F8F5] text-[#117A65] font-bold px-2 py-0.5 rounded text-[11px]">
              {currentTier.discount}
            </span>
          </div>
          
          <input
            id="home-bulk-slider"
            type="range"
            min="20"
            max="500"
            step="10"
            value={bulkQty}
            onChange={(e) => setBulkQty(Number(e.target.value))}
            className="w-full accent-[#9e2016] h-2 bg-white rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>20 pcs (10% off)</span>
            <span>100 pcs (30% off)</span>
            <span>500+ pcs (40% off)</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between bg-white p-3 rounded-lg shadow-xs">
          <div>
            <span className="text-[11px] text-slate-500 block">Estimated Cost / Unit</span>
            <span className="font-['Montserrat'] text-lg font-bold text-[#9e2016]">
              ₹{currentTier.price}{' '}
              <span className="text-xs font-normal text-slate-500">avg</span>
            </span>
          </div>
          <button
            onClick={() => onNavigate('custom-bulk-order')}
            className="bg-[#2f6388] hover:bg-[#1a5276] text-white px-3 py-2 rounded text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
          >
            <span>Get Formal PDF</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Why Choose Us - 4 Pillar Features */}
      <section className="px-4 py-6 flex flex-col gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#9e2016] font-bold">The Everbright Standard</span>
          <h2 className="font-['Montserrat'] font-bold text-lg text-[#0e1d29]">Engineered For Indian Workplaces</h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Pillar 1 */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-11 h-11 rounded-lg bg-[#daeafb] text-[#9e2016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">percent</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29]">Bulk Wholesale Tiers</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Tiered volume discounts up to 40% off standard catalog pricing for corporate teams and multi-location companies.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-11 h-11 rounded-lg bg-[#daeafb] text-[#9e2016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">brush</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29]">Precision Embroidery & Print</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Automated Tajima embroidery setups and industrial heat transfers ensure pantone-accurate brand logo stitching that survives 100+ commercial wash cycles.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-11 h-11 rounded-lg bg-[#daeafb] text-[#9e2016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29]">Pan-India Express Logistics</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Direct fulfillment hubs in Delhi NCR, Mumbai, and Bengaluru ensuring 3-5 day dispatch to all tier 1, 2, and remote industrial zones.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-11 h-11 rounded-lg bg-[#daeafb] text-[#9e2016] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">description</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29]">Cash on Delivery & GST Invoicing</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Complete enterprise compliance. Input tax credit GST invoices provided automatically with every order, backed by verified COD options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-[#ecf4ff] px-4 py-6 flex flex-col gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#9e2016] font-bold">Client Validation</span>
          <h2 className="font-['Montserrat'] font-bold text-lg text-[#0e1d29]">Trusted by Industry Leaders</h2>
        </div>

        <div className="flex flex-col gap-3">
          {/* Review 1 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1.5 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <span className="bg-[#EBF5FB] text-[#1A5276] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Verified Hospital
              </span>
            </div>
            <p className="text-xs text-slate-700 italic mt-1 leading-relaxed">
              "Procuring scrubs for 400+ clinical nurses used to take weeks. Everbright delivered custom embroidered antibacterial scrubs in 5 business days. Fabric breathes exceptionally well during long 12-hour duty shifts."
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-50 mt-1">
              <div className="w-8 h-8 rounded-full bg-[#2f6388] text-white flex items-center justify-center font-bold text-xs">
                MH
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#0e1d29] font-semibold">Dr. Ananya Roy</span>
                <span className="text-[10px] text-slate-500">Procurement Head, Max Healthcare Network</span>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1.5 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <span className="bg-[#EBF5FB] text-[#1A5276] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Verified Security
              </span>
            </div>
            <p className="text-xs text-slate-700 italic mt-1 leading-relaxed">
              "The stitch tension on the Heavy Duty Security shirts is unmatched. Even with batons and utility belts, the waistlines and buttons don't tear out. Our guard teams look genuinely sharp on VIP facility patrols."
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-50 mt-1">
              <div className="w-8 h-8 rounded-full bg-[#9e2016] text-white flex items-center justify-center font-bold text-xs">
                AS
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#0e1d29] font-semibold">Col. Rajesh Malhotra</span>
                <span className="text-[10px] text-slate-500">Operations Director, Apex Security Services</span>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1.5 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <span className="bg-[#EBF5FB] text-[#1A5276] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Verified Hospitality
              </span>
            </div>
            <p className="text-xs text-slate-700 italic mt-1 leading-relaxed">
              "From banquet captain suits to executive chef coats, Everbright maintains color consistency across multiple repeat batches. The heat-resistant fabric for kitchen staff prevented frequent garment renewals."
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-50 mt-1">
              <div className="w-8 h-8 rounded-full bg-[#d5e4f5] text-[#0e1d29] flex items-center justify-center font-bold text-xs">
                GR
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#0e1d29] font-semibold">Chef Vikram Singhania</span>
                <span className="text-[10px] text-slate-500">Executive Culinary Lead, Grand Royale Hotels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Swatch Kit Request */}
      <section className="px-4 py-6 bg-[#e1efff] flex flex-col gap-2.5 text-[#0e1d29]">
        <div className="w-9 h-9 rounded-full bg-[#9e2016] text-white flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">mail</span>
        </div>
        <h2 className="font-['Montserrat'] font-bold text-base">Get Fabric Swatch Kit & Catalog</h2>
        <p className="text-xs text-slate-600">Subscribe for new uniform releases, seasonal stock alerts, and wholesale price index updates.</p>
        
        <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 pt-1">
          <div className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Enter corporate or work email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white px-3 py-2 text-sm rounded shadow-sm text-[#0e1d29] border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#2f6388]"
            />
            <button
              type="submit"
              className="bg-[#9e2016] hover:bg-[#c0392b] text-white px-4 py-2 rounded text-xs font-semibold shrink-0 transition-colors shadow-sm cursor-pointer"
            >
              Subscribe
            </button>
          </div>
          {newsletterSubmitted && (
            <span className="text-xs text-[#117A65] font-semibold">
              ✓ Swatch kit request logged! Check your inbox.
            </span>
          )}
        </form>
      </section>

      {/* Comprehensive Footer With 16 Directory Links */}
      <footer className="bg-[#23323e] text-[#e7f2ff] px-4 pt-6 pb-12 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9e2016] text-[26px]">shield_with_heart</span>
            <span className="font-['Montserrat'] font-bold text-base text-white">Everbright Uniforms</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            India's leading specialized apparel manufacturer for institutional workforces. Crafting high-performance durability since 2011.
          </p>
          <div className="flex flex-col gap-1 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[15px] text-[#9e2016]">location_on</span>
              <span>Plot 42, Okhla Industrial Area Phase-III, New Delhi 110020</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[15px] text-[#9e2016]">call</span>
              <span>Support: +91 98765 43210 / 011-45678900</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[15px] text-[#9e2016]">mail</span>
              <span>procurement@everbrightuniforms.com</span>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-slate-300">
          {/* Workwear Lines */}
          <div className="flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Workwear Lines</span>
            <button onClick={() => onNavigate('catalog')} className="text-left hover:text-white transition-colors">1. Security Guard Sets</button>
            <button onClick={() => onNavigate('catalog')} className="text-left hover:text-white transition-colors">2. Hospital & Scrubs</button>
            <button onClick={() => onNavigate('catalog')} className="text-left hover:text-white transition-colors">3. Hotel & Chef Coats</button>
            <button onClick={() => onNavigate('catalog')} className="text-left hover:text-white transition-colors">4. High-Vis Overalls</button>
            <button onClick={() => onNavigate('catalog')} className="text-left hover:text-white transition-colors">5. Corporate Blazers</button>
            <button onClick={() => onNavigate('catalog')} className="text-left hover:text-white transition-colors">6. Polos & Headwear</button>
          </div>

          {/* Enterprise B2B */}
          <div className="flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Enterprise B2B</span>
            <button onClick={() => onNavigate('custom-bulk-order')} className="text-left hover:text-white transition-colors">7. Custom Bulk Quotes</button>
            <button onClick={() => onNavigate('custom-bulk-order')} className="text-left hover:text-white transition-colors">8. Logo Digitization</button>
            <button onClick={() => onNavigate('custom-bulk-order')} className="text-left hover:text-white transition-colors">9. On-Site Fit Trials</button>
            <button onClick={() => onNavigate('checkout')} className="text-left hover:text-white transition-colors">10. GST Invoicing Portal</button>
            <button onClick={() => onNavigate('custom-bulk-order')} className="text-left hover:text-white transition-colors">11. Rate Contracts</button>
          </div>

          {/* Company Info */}
          <div className="flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Company Info</span>
            <span className="text-slate-400">12. Factory & Heritage</span>
            <span className="text-slate-400">13. Fabric Test Reports</span>
            <button onClick={() => onNavigate('tracking')} className="text-left hover:text-white transition-colors">14. Track Consignment</button>
            <span className="text-slate-400">15. Replacement SLA</span>
            <span className="text-slate-400">16. Privacy & Terms</span>
          </div>

          {/* Procurement desk trigger */}
          <div className="flex flex-col gap-2 justify-center bg-white/5 p-3 rounded-lg">
            <span className="text-xs text-white font-bold">Instant Procurement Desk</span>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs bg-[#25D366] text-white px-2.5 py-1.5 rounded font-semibold justify-center shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-700">
          © 2025 Everbright Uniform Manufacturers Pvt. Ltd. All rights reserved. Compliant with ISO 9001:2015 & OEKO-TEX Standard 100.
        </div>
      </footer>
    </div>
  );
};
