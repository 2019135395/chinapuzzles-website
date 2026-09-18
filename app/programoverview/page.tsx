'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ContactFooter from "@/components/ContactFooterTwo";

const ProgramPage = () => {
  // 出场动画控制
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const scheduleRef = useRef(null);
  const ctaRef = useRef(null);

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

    createObserver(heroRef, setIsHeroVisible);
    createObserver(overviewRef, setIsOverviewVisible);
    createObserver(scheduleRef, setIsScheduleVisible);
    createObserver(ctaRef, setIsCtaVisible);
  }, []);

  // Schedule 数据（已修改 Day 字段为 01, 02, 03, 04）
  const scheduleData = [
    {
      day: "01",
      title: "Arrival & Welcome",
      desc: "Begin with an opening briefing, a city orientation and time to settle into the journey.",
      image: "/images/aranya.png" 
    },
    {
      day: "02",
      title: "Culture & Heritage",
      desc: "Step into living history through architecture, craft and conversations with local hosts.",
      image: "/images/roundtable.png"
    },
    {
      day: "03",
      title: "Business & Innovation",
      desc: "Meet the people and ideas shaping China's fast-moving innovation landscape.",
      image: "/images/Enterprise.jpg"
    },
    {
      day: "04",
      title: "Local Experience",
      desc: "Share everyday moments, food and neighborhood stories that bring the itinerary to life.",
      image: "/images/aranya.png"
    }
  ];

  return (
    <div className="bg-white  sm:pt-22 overflow-hidden">
      
      {/* ==================== 顶部 Hero 部分 ==================== */}
      <div ref={heroRef} className="relative">
        {/* 图片容器：移动端/iPad 使用另一张图，最高 580px */}
        <div className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] max-h-[580px] overflow-hidden transition-all duration-1000 ease-out ${
          isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}>
          <picture>
            {/* 桌面端（≥1024px）：使用原图 */}
            <source
              media="(min-width: 1024px)"
              srcSet="/images/7a4d7d9dec15fbc3a2572f3b12ba720985e06ed6.png"
            />
            {/* 移动端 & iPad（<1024px）：使用另一张图，请替换成实际图片路径 */}
            <img
              src="/images/hero-mobile.jpg"
              alt="The North-South Axis: Empire, Pandas, and the Silicon Coast"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>

        {/* 外层容器 */}
        <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-300 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* 红色内容块 */}
          <div className="bg-[#B81C1C] text-white p-6 sm:p-8 md:p-12 -mt-16 sm:-mt-20 md:-mt-32 shadow-2xl w-full md:w-[920px] md:-ml-6 lg:-ml-8">
            <p className="text-xs font-bold tracking-widest uppercase mb-4">Program 01</p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl leading-tight mb-6 md:mb-8">
              The North-South Axis: Empire, Pandas, and the Silicon Coast
            </h1>
            <div className="flex flex-wrap gap-y-2 gap-x-2 text-sm font-medium border-t border-white/20 pt-6">
              <span>Beijing</span>
              <span className="hidden sm:inline">·</span>
              <span>Chengdu</span>
              <span className="hidden sm:inline">·</span>
              <span>Shenzhen</span>
              <span className="hidden sm:inline">·</span>
              <span>10 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Program Overview 部分 ==================== */}
      <div ref={overviewRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 mb-16 sm:mb-20">
        <div className={`transition-all duration-1000 ease-out ${
          isOverviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight mb-6 md:mb-8">Program Overview</h2>
          <p className="text-sm sm:text-[15px] leading-7 text-neutral-600 max-w-4xl">
            This 10-day program is designed for you to trace China's arc. From the imperial north to the innovation south. Participants will walk through the Forbidden City and onto the Great Wall, meet giant pandas in Chengdu, and end in Shenzhen — the engine room of China's digital economy.
          </p>
        </div>
      </div>

      {/* ==================== Schedule 部分（外层 1200px 米色，内部宽度 1140px，四个列表项背景白色） ==================== */}
      <div ref={scheduleRef} className="w-full bg-white">
        <div className={`max-w-[1200px] mx-auto bg-[#F4F1EA] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 transition-all duration-1000 ease-out ${
          isScheduleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          
          {/* 内部约束宽度为1140px，不设置背景色 */}
          <div className="max-w-[1140px] mx-auto w-full">
            <div className="mb-8 md:mb-12">
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight mb-4">Schedule</h2>
              <p className="text-sm font-medium text-[#B81C1C] flex items-center gap-2">
                Day by day itinerary
               
              </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {scheduleData.map((item, index) => (
                <div 
                  key={index}
                  // 列表项自身背景为白色 bg-white
                  className="group flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 md:p-8"
                >
                  {/* Day 标签 */}
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-[#B81C1C] text-white flex items-center justify-center text-[18px] font-semibold transition-transform duration-300 group-hover:scale-105">
                    {item.day}
                  </div>
                  {/* 中间文字：强制左对齐 */}
                  <div className="flex-1 w-full md:w-auto text-left px-0 md:px-8">
                    <h3 className="font-serif text-xl md:text-3xl text-neutral-900 mb-3 transition-colors duration-300 group-hover:text-[#B81C1C]">
                      {item.title}
                    </h3>
                    {/* 红线：默认靠左 */}
                    <div className="w-12 h-[3px] bg-[#B81C1C] mb-4"></div>
                    <p className="text-sm md:text-[15px] leading-7 text-neutral-600">
                      {item.desc}
                    </p>
                  </div>

                  {/* 右侧图片：手机全宽，电脑固定大小 */}
                  <div className="flex-shrink-0 w-full md:w-[200px] lg:w-[240px] h-[140px] md:h-[150px] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==================== 底部 CTA 部分 ==================== */}
      <div ref={ctaRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28">
        <div className={`transition-all duration-1000 ease-out ${
          isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>

          <Link href="/contact/inquiryform" className="inline-flex items-center justify-center w-[300px] bg-[#B41615] text-white font-semibold py-4 px-10 rounded-sm hover:bg-[#8a0f0f] transition-colors -ml-4 sm:-ml-6 lg:-ml-8">Send Inquiry →</Link>

        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

export default ProgramPage;