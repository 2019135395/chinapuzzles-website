'use client';

import { useState, useEffect, useRef } from 'react';

import ContactFooter from '@/components/ContactFooterTwo';

// === 自定义日期选择器（已完美适配手机端和iPad端，避免显示不全） ===
const CustomDatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    years.push(y);
  }

  const handleMonthChange = (e) => setViewDate(new Date(year, parseInt(e.target.value), 1));
  const handleYearChange = (e) => setViewDate(new Date(parseInt(e.target.value), month, 1));

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleSelect = (day) => {
    const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(selectedDate);
    setIsOpen(false);
  };

  const isSelected = (day) => {
    if (!value) return false;
    const d = new Date(value);
    return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
  };

  const ChevronDownIcon = () => (
    <svg className="h-4 w-4 text-[#B41615]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );

  useEffect(() => {
    document.title = "Inquiry Form-ChinaPuzzles";
  }, []);

  return (
    <div className="relative">
      <div 
        className="w-full bg-white border border-neutral-300 p-3.5 text-neutral-900 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615] transition-colors cursor-pointer flex items-center justify-between hover:border-[#B41615] hover:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? <span className="font-medium">{value}</span> : <span className="text-neutral-400">DD / MM / YYYY</span>}
        <svg className="h-5 w-5 text-[#B41615]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* 日历面板（响应式优化） */}
      {isOpen && (
        <div className="absolute top-full left-0 md:left-0 right-0 mt-3 bg-white p-5 md:p-6 shadow-2xl z-20 max-w-full w-full md:w-[400px]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative">
                <select 
                  value={month} 
                  onChange={handleMonthChange}
                  className="bg-transparent font-serif text-lg md:text-2xl text-neutral-900 outline-none cursor-pointer appearance-none pr-6 hover:text-[#B41615] transition-colors"
                >
                  {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="relative">
                <select 
                  value={year} 
                  onChange={handleYearChange}
                  className="bg-transparent font-serif text-lg md:text-2xl text-neutral-900 outline-none cursor-pointer appearance-none pr-6 hover:text-[#B41615] transition-colors"
                >
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button type="button" onClick={handlePrevMonth} className="text-[#B41615] hover:bg-red-50 p-2 rounded-full transition-all duration-300">
                <ChevronLeftIcon />
              </button>
              <button type="button" onClick={handleNextMonth} className="text-[#B41615] hover:bg-red-50 p-2 rounded-full transition-all duration-300">
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-3">
            {weekDays.map((d) => <div key={d} className="text-center text-xs text-neutral-400 font-medium">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={`h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-full text-sm transition-all duration-200 ${
                    isSelected(day) ? 'bg-[#B41615] text-white font-bold shadow-lg scale-105' : 'text-neutral-700 hover:bg-red-50 hover:text-[#B41615] hover:scale-110'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-400">
            Select a date
          </div>
        </div>
      )}
    </div>
  );
};

// === 主表单组件 ===
const InquiryForm = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const createObserver = (ref, setter) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { setter(true); observer.disconnect(); }
      }, { threshold: 0.15 });
      observer.observe(ref.current);
    };
    createObserver(heroRef, setIsHeroVisible);
    createObserver(contentRef, setIsContentVisible);
    createObserver(formRef, setIsFormVisible);
  }, []);

  const [formData, setFormData] = useState<Record<string, string>>({
    name: '', email: '', affiliation: '', participants: '', programType: '', travelTime: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'email', 'affiliation', 'participants', 'programType', 'travelTime'];
    const newErrors: Record<string, boolean> = {};
    let hasError = false;

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      showToast("Please fill in all required fields before submitting.", 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Thank you! Your inquiry has been submitted successfully.", 'success');
        setFormData({
          name: '', email: '', affiliation: '', participants: '', programType: '', travelTime: '', message: ''
        });
        setErrors({});
      } else {
        showToast(data.error || "Failed to send. Please try again later.", 'error');
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white border border-neutral-300 p-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#B41615] focus:ring-1 focus:ring-[#B41615] transition-colors hover:border-[#B41615]";

  return (
    <div className="bg-[#F8F7F4] text-neutral-900">
      {toast && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-200 overflow-hidden transform transition-all duration-500 ease-out ${
          toast.type === 'error' ? 'border-l-4 border-l-[#B41615]' : 'border-l-4 border-l-green-500'
        } shadow-sm`}>
          <div className="p-5 flex items-start gap-4">
            <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              toast.type === 'error' ? 'bg-[#B41615]' : 'bg-green-500'
            }`}>
              {toast.type === 'error' ? '!' : '✓'}
            </div>
            <div className="flex-1">
              <h4 className={`text-sm font-bold ${toast.type === 'error' ? 'text-[#B41615]' : 'text-green-600'}`}>
                {toast.type === 'error' ? 'Incomplete Form' : 'Success'}
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button type="button" onClick={() => setToast(null)} className="text-neutral-400 hover:text-neutral-700 text-lg leading-none">×</button>
          </div>
        </div>
      )}

      <div ref={heroRef} className="w-full bg-[#B41615] text-white">
        <div className={`max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 h-[240px] md:h-[330px] flex flex-col justify-center transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4">Home / Contact</p>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Inquiry Form</h1>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div ref={contentRef} className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ease-out ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-6">Start a conversation</h2>
            <p className="text-neutral-600 leading-relaxed">
              Tell us about your preferred program, group profile and expected travel time. We will reply within 2-3 business days.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end justify-center md:text-right">
            <a href="mailto:info@chinapuzzles.com" className="text-lg text-neutral-900 hover:text-[#B41615] transition-colors">info@chinapuzzles.com</a>
          </div>
        </div>

        <div ref={formRef} className={`transition-all duration-1000 ease-out ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            
            <div className="space-y-12">
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Name</label>
                {/* 关键修改：加上 value={formData.name} */}
                <input type="text" name="name" value={formData.name} className={inputClasses} onChange={handleChange} />
                {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Email Address</label>
                {/* 关键修改：加上 value={formData.email} */}
                <input type="email" name="email" value={formData.email} className={inputClasses} onChange={handleChange} />
                {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Affiliation (University / Company)</label>
                {/* 关键修改：加上 value={formData.affiliation} */}
                <input type="text" name="affiliation" value={formData.affiliation} className={inputClasses} onChange={handleChange} />
                {errors.affiliation && <p className="text-red-500 text-xs mt-1">Affiliation is required.</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Number of participants</label>
                {/* 关键修改：加上 value={formData.participants} */}
                <input type="number" name="participants" value={formData.participants} className={inputClasses} onChange={handleChange} />
                {errors.participants && <p className="text-red-500 text-xs mt-1">Participants number is required.</p>}
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Interested program type</label>
                <div className="relative">
                  {/* 关键修改：加上 value={formData.programType} */}
                  <select name="programType" value={formData.programType} className={`${inputClasses} appearance-none pr-10 cursor-pointer`} onChange={handleChange}>
                    <option value="">Select a program type</option>
                    <option value="culture">Culture Tour</option>
                    <option value="business">Business Insight</option>
                    <option value="custom">Custom Group Program</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="h-5 w-5 text-[#B41615]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.programType && <p className="text-red-500 text-xs mt-1">Program type is required.</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Expected travel time</label>
                {/* 日期组件由于是自定义的，已经传入了 value 和 onChange，所以会跟着清空 */}
                <CustomDatePicker value={formData.travelTime} onChange={(val) => setFormData(prev => ({ ...prev, travelTime: val }))} />
                {errors.travelTime && <p className="text-red-500 text-xs mt-1">Travel time is required.</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">Message / Questions</label>
                {/* 关键修改：加上 value={formData.message} */}
                <textarea name="message" value={formData.message} className={`${inputClasses} resize-none min-h-[130px]`} onChange={handleChange}></textarea>
              </div>
            </div>

            <div className="md:col-span-2 mt-12">
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center py-3.5 w-[220px] transition-all duration-300 gap-2 ${
                  isSubmitting ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' : 'bg-[#B41615] hover:bg-[#8a0f0f] text-white hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry →'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
};

export default InquiryForm;