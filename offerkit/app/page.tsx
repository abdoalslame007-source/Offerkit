'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, Target, Zap, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    offer: '',
    contact: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('جاري تجهيز السحر...');

    const { error } = await supabase
      .from('campaign_requests')
      .insert([
        {
          product_name: formData.productName,
          product_price: formData.price,
          offer_details: formData.offer,
          client_contact: formData.contact
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      setStatus('حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى.');
    } else {
      setStatus('تم استلام طلبك بنجاح! سنرسل لك الحملة المجانية قريباً.');
      setFormData({ productName: '', price: '', offer: '', contact: '' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-blue-700 flex items-center gap-2">
            <Sparkles className="text-yellow-500" size={28} />
            OfferKit.
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-6 border border-blue-100">
          <Zap size={16} /> أداة التسويق الأولى لأصحاب المتاجر
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          حوّل منتجاتك إلى <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-cyan-500">مبيعات حقيقية</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          لا تضيع وقتك في كتابة الإعلانات. أدخل بيانات منتجك الآن، واحصل على حملة تسويقية متكاملة (منشورات، ستوريز، ردود) تجذب العملاء.
        </p>
      </section>

      {/* Form Section */}
      <section className="max-w-md mx-auto px-4 pb-24">
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-100 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-blue-600 to-cyan-500"></div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={24} />
            ابدأ التجربة مجاناً
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">اسم المنتج</label>
              <input
                type="text"
                placeholder="مثال: حذاء رياضي مريح"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">السعر</label>
              <input
                type="number"
                placeholder="السعر بالعملة المحلية"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">تفاصيل العرض</label>
              <textarea
                placeholder="مثال: خصم 20% لفترة محدودة"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[100px]"
                value={formData.offer}
                onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رقم الواتساب للتواصل</label>
              <input
                type="text"
                placeholder="لإرسال الحملة الجاهزة لك"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white transition duration-300 flex justify-center items-center gap-2 ${isSubmitting ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:-translate-y-1'}`}
            >
              {isSubmitting ? 'جاري التوليد...' : (
                <>
                  <Target size={20} />
                  توليد الحملة التسويقية
                </>
              )}
            </button>
          </form>
          
          {status && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${status.includes('بنجاح') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              {status.includes('بنجاح') && <CheckCircle2 size={18} />}
              {status}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}