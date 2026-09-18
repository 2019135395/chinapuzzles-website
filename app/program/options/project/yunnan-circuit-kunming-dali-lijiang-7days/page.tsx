'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ContactFooter from "@/components/ContactFooterTwo";

// === 单个日程卡片组件（已去除图片） ===
const ScheduleCard = ({ item, isVisible, delay }) => {
  return (
    <div
      id={`day-${item.day}`}
      className={`group bg-white p-6 md:p-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} scroll-mt-[100px] w-full max-w-full`}
      style={{
        transitionDelay: isVisible ? delay : '0ms',
        border: '1px solid #E0DBD1',
        borderRadius: 0
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="inline-block bg-[#B41615] text-white text-sm font-bold px-3 py-1 h-fit rounded-sm">
          {item.label}
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 break-words">{item.title}</h3>
      </div>

      <div className="relative mb-10">
        <div className="absolute left-[8px] top-2 bottom-2 w-[2px] bg-neutral-200 z-0"></div>
        <div className="space-y-8">
          {item.events.map((event, i) => (
            <div key={i} className="relative flex items-start pl-[30px]">
              <div className={`absolute left-[2px] top-[4px] w-3.5 h-3.5 rounded-full z-10 transition-colors duration-300 
                ${i === 0 ? 'bg-[#B41615]' : 'border-2 border-neutral-300 bg-white'}`}></div>
              <div className="flex flex-row gap-4 md:gap-10 w-full min-w-0">
                <span className="text-sm font-semibold text-neutral-500 w-28 flex-shrink-0">{event.time}</span>
                <span className="text-neutral-700 leading-relaxed flex-1 min-w-0 break-words">{event.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OverView = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [activeDay, setActiveDay] = useState('pre');
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const scheduleRef = useRef(null);
  const ctaRef = useRef(null);

  // 检测移动端
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 移动端直接显示所有内容，桌面端使用IntersectionObserver
  useEffect(() => {
    if (isMobile) {
      setIsHeroVisible(true);
      setIsOverviewVisible(true);
      setIsScheduleVisible(true);
      setIsCtaVisible(true);
      return;
    }

    const createObserver = (ref, setter) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { setter(true); observer.disconnect(); }
      }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
      observer.observe(ref.current);
    };
    createObserver(heroRef, setIsHeroVisible);
    createObserver(overviewRef, setIsOverviewVisible);
    createObserver(scheduleRef, setIsScheduleVisible);
    createObserver(ctaRef, setIsCtaVisible);
  }, [isMobile]);

  // 滚动高亮当前日期（桌面端有效）
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('[id^="day-"]');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY;
        const scrollPosition = window.scrollY + 150;
        if (scrollPosition >= cardTop) {
          const dayId = card.id.replace('day-', '');
          setActiveDay(dayId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击左侧导航定位（桌面端点击用）
  const handleDayClick = (dayId) => {
    setActiveDay(dayId);
    const targetElement = document.getElementById(`day-${dayId}`);
    if (targetElement) {
      const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetTop = 80;
      window.scrollTo({ top: elementTop - offsetTop, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: "PRE-DAY", id: "pre", city: "Arrival" },
    { label: "DAY 01", id: "01", city: "Kunming" },
    { label: "DAY 02", id: "02", city: "Kunming" },
    { label: "DAY 03", id: "03", city: "Dali" },
    { label: "DAY 04", id: "04", city: "Lijiang" },
    { label: "DAY 05", id: "05", city: "Lijiang" },
    { label: "DAY 06", id: "06", city: "Departure" }
  ];

  const scheduleData = [
    {
      day: "pre",
      label: "PRE",
      title: "Arrival in Kunming",
      events: [
        { time: "PRE-DAY", desc: "Welcome Dinner & Ice-Breaking (Yunnan Mushroom Hotpot)" }
      ]
    },
    {
      day: "01",
      label: "DAY 01",
      title: "Kunming: Stone Forest",
      events: [
        { time: "08:00-16:00", desc: "Stone Forest (Lunch on your own)" },
        { time: "17:00-19:00", desc: "Green Lake Park & Local Life" },
        { time: "19:30-21:00", desc: "Cross-Bridge Rice Noodles Dinner" }
      ]
    },
    {
      day: "02",
      label: "DAY 02",
      title: "Kunming: Business & Coffee Culture",
      events: [
        { time: "09:00-11:30", desc: "Company Visit 1 (Yunnan Coffee / Tea)" },
        { time: "12:00-13:00", desc: "Lunch" },
        { time: "14:00-16:00", desc: "Guest Speaker & Mingling Time" },
        { time: "17:30-19:30", desc: "High-speed Train to Dali (Dinner on your own)" }
      ]
    },
    {
      day: "03",
      label: "DAY 03",
      title: "Dali: Erhai Lake & Old Town",
      events: [
        { time: "09:00-12:00", desc: "Erhai Lake (Boat Ride / Lakeside Cycling)" },
        { time: "12:00-13:00", desc: "Lunch" },
        { time: "14:00-17:00", desc: "Three Pagodas & Dali Ancient Town" },
        { time: "18:00-20:00", desc: "Bai Ethnic Dinner & Night Market" }
      ]
    },
    {
      day: "04",
      label: "DAY 04",
      title: "Dali to Lijiang",
      events: [
        { time: "09:00-11:00", desc: "Dali Morning Market & Ethnic Culture Walk" },
        { time: "12:00-13:00", desc: "Lunch" },
        { time: "13:30-16:30", desc: "Drive to Lijiang" },
        { time: "17:00-19:00", desc: "Lijiang Ancient Town (UNESCO) Walk" },
        { time: "19:30-21:00", desc: "Naxi Dinner & Bar Street" }
      ]
    },
    {
      day: "05",
      label: "DAY 05",
      title: "Lijiang: Snow Mountain & Business",
      events: [
        { time: "08:00-12:00", desc: "Jade Dragon Snow Mountain & Impression Lijiang Show (Lunch on your own)" },
        { time: "14:00-16:00", desc: "Company Visit 2 (Tourism / Cultural Creative)" },
        { time: "16:30-18:00", desc: "Guest Lecture & Mingling / Black Dragon Pool" },
        { time: "18:30-21:00", desc: "Farewell Dinner" }
      ]
    },
    {
      day: "06",
      label: "DAY 06",
      title: "Departure",
      events: [
        { time: "All Day", desc: "Check-out" }
      ]
    }
  ];

  return (
    <div className="bg-white w-full max-w-full overflow-x-hidden">

      {/* 顶部 Hero */}
      <div ref={heroRef} className="relative w-full overflow-hidden">
        <div className={`w-full h-[300px] sm:h-[400px] md:h-[480px] bg-cover bg-center transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} style={{ backgroundImage: "url('https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/5f064686e37a9d08157256eb65e4cb0ec572e479.png')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
        <div className={`absolute left-0 bottom-0 w-full transition-all duration-1000 ease-out delay-300 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 w-full">
            <p className="text-xs font-bold tracking-widest text-white/80 uppercase mb-4">Product 06</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 md:mb-6">The Yunnan Circuit: Stone Forests, Erhai Lake, and Old Towns</h1>
            <div className="flex flex-wrap gap-y-2 gap-x-2 text-sm md:text-base font-medium text-white/90 mb-6">
              <span>Kunming</span><span>·</span><span>Dali</span><span>·</span><span>Lijiang</span><span>·</span><span>7 Days</span>
            </div>
            <div className="w-16 h-1 bg-[#B41615]"></div>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div ref={overviewRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 mb-16 sm:mb-20 w-full">
        <div className={`transition-all duration-1000 ease-out ${isOverviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-serif text-[46px] text-neutral-900 tracking-tight mb-6 md:mb-8">Program Overview</h2>
          <p className="text-sm sm:text-[15px] leading-7 text-neutral-600 max-w-4xl">
            This 7-day program takes participants on Yunnan's classic journey — from the karst Stone Forest to the shores of Erhai Lake and the UNESCO old town of Lijiang — with two company visits and lectures woven into the sightseeing. Ethnic Bai and Naxi culture, snow mountains, and Yunnan's famous coffee and tea are all on the itinerary.
          </p>
        </div>
      </div>

      {/* Schedule */}
      <div ref={scheduleRef} className="w-full bg-white overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto bg-[#F4F1EA] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 w-full">
          <div className="w-full max-w-full">

            <div className={`mb-8 md:mb-12 transition-all duration-1000 ease-out ${isScheduleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight mb-4">Schedule</h2>
              <div className="w-12 h-1 bg-[#B41615] mb-8"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

              {/* 左侧导航：在移动端/iPad (lg以下) 隐藏，只在桌面端显示 */}
              <div className="hidden lg:block w-[176px] shrink-0">
                <div className="relative bg-[#F2F1ED] py-[30px]">
                  <div className="absolute left-[24px] top-[30px] bottom-[30px] w-[2px] bg-neutral-200 z-0"></div>
                  <div className="flex flex-col">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleDayClick(item.id)}
                        className={`relative flex items-center h-[70px] pl-10 pr-4 text-left transition-all duration-300 ${
                          activeDay === item.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'
                        }`}
                      >
                        <span className={`absolute left-[25px] -translate-x-1/2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full z-10 transition-colors duration-300 ${
                          activeDay === item.id ? 'bg-[#B41615]' : 'border-2 border-neutral-300 bg-white'
                        }`}></span>
                        <div className="flex flex-col items-start">
                          <span className={`text-sm font-bold ${activeDay === item.id ? 'text-[#B41615]' : 'text-neutral-800'}`}>{item.label}</span>
                          <span className={`text-xs mt-1 ${activeDay === item.id ? 'text-[#B41615]' : 'text-neutral-400'}`}>{item.city}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧详细内容：min-w-0 是关键，防止 flex 子元素溢出 */}
              <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-8">
                {scheduleData.map((item, index) => (
                  <ScheduleCard key={index} item={item} isVisible={isScheduleVisible} delay={`${400 + index * 200}ms`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部 CTA（右侧对齐） */}
      <div ref={ctaRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 flex justify-end w-full">
        <Link href="/contact/contactus" className={`inline-flex items-center justify-center w-[300px] max-w-full bg-[#B41615] text-white font-semibold py-4 px-10 rounded-sm hover:bg-[#8a0f0f] transition-all duration-1000 ease-out hover:-translate-y-1 hover:shadow-xl ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isCtaVisible ? '300ms' : '0ms' }}>
          Send Inquiry →
        </Link>
      </div>

      {/* 底部 Footer，外面包一层防止溢出 */}
      <div className="w-full overflow-x-hidden">
        <ContactFooter />
      </div>
    </div>
  );
};

export default OverView;