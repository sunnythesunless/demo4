import React, { useState, useMemo } from 'react';
import { Product, ViewTab } from '../types';
import { PRODUCTS } from '../data/mockData';

interface CatalogViewProps {
  onNavigate: (tab: ViewTab) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onShowToast: (msg: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter drawer options
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  // Temporary drawer state when opened
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(5000);
  const [tempFabrics, setTempFabrics] = useState<string[]>([]);
  const [tempSizes, setTempSizes] = useState<string[]>([]);

  // Feedback animation state for quick added buttons
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Uniforms', icon: 'apps' },
    { id: 'Hospital', label: 'Hospital' },
    { id: 'Hotel & Chef', label: 'Hotel & Chef' },
    { id: 'Security', label: 'Security' },
    { id: 'Industrial', label: 'Industrial' },
    { id: 'Corporate', label: 'Corporate' },
    { id: 'Custom Tees', label: 'Custom Tees' },
  ];

  const allFabrics = [
    { id: 'Cotton', label: '100% Breathable Cotton' },
    { id: 'Poly-Viscose', label: 'Wrinkle-Free Poly-Viscose' },
    { id: 'Flame Retardant', label: 'Flame Retardant (EN ISO Certified)' },
    { id: 'Antimicrobial', label: 'Antimicrobial Clinical Finish' }
  ];

  const sizeChips = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

  // Open drawer sync
  const openDrawer = () => {
    setTempMaxPrice(maxPrice);
    setTempFabrics([...selectedFabrics]);
    setTempSizes([...selectedSizes]);
    setIsFilterDrawerOpen(true);
  };

  const applyDrawerFilters = () => {
    setMaxPrice(tempMaxPrice);
    setSelectedFabrics(tempFabrics);
    setSelectedSizes(tempSizes);
    setIsFilterDrawerOpen(false);
  };

  const resetDrawerFilters = () => {
    setTempMaxPrice(5000);
    setTempFabrics([]);
    setTempSizes([]);
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMaxPrice(5000);
    setSelectedFabrics([]);
    setSelectedSizes([]);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      // Max price
      if (product.price > maxPrice) {
        return false;
      }
      // Fabric
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric)) {
        return false;
      }
      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some(s => product.sizes.includes(s));
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      // popularity
      return b.popularity - a.popularity;
    });
  }, [selectedCategory, searchTerm, maxPrice, selectedFabrics, selectedSizes, sortBy]);

  const activeFiltersCount = (maxPrice < 5000 ? 1 : 0) + selectedFabrics.length + selectedSizes.length;

  const handleQuickAdd = (p: Product) => {
    onAddToCart(p, p.sizes[0] || 'M');
    onShowToast(`Added ${p.name} to Cart`);
    setAddedIds(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Sticky Search & Filter Header */}
      <div className="sticky top-24 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-sm flex flex-col gap-2 border-b border-slate-100">
        {/* Search Bar */}
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 pointer-events-none text-[20px]">
            search
          </span>
          <input
            id="catalog-search-input"
            type="text"
            placeholder="Search medical scrubs, chef coats, safety vests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-9 bg-[#f7f9ff] rounded text-sm text-[#0e1d29] placeholder:text-slate-400 focus:outline-none focus:bg-white border border-slate-200 shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Category Pills Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-[#9e2016] text-white shadow-sm'
                    : 'bg-[#daeafb]/60 text-[#0e1d29] hover:bg-[#a3d4fe]'
                }`}
              >
                {cat.icon && <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Trigger & Sort Utility Strip */}
        <div className="flex items-center justify-between pt-0.5">
          <button
            onClick={openDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#ecf4ff] text-[#2f6388] text-xs font-semibold active:bg-[#daeafb] transition-colors border border-[#a3d4fe]/40"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-[#9e2016] text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden xs:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#ecf4ff] text-[#0e1d29] text-xs font-semibold pl-2.5 pr-7 py-1.5 rounded focus:outline-none cursor-pointer border border-[#a3d4fe]/40"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <span className="material-symbols-outlined absolute right-1.5 top-1.5 text-slate-400 pointer-events-none text-[16px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Results Tracker */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span>Showing</span>
          <span className="font-bold text-[#9e2016]">{filteredProducts.length}</span>
          <span>verified uniform garments</span>
        </div>
        <span className="text-xs text-[#2f6388] bg-[#ecf4ff] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
          <span className="material-symbols-outlined text-[13px]">verified</span> ISO 9001
        </span>
      </div>

      {/* Product Catalog Grid */}
      <div className="px-4 pb-6">
        {filteredProducts.length === 0 ? (
          /* Empty Search State */
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#ecf4ff] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[32px] text-[#2f6388]">inventory_2</span>
            </div>
            <h4 className="font-['Montserrat'] font-semibold text-base text-[#0e1d29] mb-1">
              No garments match your filters
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              Try clearing some filters or searching for broader terms like "shirt" or "scrub".
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded bg-[#9e2016] text-white text-xs font-semibold active:scale-95 transition-transform"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map(product => {
              const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const isAdded = addedIds[product.id];

              return (
                <div
                  key={product.id}
                  className="product-card flex flex-col bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 border border-slate-100"
                >
                  <div
                    className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#a3d4fe] text-[#275c81] px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {product.category}
                    </span>
                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[#9e2016] px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col flex-grow justify-between gap-2.5">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center text-[#E67E22]">
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <span className="text-xs ml-1 text-[#0e1d29] font-semibold">{product.rating}</span>
                          <span className="text-xs text-slate-400 ml-0.5">({product.reviewsCount})</span>
                        </div>
                        <span className="text-[10px] text-[#117A65] bg-[#E8F8F5] px-2 py-0.5 rounded-full flex items-center gap-0.5 font-semibold">
                          <span className="material-symbols-outlined text-[12px]">local_shipping</span> Ships Today
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-['Montserrat'] font-semibold text-sm text-[#0e1d29] line-clamp-1 cursor-pointer hover:text-[#9e2016] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {product.sizes.map(sz => (
                          <span key={sz} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-50">
                      <div className="flex items-baseline gap-2 mb-2.5">
                        <span className="font-['Montserrat'] text-base text-[#0e1d29] font-bold">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#9e2016] font-semibold">
                          Tier bulk ₹{product.bulkTierPrice}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="h-9 px-2 rounded bg-[#daeafb]/60 text-[#2f6388] font-semibold text-xs flex items-center justify-center gap-1 active:scale-98 transition-transform hover:bg-[#a3d4fe]"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span> Details
                        </button>
                        <button
                          onClick={() => handleQuickAdd(product)}
                          className={`h-9 px-2 rounded font-semibold text-xs flex items-center justify-center gap-1 transition-all ${
                            isAdded
                              ? 'bg-[#117A65] text-white'
                              : 'bg-[#9e2016] text-white hover:bg-[#c0392b] active:scale-98'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isAdded ? 'check' : 'shopping_cart'}
                          </span>
                          <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-1.5 pt-6 pb-2">
          <button className="h-9 px-3 rounded bg-slate-100 text-slate-400 text-xs font-semibold flex items-center gap-1 opacity-60 cursor-not-allowed">
            <span className="material-symbols-outlined text-[16px]">chevron_left</span> Prev
          </button>
          <button className="w-9 h-9 rounded bg-[#9e2016] text-white text-xs font-bold shadow-sm">
            1
          </button>
          <button className="w-9 h-9 rounded bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 border border-slate-200">
            2
          </button>
          <button className="w-9 h-9 rounded bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 border border-slate-200">
            3
          </button>
          <button className="h-9 px-3 rounded bg-white text-slate-700 text-xs font-semibold flex items-center gap-1 hover:bg-slate-100 border border-slate-200">
            Next <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Quick Bulk Quote Institutional Banner */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-br from-[#005683] via-[#2f6388] to-[#c0392b] p-5 rounded-xl text-white shadow-md flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-8 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[150px]">corporate_fare</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
            <span className="text-[11px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm">
              Institutional Procurement
            </span>
          </div>
          <div>
            <h4 className="font-['Montserrat'] font-bold text-base leading-snug">
              Buying for 50+ Employees or Multiple Locations?
            </h4>
            <p className="text-xs text-slate-200 mt-1 max-w-sm leading-relaxed">
              Unlock customized corporate GST invoices, free physical sample boxes, and custom thread color embroidery.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <a
              href="https://wa.me/919876543210?text=Hello%20Everbright%20Team%2C%20I%20would%20like%20a%20bulk%20uniform%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('custom-bulk-order')}
              className="h-10 px-4 rounded bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">request_quote</span>
              <span>Upload RFQ Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Drawer Modal */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md mx-auto bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2f6388] text-[22px]">tune</span>
                <h3 className="font-['Montserrat'] font-bold text-base text-[#0e1d29]">Filter Catalog</h3>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 overflow-y-auto flex flex-col gap-5 text-sm">
              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#0e1d29]">Max Price</span>
                  <span className="text-[#9e2016] font-bold">₹{tempMaxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#9e2016] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹500</span>
                  <span>₹2,500</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Garment Sizes */}
              <div>
                <span className="font-semibold text-[#0e1d29] block mb-2">Garment Sizes</span>
                <div className="flex flex-wrap gap-2">
                  {sizeChips.map(sz => {
                    const isSelected = tempSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setTempSizes(tempSizes.filter(s => s !== sz));
                          } else {
                            setTempSizes([...tempSizes, sz]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#9e2016] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Fabric Types */}
              <div>
                <span className="font-semibold text-[#0e1d29] block mb-2">Technical Fabric Type</span>
                <div className="flex flex-col gap-2.5">
                  {allFabrics.map(fab => {
                    const isChecked = tempFabrics.includes(fab.id);
                    return (
                      <label key={fab.id} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTempFabrics([...tempFabrics, fab.id]);
                            } else {
                              setTempFabrics(tempFabrics.filter(f => f !== fab.id));
                            }
                          }}
                          className="w-4 h-4 rounded text-[#9e2016] accent-[#9e2016] cursor-pointer"
                        />
                        <span className="text-xs text-slate-700">{fab.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Action Dock */}
            <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50">
              <button
                type="button"
                onClick={resetDrawerFilters}
                className="w-1/3 h-11 rounded bg-white text-slate-700 text-xs font-semibold border border-slate-200 hover:bg-slate-100"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={applyDrawerFilters}
                className="w-2/3 h-11 rounded bg-[#9e2016] text-white text-xs font-bold hover:bg-[#c0392b] shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
