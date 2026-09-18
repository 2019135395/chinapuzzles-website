'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Canvas 粒子系统
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = "登录 - ChinaPuzzles Admin";
  }, []);

  // 粒子背景动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: any[] = [];
    const mouse = { x: null as number | null, y: null as number | null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // 更新粒子位置
        p.x += p.vx;
        p.y += p.vy;

        // 边界反弹
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 22, 21, 0.6)'; // 红色粒子，与品牌色呼应
        ctx.fill();

        // 鼠标吸附效果
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 150) * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // 粒子与粒子之间的连线
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleLogin = async () => {
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('请输入用户名和密码');
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    if (username === 'admin' && password === 'admin123') {
      document.cookie = "token=admin-token; path=/";
      router.push('/admin/dashboard');
    } else {
      setError('账号或密码错误，请重试');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden">
      
      {/* 高级粒子网络背景 */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* 登录卡片（深色玻璃拟态） */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-8 md:p-12">
        
        {/* 品牌区 */}
        <div className="text-center mb-12">
          <p className="font-serif text-4xl md:text-5xl text-white tracking-tight mb-4">China Puzzles</p>
          <p className="text-xs text-neutral-500 uppercase tracking-[0.35em]">Admin Console</p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 flex items-center gap-2 bg-[#B41615]/10 border border-[#B41615]/30 rounded-xl p-3 text-[#B41615]">
            <AlertCircle size={18} className="flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* 表单区 */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-neutral-400 mb-3">用户名</label>
            <div className="border border-white/20 rounded-xl transition-all duration-300 focus-within:border-[#B41615] focus-within:shadow-[0_0_0_3px_rgba(180,22,21,0.15)]">
              <input 
                type="text" 
                placeholder="请输入账号"
                className="w-full bg-transparent px-5 py-4 text-white placeholder-neutral-500 focus:outline-none transition-colors"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-3">密码</label>
            <div className="border border-white/20 rounded-xl transition-all duration-300 focus-within:border-[#B41615] focus-within:shadow-[0_0_0_3px_rgba(180,22,21,0.15)]">
              <input 
                type="password"
                placeholder="请输入密码"
                className="w-full bg-transparent px-5 py-4 text-white placeholder-neutral-500 focus:outline-none transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full mt-2 group flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all duration-300 ${
              isLoading 
                ? 'bg-white/10 text-neutral-400 cursor-not-allowed' 
                : 'bg-white text-[#B41615] hover:bg-[#B41615] hover:text-white hover:shadow-[0_10px_30px_rgba(180,22,21,0.3)]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></span>
                登录中...
              </>
            ) : (
              <>
                登录
               
              </>
            )}
          </button>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-600">© {new Date().getFullYear()} China Puzzles. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}