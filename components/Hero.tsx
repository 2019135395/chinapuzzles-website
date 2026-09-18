'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Download } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 轮播背景图
  const slides = [
    { url: "/images/3eef8f26e3809e0d838cb5f5872847103f2ce390.png" },
    { url: "/images/2faae163e7c13a6db4b9142843754c4c9a84e998.png" },
    { url: "/images/23ec9e564cd695bf7ad4be22f62944ae0d955284.png" },
    { url: "/images/80da13cc1e7714d636bc763592ef5d56c7248d77.png" }
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
    <div className="relative w-full h-[70vh] md:h-[80vh] min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      
      {/* 背景层 */}
      <div 
        className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.url})` }}
          ></div>
        ))}
      </div>
      
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent md:via-black/30 md:to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent md:hidden"></div>

      {/* 内容层 */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1264px] mx-auto px-8">
          <div className="flex flex-col justify-center items-start text-left py-24">
            
            {/* 主标题 */}
            <div>
              {titles.map((title, index) => (
                <div
                  key={index}
                  className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide leading-[1.3] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] mt-2 md:mt-4 first:mt-0 ${
                    isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-md'
                  }`}
                  style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
                >
                  {title}
                </div>
              ))}
            </div>
            
            {/* 副标题 */}
            <p 
              className={`mt-8 md:mt-10 text-base md:text-lg text-gray-300 font-light tracking-wide leading-relaxed transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-16 blur-lg'
              }`}
              style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
            >
              See China Piece by piece
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
                href="/2025ChinaPuzzlesFlyer.pdf"
                download="2025ChinaPuzzles_Flyer.pdf"
                className="group inline-flex items-center justify-between h-12 gap-6 bg-black/40 border border-white/80 text-white font-medium pl-8 pr-4 w-full sm:w-auto hover:bg-[#B41615] hover:border-[#B41615] hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 rounded-sm"
              >
                <span>Download Flyer</span>
                <div className="w-6 flex items-center justify-center">
                  <Download size={16} />
                </div>
              </a>
              
              {/* <Link
                href="/contact/contactus"
                className="inline-flex items-center justify-center h-12 bg-white/5 backdrop-blur-sm border border-white/80 text-white font-medium px-8 hover:bg-[#B41615] hover:border-[#B41615] hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 rounded-sm text-center"
              >
                Send Inquiry
              </Link> */}
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