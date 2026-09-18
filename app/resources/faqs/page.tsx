'use client';

import { useState, useEffect, useRef } from 'react';
import ContactFooter from '@/components/ContactFooterTwo'; 

const faqs = [
  { q: "Do I need a visa to tour to China?", a: "Inter-city transport, accommodation, meals, scheduled cultural activities and company visits are included. International airfare, visa fees and personal expenses are excluded." },
  { q: "What to see for your first tour to China?", a: "Explore iconic historical landmarks, modern developments and local neighborhoods. The itinerary is carefully curated to provide a balanced experience." },
  { q: "What are the highlights of the Seasonal featured Trips?", a: "Seasonal trips feature special events, festivals, and weather-appropriate destinations to maximize your experience." },
  { q: "What kind of food can I try during the tour in China?", a: "You will have the opportunity to try a wide variety of regional Chinese cuisines, from classic Peking duck to fresh local delicacies." },
  { q: "What is the local currency, and can I use my credit card?", a: "The local currency is RMB (Yuan). Credit cards are widely accepted in major cities, but carrying some cash for small vendors is recommended." },
  { q: "Can I access Facebook or Google Map in China?", a: "Access to these services is restricted in China. We recommend downloading a VPN before arrival and using local alternatives for maps and messaging." },
  { q: "Will I have access to Wi-Fi?", a: "Yes, free Wi-Fi is available in all hotels, most restaurants, and public areas in major cities." },
  { q: "How can I get a SIM card or eSIM for my trip to China?", a: "You can easily purchase a SIM card at the airport upon arrival or set up an international eSIM before your departure." },
  { q: "How is participant safety managed?", a: "Safety is our top priority. All itineraries include insurance, vetted transportation, and 24/7 assistance from our team." },
  { q: "How do I receive confirmation details?", a: "After you submit your application and make the initial payment, you will receive a comprehensive confirmation package including your trip schedule." },
  { q: "China Gort Guide: Working & Living in China", a: "", isLink: true, link: "https://www.chinapuzzles.com" }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    document.title = "FAQs-ChinaPuzzles";
  }, []);

  useEffect(() => {
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsHeroVisible(true);
        heroObserver.disconnect();
      }
    }, { threshold: 0.1 });

    const contentObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        contentObserver.disconnect();
      }
    }, { threshold: 0.1 });

    const bottomObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsBottomVisible(true);
        bottomObserver.disconnect();
      }
    }, { threshold: 0.2 });

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (contentRef.current) contentObserver.observe(contentRef.current);
    if (bottomRef.current) bottomObserver.observe(bottomRef.current);

    return () => {
      heroObserver.disconnect();
      contentObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  const toggleFAQ = (index) => {
    if (faqs[index].isLink) {
      window.open(faqs[index].link, '_blank');
      return;
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-neutral-900 flex flex-col">
      
      {/* 顶部 Hero 区域 */}
      <div ref={heroRef} className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bottom" style={{ backgroundImage: "url('/images/4c952a2db10f014558457ed6621f67d5d6dc3612.jpg')" }}></div>
        <div className="absolute inset-0 bg-[#B41615]/80"></div>
        
        <div className={`relative z-10 max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 h-[240px] md:h-[330px] flex flex-col justify-center transition-all duration-[1200ms] ease-out ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <p className="text-xs font-bold tracking-widest text-white/80 uppercase mb-4">Home / Resources</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight">Resources</h1>
        </div>
      </div>

      {/* FAQ主内容区 */}
      <main className="flex-1 w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        
        <div ref={contentRef}>
          
          {/* 第一板块：Program Flyer */}
          <div className={`bg-[#F1EEE7] relative overflow-hidden mb-16 transition-all duration-[1200ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-30">
               <img src="/images/auoursoioioi.png" alt="Flyer" className="w-full h-full object-cover object-right transform rotate-12 scale-125" />
            </div>

            <div className="relative z-10 h-[250px] flex flex-col md:flex-row justify-between items-start md:items-center p-8 md:p-12 gap-6">
              <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
                <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-3">Program Flyer</h2>
                <p className="text-neutral-600 text-sm md:text-base max-w-lg">
                  Download the latest program brochure for itinerary highlights, inclusions and inquiry details.
                </p>
              </div>
              
              <a 
                href="/2025ChinaPuzzlesFlyer.pdf" 
                download="2025ChinaPuzzles_Flyer.pdf"
                className={`bg-[#B41615] hover:bg-[#8a0f0f] text-white font-semibold py-3 transition-all duration-1000 ease-out w-full max-w-[270px] md:w-[270px] whitespace-nowrap inline-flex items-center justify-center z-20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
              >
                Download Flyer ↓
              </a>
            </div>
          </div>

          {/* FAQs 主标题 */}
          <div className={`mb-10 transition-all duration-[1000ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 tracking-tight">FAQs</h2>
          </div>

          {/* FAQ 列表 */}
          <div className="flex flex-col gap-4 mb-20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  style={{ transitionDelay: isVisible ? `${200 + index * 80}ms` : '0ms' }}
                  className={`bg-white transition-all duration-700 ease-in-out border-l-4 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${isOpen ? 'border-[#B41615] shadow-md' : 'border-transparent hover:bg-neutral-50'}`}
                >
                  <button onClick={() => toggleFAQ(index)} className="w-full text-left cursor-pointer p-6 md:p-8">
                    <div className="flex items-start gap-4 md:gap-6">
                      <span className={`text-sm md:text-lg font-medium flex-shrink-0 w-8 pt-0.5 transition-colors duration-700 ${isOpen ? 'text-[#B41615]' : 'text-neutral-400'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={`font-semibold text-sm md:text-xl leading-snug transition-colors duration-700 ${isOpen ? 'text-neutral-900' : 'text-neutral-700'}`}>
                            {faq.q}
                          </h3>
                          <span className={`flex items-center justify-center text-[26px] font-bold flex-shrink-0 leading-none transition-colors duration-300 ${
                            faq.isLink ? 'text-neutral-400 hover:text-[#B41615]' : isOpen ? 'text-[#B41615]' : 'text-neutral-500'
                          }`}>
                            {faq.isLink ? '↗' : (isOpen ? '−' : '+')}
                          </span>
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 md:mt-6 translate-y-0' : 'grid-rows-[0fr] opacity-0 translate-y-4'}`}>
                          <div className="overflow-hidden">
                            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* 底部板块：Official Reference（滑动到底部才触发，图片宽度140px） */}
          <div 
            ref={bottomRef}
            className={`bg-[#F1EEE7] p-8 md:p-12 transition-all duration-[1200ms] ease-out relative overflow-hidden ${
              isBottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: isBottomVisible ? '0ms' : '0ms' }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
              
              <div className="flex-1">
                <div className={`transition-all duration-1000 ease-out ${isBottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isBottomVisible ? '0ms' : '0ms' }}>
                  <p className="text-xs font-bold tracking-widest text-[#B41615] uppercase mb-4">Official Reference</p>
                  <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">A Welcome Guide to China</h2>
                  <p className="text-neutral-600 text-sm md:text-base mb-8">An official reference for travelling, living and getting settled in China.</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-[#B41615] hover:bg-[#8a0f0f] text-white font-semibold py-3 transition-all duration-1000 ease-out inline-flex items-center justify-center whitespace-nowrap rounded-full w-full max-w-[205px] md:w-[205px] ${
                    isBottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: isBottomVisible ? '300ms' : '0ms' }}
                >
                  Open guide ↗
                </a>
              </div>
              
              {/* 右侧图片：宽度修改为 140px，路径替换 */}
              <div className={`w-[140px] flex-shrink-0 transition-all duration-1000 ease-out ${isBottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isBottomVisible ? '150ms' : '0ms' }}>
                <img 
                  src="/images/2d56b5f8225092ced8654603c517820cd3298bee.jpg" 
                  alt="A Welcome Guide to China" 
                  className="w-full h-auto object-contain shadow-xl"
                />
              </div>
            </div>

          </div>

        </div>
      </main>

      <ContactFooter />
      
    </div>
  );
}