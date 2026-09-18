'use client'; // 必须在这里声明，因为下面的 AdminLayoutGate 使用了 usePathname

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

// 注意：因为使用了 'use client'，这里不能直接 export const metadata
// 可以使用下面的替代方式来设置全局标题 (Next.js 14+ 支持在客户端组件中用 useMemo)
// 或者直接将 metadata 移交给其他服务端布局，或者简单通过 useEffect 设置。
// 为了不报错，这里直接先注释掉 metadata 导出（如果你需要标题，可以使用下方 useEffect 设置）
// export const metadata: Metadata = {
//   title: "ChinaPuzzles - Unravel the Mysteries of the East",
//   description: "A journey into the heart of Chinese culture through intricate puzzles and stories.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 判断是否为后台管理路由（以 /admin 开头）
  const isAdmin = pathname?.startsWith('/admin');

  // 如果是后台，不需要公共 Navbar，且保持全宽和深色背景（后台布局自己管理）
  // 如果是前台，保持原有布局
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body 
        className={cn(
          "relative h-full font-sans antialiased text-white",
          isAdmin ? "bg-[#1A1F24]" : "bg-zinc-900", // 后台使用更简洁的深色背景
          inter.variable,
          montserrat.variable
        )}
      >
        <main className={cn(
          "relative flex min-h-screen",
          isAdmin ? "flex-col" : "flex-col" // 保持 flex-col，只是后台完全包裹
        )}>
          {/* 只有前台才渲染 Navbar */}
          {!isAdmin && <Navbar />}
          
          {/* 后台内容区让后台 layout 自己管理宽窄，前台使用 flex-1 撑满 */}
          <div className={cn("flex-grow flex-1", isAdmin ? "w-full" : "")}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}