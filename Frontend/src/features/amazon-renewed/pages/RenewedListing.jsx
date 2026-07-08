import React, { useState } from 'react';
import { RENEWED_PRODUCTS } from '../data/products';

export default function RenewedListing({ onNavigate, onExit, onAddToCart }) {
  const [selectedBrand, setSelectedBrand] = useState({ Apple: true, Samsung: true, Google: true, Sony: true });
  const [selectedCondition, setSelectedCondition] = useState('Excellent');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter products based on selected brands
  const filteredProducts = RENEWED_PRODUCTS.filter(p => {
    if (p.id === 'prod-macbookpro') return false; // Deal of the day, hide in listings
    if (p.brand === 'Apple' && !selectedBrand.Apple) return false;
    if (p.brand === 'Samsung' && !selectedBrand.Samsung) return false;
    if (p.brand === 'Google' && !selectedBrand.Google) return false;
    if (p.brand === 'Sony' && !selectedBrand.Sony) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F0F2F2] text-slate-900 flex flex-col font-sans antialiased animate-fade-in">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row gap-6 w-full flex-grow text-xs">
        {/* SideNavBar (Filter Rail) */}
        <aside className="w-full md:w-[260px] shrink-0 flex flex-col gap-6 bg-transparent">
          {/* Header Section */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <h2 className="text-sm font-black text-slate-800 mb-1">Shop By Category</h2>
            <p className="text-[11px] text-slate-400">Quality Refurbished Tech</p>
            <button 
              onClick={() => onNavigate('home')}
              className="mt-4 w-full bg-[#febd69] hover:bg-[#f3a847] text-slate-900 font-bold py-2 rounded-lg text-xs cursor-pointer border-none transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Filter Groups */}
          <div className="flex flex-col gap-5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            {/* Department */}
            <section>
              <h3 className="font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-1">Department</h3>
              <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                <li className="flex items-center gap-2 cursor-pointer text-emerald-800 font-bold bg-emerald-50/50 px-2 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[16px]">smartphone</span> Smartphones
                </li>
                <li className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-emerald-700 px-2 py-1 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">laptop</span> Laptops
                </li>
                <li className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-emerald-700 px-2 py-1 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">tablet_mac</span> Tablets
                </li>
                <li className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-emerald-700 px-2 py-1 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">watch</span> Smart Watches
                </li>
              </ul>
            </section>

            {/* Customer Reviews */}
            <section>
              <h3 className="font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-1">Customer Reviews</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 hover:text-emerald-700 cursor-pointer group">
                  <div className="flex gap-0.5 text-amber-500">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[16px]">star</span>
                  </div>
                  <span className="text-[11px] text-slate-500 group-hover:text-emerald-700">&amp; Up</span>
                </div>
              </div>
            </section>

            {/* Brands */}
            <section>
              <h3 className="font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-1">Brands</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 hover:text-slate-900 select-none">
                  <input 
                    type="checkbox" 
                    checked={selectedBrand.Apple} 
                    onChange={() => setSelectedBrand({ ...selectedBrand, Apple: !selectedBrand.Apple })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span>Apple</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 hover:text-slate-900 select-none">
                  <input 
                    type="checkbox" 
                    checked={selectedBrand.Samsung} 
                    onChange={() => setSelectedBrand({ ...selectedBrand, Samsung: !selectedBrand.Samsung })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span>Samsung</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 hover:text-slate-900 select-none">
                  <input 
                    type="checkbox" 
                    checked={selectedBrand.Google} 
                    onChange={() => setSelectedBrand({ ...selectedBrand, Google: !selectedBrand.Google })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span>Google</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 hover:text-slate-900 select-none">
                  <input 
                    type="checkbox" 
                    checked={selectedBrand.Sony} 
                    onChange={() => setSelectedBrand({ ...selectedBrand, Sony: !selectedBrand.Sony })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span>Sony</span>
                </label>
              </div>
            </section>

            {/* Condition */}
            <section>
              <h3 className="font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-1">Condition</h3>
              <div className="flex flex-col gap-2">
                {['Premium', 'Excellent', 'Good'].map(cond => (
                  <label key={cond} className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 hover:text-slate-900 select-none">
                    <input 
                      type="radio" 
                      name="condition"
                      checked={selectedCondition === cond} 
                      onChange={() => setSelectedCondition(cond)}
                      className="border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    <span>{cond}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow">
          {/* Results Header */}
          <div className="bg-white border border-slate-200 p-4 flex justify-between items-center mb-4 rounded-xl shadow-sm">
            <div>
              <h1 className="text-base font-extrabold text-slate-800">Results</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Price and other details may vary based on product size and color.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600">Sort by:</span>
              <select className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-700 outline-none focus:border-emerald-600">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((p) => {
              const currentPrice = selectedCondition === 'Premium' ? p.pricePremium : p.priceExcellent;
              return (
                <div 
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-xl flex flex-col hover:shadow-lg transition-all group overflow-hidden"
                >
                  <div 
                    onClick={() => onNavigate('pdp', p.id)}
                    className="relative w-full aspect-square bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer border-b border-slate-100"
                  >
                    <img 
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                      alt={p.title} 
                      src={p.images[0]?.thumb || p.images[0]?.main}
                    />
                    {p.saveBadge && (
                      <span className="absolute top-2 right-2 bg-red-650 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                        {p.saveBadge}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 
                      onClick={() => onNavigate('pdp', p.id)}
                      className="font-bold text-xs text-slate-800 line-clamp-2 mb-1 group-hover:text-emerald-700 cursor-pointer transition-colors leading-tight"
                    >
                      {p.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-amber-500">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: p.rating >= 4.5 ? "'FILL' 1" : "'FILL' 0" }}>
                          {p.rating >= 4.5 ? 'star' : 'star_half'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">({p.reviewsCount})</span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span className="text-[11px] font-bold text-slate-800">₹</span>
                      <span className="font-extrabold text-base text-slate-800">{currentPrice}</span>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-col gap-1 mb-4 border-t border-slate-100 pt-2">
                      {p.badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {badge.includes('Warranty') || badge.includes('Guarantee') ? 'shield' : 'verified'}
                          </span> 
                          {badge}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex flex-col gap-2">
                      <button 
                        onClick={onAddToCart}
                        className="w-full bg-[#febd69] hover:bg-[#f3a847] text-black font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer border-none"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => setQuickViewProduct(p)}
                        className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Quick View Modal Overlay */}
      {quickViewProduct && (
        <div 
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-up relative border border-slate-100 cursor-default"
          >
            {/* Close Button */}
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-150 rounded-full w-8 h-8 flex items-center justify-center transition-all border-none cursor-pointer z-10 hover:shadow-sm"
              title="Close modal"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex gap-4">
                <div className="w-1/3 aspect-square bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-200/50">
                  <img 
                    className="max-h-full max-w-full object-contain" 
                    alt={quickViewProduct.title} 
                    src={quickViewProduct.images[0]?.thumb || quickViewProduct.images[0]?.main}
                  />
                </div>
                <div className="w-2/3 flex flex-col gap-2">
                  <span className="bg-[#004B3D] text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider self-start">
                    Renewed Certified
                  </span>
                  <h3 className="font-bold text-sm text-slate-800 leading-snug">{quickViewProduct.title}</h3>
                  
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0.5" }}>star_half</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">({quickViewProduct.reviewsCount})</span>
                  </div>

                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs font-bold text-slate-800">₹</span>
                    <span className="font-extrabold text-lg text-slate-800">{selectedCondition === 'Premium' ? quickViewProduct.pricePremium : quickViewProduct.priceExcellent}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <h4 className="font-bold text-slate-700 mb-1 text-xs">Diagnostic condition details:</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{quickViewProduct.conditionDesc}</p>
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                {quickViewProduct.badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span>{badge}</span>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => {
                    onAddToCart();
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-[#febd69] hover:bg-[#f3a847] text-black font-extrabold py-2.5 rounded-lg text-xs cursor-pointer border-none transition-colors uppercase"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    onNavigate('pdp', quickViewProduct.id);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold py-2.5 rounded-lg text-xs cursor-pointer transition-colors uppercase"
                >
                  Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#131921] text-[#c5c6cb] mt-12 w-full">
        <div className="flex flex-col items-center w-full py-16 px-10 max-w-[1440px] mx-auto text-center text-xs">
          <div className="text-[24px] font-bold text-white mb-8">Amazon Renewed</div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-[#c5c6cb]">
            <span className="hover:underline cursor-pointer">Conditions of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
            <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
          </div>
          <p className="text-[11px] text-slate-500">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </footer>
    </div>
  );
}
