'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import localFont from 'next/font/local';

// ✅ 本地 Bodoni 字体（字体放在 app/ 下）
// 如果编译报错找不到路径，请参考文末的“路径调整”说明
const bodoni = localFont({
  src: [
    { path: '../app/fonts/Bodoni-06-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../app/fonts/Bodoni-06-Bold.ttf',   weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-bodoni',
});

const philosophyText = "China is a global economic powerhouse where ancient heritage meets fast-paced innovation — and no article or headline can substitute for being there. China Puzzles connects you with an authentic, first-hand China experience. Our programs blend high-tech industry visits, hands-on business engagement and immersive cultural travel. We help global visitors, business professionals and university students see how ancient traditions intersect with cutting-edge development — on the ground, in real time.";

const advantages = [
  {
    title: "From Impression to\nUnderstanding",
    description: "Cultural context that makes each visit meaningful.",
    longDesc: "China's development is powered by its people and built for its people. From everyday street life to national milestones, we bring you closer to the real China — so impression becomes understanding.",
    image: "/images/99089089089089089089.png"
  },
  {
    title: "From Visits to\nExploration",
    description: "Active dialogues that turn observation into insight.",
    longDesc: "Move past surface tours. Talk with enterprise leaders, decode industry logic, and surface real opportunities — turning visits into exploration.",
    image: "/images/5052059ed23400278f95d9b751bbafeebace37d6.jpg"
  },
  {
    title: "From Metropolis to\nAuthentic Local Experience",
    description: "Purposeful city encounters and local perspectives.",
    longDesc: "Move past the stereotypical image of a “superpower”. Explore thriving smaller-scale cities and experience authentic Chinese life first-hand.",
    image: "/images/1eb2f84ab6fe161e5617070e196715ba24b18feb.jpg"
  },
  {
    title: "Fully-inclusive & \nCustomizable",
    description: "Formats shaped for cohorts, institutions and objectives.",
    longDesc: "One all-inclusive package, built around your goals. University cohorts and professional groups — each gets a program tailored to its objectives.",
    image: "/images/909089898989089089.png"
  }
];

const programOptions = [
  { id: "01", title: "Short-term Explorer", duration: "5-7 Days", desc: "Travel small, explore deep. Boutique tours of one region.", image: "/images/bb4536e408b97f8c4aed9b375dd87a2c49267153.png" },
  { id: "02", title: "Custom University / Institutional Program", duration: "Tailor-made", desc: "Bespoke modules shaped around your institution and cohort.", image: "/images/655b834e69ce97579c5d54b95c92fd4bf0be2d80.jpg" },
  { id: "03", title: "Full Immersion Program", duration: "10-14 Days", desc: "Multi-city immersion through company visits, dialogues and cultural experiences.", image: "/images/3930311c521a207f946cd10b916998e5ba038ac6.jpg" },
];

const Highlights = () => {
  const [isWhyChooseVisible, setIsWhyChooseVisible] = useState(false);
  const whyChooseRef = useRef(null);
  const [isAdvantagesVisible, setIsAdvantagesVisible] = useState(false);
  const advantagesRef = useRef(null);
  const [isProgramOptionsVisible, setIsProgramOptionsVisible] = useState(false);
  const programOptionsRef = useRef(null);

  const [activeAdvantage, setActiveAdvantage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const totalPages = Math.max(1, programOptions.length - visibleCount + 1);

  useEffect(() => {
    const createObserver = (ref, setter, threshold = 0.15) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { setter(true); observer.disconnect(); }
      }, { threshold });
      observer.observe(ref.current);
    };

    createObserver(whyChooseRef, setIsWhyChooseVisible);
    createObserver(advantagesRef, setIsAdvantagesVisible, 0.2);
    createObserver(programOptionsRef, setIsProgramOptionsVisible);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let newCount = 3;
      if (window.innerWidth < 1024) newCount = 1;
      setVisibleCount(newCount);
      setCurrentIndex(prev => Math.min(prev, programOptions.length - newCount));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const maxSlide = programOptions.length - visibleCount;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, visibleCount]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex(prev => {
      const maxSlide = programOptions.length - visibleCount;
      return prev <= 0 ? maxSlide : prev - 1;
    });
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex(prev => {
      const maxSlide = programOptions.length - visibleCount;
      return prev >= maxSlide ? 0 : prev + 1;
    });
    setTimeout(() => setIsPaused(false), 100);
  };

  return (
    <div className="bg-white pt-8 sm:pt-12 flex flex-col">

      {/* ==================== 板块1 Why Choose China Puzzles ==================== */}
      <div className="max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 order-1">
        {/* 标题 */}
        <div className={`mb-8 text-center transition-all duration-1000 ease-out ${isWhyChooseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group">
            {/* ✅ 换成 Bodoni 字体，字号保持不变 */}
            <h2 className={`${bodoni.className} text-[30px] lg:text-[42px] text-neutral-900 text-center whitespace-normal lg:whitespace-nowrap`}>
              Why Choose China Puzzles
            </h2>
            <div className="mt-3 w-[80px] h-[3px] bg-[#B41615] mx-auto transition-all duration-1000 mb-12 lg:w-0 lg:group-hover:w-[240px]"></div>
          </div>
        </div>

        <div ref={whyChooseRef} className="flex flex-col lg:flex-row lg:h-[520px] overflow-hidden">

          {/* 左侧图片 */}
          <div className={`relative w-full lg:w-1/2 h-[300px] lg:h-full shrink-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isWhyChooseVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-md'}`}>
            <img src="/images/5933318cfea28dadecb6d7311b101f43e37746cd.jpg" alt="Why Choose China Puzzles" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* 右侧文字区域 */}
          <div className={`relative lg:w-1/2 h-full bg-[#F1EEE7] flex items-center p-8 lg:p-16 transition-all duration-700 ease-out ${isWhyChooseVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-md'}`}>
            <div className="w-full">
              <div className="space-y-4">
                <p
                  className={`text-sm md:text-[15px] leading-7 text-neutral-600 transition-all duration-1000 ease-out ${
                    isWhyChooseVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-md'
                  }`}
                  style={{ transitionDelay: isWhyChooseVisible ? '300ms' : '0ms' }}
                >
                  {philosophyText}
                </p>

                <p
                  className={`text-sm md:text-[15px] leading-7 text-neutral-600 transition-all duration-1000 ease-out ${
                    isWhyChooseVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-md'
                  }`}
                  style={{ transitionDelay: isWhyChooseVisible ? '600ms' : '0ms' }}
                >
                  Our program combines high-tech industry visits, hands-on business opportunities, and immersive cultural travel.
                </p>

                <p
                  className={`text-sm md:text-[15px] leading-7 text-neutral-600 transition-all duration-1000 ease-out ${
                    isWhyChooseVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-md'
                  }`}
                  style={{ transitionDelay: isWhyChooseVisible ? '900ms' : '0ms' }}
                >
                  We aim to help global visitors, business professionals and university students witness how ancient traditions intersect with cutting-edge development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 板块3 Program Options ==================== */}
      <div className="mt-10 w-full bg-white order-2 lg:order-3">
        <div ref={programOptionsRef} className="py-8 sm:py-10 lg:py-12">
          <div className={`transition-all duration-1000 ease-out ${isProgramOptionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="max-w-[1264px] mx-auto w-full px-4 sm:px-6 lg:px-8">
              {/* 标题 */}
              <div className={`mb-8 text-center transition-all duration-1000 ease-out ${isProgramOptionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="group">
                  {/* ✅ 换成 Bodoni 字体，字号保持不变 */}
                  <h2 className={`${bodoni.className} text-[32px] lg:text-[42px] text-neutral-900 text-center whitespace-normal lg:whitespace-nowrap`}>
                    Program Options
                  </h2>
                  <div className="mt-3 w-[80px] h-[3px] bg-[#B41615] mx-auto transition-all duration-1000 mb-12 lg:w-0 lg:group-hover:w-[240px]"></div>
                </div>
              </div>
              <div
                style={{ transitionDelay: isProgramOptionsVisible ? '300ms' : '0ms' }}
                className={`overflow-hidden w-full transition-all duration-1000 ease-out ${isProgramOptionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex transition-transform duration-[600ms] ease-out" style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}>
                  {programOptions.map((option, index) => (
                    <div key={index} className="shrink-0 px-3" style={{ width: `${100 / visibleCount}%` }}>
                      <div className="group h-full border border-neutral-200 bg-white flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-[#B41615]">
                        <div className="overflow-hidden w-full">
                          <img src={option.image} alt={option.title} className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                        </div>
                        <div className="flex flex-col flex-1 p-6 md:p-8 text-center">
                          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-3 group-hover:text-[#B41615] transition-colors duration-300">{option.title}</h3>
                          <p className="text-[#B41615] font-medium mb-3">{option.duration}</p>
                          <p className="text-neutral-600 text-sm leading-relaxed">{option.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{ transitionDelay: isProgramOptionsVisible ? '600ms' : '0ms' }}
                className={`mt-8 flex items-center justify-center gap-5 transition-all duration-1000 ease-out ${isProgramOptionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <button onClick={handlePrev} className="w-9 h-9 rounded-full border border-neutral-300 bg-white text-neutral-500 hover:bg-[#B41615] hover:text-white hover:border-[#B41615] transition-all flex items-center justify-center">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  <span className="font-medium text-neutral-900">{String(currentIndex + 1).padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{String(totalPages).padStart(2, '0')}</span>
                </div>
                <div className="w-36 h-[2px] bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#B41615] transition-all duration-700 ease-out" style={{ width: `${((currentIndex + visibleCount) / programOptions.length) * 100}%` }} />
                </div>
                <button onClick={handleNext} className="w-9 h-9 rounded-full border border-[#B41615] bg-[#B41615] text-white hover:bg-white hover:text-[#B41615] transition-all flex items-center justify-center">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 板块2 Our Advantages ==================== */}
      <div
        ref={advantagesRef}
        className={`mt-10 w-full bg-white transition-all duration-[1000ms] ease-out order-3 lg:order-2 ${
          isAdvantagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <div className="py-8 sm:py-10 lg:py-12">
          <div className="max-w-[1264px] mx-auto w-full px-4 sm:px-6 lg:px-8">
            {/* 标题 */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest text-[#B41615] uppercase mb-3">WHY CHINA PUZZLES</p>
              {/* ✅ 换成 Bodoni 字体，字号保持不变 */}
              <h2 className={`${bodoni.className} text-[42px] text-neutral-900 tracking-tight mb-3`}>
                Unfold a real picture of China.
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-0 lg:gap-14 lg:items-stretch">
              {/* 左侧列表（移动端：每一项下方附带对应图片；桌面端：纯列表） */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                {advantages.map((adv, index) => {
                  const isActive = activeAdvantage === index;
                  return (
                    <div key={index} className="border-b border-neutral-200">
                      {/* 列表项 */}
                      <div
                        onMouseEnter={() => setActiveAdvantage(index)}
                        onClick={() => setActiveAdvantage(index)}
                        className="group relative flex justify-between items-start py-7 cursor-pointer transition-colors duration-300"
                      >
                        <span
                          className={`absolute left-0 top-2 bottom-2 w-[3px] bg-[#B41615] transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                        <div className="flex gap-5 pl-6 w-full">
                          <span className={`text-sm mt-1 font-medium transition-colors duration-300 ${isActive ? 'text-[#B41615]' : 'text-neutral-400'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className={`font-serif text-2xl md:text-[28px] leading-snug whitespace-pre-line transition-colors duration-300 ${isActive ? 'text-neutral-900' : 'text-neutral-700'}`}>
                              {adv.title}
                            </h3>
                            <p className={`text-sm mt-2 transition-colors duration-300 ${isActive ? 'text-neutral-600' : 'text-neutral-500'}`}>
                              {adv.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          size={20}
                          className={`self-center transition-colors duration-300 ${isActive ? 'text-[#B41615]' : 'text-neutral-400 group-hover:text-neutral-600'}`}
                        />
                      </div>

                      {/* 移动端 / ipad端展开内容 */}
                      <div
                        className={`lg:hidden grid transition-all duration-500 ease-out ${
                          isActive ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0 mb-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <img
                            src={adv.image}
                            alt={adv.title}
                            className="w-full h-[200px] object-cover"
                          />
                          <div className="bg-[#B41615] p-6 md:p-7 text-white">
                            <p className="text-xs uppercase tracking-widest font-semibold mb-2 opacity-90">ACTIVE ADVANTAGE</p>
                            <h3 className="font-serif text-xl md:text-2xl leading-snug mb-2 whitespace-pre-line">
                              {adv.title}
                            </h3>
                            <p className="text-sm opacity-85 leading-relaxed">
                              {adv.longDesc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 桌面端：右侧图片区域 */}
              <div className="hidden lg:block lg:w-1/2 relative lg:h-[650px] lg:min-h-[450px] overflow-hidden">
                {advantages.map((adv, idx) => (
                  <img
                    key={idx}
                    src={adv.image}
                    alt={adv.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeAdvantage === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute bottom-0 left-0 right-0 bg-[#B41615]/95 p-7 md:p-8 text-white">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-2 opacity-90">ACTIVE ADVANTAGE</p>
                  <h3 className="font-serif text-2xl md:text-[28px] leading-snug mb-2 whitespace-pre-line">
                    {advantages[activeAdvantage].title}
                  </h3>
                  <p className="text-sm opacity-85 leading-relaxed">
                    {advantages[activeAdvantage].longDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;