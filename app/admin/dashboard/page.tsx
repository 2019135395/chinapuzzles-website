'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, ArrowDownRight, 
  FileText, Package, FolderKanban, Image as ImageIcon, 
  MessageSquare, Activity, Sparkles
} from 'lucide-react';

// 模拟数据（已替换总访问量为今日新增）
const stats = [
  { title: '今日新增', value: '32', trend: '+8.2%', up: true, icon: Sparkles },
  { title: '内容总数', value: '128', trend: '+3.2%', up: true, icon: FileText },
  { title: '产品数量', value: '56', trend: '-1.1%', up: false, icon: Package },
  { title: '未读留言', value: '8', trend: '待处理', up: false, icon: MessageSquare },
];

const chartData = [
  { label: '周一', value: 40 },
  { label: '周二', value: 65 },
  { label: '周三', value: 52 },
  { label: '周四', value: 88 },
  { label: '周五', value: 70 },
  { label: '周六', value: 45 },
  { label: '周日', value: 92 },
];

const activities = [
  { text: '更新了首页轮播图：南京主视觉', time: '10分钟前', type: 'edit' },
  { text: '新增新闻：《中欧商业趋势解析》', time: '2小时前', type: 'create' },
  { text: '用户 John Doe 提交了新留言', time: '4小时前', type: 'message' },
  { text: '更新了产品：华东地区定制服务', time: '昨天', type: 'edit' },
];

const quickLinks = [
  { title: '新建内容', desc: '发布新闻或产品', href: '/admin/content/news/create', icon: FileText },
  { title: '轮播图管理', desc: '更新首页视觉', href: '/admin/sliders', icon: ImageIcon },
  { title: '处理留言', desc: '查看询盘回复', href: '/admin/messages', icon: MessageSquare },
  { title: '项目管理', desc: '维护客户案例', href: '/admin/content/cases', icon: FolderKanban },
];

const recentMessages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: '请问10月份还有名额吗？', time: '2小时前' },
  { id: 2, name: 'Alice Wang', email: 'alice@corp.com', message: '想咨询定制项目。', time: '5小时前' },
  { id: 3, name: 'Mark Lee', email: 'mark@university.edu', message: '需要下载最新产品手册。', time: '昨天' },
];

export default function DashboardPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const today = new Date();
  const dateString = today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className={`space-y-8 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* 顶部欢迎区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400 font-medium mb-1">{dateString}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">数据概览</h1>
        </div>
        
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="group bg-white p-7 rounded-2xl border border-neutral-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-600 group-hover:bg-[#B41615]/10 group-hover:text-[#B41615] transition-colors duration-300">
                <stat.icon size={22} strokeWidth={1.8} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-rose-500'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-semibold text-neutral-900 tracking-tight group-hover:text-[#B41615] transition-colors duration-300">
              {stat.value}
            </p>
            <p className="text-sm text-neutral-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 主体双栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 左侧：图表与动态 */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-2xl border border-neutral-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#B41615]">发布趋势</h2>
                <p className="text-sm text-neutral-500 mt-1">近7日内容更新量</p>
              </div>
              <span className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full">过去7天</span>
            </div>

            <div className="h-48 flex items-end justify-between gap-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end flex-1 h-full group cursor-pointer">
                  <span className="text-xs text-neutral-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.value}</span>
                  <div 
                    className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-neutral-200 to-neutral-100 group-hover:from-[#B41615] group-hover:to-[#f29b9b] transition-all duration-500 origin-bottom group-hover:scale-y-105"
                    style={{ height: `${item.value}%` }}
                  ></div>
                  <span className="text-xs text-neutral-400 mt-3">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 最近动态 */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">操作日志</h2>
              <Link href="/admin/logs" className="text-sm text-neutral-500 hover:text-[#B41615] transition-colors">全部动态</Link>
            </div>
            <div className="space-y-5">
              {activities.map((act, idx) => (
                <div key={idx} className="group flex items-center justify-between border-b border-neutral-100 pb-4 last:border-0 last:pb-0 cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B41615]/80 group-hover:scale-125 group-hover:bg-[#B41615] transition-all duration-300"></div>
                    <span className="text-neutral-700 hover:text-[#B41615] transition-colors">{act.text}</span>
                  </div>
                  <span className="text-xs text-neutral-400 flex-shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：快捷入口与留言 */}
        <div className="space-y-8">
          
          {/* 快捷入口 */}
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">快捷操作</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Link key={idx} href={link.href} className="group flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl bg-neutral-50 hover:bg-[#B41615]/5 transition-all duration-300">
                    <Icon size={20} className="text-neutral-500 group-hover:text-[#B41615] transition-colors duration-300" />
                    <p className="text-sm font-medium text-neutral-700 text-center group-hover:text-[#B41615]">{link.title}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 最新留言 */}
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">最新留言</h2>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-lg bg-neutral-50 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-transparent hover:border-neutral-200 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-medium text-neutral-800 text-sm">{msg.name}</p>
                    <span className="text-[10px] text-neutral-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-2">{msg.email}</p>
                  <p className="text-sm text-neutral-600 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
            <Link href="/admin/messages" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-[#B41615] hover:text-[#8a0f0f] transition-colors">
              进入留言中心 <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}