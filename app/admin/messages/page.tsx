'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, X, Reply, Eye, Trash2, CheckCircle2, Circle, 
  Mail, Building2, Users, CalendarClock, Globe, Monitor, MapPin, FileText, ArrowUpRight
} from 'lucide-react';

// 定义留言类型
interface MessageItem {
  id: number;
  name: string;
  email: string;
  affiliation: string;
  participants: number;
  programType: string;
  travelTime: string;
  message: string;
  status: 'new' | 'processed' | 'replied';
  ip: string;
  location: string;
  device: string;
  browser: string;
  createdAt: string;
  repliedContent?: string;
  repliedAt?: string;
}

// 模拟初始数据（丰富演示数据）
const initialMessages: MessageItem[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', affiliation: 'Stanford University', participants: 10, programType: 'Full Immersion Program', travelTime: '2026年10月', message: '请问10月份还有名额吗？我们是一个10人的学生团队，希望可以安排一次沉浸式的访华交流。', status: 'new', ip: '203.0.113.42', location: '美国 加利福尼亚州', device: 'MacBook Pro', browser: 'Chrome 126', createdAt: '2026-09-08 10:23' },
  { id: 2, name: 'Alice Wang', email: 'alice.wang@corp.com', affiliation: 'Global Tech Ltd.', participants: 5, programType: 'Custom Group Program', travelTime: '2026年12月', message: '想咨询定制项目，我们公司希望年底派5名管理层去深圳和上海考察。', status: 'processed', ip: '198.51.100.23', location: '中国 香港', device: 'iPhone 15 Pro', browser: 'Safari 17', createdAt: '2026-09-08 09:12' },
  { id: 3, name: 'Mark Lee', email: 'mark.lee@university.edu', affiliation: 'Cambridge University', participants: 15, programType: 'Short-term Explorer', travelTime: '2026年11月', message: '我们是一个15人的学术团队，计划去北京和西安，请提供报价和行程方案。', status: 'replied', ip: '192.0.2.156', location: '英国 剑桥', device: 'Windows PC', browser: 'Edge 125', createdAt: '2026-09-07 18:45', repliedContent: '您好，Mark！我们已经收到您的需求，详细的定制方案和报价单已经发送至您的邮箱，请注意查收。', repliedAt: '2026-09-07 19:00' },
  { id: 4, name: 'Sara Johnson', email: 'sara@consulting.com', affiliation: 'McKinsey & Company', participants: 3, programType: 'Business Insight', travelTime: '2026年9月底', message: '希望了解针对咨询行业从业者的商务考察项目细节。', status: 'new', ip: '203.0.113.88', location: '美国 纽约州', device: 'iPad Pro', browser: 'Safari 17', createdAt: '2026-09-08 08:15' },
  { id: 5, name: 'Chen Wei', email: 'chen.wei@tech.cn', affiliation: 'Tencent', participants: 20, programType: 'Custom Group Program', travelTime: '2027年1月', message: '我们明年1月计划20人出行，想去成都和深圳，请评估一下可行性。', status: 'processed', ip: '198.51.100.77', location: '中国 广东深圳', device: 'Windows PC', browser: 'Chrome 126', createdAt: '2026-09-06 16:20' },
  { id: 6, name: 'Emma Brown', email: 'emma.b@school.edu', affiliation: 'Oxford High School', participants: 25, programType: 'Culture Tour', travelTime: '2026年11月', message: '高中生团队，想了解中国文化研学项目，请发资料。', status: 'replied', ip: '192.0.2.190', location: '英国 伦敦', device: 'MacBook Air', browser: 'Firefox 127', createdAt: '2026-09-05 11:30', repliedContent: '您好，Emma！相关的中国研学手册和报价已经准备好，请您查收邮件！', repliedAt: '2026-09-05 11:35' },
];

const PAGE_SIZE = 5;

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'processed' | 'replied'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [viewMessage, setViewMessage] = useState<MessageItem | null>(null);
  const [replyMessage, setReplyMessage] = useState<MessageItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    document.title = "留言管理 - ChinaPuzzles Admin";
  }, []);

  // 筛选与分页
  const filteredMessages = messages.filter(msg => {
    const matchSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        msg.affiliation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / PAGE_SIZE));
  const currentMessages = filteredMessages.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 统计
  const totalCount = messages.length;
  const newCount = messages.filter(m => m.status === 'new').length;
  const repliedCount = messages.filter(m => m.status === 'replied').length;

  // 提交回复
  const handleSendReply = () => {
    if (!replyMessage || !replyContent.trim()) {
      alert('请输入回复内容');
      return;
    }
    setIsReplying(true);
    setTimeout(() => {
      setMessages(messages.map(m => m.id === replyMessage.id ? { ...m, status: 'replied', repliedContent: replyContent, repliedAt: new Date().toLocaleString('zh-CN') } : m));
      setIsReplying(false);
      setReplyMessage(null);
      setReplyContent('');
    }, 800);
  };

  // 标记处理状态
  const toggleStatus = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: m.status === 'new' ? 'processed' : (m.status === 'processed' ? 'replied' : 'new') } : m));
  };

  // 删除
  const handleDelete = () => {
    if (deleteId) {
      setMessages(messages.filter(m => m.id !== deleteId));
      setDeleteId(null);
    }
  };

  // 弹窗状态切换
  const statusLabels: Record<string, string> = {
    new: '新留言',
    processed: '已处理',
    replied: '已回复'
  };

  const statusColors: Record<string, string> = {
    new: 'bg-red-50 text-[#B41615]',
    processed: 'bg-blue-50 text-blue-600',
    replied: 'bg-emerald-50 text-emerald-600'
  };

  return (
    <div className="relative z-10 space-y-8">
      
      {/* 页面标题区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">留言管理</h1>
          <p className="text-neutral-500 mt-1">查看用户提交的咨询信息并进行回复处理</p>
        </div>
      </div>

      {/* 统计概览卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <p className="text-sm text-neutral-500">总留言数</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">{totalCount}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <p className="text-sm text-neutral-500">待处理（新留言）</p>
          <p className="text-3xl font-bold text-[#B41615] mt-2">{newCount}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <p className="text-sm text-neutral-500">已回复</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{repliedCount}</p>
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
              placeholder="搜索姓名、邮箱或机构..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'new', 'processed', 'replied'] as const).map(status => (
              <button 
                key={status}
                onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  statusFilter === status
                    ? 'bg-[#B41615] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {status === 'all' ? '全部' : statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        {/* 留言表格 */}
        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">留言人</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">联系方式</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">留言内容</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">提交时间</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">IP地址</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {currentMessages.map((msg) => (
              <tr key={msg.id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-medium">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{msg.name}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{msg.affiliation}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm text-neutral-600"><Mail size={14} className="text-neutral-400" /> {msg.email}</p>
                    <p className="flex items-center gap-2 text-sm text-neutral-600"><Users size={14} className="text-neutral-400" /> {msg.participants}人</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-neutral-700 line-clamp-2 max-w-[300px]">{msg.message}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-neutral-500">{msg.createdAt}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="space-y-1">
                    <p className="text-sm text-neutral-500">{msg.ip}</p>
                    <p className="text-xs text-neutral-400">{msg.location}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(msg.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${statusColors[msg.status]}`}
                  >
                    {msg.status === 'replied' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                    {statusLabels[msg.status]}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setViewMessage(msg)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      title="查看详情"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => { setReplyMessage(msg); setReplyContent(msg.repliedContent || ''); }}
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#B41615] hover:bg-red-50 transition-all duration-200"
                      title="回复"
                    >
                      <Reply size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(msg.id)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                    >
                      <Trash2 size={18} />
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

      {/* ===== 查看详情弹窗 ===== */}
      {viewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">留言详情</h2>
              <button onClick={() => setViewMessage(null)} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* 基础信息 */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-2">
                  
                  <span className="text-sm text-neutral-600">姓名：<strong className="text-neutral-900">{viewMessage.name}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">提交时间：{viewMessage.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">IP地址：{viewMessage.ip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">地区：{viewMessage.location}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Monitor size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">设备：{viewMessage.device} / {viewMessage.browser}</span>
                </div>
              </div>

              {/* 详细表单字段 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700">咨询详情</h3>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">邮箱地址：{viewMessage.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">所属机构：{viewMessage.affiliation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">参与人数：{viewMessage.participants}人</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">项目类型：{viewMessage.programType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-600">计划出行时间：{viewMessage.travelTime}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-neutral-700 mb-2">留言内容</p>
                  <div className="p-4 bg-neutral-50 rounded-xl text-sm text-neutral-700 leading-relaxed">
                    {viewMessage.message}
                  </div>
                </div>

                {/* 回复记录 */}
                {viewMessage.status === 'replied' && viewMessage.repliedContent && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                    <p className="text-sm font-semibold text-emerald-700 mb-2">回复记录（{viewMessage.repliedAt}）</p>
                    <p className="text-sm text-emerald-700 leading-relaxed">{viewMessage.repliedContent}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button 
                  onClick={() => setViewMessage(null)}
                  className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
                >
                  关闭
                </button>
                <button 
                  onClick={() => { setReplyMessage(viewMessage); setReplyContent(viewMessage.repliedContent || ''); setViewMessage(null); }}
                  className="px-5 py-2.5 rounded-lg bg-[#B41615] hover:bg-[#8a0f0f] text-white text-sm font-medium shadow-md shadow-red-900/20 transition-all hover:-translate-y-0.5"
                >
                  回复此留言
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 回复弹窗 ===== */}
      {replyMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">回复留言</h2>
              <button onClick={() => { setReplyMessage(null); setReplyContent(''); }} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-sm text-neutral-600">回复给：<strong>{replyMessage.name}</strong></p>
                <p className="text-xs text-neutral-500 mt-1">邮箱：{replyMessage.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">回复内容</label>
                <textarea 
                  value={replyContent} 
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="请输入回复内容..."
                  rows={5}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all resize-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => { setReplyMessage(null); setReplyContent(''); }}
                className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSendReply}
                disabled={isReplying}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isReplying ? 'bg-neutral-300 cursor-not-allowed' : 'bg-[#B41615] hover:bg-[#8a0f0f] text-white shadow-md shadow-red-900/20 hover:-translate-y-0.5'
                }`}
              >
                {isReplying ? '发送中...' : '发送回复'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 删除确认弹窗 ===== */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <Trash2 size={24} className="text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">确认删除留言</h2>
            <p className="text-sm text-neutral-500 mb-6">删除后无法恢复，确认要删除该留言吗？</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium shadow-md transition-all"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}