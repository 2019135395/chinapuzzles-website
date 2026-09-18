'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, ShieldCheck, Edit3, Megaphone } from 'lucide-react';
import { useNotify } from '@/components/NotificationProvider'; // 引入全局通知

// 固定的三个角色
const ROLES = [
  { key: 'admin', label: '管理员', icon: ShieldCheck, description: '拥有全部权限' },
  { key: 'editor', label: '内容编辑', icon: Edit3, description: '负责内容与轮播管理' },
  { key: 'operator', label: '运营专员', icon: Megaphone, description: '负责留言与日常运营' },
];

const getRoleLabel = (key: string) => {
  return ROLES.find(r => r.key === key)?.label || key;
};

// 用户类型
interface UserItem {
  id: number;
  username: string;
  role: 'admin' | 'editor' | 'operator';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

// 模拟数据
const initialUsers: UserItem[] = [
  { id: 1, username: 'admin', role: 'admin', status: 'active', lastLogin: '2026-09-08 10:23', createdAt: '2026-06-01' },
  { id: 2, username: 'editor_li', role: 'editor', status: 'active', lastLogin: '2026-09-08 09:12', createdAt: '2026-06-15' },
  { id: 3, username: 'operator_wang', role: 'operator', status: 'active', lastLogin: '2026-09-07 18:45', createdAt: '2026-07-10' },
  { id: 4, username: 'editor_zhao', role: 'editor', status: 'inactive', lastLogin: '2026-09-01 11:30', createdAt: '2026-07-22' },
  { id: 5, username: 'operator_chen', role: 'operator', status: 'active', lastLogin: '2026-09-08 08:15', createdAt: '2026-08-05' },
  { id: 6, username: 'admin_liu', role: 'admin', status: 'active', lastLogin: '2026-09-06 16:20', createdAt: '2026-08-18' },
];

const PAGE_SIZE = 5;

export default function PermissionsPage() {
  const { notify } = useNotify(); // 初始化全局通知钩子

  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 表单数据
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'editor' as 'admin' | 'editor' | 'operator',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    document.title = "权限管理 - ChinaPuzzles Admin";
  }, []);

  // 筛选与分页
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 新增用户
  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ username: '', password: '', role: 'editor', status: 'active' });
    setIsModalOpen(true);
  };

  // 编辑用户
  const handleEdit = (user: UserItem) => {
    setEditingUser(user);
    setFormData({ username: user.username, password: '', role: user.role, status: user.status });
    setIsModalOpen(true);
  };

  // 保存新增/编辑（统一使用优雅弹窗提醒）
  const handleSave = () => {
    if (!formData.username.trim()) {
      notify('error', '校验失败', '请输入用户名');
      return;
    }
    if (!editingUser && !formData.password.trim()) {
      notify('error', '校验失败', '请输入初始密码');
      return;
    }

    if (editingUser) {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...updateData } : u));
      notify('success', '保存成功', '用户信息已更新');
    } else {
      const newUser: UserItem = {
        id: Date.now(),
        username: formData.username,
        role: formData.role,
        status: formData.status,
        lastLogin: '暂无登录',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      notify('success', '添加成功', '新用户已成功创建');
    }
    setIsModalOpen(false);
  };

  // 删除
  const handleDelete = () => {
    if (deleteId) {
      setUsers(users.filter(u => u.id !== deleteId));
      setDeleteId(null);
      notify('success', '删除成功', '用户已从系统中移除');
    }
  };

  // 切换状态
  const toggleStatus = (id: number) => {
    const user = users.find(u => u.id === id);
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    notify('info', '状态变更', `用户 ${user?.username} 已${user?.status === 'active' ? '禁用' : '启用'}`);
  };

  return (
    <div className="relative z-10 space-y-8">
      
      {/* 页面标题区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">权限管理</h1>
          <p className="text-neutral-500 mt-1">管理后台用户，分配固定角色权限</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-[#B41615] hover:bg-[#8a0f0f] text-white text-sm font-medium px-6 py-3 rounded-xl shadow-[0_4px_12px_rgba(180,22,21,0.25)] hover:shadow-[0_6px_16px_rgba(180,22,21,0.35)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} /> 新增用户
        </button>
      </div>

      {/* 角色说明卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const count = users.filter(u => u.role === role.key).length;
          return (
            <div key={role.key} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <div className="p-3 rounded-xl bg-red-50 text-[#B41615]">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{role.label}</p>
                <p className="text-xs text-neutral-500 mt-1">{role.description}</p>
                <p className="text-xs font-medium text-neutral-400 mt-1">{count} 位成员</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 用户列表区 */}
      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索用户名..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
            />
          </div>
          <span className="text-sm text-neutral-400">共 {filteredUsers.length} 位用户</span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">用户名</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">角色</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">最近登录</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{user.username}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">创建于 {user.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-red-50 text-[#B41615]' 
                      : user.role === 'editor'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-amber-50 text-amber-600'
                  }`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-neutral-500">{user.lastLogin}</p>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(user.id)}
                    className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      user.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                    {user.status === 'active' ? '启用' : '禁用'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#B41615] hover:bg-red-50 transition-all duration-200"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteId(user.id)}
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

      {/* 新增/编辑用户弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">{editingUser ? '编辑用户' : '新增用户'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">用户名</label>
                <input 
                  type="text" 
                  value={formData.username} 
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="请输入登录账号"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">{editingUser ? '重置密码' : '初始密码'}</label>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingUser ? '留空则不修改密码' : '请输入初始密码'}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">分配角色</label>
                  <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' | 'operator' })}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                  >
                    {ROLES.map(role => (
                      <option key={role.key} value={role.key}>{role.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">状态</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615]/20 transition-all"
                  >
                    <option value="active">启用</option>
                    <option value="inactive">禁用</option>
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
            <h2 className="text-xl font-bold text-neutral-900 mb-2">确认删除用户</h2>
            <p className="text-sm text-neutral-500 mb-6">删除后将无法恢复，确认要删除该用户吗？</p>
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