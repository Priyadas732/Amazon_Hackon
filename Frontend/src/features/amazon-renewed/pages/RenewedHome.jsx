import React, { useState, useEffect } from 'react';

export default function RenewedHome({ onNavigate, onExit, onAddToCart }) {
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = num => String(num).padStart(2, '0');

  return (
    <div className="min-h-screen bg-[#F0F2F2] text-[#1c1b1c] flex flex-col font-sans antialiased animate-fade-in selection:bg-orange-200">
      {/* Custom Styles / Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .hero-gradient {
          background: radial-gradient(circle at center, #4a9b6e 0%, #1a5c3f 100%);
        }
      `}</style>

      <main className="flex-grow w-full">
        {/* Hero Banner Section */}
        <section className="hero-gradient relative w-full h-[480px] flex items-center overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-10 w-full grid grid-cols-12 relative z-10">
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-4 text-white py-16">
              <h1 className="text-[48px] font-bold leading-[56px] tracking-[-0.02em] drop-shadow-lg" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                Expertly refurbished products at great prices
              </h1>
              <p className="text-[18px] font-normal leading-[28px] opacity-90 drop-shadow-md mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Backed by the Amazon Renewed Guarantee. Like-new quality you can trust.
              </p>
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => onNavigate('listing')}
                  className="bg-[#fe9800] hover:bg-[#ffb86f] text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all transform active:scale-95 border-none cursor-pointer text-sm"
                >
                  Shop All Deals
                </button>
                <button 
                  onClick={() => onNavigate('listing')}
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-lg transition-all cursor-pointer text-sm"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Floating Product Cutouts (Decorative) */}
            <div className="hidden lg:block col-span-6 relative h-[480px]">
              <div className="absolute top-10 right-0 w-64 h-64 animate-bounce [animation-duration:6s]">
                <img 
                  className="w-full h-full object-contain" 
                  alt="Sleek smartphone" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1mylh6m439lrChPRvyLPFor_3qL3fx2_A8azmbnh0Rrs3ucQG2KdTD1XPJMZwGfZ-41GnTtTLEXREsI2on9Uyfw4U1-2onBSZNei6rwx0t_EXtjmH4ZDyaDKSRAFr11mgVav0P1y7YpozPMNI-4CU6INJgVc-N6PTj06_1aw4VhdL8yQkR-qBrscWhmCh1yn0TEQSLM52ii878zNp8YREyEjFEF-8DieEYbnowBWSojfZhZ0c_YKniw"
                />
              </div>
              <div className="absolute bottom-10 right-20 w-80 h-80 animate-pulse [animation-duration:8s]">
                <img 
                  className="w-full h-full object-contain" 
                  alt="Slim laptop" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCetLVkM16DxAAD9FMBVBUYIkxJVodhdyI-4R-XWPuZLKJ3oewae6vx9gcTTS8izPylQvczU_fB4GVbJ8qZBXR_uMhvIpwcvLPiWpUFymuHXkOPmlxH3V8Rg9_OsnvxHy2VmTcLMnEpB8sTJx8pe190yw2OuBQuIxtuusIk7BpH-MY0-pnV2r6DBIo58nTLVGeMhA1RF7fFtyiZFEYwl4TfGleJx1BYX9VoS8kBGq1Bsr8WbJKA6WF2Cw"
                />
              </div>
              <div className="absolute top-1/2 left-10 w-48 h-48 animate-bounce [animation-duration:4s]">
                <img 
                  className="w-full h-full object-contain" 
                  alt="Wireless headphones" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF-Wk19bC7mSYCD11j8hyqfsh_w7nLpDInz9QgekVYQgcxGwVH737IwnZZ1rCsL-MMN5tPUP5rouuwc-QRg8PMzctHIgYrufUkrISfW1qMshrUhIFlw_QNY04DCcIMSCEbTRYBu72pzwVXwvAkx0BFoyeigxv0wZ1Vyw3asGDagm8BsR5ejkkqsIO_nBjJorkBw2xk_fOkcd3vxoH-NNDNwzr8ncVGkto4m4V5nuY8DqO77Nkvksl-4w"
                />
              </div>
              <div className="absolute bottom-20 -right-10 w-40 h-40 animate-pulse [animation-duration:5s]">
                <img 
                  className="w-full h-full object-contain" 
                  alt="Gaming controller" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Mb2kQRx1uAG1lBxrU-9QDhWHNBkK5ytdoXdXgLDqEwILqyIZ1TfkbEwTf5p864eXE5ouwpDn71LKy2g4T6U-jgPWY8j0BTF-YnxD5S1etnt-_OXYbDFeG-4H1B_PWGwppkHyp1Os3grwBoeG0H-smeec5GXgOyECj8IW5S996klEhsaUzUnDj44jHdWL6NJ7SlSDA2tgufB73i85Rwq-mM7P2rhebujk-ozdbPWGXV9AlEuGYCN6fw"
                />
              </div>
            </div>
          </div>
          {/* Subtle background pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        </section>

        {/* Trust Badges Section */}
        <section className="max-w-[1440px] mx-auto px-10 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 border border-[#c5c6cb] shadow-md rounded-lg flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-[#f6f3f3] flex items-center justify-center text-[#8a5100] shrink-0">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#45474b]">IMEI Verified</h3>
                <p className="text-xs text-[#45474b]/70 mt-0.5">Certified clean history and network compatibility.</p>
              </div>
            </div>

            <div className="bg-white p-4 border border-[#c5c6cb] shadow-md rounded-lg flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-[#f6f3f3] flex items-center justify-center text-[#8a5100] shrink-0">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#45474b]">6-Month Warranty</h3>
                <p className="text-xs text-[#45474b]/70 mt-0.5">Hassle-free replacement or refund guarantee.</p>
              </div>
            </div>

            <div className="bg-white p-4 border border-[#c5c6cb] shadow-md rounded-lg flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-full bg-[#f6f3f3] flex items-center justify-center text-[#8a5100] shrink-0">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>battery_charging_full</span>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#45474b]">Real Battery Health</h3>
                <p className="text-xs text-[#45474b]/70 mt-0.5">Tested to ensure at least 80% original capacity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid Section */}
        <section className="max-w-[1440px] mx-auto px-10 py-16">
          <div className="bg-white border border-[#c5c6cb] rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[24px] font-semibold leading-[32px] text-[#1c1b1c]" style={{ fontFamily: "'Work Sans', sans-serif" }}>Shop By Category</h2>
              <span 
                onClick={() => onNavigate('listing')}
                className="text-[#8a5100] font-medium hover:underline text-sm cursor-pointer"
              >
                See all refurbished deals
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {[
                { label: 'Phones', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkONSdVuWvxegb9O8BNQ_Intj1qycxXgk4AyZ-sRLrjwPTMlP3iRhyREUywlO8QhgrmiSlP_Bi6DUOopa1fZcbfsj7SsP_5aVGVwqT7DgK9v8LxxCsG6_5bqoljNJMjv3plkJyRZ6tTKN8DbkGpamAcnV9yq2e99nbBqdrf0aOSmXvmS_55Q0Z5mJ1wY8ZEvE3EwpQpXJsz3GpuXSuv_qlFEyDlCFja8paU7ykmog-0rGxut961f5yvA' },
                { label: 'Laptops', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZcgcbnreckJ_IN68DqVwdjjFtkbXp0bRRIl60Hup4jS-lFYQY7wVSNKiNX1Ue9DAw8E8198P64lLcDIj3bjFh6UQEhPBsjMd5Jcy1IIKteCq5Z1FmTojAR9xvhMrNmgB7XEA-mWqqjB5tmGm9QYMvM-hOWM9uhymWH9_Y0KF6s4RZI45o8hJxqh7KoWCpyI5EzZEN3GHlHhrsGY9tjcgj9Hoahme5YWyGdDiDwo9PvhZR1nQteiNs2A' },
                { label: 'Bags', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0A7bo7j_05Jhd2GeIYVU76zT8AuWByIqDH_-0vMU96V1my0Eepv3AFhZKMEggwblqKB9WjLwdgs3Tpvazxngd7cUfLnwV6njZK_IKt9YNElqLRtOz4JoJJAue3gqBr4GG6tTDVQ-TMerLw7KAlkXOJHCVHAoPt6YLDtZ4bHDn_J5NMosXZbrPEIFgDXrcB41HIE3M6g7puH-yMTRsjHL7kXnVLR7V9JWZ6R56a2FRlj1Zxwuhwe6PQg' },
                { label: 'Printers', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRS3LNimGgKBx3lf3ccKC9EV4mfHNZHCQvgXvVkbVD7LqDdDEKCeL1gSdRX8rUOpqghP6olY2rSW_cmVENaxgN6-xsgbDftwB68S3nG9JaY--fNh-oA2hPZ3PBdq0IOTQ-CGqcOGVJtxNd8x7SdB4fve6528JYZ31OQ6m0xZXQ6iBuKLJB7hqRU85wxmcVNiyrDcEqkns0wiZprXpyFRbRdsxEtT7k26pjQ1_84cpBEHqliJV_D-aCJw' },
                { label: 'Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARrzZQ3NUXwhv8ME2YZvftT3JgaC8bcYzO7R7tCumBW1topn75mJRGSLcQjQvqF5Z7NjpqiuMhdYlZlLHO8EFijt3q1siqilqe3YjP57mAkjfxfoW_XPzyvSwXFPFSG7awZGAaHMLmCEr6iDexuzCRF74YKb6iCtFiCNbyf2ooUPaa_swYO3ezIl7fZRditXMEqo9vjcO6F5uzmu59VMKJBkjhkUpeRq5xiFAsoCrDEdDWrjVPuUpFnQ' },
                { label: 'Watches', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGM_pgjK8hQsKqoQEajT3UCJCxJB9r6RXJ2dWluf5_iy3UuApkwhSvUuTFVb8tUGbx-1bmjZxDoxTfN-qAnuZZLQTcUXemXnk3DLE6hptX9FykQgIxQLtxh4rw0jtBrWQry9518okUd2jM9Q_pWHCLLbPNkjf5eGDDr0r7Lh8JLbUHpNS7MiMugUr1x11SU1e3hKiOSMSvXTmomskEz4mpUpkNrSGo_GWCBXfDYoH6snXxDeR_kQbB-A' },
              ].map((cat, idx) => (
                <div 
                  key={idx}
                  onClick={() => onNavigate('listing')}
                  className="flex flex-col items-center gap-3 group cursor-pointer"
                >
                  <div className="w-32 h-32 rounded-full bg-[#f6f3f3] flex items-center justify-center overflow-hidden border border-[#c5c6cb] group-hover:shadow-md group-hover:border-[#8a5100] transition-all">
                    <img 
                      className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300" 
                      alt={cat.label} 
                      src={cat.img}
                    />
                  </div>
                  <span className="font-bold text-[#45474b] group-hover:text-[#8a5100] transition-colors">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Product Bento Grid */}
        <section className="max-w-[1440px] mx-auto px-10 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6">
            
            {/* Large Feature Card: Deal of the Day */}
            <div className="md:col-span-2 md:row-span-2 bg-white border border-[#c5c6cb] rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow group">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-[#1c1b1c]" style={{ fontFamily: "'Work Sans', sans-serif" }}>Deal of the Day</h3>
                </div>
                
                {/* Live Countdown Timer */}
                <div className="flex items-center gap-1.5 text-xs text-red-650 font-bold bg-red-50 px-2 py-1 rounded border border-red-100">
                  <span className="material-symbols-outlined text-[15px] animate-pulse">schedule</span>
                  <span>Ends in:</span>
                  <span className="font-mono bg-red-650 text-white text-[11px] px-1 py-0.5 rounded shadow-sm">{formatNumber(timeLeft.hours)}</span>
                  <span>:</span>
                  <span className="font-mono bg-red-650 text-white text-[11px] px-1 py-0.5 rounded shadow-sm">{formatNumber(timeLeft.minutes)}</span>
                  <span>:</span>
                  <span className="font-mono bg-red-650 text-white text-[11px] px-1 py-0.5 rounded shadow-sm">{formatNumber(timeLeft.seconds)}</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigate('pdp', 'prod-macbookpro')}
                className="flex-1 min-h-[300px] mb-4 overflow-hidden rounded-md relative cursor-pointer"
              >
                <img 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500 rounded-md" 
                  alt="Apple MacBook Pro 16" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0JkuOrdP0khLr2730s9CQVd8bvhWpKBNkURfoHgoDo9FuW39LPUHVpTbYh05OyU8kEk0TwUKI9rZjmg9iurlkBn33nKLLkwjSMtJDcgCNg4D9EIIo4EQ6MxQwI3GdfHPF8PNyT57jLv7miFz2uznB_KGG1L96kAP718nVdINfEpKe7xL5DU7ACgkhTMC69a7GOWMeOWnpJGo3jTKymX0KwdV7NDo0YkQYEeIAOWRmtvioxNFj3XjkoQ"
                />
                <div className="absolute top-4 left-4 bg-red-650 text-white px-3 py-1 font-bold text-sm rounded-sm">SAVE 35%</div>
              </div>

              <div className="flex flex-col gap-1">
                <p 
                  onClick={() => onNavigate('pdp', 'prod-macbookpro')}
                  className="font-bold text-lg leading-tight hover:text-[#8a5100] cursor-pointer transition-colors"
                >
                  Apple MacBook Pro 16" (2021) - M1 Pro, 16GB RAM, 512GB SSD - Space Gray (Renewed)
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-red-650 font-bold text-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>₹1,02,990</span>
                  <span className="text-[#45474b]/60 line-through text-sm">₹1,56,900</span>
                </div>
                <button 
                  onClick={onAddToCart}
                  className="w-full mt-4 bg-[#fe9800] hover:bg-[#ffb86f] text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer border-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Right Tier 1: Phones under ₹25,000 */}
            <div className="bg-white border border-[#c5c6cb] rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Phones under ₹25,000</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div 
                  onClick={() => onNavigate('listing')}
                  className="bg-[#f6f3f3] rounded-md p-2 flex items-center justify-center h-24 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    className="h-full object-contain" 
                    alt="Smartphone" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHMqXQ7gGib9R63uT9oz2DTSmOH163ICaa3uCYUUCKKs53eeawXp_819e4tYtALyEG9tjG9EOH_aeVoxsevGQnoT3Rcfizw_QFghvxtE4VotFxRUqQRCHQc5gArvY-gTK-uOwYNr0fFogHkyEcN5hILiJU5MX4HiZFef836zJWKIanEHynearmxpjtEMhdFLAHTHYxeCpQmtSBa7ZhG2GGwyIzFg3ffjtVbrX34F8nrVs45mhabUP4hA"
                  />
                </div>
                <div 
                  onClick={() => onNavigate('listing')}
                  className="bg-[#f6f3f3] rounded-md p-2 flex items-center justify-center h-24 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    className="h-full object-contain" 
                    alt="Smartphone rear" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3zy4yPEAtCT88D8FLRLr6J7nOc9ETLv21OWMwjA06tkHk5IWtqpVDBq0kSVNyFlqMrRP-k6iB4x54aPU4ppDUHxg_8huuyhVgxrhKCpYBAY3lFfM32eTUzgoZq3fSgFjpgUaTmMMMF_-qo56I3nXsN5tcnaiiQeSNbFBkNot4Xw0YQdAyUnSFRzD69o2lqlHMu1X3vP831D2PF8meufOVZ9c_3fXUZm458PMI1CrKtlWTCz8GR6b-7w"
                  />
                </div>
                <div 
                  onClick={() => onNavigate('listing')}
                  className="bg-[#f6f3f3] rounded-md p-2 flex items-center justify-center h-24 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    className="h-full object-contain" 
                    alt="Budget phone" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDumBdrYqw0UV7YiLsgrvVv-PXjdjywWbROsp8Z8ZDwiCtDW-tCRt-6_enEpZexyD3wtrncgdsVgMlnqU41B2mGfsz9kWi4LfW_2jgHN6ZQb7AyzYJVwCq7swrFD7GgDFCpCW6bGXiDymOrfSC6oR7MyGaVHOc2lLEHpeRC3vsJOFXbRCsFTgUIFgnskLxDxXx78Tu_oYZmN75d1cRV2VlxKqfmSEeKXM6XPBxWbiZL_eSOxPaDcDRRYA"
                  />
                </div>
                <div 
                  onClick={() => onNavigate('listing')}
                  className="bg-[#f6f3f3] hover:bg-slate-200 rounded-md p-2 flex flex-col items-center justify-center h-24 text-xs font-bold text-[#8a5100] text-center leading-tight cursor-pointer transition-colors"
                >
                  <span>Shop all Phones</span>
                  <span className="material-symbols-outlined text-[16px] mt-1">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Right Tier 2: Refurbished Audio */}
            <div className="bg-white border border-[#c5c6cb] rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">Refurbished Audio</h3>
                <div 
                  onClick={() => onNavigate('pdp', 'prod-sony')}
                  className="h-40 bg-[#f6f3f3] rounded-md flex items-center justify-center overflow-hidden mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    className="h-3/4 object-contain" 
                    alt="Wireless headphones" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr8NN1DLXzXQ-U0qmZIJy9inJn3Vh50MW8nBGzi-YCjtqp-P_EMEl8BJUXAkqEAsIFSdk_gzN3-7go2rYd6CwQzn3FKyRv9BXOaNj47bsmP6e0M2uJWUP9ohZTewcSuf0gDLo6U6StRgC-E2JDQiYUuxa9yJJlCPMWDtZjt677TKN7mKRIGtvevPljyyQrvGVZ5dRH9uVJ0rHVa0QhEOnUTzgWTJCwCjEUFEJJGGm0n8ehzWQ01S5Wjg"
                  />
                </div>
                <p className="text-sm font-medium text-[#45474b]">Top Brands: Sony, Bose, Sennheiser</p>
              </div>
              <span 
                onClick={() => onNavigate('pdp', 'prod-sony')}
                className="text-[#8a5100] text-xs font-bold hover:underline mt-2 inline-block cursor-pointer"
              >
                Explore Audio Deals
              </span>
            </div>

            {/* Bottom Tier: Renewed for Business */}
            <div className="md:col-span-2 bg-white border border-[#c5c6cb] rounded-lg p-4 hover:shadow-lg transition-shadow flex items-center gap-6">
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">Renewed for Business</h3>
                <p className="text-sm text-[#45474b] mb-4">Equip your team with enterprise-grade tech at a fraction of the cost. Bulk discounts available.</p>
                <button 
                  onClick={() => onNavigate('listing')}
                  className="bg-white border border-[#c5c6cb] hover:bg-[#f6f3f3] font-bold py-2 px-6 rounded-lg text-sm transition-all cursor-pointer"
                >
                  Get a Quote
                </button>
              </div>
              <div className="w-48 h-32 bg-[#f6f3f3] rounded-md hidden sm:flex items-center justify-center text-slate-350">
                <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>business_center</span>
              </div>
            </div>
            
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#131921] text-white w-full border-t border-slate-800">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-[#37475a] hover:bg-[#485769] text-white py-4 text-sm font-bold border-none transition-colors cursor-pointer"
        >
          Back to top
        </button>
        <div className="flex flex-col items-center w-full py-16 px-10 max-w-[1440px] mx-auto text-xs text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full mb-12 text-[#c5c6cb]">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-2">Get to Know Us</h4>
              <span className="hover:underline cursor-pointer">Careers</span>
              <span className="hover:underline cursor-pointer">About Amazon</span>
              <span className="hover:underline cursor-pointer">Sustainability</span>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-2">Make Money with Us</h4>
              <span className="hover:underline cursor-pointer">Sell on Amazon</span>
              <span className="hover:underline cursor-pointer">Supply to Amazon</span>
              <span className="hover:underline cursor-pointer">Protect Your Brand</span>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-2">Amazon Payment</h4>
              <span className="hover:underline cursor-pointer">Amazon Visa</span>
              <span className="hover:underline cursor-pointer">Amazon Store Card</span>
              <span className="hover:underline cursor-pointer">Amazon Currency Converter</span>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-2">Let Us Help You</h4>
              <span className="hover:underline cursor-pointer">Amazon Renewed Guarantee</span>
              <span className="hover:underline cursor-pointer">Shipping Rates &amp; Policies</span>
              <span className="hover:underline cursor-pointer">Returns &amp; Replacements</span>
            </div>
          </div>
          <div className="w-full border-t border-slate-700 pt-8 flex flex-col items-center gap-4">
            <span className="text-[20px] font-semibold leading-[32px] text-white">Amazon Renewed</span>
            <div className="flex flex-wrap justify-center gap-6 text-xs mt-4 text-[#c5c6cb]">
              <span className="hover:underline cursor-pointer">Conditions of Use</span>
              <span className="hover:underline cursor-pointer">Privacy Notice</span>
              <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
              <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
            </div>
            <p className="text-xs text-slate-400 mt-4">© 1996-2026, Amazon.com, Inc. or its affiliates</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
