'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, FileText, Package, FolderKanban, 
  Image as ImageIcon, MessageSquare, ShieldCheck, ScrollText, 
  LogOut, Menu, ChevronLeft, ChevronRight
} from "lucide-react";

import { NotificationProvider } from '@/components/NotificationProvider';

const menuItems = [
  { name: '数据概览', path: '/admin/dashboard', icon: LayoutDashboard },
  // { name: '新闻管理', path: '/admin/content/news', icon: FileText },
  { name: '项目管理', path: '/admin/products', icon: Package },
  // { name: '案例管理', path: '/admin/content/cases', icon: FolderKanban },
  { name: '轮播图管理', path: '/admin/sliders', icon: ImageIcon },
  { name: '留言管理', path: '/admin/messages', icon: MessageSquare },
  { name: '权限管理', path: '/admin/permissions', icon: ShieldCheck },
  { name: '操作日志', path: '/admin/logs', icon: ScrollText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#1A1F24]">{children}</div>;
  }

  return (
    <NotificationProvider>
    <div className="flex h-screen bg-[#F8F7F4] overflow-hidden">
      
      <aside className={`${isCollapsed ? 'w-[76px]' : 'w-[250px]'} bg-[#0D0D0D] text-white flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 relative`}>
        
        {/* 品牌区（已去除 Admin 小字，字体略微调大更显大气） */}
        <div className={`h-[76px] flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-5 border-b border-white/10`}>
          {!isCollapsed && (
            <h1 className="font-serif text-2xl tracking-wide text-white">China Puzzles</h1>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden px-3 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                title={item.name}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 
                  ${isCollapsed ? 'justify-center' : ''}
                  ${isActive 
                    ? 'bg-[#B41615] text-white shadow-lg shadow-red-900/30' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-6 border-t border-white/10 pt-4">
          <button 
            onClick={() => { document.cookie = "token=; Max-Age=0; path=/"; router.push('/admin/login'); }}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-300 w-full ${isCollapsed ? 'justify-center' : ''}`}
            title="退出登录"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span>退出登录</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto bg-[#F8F7F4]">
        
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200">
          <h1 className="font-serif text-xl">ChinaPuzzles Admin</h1>
          <button onClick={() => setIsMobileOpen(true)}><Menu size={24} /></button>
        </div>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
    </NotificationProvider>
  );
}