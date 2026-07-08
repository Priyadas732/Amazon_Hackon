import React, { useState, useEffect } from 'react';
import { RENEWED_PRODUCTS } from '../data/products';

export default function RenewedPDP({ onNavigate, onExit, onAddToCart, selectedProduct }) {
  const product = selectedProduct || RENEWED_PRODUCTS[0];
  const [selectedCondition, setSelectedCondition] = useState('Premium'); // 'Premium' | 'Excellent'
  const [activeImage, setActiveImage] = useState(product.images[0]);

  // Sync active image when product changes
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
    setSelectedCondition('Premium');
  }, [product]);

  const price = selectedCondition === 'Premium' ? product.pricePremium : product.priceExcellent;
  const batteryHealth = selectedCondition === 'Premium' ? product.batteryPremium : product.batteryExcellent;
  const cosmeticGrade = selectedCondition === 'Premium' ? product.cosmeticPremium : product.cosmeticExcellent;
  
  const batteryWidth = selectedCondition === 'Premium' ? 'w-full bg-[#007600]' : 'w-11/12 bg-emerald-600';

  return (
    <div className="min-h-screen bg-[#F0F2F2] text-slate-900 flex flex-col font-sans antialiased animate-fade-in">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6 w-full flex-grow text-xs">
        {/* Breadcrumbs */}
        <nav className="text-[11px] text-slate-500 flex gap-1 items-center">
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate('home')}>Electronics</span>
          <span>›</span>
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate('home')}>Renewed Store</span>
          <span>›</span>
          <span className="hover:underline cursor-pointer" onClick={() => onNavigate('listing')}>{product.category}</span>
          <span>›</span>
          <span className="text-slate-700 font-medium">{product.brand} Refurbished</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 flex gap-4">
            {/* Gallery Thumbnails */}
            <div className="flex flex-col gap-2 shrink-0">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveImage(img)}
                  onClick={() => setActiveImage(img)}
                  className={`w-12 h-12 border rounded overflow-hidden cursor-pointer bg-white flex items-center justify-center p-0.5 transition-all ${
                    activeImage?.thumb === img.thumb ? 'border-[#e47911] border-2 ring-1 ring-[#e47911]/30' : 'border-slate-200 hover:border-[#e47911]'
                  }`}
                >
                  <img className="w-full h-full object-contain" alt={img.alt} src={img.thumb} />
                </div>
              ))}
            </div>
            
            {/* Main Image View */}
            <div className="flex-grow border border-slate-200 rounded bg-white p-4 flex items-center justify-center min-h-[400px] md:min-h-[500px] shadow-sm">
              {activeImage && (
                <img className="max-h-[450px] object-contain" alt={activeImage.alt} src={activeImage.main} />
              )}
            </div>
          </div>

          {/* Center: Info Block */}
          <div className="lg:col-span-4 flex flex-col gap-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h1 className="text-lg md:text-xl font-bold leading-tight text-slate-800 mb-1">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-[#004B3D] text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                  Renewed — Certified
                </span>
                <span className="text-emerald-700 hover:text-orange-700 hover:underline cursor-pointer font-medium text-[11px]">
                  Visit the {product.brand} Store
                </span>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2 border-y border-slate-100 py-2">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4].map(star => (
                  <span key={star} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: product.rating >= 4.5 ? "'FILL' 1" : "'FILL' 0" }}>
                  {product.rating >= 4.5 ? 'star' : 'star_half'}
                </span>
              </div>
              <span className="text-emerald-700 hover:underline cursor-pointer font-medium">{product.reviewsCount.toLocaleString()} ratings</span>
            </div>

            {/* Price block */}
            <div className="flex flex-col">
              <div className="flex items-start gap-1">
                <span className="text-xs font-bold mt-1 text-slate-800">₹</span>
                <span className="font-extrabold text-2xl text-slate-800 leading-none">{price}</span>
                <span className="text-xs font-bold mt-1 text-slate-800">.00</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                Inclusive of all taxes. Free Returns &amp; Fast Delivery. No-interest financing available.
              </p>
            </div>

            {/* Condition buttons */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-800">
                Condition: <span className="font-semibold text-emerald-800">{selectedCondition}</span>
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedCondition('Premium')}
                  className={`p-3 rounded-lg text-left border cursor-pointer bg-transparent transition-all ${
                    selectedCondition === 'Premium' 
                      ? 'border-emerald-600 border-2 bg-emerald-50/20 shadow-sm' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <p className="font-extrabold text-[10px] uppercase text-slate-700">Premium</p>
                  <p className="text-xs font-bold text-slate-800 mt-1">₹{product.pricePremium}.00</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">90%+ battery guarantee</p>
                </button>
                
                <button 
                  onClick={() => setSelectedCondition('Excellent')}
                  className={`p-3 rounded-lg text-left border cursor-pointer bg-transparent transition-all ${
                    selectedCondition === 'Excellent' 
                      ? 'border-emerald-600 border-2 bg-emerald-50/20 shadow-sm' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <p className="font-extrabold text-[10px] uppercase text-slate-700">Excellent</p>
                  <p className="text-xs font-bold text-slate-800 mt-1">₹{product.priceExcellent}.00</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">80%+ battery guarantee</p>
                </button>
              </div>
            </div>

            {/* Amazon Renewed Guarantee card */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-800">
                <span className="material-symbols-outlined text-emerald-700">verified_user</span>
                <span className="font-bold">Amazon Renewed Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">{product.conditionDesc}</p>
            </div>
          </div>

          {/* Right: Buy Box & Renewed Report */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Buy Box */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col">
                <div className="flex items-start gap-1">
                  <span className="text-xs font-bold mt-1 text-slate-800">₹</span>
                  <span className="font-extrabold text-2xl text-slate-800 leading-none">{price}</span>
                  <span className="text-xs font-bold mt-1 text-slate-800">.00</span>
                </div>
                <p className="text-xs text-slate-800 mt-3">FREE delivery <span className="font-bold">Wednesday, Oct 25</span></p>
                <p className="text-[10px] text-slate-400 mt-0.5">Order within 4 hrs 12 mins</p>
              </div>

              <div className="flex items-center gap-1 text-emerald-700">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                <span className="text-[11px] hover:underline cursor-pointer font-medium">Deliver to New York 10001</span>
              </div>

              <div className="text-base text-emerald-800 font-extrabold">In Stock</div>

              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={onAddToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2.5 rounded-full font-bold shadow-sm transition-colors border-none cursor-pointer"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={onAddToCart}
                  className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black py-2.5 rounded-full font-bold shadow-sm transition-colors border-none cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              <div className="text-[10px] text-slate-400 flex flex-col gap-1.5 mt-3 border-t border-slate-100 pt-3">
                <div className="flex justify-between"><span className="">Ships from</span> <span className="text-slate-700 font-medium">Amazon</span></div>
                <div className="flex justify-between"><span className="">Sold by</span> <span className="text-emerald-700 font-medium hover:underline cursor-pointer">Renewed Devices LLC</span></div>
                <div className="flex justify-between"><span className="">Returns</span> <span className="text-emerald-700 font-medium hover:underline cursor-pointer">Eligible for Return</span></div>
              </div>
            </div>

            {/* Renewed Report Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-sm">
              <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-xs text-slate-800">Renewed Report</h3>
                  <span className="text-[9px] text-slate-400 font-mono">ID: #AMZ-99210-R</span>
                </div>
                
                <div className="flex items-center gap-3 bg-emerald-50/30 p-2.5 rounded border border-emerald-500/10">
                  <div className="w-9 h-9 flex items-center justify-center bg-white rounded border border-slate-200 shrink-0">
                    <span className="material-symbols-outlined text-emerald-800 text-[18px]">package_2</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Return Reason</p>
                    <p className="text-xs font-extrabold text-slate-700">Open-box, never used</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Battery Health</span>
                      <span className="font-extrabold text-emerald-800">{batteryHealth}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${batteryWidth}`}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Cosmetic Grade</span>
                      <span className="font-extrabold text-slate-700">{cosmeticGrade}</span>
                    </div>
                    <div className="flex gap-1 h-1.5">
                      <div className="flex-1 bg-slate-100 rounded-full"></div>
                      <div className="flex-1 bg-slate-100 rounded-full"></div>
                      <div className="flex-1 bg-emerald-600 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                      <span className="">Fair</span>
                      <span className="">Good</span>
                      <span className="font-bold text-emerald-700">Excellent</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    <img 
                      className="rounded border border-slate-200 w-full aspect-square object-cover" 
                      alt="Refurbished Inspection 1" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo6OXeWT1uWH9MQw39lfqWNGfi0Vr62zWta2YV6-YlnzJlWWBWEcka6zYymXuU0rK6Puf-H1yjnM-HdW0DelO0AX7KNxGNBJqgUp1Qk5D28ztbK05Hkeux7oOuC2iiTGZokYPsq1HNUR5uzNs7c_LXFCfj8iasqR4iQCd4ZzsbvNatA915XGKZy0HRrO8nCn5lKClCbOmpHvweCDSoAmDgDQ7Ak_m0eWXqO0TbOtVhrLNsjngsYbR-FA"
                    />
                    <img 
                      className="rounded border border-slate-200 w-full aspect-square object-cover" 
                      alt="Refurbished Inspection 2" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjeLU3JWvd5nCaPUjgCPospRRcxhTsLqkdA4KFKLqNXhd-cj3o4OyktMxT0nGGPhzVF611T_9lvvvLhWDUEqwvSjDO9VwvpBfp8am-JVdAoV44l3FSJF9MAoC27Qn6lBjRaahOpa3Ww392sdWkVNWe3tdi8aSDZGNjA1uCPYmJaHNKbHz6_AU5LkBVBCfo2OuWOPQwxyAAd3g1kVWBImDROpjcnTGaIuOIUc6-lfSbA2s0Znn98qfibQ"
                    />
                    <div className="rounded border border-slate-200 w-full aspect-square bg-slate-50 flex items-center justify-center text-[10px] text-center px-1 text-slate-400 font-medium">
                      +4 Photos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Banner */}
        <div className="w-full bg-gradient-to-r from-[#E7F3F1] to-[#F1FAF8] border border-[#004B3D]/10 rounded-xl p-8 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[200px] text-[#004B3D]">eco</span>
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#004B3D] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>recycling</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#004B3D] mb-1">Impact Made Simple</h2>
              <p className="text-lg text-[#004B3D]/80">This purchase saved <span className="font-bold underline decoration-2">4.2kg of e-waste</span> from landfills.</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('listing')}
            className="relative z-10 px-6 py-2 border-2 border-[#004B3D] text-[#004B3D] font-bold rounded-full hover:bg-[#004B3D] hover:text-white transition-all bg-transparent cursor-pointer"
          >
            Learn About Renewed
          </button>
        </div>

        {/* Supplier Info Strip */}
        <div className="bg-white border border-slate-200 p-6 rounded flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-500">
                <span className="material-symbols-outlined">store</span>
              </div>
              <div>
                <p className="text-xs text-slate-500">Qualified Supplier</p>
                <p className="font-bold text-slate-800">Renewed Devices LLC</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-amber-500 font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-sm font-bold text-slate-700">4.9/5</span>
              <span className="text-xs text-slate-400">(12,400+ Lifetime Sales)</span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex gap-4 text-[11px] font-bold text-[#8a5100]">
              <span className="cursor-pointer hover:underline">Contact Supplier</span>
              <span className="cursor-pointer hover:underline">Seller Profile</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 max-w-[300px] text-right leading-relaxed">
            All Amazon Renewed sellers are vetted and perform a full diagnostic test, replacement of any defective parts, and a thorough cleaning.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#131921] text-[#c5c6cb] mt-12 w-full">
        <div className="flex flex-col items-center w-full py-16 px-10 max-w-[1440px] mx-auto text-center">
          <div className="text-[24px] font-bold text-white mb-8">Amazon Renewed</div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
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
