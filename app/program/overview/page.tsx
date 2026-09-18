'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ContactFooter from '@/components/ContactFooterTwo';
import localFont from 'next/font/local';

// ✅ 本地 Bodoni 字体（字体放在 app/ 下，此文件在 app/components/ 下时用 ../）
// 如果编译报错找不到路径，请参考文末的“路径调整”说明
const bodoni = localFont({
  src: [
    { path: '../../../app/fonts/Bodoni-06-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../../app/fonts/Bodoni-06-Bold.ttf',   weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-bodoni',
});

const OverView = () => {
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const imgRef = useRef(null);
  const boxRefDesktop = useRef(null);
  const boxRefMobile = useRef(null);
  const overviewRef = useRef(null);
  const scheduleRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    document.title = "Program Overview-ChinaPuzzles";
  }, []);

  useEffect(() => {
    const createObserver = (ref, setter) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setter(true);
          observer.disconnect();
        }
      }, { threshold: 0.15 });
      observer.observe(ref.current);
    };

    createObserver(imgRef, setIsImgVisible);
    createObserver(boxRefDesktop, setIsBoxVisible);
    createObserver(boxRefMobile, setIsBoxVisible);
    createObserver(overviewRef, setIsOverviewVisible);
    createObserver(scheduleRef, setIsScheduleVisible);
    createObserver(detailsRef, setIsDetailsVisible);
    createObserver(ctaRef, setIsCtaVisible);
  }, []);

  const experiences = [
    { num: "01", title: "Immerse in Chinese culture", desc: "Step beyond the landmarks. Wander local streets, share everyday meals, and see how ancient traditions live alongside modern life.", image: "/images/190909090901909090.png" },
    { num: "02", title: "Explore the business landscape", desc: "Visit leading companies and talk with the people behind them, unpacking industry logic and spotting opportunities firsthand.", image: "/images/068b84fe006895bd2c7962aaf9b8f65687b310a9.png" },
    { num: "03", title: "Build lasting connections", desc: "Meet entrepreneurs, professionals and locals along the way — building relationships that last long after you return home.", image: "/images/baf630e0474ab4160d03f221e2524bfd75e36c48.png" }
  ];

  const dimensions = [
    { iconBg: "/images/your-icon-one.png", title: "Practical insight", desc: "See China's business landscape through direct company access." },
    { iconBg: "/images/your-icon-two.png", title: "Cultural fluency", desc: "Connect historical context with contemporary daily life." },
    { iconBg: "/images/your-icon-sreen.png", title: "Peer exchange", desc: "Build perspective through structured group reflection." },
    { iconBg: "/images/your-icon-four.png", title: "Local confidence", desc: "Move through unfamiliar settings with informed curiosity." }
  ];

  const includedList = ["Inter-city transport", "Accommodation", "Most of the Meals", "Scheduled cultural activities", "Company visits", "Guest Speaker", "Official welcome and farewell event"];
  const notIncludedList = ["Airfare home country to China, airport to town transport on arrival and departure", "Personal meals, food, and beverages that are not offered by the program","Insurance, visa, and passport fee","Self-arranged tourist fee","Personal expenses"];

  return (
    <div className="bg-[#FCFAF7] overflow-hidden">

      {/* 顶部 Hero 区域 */}
      <div className="relative w-full h-auto">
        <div ref={imgRef} className={`relative w-full md:h-[520px] h-[360px] overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isImgVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}`}>
          <img
            src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/e7503873b899ccc56e6c16037b4a39bf8b257d10.png"
            alt="Program Overview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div ref={boxRefDesktop} className={`hidden md:block absolute inset-0 z-10 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="max-w-[1200px] mx-auto h-full relative px-6 lg:px-8">
            <div className="absolute left-0 bottom-24 w-full pointer-events-auto">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90">Home / Our Program / Program Overview</p>
              {/* ✅ 换成 Bodoni 字体 */}
              <h1 className={`${bodoni.className} text-5xl lg:text-6xl text-white tracking-tight leading-tight`}>Program Overview</h1>
              <p className="text-sm md:text-base text-white/90 font-light drop-shadow-md mt-6">Deepen your understanding of Chinese culture, explore the business landscape, and build lasting connections.</p>
              <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
            </div>
          </div>
        </div>

        <div ref={boxRefMobile} className={`md:hidden absolute inset-0 z-10 flex items-end p-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90">Home / Our Program / Program Overview</p>
            {/* ✅ 换成 Bodoni 字体 */}
            <h1 className={`${bodoni.className} text-4xl text-white tracking-tight leading-tight`}>Program Overview</h1>
            <p className="text-sm text-white/90 font-light drop-shadow-md mt-6">Deepen your understanding of Chinese culture, explore the business landscape, and build lasting connections.</p>
            <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
          </div>
        </div>
      </div>

      {/* 第一个板块 */}
      <div ref={overviewRef} className="w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 mt-28 md:mt-30 mb-28 md:mb-36">
        <div className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isOverviewVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="group">
            {/* ✅ 换成 Bodoni 字体 */}
            <h2 className={`${bodoni.className} text-[32px] lg:text-[42px] text-neutral-900 text-center whitespace-normal lg:whitespace-nowrap`}>Program Highlight</h2>
            <div className="mt-3 w-[80px] h-[3px] bg-[#B41615] mx-auto transition-all duration-1000 mb-16 lg:w-0 lg:group-hover:w-[240px]"></div>
          </div>
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
            {experiences.map((exp, idx) => {
              const isHovered = hoveredIndex === idx;
              const isSibling = hoveredIndex !== null && hoveredIndex !== idx;

              const currentClass = isHovered ? 'lg:basis-[590px] lg:grow-0 lg:shrink z-10 shadow-2xl' : '';
              const siblingClass = isSibling ? 'lg:basis-[290px] lg:grow-0 lg:shrink opacity-80 scale-[0.98]' : '';
              const defaultClass = (!isHovered && !isSibling) ? 'lg:basis-[calc((100%-1.5rem)/3)] lg:grow-0 lg:shrink' : '';

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative overflow-hidden cursor-pointer w-full transition-all duration-700 ease-in-out ${currentClass} ${siblingClass} ${defaultClass}`}
                >
                  <div className="relative w-full h-[250px] lg:h-[300px] overflow-hidden">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                    <span className="text-white/80 font-semibold text-sm mb-2 block">{exp.num}</span>
                    <h3 className="font-serif text-2xl leading-tight mb-2">{exp.title}</h3>
                    <p className="text-sm text-gray-300 max-h-20 overflow-hidden opacity-100 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:opacity-100">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 第二个板块 */}
      <div ref={scheduleRef} className="w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-36">
        <div className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isScheduleVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="group">
            {/* ✅ 换成 Bodoni 字体 */}
            <h2 className={`${bodoni.className} text-[32px] lg:text-[42px] text-neutral-900 text-center mb-6 whitespace-normal lg:whitespace-nowrap`}>What You Will Gain</h2>
            <div className="mt-3 w-[80px] h-[3px] bg-[#B41615] mx-auto transition-all duration-1000 mb-16 lg:w-0 lg:group-hover:w-[240px]"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {dimensions.map((dim, idx) => (
              <div key={idx} className={`text-center group transition-all duration-1000 ${isScheduleVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`} style={{ transitionDelay: isScheduleVisible ? `${idx * 150}ms` : '0ms' }}>
                <div className={`relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[146px] lg:h-[146px] mx-auto mb-6 transition-all duration-700 ${isScheduleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: isScheduleVisible ? `${150 + idx * 100}ms` : '0ms' }}>
                    <svg className="w-full h-full rotate-0 transition-transform duration-[1000ms] ease-in-out group-hover:rotate-[360deg]" viewBox="0 0 146 146">
                      <circle
                        cx="73" cy="73" r="70"
                        fill="none"
                        stroke="#B41615"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="transition-[stroke-width] duration-[1000ms] ease-in-out group-hover:stroke-[4]"
                      />
                    </svg>
                    <div
                      className="absolute inset-0 rounded-full bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${dim.iconBg}')`, backgroundSize: '100% 100%' }}
                    ></div>
                </div>

                <div className={`transition-all duration-700 ${isScheduleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isScheduleVisible ? `${250 + idx * 100}ms` : '0ms' }}>
                  <h3 className="font-bold text-[16px] lg:text-[20px] text-neutral-900 mb-3 transition-colors duration-300 group-hover:text-[#B41615]">
                    {dim.title}
                  </h3>
                  <p className="text-[12px] lg:text-[16px] text-neutral-600 leading-relaxed transition-colors duration-300 group-hover:text-[#B41615]">
                    {dim.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 第三个板块 */}
      <div ref={detailsRef} className="w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-36">
        <div className="bg-[#F8F7F4] p-[40px]">
          <div className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isDetailsVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
            <p className="text-sm font-bold tracking-widest text-[#B41615] uppercase mb-3">Program Details</p>
            {/* ✅ 换成 Bodoni 字体 */}
            <h2 className={`${bodoni.className} text-[32px] md:text-4xl text-neutral-900 tracking-tight`}>What's included. What's not.</h2>
            <div className="w-28 h-1 bg-[#B41615] mt-8 mb-12"></div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 ${isDetailsVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`} style={{ transitionDelay: isDetailsVisible ? '200ms' : '0ms' }}>
              <div className="relative">
                <div className="absolute top-0 left-0 md:left-8 bg-[#1A1F24] text-white text-center py-3 px-12 font-semibold w-fit z-10 -translate-y-1/2">
                  Included
                </div>
                <div className="bg-white border border-neutral-200 p-10 pt-16 min-h-[350px] shadow-sm transition-all duration-300 hover:shadow-xl">
                  <ul className="space-y-8">
                    {includedList.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-neutral-900 group/item transition-transform duration-300 hover:translate-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#B41615] shrink-0"></span>
                        <span className="text-lg transition-all duration-300 group-hover/item:text-[#B41615] group-hover/item:font-bold">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 md:left-8 bg-[#1A1F24] text-white text-center py-3 px-12 font-semibold w-fit z-10 -translate-y-1/2">
                  Not Included
                </div>
                <div className="bg-white border border-neutral-200 p-10 pt-16 min-h-[350px] shadow-sm transition-all duration-300 hover:shadow-xl">
                  <ul className="space-y-8">
                    {notIncludedList.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-neutral-900 group/item transition-transform duration-300 hover:translate-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#B41615] shrink-0"></span>
                        <span className="text-lg transition-all duration-300 group-hover/item:text-[#B41615] group-hover/item:font-bold">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第四个板块 */}
      <div ref={ctaRef} className={`relative w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-36 transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isCtaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
        <div className="bg-[#B41615] p-6 sm:p-12 lg:p-[76px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/633f20cbc6afb0830959c56412676588d369ac16.jpg')] bg-cover bg-center opacity-20 mix-blend-multiply pointer-events-none"></div>

          <div className="relative max-w-2xl">
            <p className="text-sm font-bold tracking-widest text-white/80 uppercase mb-3">Eligibility</p>
            {/* ✅ 换成 Bodoni 字体 */}
            <h2 className={`${bodoni.className} text-[32px] md:text-5xl text-white tracking-tight mb-6 whitespace-normal lg:whitespace-nowrap`}>Ready to meet China where it is.</h2>

            <div className={`transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: isCtaVisible ? '200ms' : '0ms' }}>
              <p className="text-white/80 text-base leading-relaxed mb-10">
               Global visitors, business professionals and International students are welcome to apply. Custom program for institutions or groups can be made through an inquiry.
              </p>

              <Link
                href="/program/options"
                className="inline-flex items-center justify-center w-full sm:w-auto max-w-[310px] rounded-full border-2 border-white text-white font-semibold py-3 px-8 hover:bg-white hover:text-[#B41615] transition-colors duration-300"
              >
                Explore Program Options →
              </Link>
            </div>

          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
};

export default OverView;