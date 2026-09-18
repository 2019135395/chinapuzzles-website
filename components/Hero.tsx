'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Download } from "lucide-react";
import localFont from 'next/font/local';

// ✅ 用本地 Bodoni-06 字体
const bodoni = localFont({
  src: [
    {
      path: '../app/fonts/Bodoni-06-Medium.ttf',   // 相对当前文件的路径
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/Bodoni-06-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bodoni',
});

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 👇 每张轮播图提供 pc + mobile 两个版本
  const slides = [
    {
      pc: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/3eef8f26e3809e0d838cb5f5872847103f2ce390.png",
      mobile: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/3eef8f26e3809e0d838cb5f5872847103f2ce390-mobile.png",
    },
    {
      pc: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/2faae163e7c13a6db4b9142843754c4c9a84e998.png",
      mobile: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/2faae163e7c13a6db4b9142843754c4c9a84e998-mobile.png",
    },
    {
      pc: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/23ec9e564cd695bf7ad4be22f62944ae0d955284.png",
      mobile: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/23ec9e564cd695bf7ad4be22f62944ae0d955284-mobile.png",
    },
    {
      pc: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/80da13cc1e7714d636bc763592ef5d56c7248d77.png",
      mobile: "https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/80da13cc1e7714d636bc763592ef5d56c7248d77-mobile.png",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [slides.length]);

  const titles = ["Culture", "Business", "Insight"];

  return (
    // ✅ 移动端/iPad 固定 580px，PC 端 80vh
    <div className="relative w-full h-[580px] md:h-[80vh] md:min-h-[600px] flex items-center overflow-hidden">

      {/* 背景层 */}
      <div
        className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={slide.mobile} />
              <img
                src={slide.pc}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent md:via-black/30 md:to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent md:hidden"></div>

      {/* 内容层 */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1264px] mx-auto px-6 sm:px-8 w-full">
          <div className="flex flex-col justify-center items-start text-left py-24">

            {/* 主标题：Bodoni，移动端缩小，桌面端 70px / 86px */}
            <div>
              {titles.map((title, index) => (
                <div
                  key={index}
                  className={`${bodoni.className} text-white tracking-wide transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] first:mt-0 ${
                    isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-md'
                  }`}
                  style={{
                    // ✅ 移动端约 40px，桌面端 70px，中间平滑过渡
                    fontSize: 'clamp(40px, 8vw, 70px)',
                    lineHeight: 'clamp(48px, 9.8vw, 86px)',
                    fontWeight: 500,
                    transitionDelay: isVisible ? `${index * 200}ms` : '0ms',
                  }}
                >
                  {title}
                </div>
              ))}
            </div>

            {/* 副标题：Bodoni，20px */}
            <p
              className={`${bodoni.className} mt-8 md:mt-10 text-white tracking-wide transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-lg'
              }`}
              style={{
                fontSize: '20px',
                lineHeight: '1.5',
                fontWeight: 500,
                transitionDelay: isVisible ? '600ms' : '0ms',
              }}
            >
              See China<br />Piece by piece
            </p>

            {/* 按钮组 */}
            <div
              className={`mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-4 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-lg'
              }`}
              style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}
            >
              <Link
                href="program/customgroupprogram"
                className="inline-flex items-center justify-center h-12 bg-white/5 backdrop-blur-sm border border-white/80 text-white font-medium px-8 hover:bg-[#B41615] hover:border-[#B41615] hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 rounded-sm text-center"
              >
                Explore Program
              </Link>

              <a
                href="/ChinaPuzzles2026-Brochure.pdf"
                download="ChinaPuzzles2026-Brochure.pdf"
                className="group inline-flex items-center justify-between h-12 gap-6 bg-black/40 border border-white/80 text-white font-medium pl-8 pr-4 w-full sm:w-auto hover:bg-[#B41615] hover:border-[#B41615] hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 rounded-sm"
              >
                <span>Download Flyer</span>
                <div className="w-6 flex items-center justify-center">
                  <Download size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 底部轮播指示器 */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: isVisible ? '1100ms' : '0ms' }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-[3px] transition-all duration-500 ${
              index === currentSlide ? 'w-12 bg-[#B41615]' : 'w-6 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;