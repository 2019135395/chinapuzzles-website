'use client';

import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import ContactFooter from '@/components/ContactFooterTwo';
import localFont from 'next/font/local';

const libreBodoni = localFont({
  src: [
    { path: '../../../app/fonts/libre-bodoni/LibreBodoni-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../app/fonts/libre-bodoni/LibreBodoni-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../../app/fonts/libre-bodoni/LibreBodoni-Bold.woff2',   weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-libre-bodoni',
});

type FAQ = {
  q: string;
  a: ReactNode;
  isLink?: boolean;
  link?: string;
};

const faqs: FAQ[] = [
  {
    q: "Do I need a visa to travel to China?",
    a: "Whether you need a visa for China depends on your nationality, trip purpose, and length of stay: citizens of many European countries, plus Australia, New Zealand, South Korea, Japan, Brazil, Argentina, Chile, Peru, Uruguay, and several Gulf states can enter visa-free for up to 30 days for tourism, business, or visiting relatives; those transiting to a third country can stay up to 10 days (240-hour transit scheme) visa-free with a valid passport and onward tickets; everyone else, or anyone staying longer, must apply in advance for the appropriate visa (e.g., an L tourist visa or M business visa) at a Chinese embassy or consulate. Note that your passport should be valid for at least six months, that Hong Kong and Macau have separate immigration rules, and that policies change frequently—always verify your eligibility with official sources before booking."
  },
  { q: "What to see for your first tour to China?", a: "Explore iconic historical landmarks, modern developments and local neighborhoods. The itinerary is carefully curated to provide a balanced experience." },
  { q: "What are the highlights of the Seasonal Featured Trips?", a: "Seasonal trips feature special events, festivals, and weather-appropriate destinations to maximize your experience." },
  { q: "What kind of food can I try during the tour in China?", a: "You will have the opportunity to try a wide variety of regional Chinese cuisines, from classic Peking duck to fresh local delicacies." },
  { q: "What is the local currency, and can I use my credit card?", a: "The local currency is RMB (Yuan). Credit cards are widely accepted in major cities, but carrying some cash for small vendors is recommended." },
  { q: "Can I access Facebook or Google Maps in China?", a: "Access to these services is restricted in China. We recommend downloading a VPN app before arrival before arrival and using local alternatives for maps and messaging." },
  { q: "Will I have access to Wi-Fi?", a: "Yes, free Wi-Fi is available in all hotels, most restaurants, and public areas in major cities." },
  { q: "How can I get a SIM card or eSIM for my trip to China?", a: "You can easily purchase a SIM card at the airport upon arrival or set up an international eSIM before your departure." },
  { q: "How is participant safety managed?", a: "Safety is our top priority. All itineraries include vetted transportation and 24/7 assistance from our team. Travel insurance is recommended but not included." },
  { q: "How do I receive confirmation details?", a: "After you submit your application and make the initial payment, you will receive a comprehensive confirmation package including your trip schedule." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "FAQs | China Puzzles";
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

  const toggleFAQ = (index: number) => {
    if (faqs[index].isLink && faqs[index].link) {
      window.open(faqs[index].link, '_blank');
      return;
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-neutral-900 flex flex-col">

      <div ref={heroRef} className="relative w-full overflow-hidden">
        <div className="relative w-full h-[360px] md:h-[520px] max-h-[580px] overflow-hidden">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/4c952a2db10f014558457ed6621f67d5d6dc3612.jpg"
            />
            <img
              src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/4c952a2db10f014558457ed6621f67d5d6dc3612-mobile.png"
              alt="Resources"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-[#B41615]/80"></div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className={`max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all duration-[1200ms] ease-out ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <p className="text-xs font-bold tracking-widest text-white/80 uppercase mb-4">Home / Resources</p>
            <h1 className={`${libreBodoni.className} text-5xl md:text-7xl text-white tracking-tight`}>Resources</h1>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div ref={contentRef}>

          <div className={`bg-[#F1EEE7] relative overflow-hidden mb-16 transition-all duration-[1200ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-30">
               <img src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/auoursoioioi.png" alt="Flyer" className="w-full h-full object-cover object-right transform rotate-12 scale-125" />
            </div>

            <div className="relative z-10 h-[250px] flex flex-col md:flex-row justify-between items-start md:items-center p-8 md:p-12 gap-6">
              <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}>
                <h2 className={`${libreBodoni.className} text-3xl md:text-4xl text-neutral-900 mb-3`}>Program Brochure</h2>
                <p className="text-neutral-600 text-sm md:text-base max-w-lg">
                  Download the latest program brochure for itinerary highlights, inclusions and inquiry details.
                </p>
              </div>

              <a
                href="/ChinaPuzzles2026-Brochure.pdf"
                download="ChinaPuzzles2026-Brochure.pdf"
                className={`bg-[#B41615] hover:bg-[#8a0f0f] text-white font-semibold py-3 transition-all duration-1000 ease-out w-full max-w-[270px] md:w-[270px] whitespace-nowrap inline-flex items-center justify-center z-20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
              >
                Program Brochure ↓
              </a>
            </div>
          </div>

          <div className={`mb-10 transition-all duration-[1000ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}>
            <h2 className={`${libreBodoni.className} text-4xl md:text-5xl text-neutral-900 tracking-tight`}>FAQs</h2>
          </div>

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
                            <div className="text-neutral-600 text-sm md:text-base leading-relaxed">{faq.a}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

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
                  <h2 className={`${libreBodoni.className} text-3xl md:text-4xl text-neutral-900 mb-4`}>A Welcome Guide to China</h2>
                  <p className="text-neutral-600 text-sm md:text-base mb-8">An official reference for travelling, living and getting settled in China.</p>
                </div>

                <a
                  href="https://www.nia.gov.cn/English/2025/Guide_en/mobile/index.html"
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

              <div className={`w-[140px] flex-shrink-0 transition-all duration-1000 ease-out ${isBottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isBottomVisible ? '150ms' : '0ms' }}>
                <img
                  src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/2d56b5f8225092ced8654603c517820cd3298bee.jpg"
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