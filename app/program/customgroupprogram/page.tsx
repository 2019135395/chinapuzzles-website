'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ContactFooter from '@/components/ContactFooterTwo';

const CustomGroupProgramPage = () => {
  // 主体内容动画控制
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  // Hero区域拆分动画控制
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const boxRefDesktop = useRef(null);
  const boxRefMobile = useRef(null);

  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    document.title = "Custom Group Program-ChinaPuzzles";
  }, []);

  useEffect(() => {
    const createObserver = (ref, setter, threshold = 0.15) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setter(true);
            observer.disconnect();
          }
        },
        { threshold }
      );
      observer.observe(ref.current);
    };

    createObserver(imgRef, setIsImgVisible);
    createObserver(boxRefDesktop, setIsBoxVisible);
    createObserver(boxRefMobile, setIsBoxVisible);
    createObserver(contentRef, setIsContentVisible);
    createObserver(cardsRef, setIsCardsVisible);
    createObserver(ctaRef, setIsCtaVisible);
  }, []);

  // 卡片数据
  const features = [
    { title: "Cities", desc: "Adjust destinations and city combinations to match your learning objectives." },
    { title: "Duration", desc: "Choose a focused format or an extended multi-city journey." },
    { title: "Theme Modules", desc: "Digital economy, consumer market, traditional culture and more." },
    { title: "Delivery Mode", desc: "On-site programs or blended online and offline formats." }
  ];

  return (
    <div className="bg-[#F8F7F4] text-neutral-900 overflow-x-hidden">
      
      {/* 顶部 Hero 区域 */}
      <div className="relative w-full h-auto">
        <div ref={imgRef} className={`relative w-full md:h-[520px] h-[360px] overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isImgVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}`}>
          <img 
            src="/images/d31e33454fe580001fd505de2793deba36b8191f.jpg" 
            alt="Custom Group Program" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div ref={boxRefDesktop} className={`hidden md:block absolute inset-0 z-10 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="max-w-[1200px] mx-auto h-full relative px-6 lg:px-8">
            <div className="absolute left-0 bottom-24 w-full pointer-events-auto">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90">Our Program / Custom Group Program</p>
              <h1 className="font-serif text-5xl lg:text-6xl text-white tracking-tight leading-tight">Custom Group Program</h1>
              <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
            </div>
          </div>
        </div>

        <div ref={boxRefMobile} className={`md:hidden absolute inset-0 z-10 flex items-end p-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90">Our Program / Custom Group Program</p>
            <h1 className="font-serif text-4xl text-white tracking-tight leading-tight">Custom Group Program</h1>
            <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
          </div>
        </div>
      </div>

      {/* ==================== 主体内容区（已去除上下边距） ==================== */}
      <main className="flex-1 w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 标题和描述：先出场（自带上下边距） */}
        <div ref={contentRef} className={`mt-28 md:mt-36 mb-28 md:mb-36 transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isContentVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <h2 className="font-serif text-[38px] text-neutral-900 mb-6 text-left">
            Tailored for universities, institutions and professional groups.
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed max-w-4xl text-left">
            Build a program around your learning goals, group profile and preferred China experience. ChinaPuzzles supports university faculties, student organizations and professional institutions/companies with carefully selected deep-dive sets to ensure interaction.
          </p>
        </div>

        {/* ==================== 第二个板块：四个卡片 ==================== */}
        <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-28 md:mb-36`}>
          {features.map((item, index) => (
            <div 
              key={index}
              className={`group bg-white border-l-8 border-[#B41615] p-10 shadow-md transition-all duration-1000 hover:-translate-y-2 hover:shadow-2xl ${isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isCardsVisible ? `${index * 150}ms` : '0ms' }}
            >
              <h3 className="font-serif text-3xl text-neutral-900 mb-4 transition-colors duration-300 group-hover:text-[#B41615]">
                {item.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ==================== 第三个板块：红色CTA ==================== */}
        <div ref={ctaRef} className={`relative w-full max-w-[1264px] mx-auto mb-28 md:mb-36 transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isCtaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="bg-[#B41615] p-10 md:p-16 relative overflow-hidden">
            {/* 背景纹理遮罩 */}
            <div className="absolute inset-0 bg-[url('/images/7694077456657449565a9284a728e22d6b5e3090.png')] bg-cover bg-center opacity-20 mix-blend-multiply pointer-events-none"></div>
            
            <div className="relative text-white">
              {/* 标题先出 */}
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Start a group inquiry</h2>
              
              {/* 描述和按钮延迟 200ms 出场 */}
              <div className={`transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: isCtaVisible ? '200ms' : '0ms' }}>
                <p className="text-red-100 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
                  Share your preferred cities, duration, theme and expected travel time. Our team will help shape a tailored program for your group.
                </p>
                
                {/* 明显 hover 效果：尺寸 210px * 48px，颜色反转+上移+阴影 */}
                <Link
                  href="/contact/contactus"
                  className="flex items-center justify-center w-[210px] h-[48px] bg-white text-[#B41615] font-semibold rounded-sm transition-all duration-300 hover:bg-[#B41615] hover:text-white hover:border-2 hover:border-white hover:shadow-xl hover:-translate-y-1"
                >
                  Send Inquiry →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>

      <ContactFooter />
      
    </div>
  );
};

export default CustomGroupProgramPage;