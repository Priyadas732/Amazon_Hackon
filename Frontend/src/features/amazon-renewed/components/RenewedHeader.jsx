import React from 'react';

export default function RenewedHeader({ onNavigate, onExit, cartCount, userLocation }) {
  const locationLabel = userLocation?.label || 'India';

  return (
    <header className="bg-[#131921] text-white w-full border-b border-slate-800 sticky top-0 z-50">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Upper Tier */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center cursor-pointer p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm transition-all"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
                alt="Amazon" 
                className="h-8 object-contain brightness-0 invert"
              />
            </div>

            <div className="hidden lg:flex items-center text-white text-sm gap-1 hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer transition-all">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] opacity-70">Deliver to</span>
                <span className="font-bold text-xs">{locationLabel}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl">
            <div className="flex h-10 w-full bg-white rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#febd69]">
              <button 
                onClick={() => onNavigate('listing')}
                className="bg-[#f3f3f3] text-slate-700 px-4 border-r border-slate-350 flex items-center gap-1 text-xs font-semibold hover:bg-slate-205 border-none cursor-pointer"
              >
                Amazon Renewed <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
              </button>
              <input 
                className="flex-1 border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 px-4 text-sm" 
                placeholder="Search Amazon" 
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('listing');
                  }
                }}
              />
              <button 
                onClick={() => onNavigate('listing')}
                className="bg-[#febd69] hover:bg-[#f3a847] transition-colors px-5 flex items-center justify-center text-black border-none cursor-pointer"
              >
                <span className="material-symbols-outlined font-bold">search</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="hidden xl:flex items-center gap-1 px-3 py-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer text-white">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
                className="w-5 h-3.5 object-cover" 
                alt="EN"
              />
              <span className="font-bold text-xs flex items-center">EN <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span></span>
            </div>

            {/* Hello, Sign in */}
            <div className="hidden xl:flex flex-col px-3 py-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer leading-tight text-white">
              <span className="text-[11px] opacity-80">Hello, sign in</span>
              <span className="font-bold text-xs flex items-center">Account &amp; Lists <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span></span>
            </div>

            {/* Returns & Orders (Acts as Exit button back to logistics Returns Hub) */}
            <div 
              onClick={onExit}
              className="flex flex-col px-3 py-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer leading-tight text-white select-none"
              title="Return to Logistics Returns Hub"
            >
              <span className="text-[11px] opacity-80">Returns</span>
              <span className="font-bold text-xs">&amp; Orders</span>
            </div>

            {/* Shopping Cart */}
            <div className="flex items-center gap-1 px-3 py-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer relative text-white">
              <span className="material-symbols-outlined text-[32px]">shopping_cart</span>
              <div className="flex flex-col">
                <span className="absolute top-1 left-7 text-[#f08804] text-[14px] font-extrabold px-1.5 rounded-full min-w-[20px] text-center bg-transparent">
                  {cartCount}
                </span>
                <span className="font-bold text-xs self-end mt-4">Cart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Tier Sub-nav */}
        <div className="flex items-center justify-between h-10 border-t border-slate-800 text-xs text-white">
          <nav className="flex items-center gap-4 font-medium overflow-x-auto select-none py-1">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white px-2 py-1 transition-all text-white bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu</span> All
            </button>
            <span 
              onClick={() => onNavigate('listing')}
              className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap"
            >
              Today's Deals
            </span>
            <span className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap">
              Prime Video
            </span>
            <span className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap">
              Gift Cards
            </span>
            <span className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap">
              Sell
            </span>
            <span 
              onClick={() => onNavigate('listing')}
              className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap"
            >
              Registry
            </span>
            <span className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm cursor-pointer whitespace-nowrap">
              Customer Service
            </span>
          </nav>
          
          {/* Explicit Exit Link */}
          <div 
            onClick={onExit}
            className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white px-3 py-1 rounded-sm cursor-pointer text-[#ff9900] font-bold transition-all select-none ml-auto"
            title="Exit Amazon Renewed and return to Logistics Dashboard"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Exit Store</span>
          </div>
        </div>
      </div>
    </header>
  );
}
