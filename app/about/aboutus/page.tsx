'use client';

import { useState, useEffect, useRef } from 'react';
import ContactFooter from '@/components/ContactFooterTwo';
import localFont from 'next/font/local';

// ✅ 更换为 Libre Bodoni 字体
const libreBodoni = localFont({
  src: [
    { path: '../../../app/fonts/libre-bodoni/LibreBodoni-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../app/fonts/libre-bodoni/LibreBodoni-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../../app/fonts/libre-bodoni/LibreBodoni-Bold.woff2',   weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-libre-bodoni',
});

const AboutUsPage = () => {
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isMissionVisible, setIsMissionVisible] = useState(false);
  const [isApproachVisible, setIsApproachVisible] = useState(false);
  const [isTeamVisible, setIsTeamVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);

  const [hoveredTeamIndex, setHoveredTeamIndex] = useState(null);

  const imgRef = useRef(null);
  const boxRefDesktop = useRef(null);
  const boxRefMobile = useRef(null);
  const missionRef = useRef(null);
  const approachRef = useRef(null);
  const teamRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    document.title = "About Us | China Puzzles";
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
    createObserver(missionRef, setIsMissionVisible);
    createObserver(approachRef, setIsApproachVisible);
    createObserver(teamRef, setIsTeamVisible);
    createObserver(testimonialsRef, setIsTestimonialsVisible);
  }, []);

  // 团队成员数据（请替换为真实图片）
  const teamMembers = [
    { name: "Tia Liu", role: "Founder / Director", links: "LinkedIn · Instagram", image: "/images/Enterprise.jpg" },
    { name: "Catherine Chung", role: "Founder / Director", links: "Instagram · LinkedIn", image: "/images/roundtable.png" },
    { name: "Ryan Fisher", role: "Itinerary Advisor", links: "LinkedIn · Instagram", image: "/images/aranya.png" }
  ];

  // 客户见证数据（已去除图片）
  const testimonialsData = [
    {
      quote: "An experience that made the China we read about feel immediate and human.na we read about feel immediate and human.",
      name: "Maya Chen",
      role: "MBA Student"
    },
    {
      quote: "The conversations stayed with me long after the program ended.",
      name: "Alex Morgan",
      role: "CEO of a company"
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-neutral-900 overflow-hidden">

      {/* 顶部 Hero 区域 */}
      <div className="relative w-full h-auto">
        <div ref={imgRef} className={`relative w-full md:h-[520px] h-[360px] overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isImgVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}`}>
          <img
            src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/3f9788c1fcdc956e3d61864639bad4ad86f73cc1.png"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div ref={boxRefDesktop} className={`hidden md:block absolute inset-0 z-10 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="max-w-[1200px] mx-auto h-full relative px-6 lg:px-8">
            <div className="absolute left-0 bottom-24 w-full pointer-events-auto">
              <p className="text-xs font-bold tracking-widest mb-4 text-white/90">About ChinaPuzzles</p>
              <h1 className={`${libreBodoni.className} text-5xl lg:text-6xl text-white tracking-tight leading-tight`}>About Us</h1>
               <p className="text-sm md:text-base text-white/90 font-light drop-shadow-md mt-6">People, places and conversations that make China tangible.</p>
              <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
            </div>
          </div>
        </div>

        <div ref={boxRefMobile} className={`md:hidden absolute inset-0 z-10 flex items-end p-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="w-full">
            <p className="text-xs font-bold tracking-widest mb-4 text-white/90">About ChinaPuzzles</p>
            <h1 className={`${libreBodoni.className} text-4xl text-white tracking-tight leading-tight`}>About Us</h1>
            <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
          </div>
        </div>
      </div>

      {/* 第一个板块：Our Mission */}
      <div ref={missionRef} className="max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ease-out ${isMissionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="overflow-hidden group">
            <img
              src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/8cc3bad225dd8985b39ff2a3d4aefdf78199f5c3.jpg"
              alt="Our Mission"
              className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#B41615] uppercase mb-6">Our Mission</p>
            <h2 className={`${libreBodoni.className} text-[38px] text-neutral-900 leading-snug mb-6`}>
              China Puzzles - a one‑stop solution for cultural immersion and business travel in China. Help every participant piece together a complete, nuanced, and living picture of China.
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
             We bring field visits, guest dialogues and cultural experiences into one carefully curated journey — designed to turn commercial insight into local context.
            </p>
          </div>
        </div>
      </div>

      {/* 第二个板块：Our Approach */}
      <div ref={approachRef} className="w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
        <div className={`bg-[#F9F6F1] transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isApproachVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="overflow-hidden">
            <img
              src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/7c4a5752b036b33e8465d6001f7bf46dd3459472.jpg"
              alt="Our Approach"
              className="w-full h-[215px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className={`group text-center py-16 md:py-20 transition-all duration-1000 ${isApproachVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: isApproachVisible ? '200ms' : '0ms' }}>
            <p className="text-xs font-bold tracking-widest text-[#B41615] uppercase mb-4">Our Approach</p>
            <h2 className={`${libreBodoni.className} text-3xl md:text-4xl text-neutral-900 leading-snug mb-4`}>Learning by moving through China</h2>
            <div className="mt-3 w-[80px] h-[3px] bg-[#B41615] mx-auto transition-all duration-1000 mb-8 lg:w-0 lg:group-hover:w-[240px]"></div>
            <p className="text-neutral-600 text-base leading-relaxed max-w-2xl mx-auto px-4">
              Every program connects people, places and perspectives. We move from formal conversations to shared daily moments, balancing ambition with genuine exchange.
            </p>
          </div>
        </div>
      </div>

      {/* 第四个板块：Testimonials（已去除图片，字体加大并换成 Libre Bodoni） */}
      <div ref={testimonialsRef} className="w-full bg-[#F9F6F1] py-20 md:py-28">
        <div className={`max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          <div className="mb-12 md:mb-16">
            <p className="text-xs font-bold tracking-widest text-[#B41615] uppercase mb-4">Participant Perspectives</p>
            <h2 className={`${libreBodoni.className} text-4xl md:text-5xl text-neutral-900 leading-snug mb-4`}>what participants take</h2>
            <p className="text-neutral-600 text-base">Real reflections, kept distinct from the team story.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className={`${libreBodoni.className} text-[#B41615] text-6xl md:text-7xl leading-none mb-6`}>“</div>
                    <p className={`${libreBodoni.className} text-3xl md:text-4xl text-neutral-900 leading-snug mb-10`}>
                      {item.quote}
                    </p>
                  </div>

                  <div>
                    <p className={`${libreBodoni.className} text-[#B41615] font-bold text-base md:text-lg mb-2`}>
                      {item.name} · {item.role}
                    </p>
                    <p className={`${libreBodoni.className} text-neutral-500 text-sm md:text-base`}>Participant testimonial</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <ContactFooter />
    </div>
  );
};

export default AboutUsPage;