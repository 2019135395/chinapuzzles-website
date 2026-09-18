'use client';

import { useState } from 'react';
import Link from 'next/link';
import IpLocation from '@/components/IpLocation';
import localFont from 'next/font/local';

// ✅ 本地 Bodoni 字体（字体放在 app/ 下，此文件在 app/components/ 下时用 ../）
// 如果编译报错找不到路径，请参考文末的“路径调整”说明
const bodoni = localFont({
  src: [
    { path: '../app/fonts/Bodoni-06-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../app/fonts/Bodoni-06-Bold.ttf',   weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-bodoni',
});

interface FormErrors {
  name?: string;
  email?: string;
}

const ContactFooter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showNotice = (type: 'success' | 'error', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showNotice('error', 'Please fill in the required fields correctly.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/liuyan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showNotice('success', 'Inquiry sent successfully! We will contact you soon.');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        showNotice('error', data.message || 'Failed to send inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      showNotice('error', 'Network error. Please email us directly at info@chinapuzzles.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer>
      {/* 上半部分：红色背景 */}
      <div className="bg-[#B41615] text-white flex items-center py-12 md:py-16">
        <div className="max-w-[1264px] mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 xl:gap-32">

            {/* 左侧内容 */}
            <div className="flex flex-col">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/80 mb-4">
                  Get in touch
                </p>

                {/* ✅ 换成 Bodoni 字体，字号保持不变 */}
                <h2 className={`${bodoni.className} text-[42px] leading-[1.15] tracking-tight text-white mb-5`}>
                  Unlock your China insight.
                </h2>

                <div className="border-t border-red-200/20 mb-5"></div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between max-w-md gap-1">
                  <span className="text-xs uppercase tracking-widest text-red-200/70">Email</span>
                  <a href="mailto:info@chinapuzzles.com" className="hover:text-white transition-colors break-all">
                    info@chinapuzzles.com
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between max-w-md gap-1">
                  <span className="text-xs uppercase tracking-widest text-red-200/70">Phone</span>
                  <span>+852 6348 2146</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between max-w-md gap-1">
                  <span className="text-xs uppercase tracking-widest text-red-200/70">Location</span>
                  <IpLocation />
                </div>
              </div>
            </div>

            {/* 右侧表单 */}
            <div className="flex flex-col">
              {/* ✅ 换成 Bodoni 字体，字号保持不变 */}
              <h3 className={`${bodoni.className} text-[42px] leading-[1.15] mb-4`}>
                Send an inquiry
              </h3>

              <p className="text-red-100/80 text-xs md:text-sm leading-relaxed mb-5">
                Let us know your interest Program
                <br className="hidden md:block" />
                <span className="text-red-100/60 text-[11px]">(Custom Program will be made upon request)</span>
              </p>

              {notice && (
                <div
                  role="alert"
                  className={`mb-4 flex items-start gap-2 border px-3 py-2.5 text-xs leading-relaxed transition-all duration-300 ${
                    notice.type === 'success'
                      ? 'border-green-300/60 bg-green-500/15 text-green-50'
                      : 'border-red-200/70 bg-white/10 text-red-50'
                  }`}
                >
                  <span className="mt-[1px] shrink-0">
                    {notice.type === 'success' ? '✔' : '⚠'}
                  </span>
                  <span>{notice.text}</span>
                </div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5 text-red-100/90">
                      Your Name <span className="text-red-200">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border p-2.5 sm:p-3 text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-300/90 focus:border-red-300'
                          : 'border-red-200/30 focus:border-red-200/80'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-200">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5 text-red-100/90">
                      Your E-mail <span className="text-red-200">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border p-2.5 sm:p-3 text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-300/90 focus:border-red-300'
                          : 'border-red-200/30 focus:border-red-200/80'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-200">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5 text-red-100/90">Your Message</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-red-200/30 p-2.5 sm:p-3 text-white placeholder-neutral-400 focus:outline-none focus:border-red-200/80 transition-colors resize-none"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#c7a061] hover:bg-[#b89053] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 px-6 sm:py-3 sm:px-8 w-full sm:w-fit transition-colors"
                  >
                    {submitting ? 'Sending...' : 'Submit Inquiry →'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* 下半部分：深色背景 */}
      <div className="bg-[#1A1F24] text-neutral-400 pt-6 md:pt-8 pb-4 md:pb-6">
        <div className="max-w-[1264px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            <div>
              <h4 className="text-white text-xl font-serif mb-2.5">China Puzzles</h4>
              <div className="space-y-1 text-xs text-neutral-500">
                <p>Bridging cultures. </p>
                <p>Connecting people.</p>
                <p>Empowering global leaders.</p>
              </div>
            </div>

            <div>
              <h4 className="text-white text-base font-medium mb-2.5">Explore</h4>
              <ul className="space-y-1.5 text-xs">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Program</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-base font-medium mb-2.5">Resources</h4>
              <ul className="space-y-1.5 text-xs">
                <li><Link href="#" className="hover:text-white transition-colors">Program Brochure</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Sample Itinerary</Link></li>
                <li><Link href="/resources/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-base font-medium mb-2.5">Contact</h4>
              <a href="mailto:info@chinapuzzles.com" className="text-xs hover:text-white transition-colors break-all">
                info@chinapuzzles.com
              </a>
            </div>

          </div>

          <div className="border-t border-neutral-800 pt-3.5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <p>&copy; {new Date().getFullYear()} China Puzzles. All rights reserved</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="text-neutral-600">|</span>
              <Link href="/termsconditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;