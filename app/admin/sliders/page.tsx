'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Search, X, UploadCloud } from 'lucide-react';

interface SliderItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  sort: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const initialSliders: SliderItem[] = [
  { id: 1, title: '首屏主视觉 - 北京', description: '讲述北京的中轴线故事', imageUrl: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=500', link: '/program', sort: 1, status: 'active', createdAt: '2026-09-01' },
  { id: 2, title: '探索成都与熊猫', description: '体验天府之国的松弛感', imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500', link: '/program', sort: 2, status: 'active', createdAt: '2026-09-02' },
  { id: 3, title: '大湾区科技创新', description: '走进深圳的科技前沿', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500', link: '/program', sort: 3, status: 'inactive', createdAt: '2026-09-03' },
];

const PAGE_SIZE = 5;

export default function SlidersPage() {
  const [sliders, setSliders] = useState<SliderItem[]>(initialSliders);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    sort: 1,
    status: 'active' as 'active' | 'inactive'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "轮播图管理 - ChinaPuzzles Admin";
  }, []);

  // 图片上传处理：自动转 Base64 预览
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredSliders = sliders.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredSliders.length / PAGE_SIZE));
  const currentSliders = filteredSliders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', imageUrl: '', link: '', sort: sliders.length + 1, status: 'active' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: SliderItem) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description, imageUrl: item.imageUrl, link: item.link, sort: item.sort, status: item.status });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.imageUrl) {
      alert('请填写标题并上传图片');
      return;
    }

    if (editingItem) {
      setSliders(sliders.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
    } else {
      const newItem: SliderItem = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSliders([...sliders, newItem]);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      setSliders(sliders.filter(item => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const toggleStatus = (id: number) => {
    setSliders(sliders.map(item => item.id === id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item));
  };

  const moveItem = (id: number, direction: 'up' | 'down') => {
    const index = sliders.findIndex(item => item.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sliders.length) return;

    const reordered = [...sliders];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setSliders(reordered.map((item, i) => ({ ...item, sort: i + 1 })));
  };

  return (
    <div className="relative z-10 space-y-8">
      
      {/* 顶部标题区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">轮播图管理</h1>
          <p className="text-neutral-500 mt-1">管理首页横幅，控制展示顺序与上下架状态</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-[#B41615] hover:bg-[#8a0f0f] text-white text-sm font-medium px-6 py-3 rounded-xl shadow-[0_4px_12px_rgba(180,22,21,0.25)] hover:shadow-[0_6px_16px_rgba(180,22,21,0.35)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} /> 新增轮播图
        </button>
      </div>

      {/* 列表区 */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索轮播图标题..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
            />
          </div>
          <span className="text-sm text-neutral-400">共 {filteredSliders.length} 条数据</span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">图片预览</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">标题</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">描述</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">排序</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {currentSliders.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-24 h-14 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-neutral-900">{item.title}</p>
                  <p className="text-xs text-neutral-400 mt-1">创建于 {item.createdAt}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-neutral-500 line-clamp-2 max-w-[250px]">{item.description}</p>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(item.id)}
                    className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      item.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                    {item.status === 'active' ? '已上架' : '已下架'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-700">{item.sort}</span>
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveItem(item.id, 'up')} className="text-neutral-300 hover:text-[#B41615] transition-colors">
                        <ArrowUp size={14} />
                      </button>
                      <button onClick={() => moveItem(item.id, 'down')} className="text-neutral-300 hover:text-[#B41615] transition-colors">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#B41615] hover:bg-red-50 transition-all duration-200"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(item.id)}
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
          <p className="text-sm text-neutral-500">
            第 <span className="font-medium text-neutral-900">{currentPage}</span> / {totalPages} 页
          </p>
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

      {/* 新增/编辑弹窗（含上传图片） */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">{editingItem ? '编辑轮播图' : '新增轮播图'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* 标题 (深色文字显式设置) */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">标题</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入轮播图标题"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                />
              </div>
              
              {/* 描述 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">描述</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="请输入简短描述"
                  rows={2}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all resize-none"
                />
              </div>

              {/* 图片上传区域 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">上传图片</label>
                <label className="mt-1 flex items-center justify-center w-full h-36 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-[#B41615] transition-colors bg-neutral-50 overflow-hidden relative">
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="预览" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-sm text-neutral-500 flex flex-col items-center gap-2">
                            <UploadCloud size={20} className="text-neutral-400"/>
                            点击上传图片
                        </span>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      ref={fileInputRef}
                    />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">跳转链接</label>
                  <input 
                    type="text" 
                    value={formData.link} 
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/program"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">状态</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                  >
                    <option value="active">上架</option>
                    <option value="inactive">下架</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2.5 rounded-lg bg-[#B41615] hover:bg-[#8a0f0f] text-white text-sm font-medium shadow-md shadow-red-900/20 transition-all hover:-translate-y-0.5"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <Trash2 size={24} className="text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">确认删除</h2>
            <p className="text-sm text-neutral-500 mb-6">此操作无法撤销，确认要删除这条轮播图吗？</p>
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