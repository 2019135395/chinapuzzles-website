'use client';

import { useState, useEffect, useRef } from 'react';
import ContactFooter from '@/components/ContactFooterTwo';
import localFont from 'next/font/local';

// ✅ 本地 Bodoni 字体（字体放在 app/ 下，此文件在 app/components/ 下时用 ../）
// 如果编译报错找不到路径，请参考文末的“路径调整”说明
const bodoni = localFont({
  src: [
    { path: '../../app/fonts/Bodoni-06-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../app/fonts/Bodoni-06-Bold.ttf',   weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-bodoni',
});

const TermsConditionsPage = () => {
  // 出场动画控制
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.title = "Terms & Conditions-ChinaPuzzles";
  }, []);


  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsHeroVisible(true);
          heroObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const contentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsContentVisible(true);
          contentObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (contentRef.current) contentObserver.observe(contentRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (contentRef.current) contentObserver.unobserve(contentRef.current);
    };
  }, []);

  // 页面数据
  const sections = [
    {
      title: "Program Bookings",
      text: "ChinaPuzzles is committed to clear, responsible communication. This placeholder text is structured for future legal review and can be replaced with approved policy language, including longer paragraphs, lists and jurisdiction-specific clauses."
    },
    {
      title: "Fees and Cancellations",
      text: "ChinaPuzzles is committed to clear, responsible communication. This placeholder text is structured for future legal review and can be replaced with approved policy language, including longer paragraphs, lists and jurisdiction-specific clauses."
    },
    {
      title: "Participant Responsibilities",
      text: "ChinaPuzzles is committed to clear, responsible communication. This placeholder text is structured for future legal review and can be replaced with approved policy language, including longer paragraphs, lists and jurisdiction-specific clauses."
    },
    {
      title: "Limitation of Liability",
      text: "ChinaPuzzles is committed to clear, responsible communication. This placeholder text is structured for future legal review and can be replaced with approved policy language, including longer paragraphs, lists and jurisdiction-specific clauses."
    },
    {
      title: "Governing Terms",
      text: "ChinaPuzzles is committed to clear, responsible communication. This placeholder text is structured for future legal review and can be replaced with approved policy language, including longer paragraphs, lists and jurisdiction-specific clauses."
    }
  ];

  return (
    <div className="bg-[#F8F7F4] text-neutral-900">

      {/* ==================== 顶部红色 Hero 区域 ==================== */}
      <div ref={heroRef} className={`w-full bg-[#B41615] text-white transition-all duration-1000 ease-out ${
        isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 h-[330px] flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4">Home / Terms and Conditions</p>
          {/* ✅ 换成 Bodoni 字体 */}
          <h1 className={`${bodoni.className} text-4xl md:text-6xl tracking-tight`}>Terms & Conditions</h1>
        </div>
      </div>

      {/* ==================== 主体内容区 ==================== */}
      <main className="flex-1 w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">

        {/* 引言与章节列表 */}
        <div ref={contentRef} className="transition-all duration-1000">

          {/* 引言段落：最先出场（0ms延迟） */}
          <p className={`text-neutral-500 text-xl leading-relaxed max-w-4xl mb-24 transition-all duration-1000 ease-out ${
            isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: isContentVisible ? '0ms' : '0ms' }}
          >
            This page uses editable legal-content modules. Replace, expand or shorten each section without disturbing the page hierarchy or reading rhythm.
          </p>

          {/* 章节列表：依次出场（每个章节延迟递增 200ms） */}
          <div className="flex flex-col gap-24">
            {sections.map((item, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ease-out ${
                  isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: isContentVisible ? `${200 + index * 200}ms` : '0ms' }}
              >
                {/* ✅ 标题换成 Bodoni 字体，Hover 变红 */}
                <h2 className={`${bodoni.className} text-3xl md:text-5xl text-neutral-900 mb-6 transition-colors duration-300 group-hover:text-[#B41615]`}>
                  {item.title}
                </h2>

                {/* 正文 */}
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-4xl mb-8">
                  {item.text}
                </p>

                {/* 红色下划线：Hover 时变粗或加深 */}
                <div className="w-full h-[2px] bg-[#B41615] transition-all duration-500 group-hover:h-[3px] group-hover:bg-[#8a0f0f]"></div>
              </div>
            ))}
          </div>

        </div>
      </main>


      <ContactFooter />

    </div>
  );
};

export default TermsConditionsPage;