"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Mail,
  CalendarDays,
  Download,
  Send,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  const [dropdownDirection, setDropdownDirection] = useState<
    Record<string, "left" | "right">
  >({});

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Our Program",
      href: "/program",
      children: [
        { name: "Program Overview", href: "/program/overview" },
        { name: "Program Options", href: "/program/options" },
        { name: "Custom Group Program", href: "/program/customgroupprogram" },
        { name: "Send Inquiry", href: "/contact/contactus", hasDivider: true },
      ],
    },
    {
      name: "About",
      href: "/about",
      children: [{ name: "About Us", href: "/about/aboutus" }],
    },
    {
      name: "Resources",
      href: "/resources",
      children: [{ name: "FAQs", href: "/resources/faqs" }],
    },
    {
      name: "Contact",
      href: "/contact",
      children: [{ name: "Contact Us", href: "/contact/contactus" }],
    },
  ];

  const updateDropdownDirections = () => {
    const nextDirections: Record<string, "left" | "right"> = {};
    navItems.forEach((item) => {
      if (!item.children) return;
      const menuElement = menuRefs.current[item.name];
      if (!menuElement) return;
      const rect = menuElement.getBoundingClientRect();
      const dropdownWidth = 256;
      const viewportPadding = 16;
      const willOverflowRight =
        rect.left + dropdownWidth > window.innerWidth - viewportPadding;
      nextDirections[item.name] = willOverflowRight ? "left" : "right";
    });
    setDropdownDirection(nextDirections);
  };

  useEffect(() => {
    const timer = window.setTimeout(updateDropdownDirections, 0);
    window.addEventListener("resize", updateDropdownDirections);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateDropdownDirections);
    };
  }, []);

  return (
    <>
      {/* 移除 overflow-x-clip，避免裁剪 */}
      <nav className="sticky h-16 md:h-[76px] inset-x-0 top-0 z-30 w-full max-w-full border-b border-zinc-200 bg-white transition-all">
        <div className="max-w-[1200px] mx-auto h-full w-full px-4 md:px-5">
          <div className="flex h-16 md:h-[76px] items-center justify-between w-full min-w-0">
            {/* Logo */}
            <Link href="/" className="flex z-40 items-center flex-shrink-0">
              <img
                src="https://erp.oxbridgejq.com/assets/uploads/chinapuzzles/images/logo.png"
                alt="ChinaPuzzles"
                className="h-8 w-auto max-w-[35vw] md:h-[45px] md:max-w-[220px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-w-0 flex-1 items-center justify-end sm:flex">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href + "/") || pathname === item.href;
                const direction = dropdownDirection[item.name] || "right";

                return (
                  <div
                    key={item.name}
                    ref={(el) => {
                      menuRefs.current[item.name] = el;
                    }}
                    className="relative group flex-shrink-0"
                  >
                    {item.children ? (
                      <span
                        className={`relative flex items-center px-[clamp(5px,1vw,12px)] py-2 text-[clamp(12px,1vw,14px)] font-medium transition-colors cursor-default ${
                          isActive ? "text-[#B41615]" : "text-neutral-800 hover:text-[#B41615]"
                        }`}
                      >
                        <span className="relative whitespace-nowrap">
                          {item.name}
                          <span
                            className={`absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-[2px] w-8 bg-[#B41615] transition-transform duration-700 ease-in-out origin-center ${
                              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}
                          />
                        </span>
                        <ChevronDown className="ml-1 h-4 w-4 flex-shrink-0" />
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative flex items-center px-[clamp(5px,1vw,12px)] py-2 text-[clamp(12px,1vw,14px)] font-medium transition-colors ${
                          isActive ? "text-[#B41615]" : "text-neutral-800 hover:text-[#B41615]"
                        }`}
                      >
                        <span className="relative whitespace-nowrap">
                          {item.name}
                          <span
                            className={`absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-[2px] w-8 bg-[#B41615] transition-transform duration-700 ease-in-out origin-center ${
                              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}
                          />
                        </span>
                      </Link>
                    )}

                    {item.children && (
                      <div
                        className={`absolute top-full pt-4 min-w-64 max-w-[calc(100vw-16px)] ${
                          direction === "left" ? "right-0" : "left-0"
                        }`}
                      >
                        <div className="grid grid-rows-[0fr] transition-all duration-700 ease-in-out group-hover:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <div
                              className="rounded-lg p-2"
                              style={{
                                backgroundColor: "#ffffff87",
                                boxShadow: "0 0 10px rgba(0, 0, 0, .2)",
                              }}
                            >
                              <div className="py-1" role="menu">
                                {item.children.map((child) => (
                                  <div key={child.name}>
                                    {child.hasDivider && <div className="my-2 border-t border-gray-200" />}
                                    <Link
                                      href={child.href}
                                      className="flex items-center justify-between px-4 py-2 text-sm rounded-md text-neutral-700 transition-colors hover:bg-red-50 hover:text-[#B41615] whitespace-normal"
                                      role="menuitem"
                                    >
                                      <span>{child.name}</span>
                                      {child.name === "Send Inquiry" && (
                                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 ml-2" />
                                      )}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-neutral-800"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation – 改为 fixed 定位，避免裁剪 */}
        {isMobileMenuOpen && (
          <div className="sm:hidden fixed inset-x-0 top-16 md:top-[76px] bg-white shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden border-b border-zinc-200 z-[999]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown === item.name ? null : item.name
                          )
                        }
                        className="w-full flex items-center justify-between text-neutral-800 hover:text-[#B41615] px-3 py-2 rounded-md text-base font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openMobileDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block text-neutral-600 hover:text-[#B41615] px-3 py-2 rounded-md text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-neutral-800 hover:text-[#B41615] px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 右侧悬浮按钮 – 保持原样 */}
      <div className="fixed right-3 bottom-8 lg:right-5 lg:bottom-12 z-50 hidden lg:block">
        {isFloatingOpen && (
          <div className="bg-[#B41615] text-white flex flex-col items-center w-[96px] rounded-xl overflow-hidden border border-white/10 shadow-xl transform transition-all duration-500 ease-out opacity-100 translate-x-0">
            <Link href="/contact/contactus" className="flex flex-col items-center justify-center py-3 w-full hover:bg-[#8a0f0f] transition-colors border-b border-white/10 group">
              <Mail size={26} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] mt-1 font-medium tracking-wide">CONTACT US</span>
            </Link>
            <Link href="/program/options" className="flex flex-col items-center justify-center py-3 w-full hover:bg-[#8a0f0f] transition-colors border-b border-white/10 group">
              <CalendarDays size={26} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] mt-1 font-medium tracking-wide">PROGRAMS</span>
            </Link>
            <Link href="/ChinaPuzzles2026-Brochure.pdf" className="flex flex-col items-center justify-center py-3 w-full hover:bg-[#8a0f0f] transition-colors border-b border-white/10 group">
              <Download size={26} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] mt-1 font-medium tracking-wide">DOWNLOAD</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsFloatingOpen(false)}
              className="w-full py-3 hover:bg-[#8a0f0f] transition-colors flex flex-col items-center justify-center group"
              aria-label="Collapse menu"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group-hover:scale-110">
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>
        )}
        {!isFloatingOpen && (
          <button
            type="button"
            onClick={() => setIsFloatingOpen(true)}
            className="bg-[#B41615] text-white p-3.5 shadow-xl hover:bg-[#8a0f0f] transition-all duration-300 flex flex-col items-center justify-center rounded-full w-[56px] h-[56px] hover:scale-110 hover:shadow-2xl"
            aria-label="Expand menu"
          >
            <ChevronLeft size={24} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="text-[8px] mt-0.5 font-medium tracking-wide">MENU</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;