'use client';
import Link from 'next/link';
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

const ProgramOptionsPage = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Itineraries');

  const [likedItems, setLikedItems] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const imgRef = useRef(null);
  const boxRefDesktop = useRef(null);
  const boxRefMobile = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    document.title = "Program Options | China Puzzles";
  }, []);

  // ✅ 从 URL 读取 ?program=xxx 参数并设置筛选
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    // 兼容 ?program=Short-term 和 ?type=short-term 两种写法
    const program = params.get('program') || params.get('type');
    if (!program) return;

    const filtersList = ['All Itineraries', 'Short-term', 'Full Immersion'];
    // 规范化：小写 + 把 - 或 _ 换成空格，方便匹配
    const normalize = (s) => s.toLowerCase().replace(/[-_]/g, ' ').trim();
    const target = normalize(program);

    const matched = filtersList.find(f => normalize(f) === target);
    if (matched) {
      setSelectedFilter(matched);
    }
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
    createObserver(contentRef, setIsContentVisible);
    createObserver(filterRef, setIsFilterVisible);
    createObserver(cardsRef, setIsCardsVisible);
  }, []);

  const programs = [
     { id: "01", title: "The North-South Axis: Empire, Pandas, and the Silicon Coast (10-Day)", cities: "Beijing · Chengdu · Shenzhen", days: "10 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/0090909098098090090.png", slug: "north-south-axis-beijing-chengdu-shenzhen-10days" },
    { id: "02", title: "The Capital-to-Coast Journey: Heritage, Panda Country, and the Global Metropolis (10-Day)", cities: "Beijing · Chengdu · Shanghai", days: "10 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/90909090909090909.png", slug: "capital-to-coast-journey-beijing-chengdu-shanghai-10days" },
    { id: "03", title: "The North-South Axis: Empire, Pandas, and the Silicon Coast (12-Day)", cities: "Beijing · Chengdu · Shenzhen", days: "12 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/0bd08913b0e64fdab14201e4e5dd1da7a8fd7a67.png", slug: "north-south-axis-beijing-chengdu-shenzhen-12days" },
    { id: "04", title: "The Capital-to-Coast Journey: Heritage, Panda Country, and the Global Metropolis (12-Day)", cities: "Beijing · Chengdu · Shanghai", days: "12 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/546334b296c8d0375d8e5966832dd80e01173f27.png", slug: "capital-to-coast-journey-beijing-chengdu-shanghai-12days" },
    { id: "05", title: "The Imperial Heartland: Ancient Capitals from Xi'an to Luoyang", cities: "Xi'an · Luoyang", days: "7 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/db745919be579a259a71f73fb3d6a50c8674c3dc.png", slug: "imperial-heartland-xian-luoyang-7days" },
    { id: "06", title: "The Yunnan Circuit: Stone Forests, Erhai Lake, and Old Towns", cities: "Kunming · Dali · Lijiang", days: "7 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/09090909090909909090.png", slug: "yunnan-circuit-kunming-dali-lijiang-7days" },
    { id: "07", title: "From Karst Paradise to the Pearl River: Nature and the Lingnan Metropolis", cities: "Guilin · Yangshuo · Guangzhou", days: "7 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/943ba4c6b89235022017b697f4cc44eef06413af.jpg", slug: "karst-paradise-to-pearl-river-guilin-yangshuo-guangzhou-7days" },
     { id: "08", title: "The Innovator's Journey to China", cities: "Beijing · Xi'an · Shanghai", days: "12 Days", image: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/1a94c84e495035067d57c1a78cf7292d23896525.png", slug: "imperial-heartland-beijing-xian-shanghai-12days" }
  ];

  const filters = ['All Itineraries', 'Short-term', 'Full Immersion'];

  const filterMap = {
    'All Itineraries': () => true,
    'Short-term': (item) => {
      const n = parseInt(item.days);
      return n >= 5 && n <= 7;
    },
    'Full Immersion': (item) => {
      const n = parseInt(item.days);
      return n >= 10 && n <= 14;
    },
  };

  const filteredPrograms = programs.filter(item => {
    const fn = filterMap[selectedFilter];
    return fn ? fn(item) : true;
  });

  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-[#F8F7F4] text-neutral-900 overflow-x-hidden">

      {/* 顶部 Hero 区域 */}
      <div className="relative w-full h-auto">
        {/* 图片容器：移动端/iPad 使用 -mobile 图片，最高 580px */}
        <div ref={imgRef} className={`relative w-full h-[360px] md:h-[520px] max-h-[580px] overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isImgVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}`}>
          <picture>
            {/* 桌面端（≥1024px）：使用原图 */}
            <source
              media="(min-width: 1024px)"
              srcSet="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/431af35512db9b7c47cf6818873b52dcd7e78b6c.png"
            />
            {/* 移动端 & iPad（<1024px）：使用原图文件名加 -mobile 的图片 */}
            <img
              src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/431af35512db9b7c47cf6818873b52dcd7e78b6c-mobile.png"
              alt="Program Options"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* 桌面端文字层 */}
        <div ref={boxRefDesktop} className={`hidden md:block absolute inset-0 z-10 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="max-w-[1200px] mx-auto h-full relative px-6 lg:px-8">
            <div className="absolute left-0 bottom-24 w-full pointer-events-auto">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90">Home / Our Program / Program Options</p>
              {/* ✅ 换成 Libre Bodoni 字体 */}
              <h1 className={`${libreBodoni.className} text-5xl lg:text-6xl text-white tracking-tight leading-tight`}>
                Program Options
              </h1>
              <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
            </div>
          </div>
        </div>

        {/* 移动端文字层 */}
        <div ref={boxRefMobile} className={`md:hidden absolute inset-0 z-10 flex items-end p-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-500 ${isBoxVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/90">Home / Our Program / Program Options</p>
            {/* ✅ 换成 Libre Bodoni 字体 */}
            <h1 className={`${libreBodoni.className} text-4xl text-white tracking-tight leading-tight`}>
              Program Options
            </h1>
            <div className="w-16 h-1 bg-[#B41615] mt-6"></div>
          </div>
        </div>
      </div>

      {/* 主体内容区 */}
      <main className="flex-1 w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">

        <div ref={contentRef} className={`mb-14 transition-all duration-[900ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isContentVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          {/* ✅ 换成 Libre Bodoni 字体 */}
          <h2 className={`${libreBodoni.className} text-[32px] sm:text-[38px] text-neutral-900 mb-6 text-left`}>
            Multiple itineraries. One real China.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-4xl text-left">
           Explore multi-city and regional programs that combine cultural immersion, local perspectives, and company visits.
          </p>
        </div>

        <div ref={filterRef} className={`mb-12 transition-all duration-[900ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-150 ${isFilterVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#B41615] mb-3 font-bold">Filter by Duration</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2 text-sm font-semibold border transition-colors duration-200 ${
                  selectedFilter === filter
                    ? 'bg-[#B41615] text-white border-[#B41615]'
                    : 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-500'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 卡片列表区域 */}
        <div ref={cardsRef} className={`flex flex-col md:flex-row md:flex-wrap gap-x-3 gap-y-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] delay-300 ${isCardsVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-sm'}`}>

          {filteredPrograms.map((item, index) => {
            const currentRow = Math.floor(index / 3);
            const hoveredRow = hoveredIndex !== null ? Math.floor(hoveredIndex / 3) : -1;

            const isHovered = hoveredIndex === index;
            const isSameRowSibling = hoveredRow !== -1 && currentRow === hoveredRow && !isHovered;

            const currentClass = isHovered ? 'md:basis-[590px] md:shrink md:grow-0 z-10 shadow-2xl' : '';
            const siblingClass = isSameRowSibling ? 'md:basis-[290px] md:shrink md:grow-0 opacity-80 scale-[0.98]' : '';
            const defaultClass = (!isHovered && !isSameRowSibling) ? 'md:basis-[calc((100%-1.5rem)/3)] md:shrink md:grow-0' : '';

            const isLiked = likedItems[item.id];

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative overflow-hidden cursor-default w-full min-h-[400px] lg:h-[560px] rounded-[5px] transition-all duration-700 ease-in-out ${currentClass} ${siblingClass} ${defaultClass}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* 底部渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-colors duration-500"></div>

                {/* 左上角 红色编号 */}
                <div className="absolute top-0 left-0 bg-[#B41615] text-white text-sm font-bold px-4 py-2 rounded-br-lg z-10">
                    {item.id}
                </div>

                {/* 右上角 红心按钮 */}
                <button
                  type="button"
                  onClick={() => toggleLike(item.id)}
                  className={`absolute top-4 right-4 rounded-full p-3 shadow-md transition-all duration-300 cursor-pointer ${isLiked ? 'bg-[#B41615]' : 'bg-white'}`}
                >
                    <svg className={`w-5 h-5 transition-colors duration-300 ${isLiked ? 'text-white' : 'text-[#B41615]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* 内容层 */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white min-w-0">

                  {/* ✅ 换成 Libre Bodoni 字体 */}
                  <h3 className={`${libreBodoni.className} text-[25px] text-white leading-snug mb-6 break-words text-left`}>
                    {item.title}
                  </h3>

                  <div className="flex flex-col gap-4 pb-2">
                    <div className="flex flex-col gap-2.5 min-w-0">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-white/90 min-w-0">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span className="truncate">{item.cities}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-white/90 min-w-0">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span className="truncate">{item.days}</span>
                      </div>
                    </div>

                    <Link
                        href={`/program/options/project/${item.slug}`}
                        className="self-end shrink-0 flex items-center gap-1 text-sm font-semibold text-white bg-transparent px-4 py-2 border border-white rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-[#B41615] hover:border-[#B41615] hover:text-white"
                    >
                        View itinerary
                        <span className="text-lg leading-none">→</span>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </main>

      <ContactFooter />
    </div>
  );
};

export default ProgramOptionsPage;