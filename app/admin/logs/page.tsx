'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, X, Filter } from 'lucide-react';

// 定义操作日志类型
interface LogItem {
  id: number;
  operator: string;
  role: string;
  action: 'create' | 'edit' | 'delete' | 'login' | 'logout' | 'upload' | 'status';
  module: string;
  target: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  status: 'success' | 'failed';
  createdAt: string;
  details: {
    requestMethod: string;
    requestUrl: string;
    changes: { field: string; oldValue: string; newValue: string }[];
  };
}

// 模拟日志数据
const initialLogs: LogItem[] = [
  {
    id: 1,
    operator: 'admin',
    role: '管理员',
    action: 'edit',
    module: '轮播图管理',
    target: '首屏主视觉 - 北京',
    ip: '203.0.113.42',
    location: '中国 上海',
    device: 'MacBook Pro',
    browser: 'Chrome 126',
    status: 'success',
    createdAt: '2026-09-08 10:23:15',
    details: {
      requestMethod: 'PATCH',
      requestUrl: '/api/admin/sliders/1',
      changes: [
        { field: '标题', oldValue: '北京主视觉', newValue: '首屏主视觉 - 北京' },
        { field: '状态', oldValue: '下架', newValue: '上架' }
      ]
    }
  },
  {
    id: 2,
    operator: 'editor_li',
    role: '内容编辑',
    action: 'create',
    module: '新闻管理',
    target: '中欧商业趋势解析',
    ip: '198.51.100.23',
    location: '中国 北京',
    device: 'iPhone 15 Pro',
    browser: 'Safari 17',
    status: 'success',
    createdAt: '2026-09-08 09:12:40',
    details: {
      requestMethod: 'POST',
      requestUrl: '/api/admin/content/news',
      changes: [{ field: '新闻标题', oldValue: '（空）', newValue: '中欧商业趋势解析' }]
    }
  },
  {
    id: 3,
    operator: 'operator_wang',
    role: '运营专员',
    action: 'delete',
    module: '留言管理',
    target: '留言 #58（垃圾信息）',
    ip: '192.0.2.156',
    location: '中国 广州',
    device: 'Windows PC',
    browser: 'Edge 125',
    status: 'success',
    createdAt: '2026-09-08 08:45:22',
    details: {
      requestMethod: 'DELETE',
      requestUrl: '/api/admin/messages/58',
      changes: [{ field: '留言ID', oldValue: '58', newValue: '（已删除）' }]
    }
  },
  {
    id: 4,
    operator: 'admin',
    role: '管理员',
    action: 'login',
    module: '系统登录',
    target: '后台管理界面',
    ip: '203.0.113.42',
    location: '中国 上海',
    device: 'MacBook Pro',
    browser: 'Chrome 126',
    status: 'success',
    createdAt: '2026-09-08 08:30:01',
    details: {
      requestMethod: 'POST',
      requestUrl: '/api/auth/login',
      changes: [{ field: '账号', oldValue: '（空）', newValue: 'admin' }]
    }
  },
  {
    id: 5,
    operator: 'editor_zhao',
    role: '内容编辑',
    action: 'status',
    module: '产品管理',
    target: 'The Capital-to-Coast Journey',
    ip: '198.51.100.77',
    location: '中国 深圳',
    device: 'Windows PC',
    browser: 'Chrome 126',
    status: 'failed',
    createdAt: '2026-09-07 18:20:10',
    details: {
      requestMethod: 'PATCH',
      requestUrl: '/api/admin/products/2/status',
      changes: [{ field: '上架状态', oldValue: '上架', newValue: '下架（失败：权限不足）' }]
    }
  },
  {
    id: 6,
    operator: 'operator_chen',
    role: '运营专员',
    action: 'upload',
    module: '轮播图管理',
    target: '大湾区科技创新',
    ip: '192.0.2.190',
    location: '中国 杭州',
    device: 'iPad Pro',
    browser: 'Safari 17',
    status: 'success',
    createdAt: '2026-09-07 16:05:35',
    details: {
      requestMethod: 'POST',
      requestUrl: '/api/admin/sliders/3/upload',
      changes: [{ field: '图片文件', oldValue: '（无）', newValue: 'tech-banner.jpg (1.2MB)' }]
    }
  },
  {
    id: 7,
    operator: 'editor_li',
    role: '内容编辑',
    action: 'logout',
    module: '系统登出',
    target: '后台管理界面',
    ip: '198.51.100.23',
    location: '中国 北京',
    device: 'iPhone 15 Pro',
    browser: 'Safari 17',
    status: 'success',
    createdAt: '2026-09-07 17:50:00',
    details: {
      requestMethod: 'POST',
      requestUrl: '/api/auth/logout',
      changes: [{ field: '会话', oldValue: 'active', newValue: 'destroyed' }]
    }
  }
];

const PAGE_SIZE = 5;

export default function LogsPage() {
  const [logs, setLogs] = useState<LogItem[]>(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<'all' | 'create' | 'edit' | 'delete' | 'login' | 'logout' | 'upload' | 'status'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [viewLog, setViewLog] = useState<LogItem | null>(null);

  useEffect(() => {
    document.title = "操作日志 - ChinaPuzzles Admin";
  }, []);

  // 筛选与分页
  const filteredLogs = logs.filter(log => {
    const matchSearch = log.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAction = actionFilter === 'all' || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
  const currentLogs = filteredLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 操作类型标签样式
  const actionLabels: Record<string, string> = {
    create: '新增',
    edit: '编辑',
    delete: '删除',
    login: '登录',
    logout: '登出',
    upload: '上传',
    status: '变更'
  };

  const actionColors: Record<string, string> = {
    create: 'bg-emerald-50 text-emerald-600',
    edit: 'bg-blue-50 text-blue-600',
    delete: 'bg-rose-50 text-rose-600',
    login: 'bg-purple-50 text-purple-600',
    logout: 'bg-neutral-100 text-neutral-600',
    upload: 'bg-amber-50 text-amber-600',
    status: 'bg-red-50 text-[#B41615]'
  };

  return (
    <div className="relative z-10 space-y-8">
      
      {/* 页面标题区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">操作日志</h1>
          <p className="text-neutral-500 mt-1">系统所有后台操作记录，不可删除，仅供追踪与审计</p>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 border border-neutral-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <span className="text-sm text-neutral-500">总记录：</span>
          <span className="font-bold text-neutral-900">{logs.length}</span>
        </div>
      </div>

      {/* 列表区 */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* 搜索与筛选区 */}
        <div className="p-4 border-b border-neutral-100 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative w-full md:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索操作人、模块或目标..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-neutral-400" />
            <select
              value={actionFilter}
              onChange={(e) => { setActionFilter(e.target.value as any); setCurrentPage(1); }}
              className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
            >
              <option value="all">全部类型</option>
              <option value="create">新增</option>
              <option value="edit">编辑</option>
              <option value="delete">删除</option>
              <option value="login">登录</option>
              <option value="logout">登出</option>
              <option value="upload">上传</option>
              <option value="status">变更</option>
            </select>
          </div>
        </div>

        {/* 日志表格 */}
        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">操作人</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">操作类型</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">操作模块</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">操作目标</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">IP地址</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">时间</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {currentLogs.map((log) => (
              <tr key={log.id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-medium">
                      {log.operator.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{log.operator}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{log.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${actionColors[log.action]}`}>
                    {actionLabels[log.action]}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-neutral-600">{log.module}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-neutral-700 max-w-[250px] truncate">{log.target}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-sm text-neutral-500">{log.ip}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{log.location}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-neutral-500">{log.createdAt}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <button 
                      onClick={() => setViewLog(log)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      title="查看详情"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 分页 */}
        <div className="p-4 border-t border-neutral-100 flex items-center justify-between">
          <p className="text-sm text-neutral-500">第 <span className="font-medium text-neutral-900">{currentPage}</span> / {totalPages} 页</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:border-[#B41615] hover:text-[#B41615] disabled:opacity-50 disabled:hover:border-neutral-200 disabled:hover:text-neutral-600 transition-all duration-200"
            >
              上一页
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === i + 1 
                    ? 'bg-[#B41615] text-white shadow-md shadow-red-900/20' 
                    : 'border border-neutral-200 text-neutral-600 hover:border-[#B41615] hover:text-[#B41615]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:border-[#B41615] hover:text-[#B41615] disabled:opacity-50 disabled:hover:border-neutral-200 disabled:hover:text-neutral-600 transition-all duration-200"
            >
              下一页
            </button>
          </div>
        </div>
      </div>

      {/* 日志详情弹窗（只读，不可修改、删除） */}
      {viewLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">日志详情</h2>
              <button onClick={() => setViewLog(null)} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* 基础信息 */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-2">
                 
                  <span className="text-sm text-neutral-600">操作人：<strong className="text-neutral-900">{viewLog.operator}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                 
                  <span className="text-sm text-neutral-600">角色：<strong>{viewLog.role}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  
                  <span className="text-sm text-neutral-600">设备：{viewLog.device} / {viewLog.browser}</span>
                </div>
                <div className="flex items-center gap-2">
                 
                  <span className="text-sm text-neutral-600">地区：{viewLog.location}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                 
                  <span className="text-sm text-neutral-600">IP地址：{viewLog.ip}</span>
                </div>
              </div>

              {/* 操作记录 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700">操作记录</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                    <span className="text-sm text-neutral-500">操作类型</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${actionColors[viewLog.action]}`}>
                      {actionLabels[viewLog.action]}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                    <span className="text-sm text-neutral-500">操作模块</span>
                    <span className="text-sm text-neutral-900">{viewLog.module}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                    <span className="text-sm text-neutral-500">操作目标</span>
                    <span className="text-sm text-neutral-900">{viewLog.target}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                    <span className="text-sm text-neutral-500">执行时间</span>
                    <span className="text-sm text-neutral-900">{viewLog.createdAt}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                    <span className="text-sm text-neutral-500">操作状态</span>
                    <span className={`text-sm font-medium ${viewLog.status === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {viewLog.status === 'success' ? '成功' : '失败'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 请求详情 */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">请求详情</h3>
                <div className="p-4 bg-neutral-50 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-neutral-500">请求方法</span>
                    <span className="text-xs font-medium font-mono text-neutral-900">{viewLog.details.requestMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-neutral-500">请求地址</span>
                    <span className="text-xs font-medium font-mono text-neutral-900">{viewLog.details.requestUrl}</span>
                  </div>
                </div>
              </div>

              {/* 数据变更记录 */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3">数据变更记录</h3>
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-semibold text-neutral-500">字段</th>
                        <th className="px-4 py-2 text-xs font-semibold text-neutral-500">原值</th>
                        <th className="px-4 py-2 text-xs font-semibold text-neutral-500">新值</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {viewLog.details.changes.map((change, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm text-neutral-700">{change.field}</td>
                          <td className="px-4 py-2 text-sm text-rose-500 line-through">{change.oldValue}</td>
                          <td className="px-4 py-2 text-sm text-emerald-600">{change.newValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button 
                  onClick={() => setViewLog(null)}
                  className="px-5 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium transition-all"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}