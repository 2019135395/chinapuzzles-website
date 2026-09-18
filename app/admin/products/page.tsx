'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Pencil, Trash2, Search, X, UploadCloud, MapPin, CalendarDays, 
  BookOpen, Clock, ArrowUp, ArrowDown, Image as ImageIcon, ListChecks
} from 'lucide-react';

// 定义行程节点类型
interface ScheduleItem {
  day: string;
  title: string;
  description: string;
}

// 定义产品类型
interface ProductItem {
  id: number;
  programNo: string; // 例如 Program 01
  title: string;
  cities: string[];
  days: string;
  overview: string;
  coverImage: string; // 项目封面
  schedule: ScheduleItem[];
  status: 'active' | 'inactive';
  createdAt: string;
}

// 模拟初始数据
const initialProducts: ProductItem[] = [
  {
    id: 1,
    programNo: 'Program 01',
    title: 'The North-South Axis: Empire, Pandas, and the Silicon Coast',
    cities: ['Beijing', 'Chengdu', 'Shenzhen'],
    days: '10 Days',
    overview: 'This 10-day program is designed for you to trace China\'s arc. From the imperial north to the innovation south. Participants will walk through the Forbidden City and onto the Great Wall, meet giant pandas in Chengdu, and end in Shenzhen — the engine room of China\'s digital economy.',
    coverImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=500',
    schedule: [
      { day: '01', title: 'Arrival & Welcome', description: 'Begin with an opening briefing, a city orientation and time to settle into the journey.' },
      { day: '02', title: 'Culture & Heritage', description: 'Step into living history through architecture, craft and conversations with local hosts.' },
      { day: '03', title: 'Business & Innovation', description: 'Meet the people and ideas shaping China\'s fast-moving innovation landscape.' },
      { day: '04', title: 'Local Experience', description: 'Share everyday moments, food and neighborhood stories that bring the itinerary to life.' }
    ],
    status: 'active',
    createdAt: '2026-09-01'
  },
  {
    id: 2,
    programNo: 'Program 02',
    title: 'The Capital-to-Coast Journey: Heritage, Panda Country, and the Global Metropolis',
    cities: ['Beijing', 'Chengdu', 'Shanghai'],
    days: '12 Days',
    overview: 'This 12-day program is designed for you to travel from imperial Beijing, through the panda-filled west, to Shanghai\'s global skyline...',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500',
    schedule: [
      { day: '01', title: 'Arrival & Welcome', description: 'Begin with an opening briefing, a city orientation and time to settle into the journey.' },
      { day: '02', title: 'Culture & Heritage', description: 'Step into living history through architecture, craft and conversations with local hosts.' }
    ],
    status: 'inactive',
    createdAt: '2026-09-02'
  }
];

const PAGE_SIZE = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 表单状态
  const [formData, setFormData] = useState({
    programNo: '',
    title: '',
    citiesText: '',
    days: '',
    overview: '',
    coverImage: '',
    schedule: [] as ScheduleItem[],
    status: 'active' as 'active' | 'inactive'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "产品管理 - ChinaPuzzles Admin";
  }, []);

  // 筛选与分页
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.programNo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 封面上传（转 Base64）
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 新增产品
  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ 
      programNo: `Program ${String(products.length + 1).padStart(2, '0')}`,
      title: '', citiesText: '', days: '10 Days', overview: '', coverImage: '', schedule: [], status: 'active' 
    });
    setIsModalOpen(true);
  };

  // 编辑产品
  const handleEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      programNo: product.programNo,
      title: product.title,
      citiesText: product.cities.join(' · '),
      days: product.days,
      overview: product.overview,
      coverImage: product.coverImage,
      schedule: product.schedule,
      status: product.status
    });
    setIsModalOpen(true);
  };

  // 保存新增/编辑
  const handleSave = () => {
    if (!formData.title.trim() || !formData.coverImage) {
      alert('请填写项目标题并上传封面图');
      return;
    }

    const cities = formData.citiesText.split('·').map(c => c.trim()).filter(c => c);

    const productData = {
      programNo: formData.programNo,
      title: formData.title,
      cities,
      days: formData.days,
      overview: formData.overview,
      coverImage: formData.coverImage,
      schedule: formData.schedule,
      status: formData.status
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      const newProduct: ProductItem = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  // 删除
  const handleDelete = () => {
    if (deleteId) {
      setProducts(products.filter(p => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  // 切换状态
  const toggleStatus = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));
  };

  // 动态添加行程节点
  const addScheduleItem = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: String(prev.schedule.length + 1).padStart(2, '0'), title: '', description: '' }]
    }));
  };

  // 更新行程节点
  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const updatedSchedule = formData.schedule.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData(prev => ({ ...prev, schedule: updatedSchedule }));
  };

  // 删除行程节点
  const removeScheduleItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="relative z-10 space-y-8">
      
      {/* 页面标题区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">产品项目管理</h1>
          <p className="text-neutral-500 mt-1">维护前台展示的项目、封面、行程节点等详细内容</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-[#B41615] hover:bg-[#8a0f0f] text-white text-sm font-medium px-6 py-3 rounded-xl shadow-[0_4px_12px_rgba(180,22,21,0.25)] hover:shadow-[0_6px_16px_rgba(180,22,21,0.35)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} /> 新增项目
        </button>
      </div>

      {/* 列表区 */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* 搜索与筛选区 */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索项目编号或标题..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
            />
          </div>
          <span className="text-sm text-neutral-400">共 {filteredProducts.length} 个项目</span>
        </div>

        {/* 产品表格 */}
        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">项目封面</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">项目编号</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">城市与天数</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-28 h-16 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200">
                    <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-[#B41615]">
                    {product.programNo}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-neutral-900 max-w-[300px] line-clamp-2">{product.title}</p>
                  <p className="text-xs text-neutral-400 mt-1">创建于 {product.createdAt}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin size={14} className="text-neutral-400" /> {product.cities.join(' · ')}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-neutral-600">
                      <CalendarDays size={14} className="text-neutral-400" /> {product.days}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(product.id)}
                    className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      product.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                    {product.status === 'active' ? '已上架' : '已下架'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#B41615] hover:bg-red-50 transition-all duration-200"
                      title="编辑"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(product.id)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                      title="删除"
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

      {/* ===== 新增/编辑产品弹窗 ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">{editingProduct ? '编辑项目' : '新增项目'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-5">
              {/* 基本信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">项目编号</label>
                  <input 
                    type="text" 
                    value={formData.programNo} 
                    onChange={(e) => setFormData({ ...formData, programNo: e.target.value })}
                    placeholder="Program 01"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">行程天数</label>
                  <input 
                    type="text" 
                    value={formData.days} 
                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    placeholder="10 Days"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">项目名称</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入项目完整标题"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                />
              </div>

              {/* 封面上传区域 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">项目封面图</label>
                <label className="mt-1 flex items-center justify-center w-full h-44 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-[#B41615] transition-colors bg-neutral-50 overflow-hidden relative">
                    {formData.coverImage ? (
                        <img src={formData.coverImage} alt="预览" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-sm text-neutral-500 flex flex-col items-center gap-2">
                            <UploadCloud size={24} className="text-neutral-400"/>
                            点击上传项目封面
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

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">途径城市 (用 · 分隔)</label>
                <input 
                  type="text" 
                  value={formData.citiesText} 
                  onChange={(e) => setFormData({ ...formData, citiesText: e.target.value })}
                  placeholder="Beijing · Chengdu · Shenzhen"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">项目概述</label>
                <textarea 
                  value={formData.overview} 
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="请输入项目概述"
                  rows={3}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              {/* 动态行程节点管理 */}
              <div className="border-t border-neutral-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">行程节点 (Schedule)</h3>
                  <button 
                    onClick={addScheduleItem}
                    className="flex items-center gap-2 text-sm text-[#B41615] hover:text-[#8a0f0f] transition-colors"
                  >
                    <Plus size={16} /> 添加节点
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.schedule.map((item, index) => (
                    <div key={index} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">Day 编号</label>
                          <input 
                            type="text" 
                            value={item.day} 
                            onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
                            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] transition-all"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-neutral-600 mb-1">节点标题</label>
                          <input 
                            type="text" 
                            value={item.title} 
                            onChange={(e) => updateScheduleItem(index, 'title', e.target.value)}
                            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] transition-all"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-neutral-600 mb-1">节点描述</label>
                        <textarea 
                          value={item.description} 
                          onChange={(e) => updateScheduleItem(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] transition-all resize-none"
                        />
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button 
                          onClick={() => removeScheduleItem(index)}
                          className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 transition-colors"
                        >
                          <Trash2 size={14} /> 删除此节点
                        </button>
                      </div>
                    </div>
                  ))}
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
                保存项目
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
            <h2 className="text-xl font-bold text-neutral-900 mb-2">确认删除项目</h2>
            <p className="text-sm text-neutral-500 mb-6">删除后无法恢复，确认要删除该项目吗？</p>
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