"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
  Share2,
  Smartphone,
  Layers,
} from "lucide-react";

// Types
interface CampaignResult {
  id: string;
  productName: string;
  price: string;
  offerDetails: string;
  cleanPhone: string;
  headline: string;
  subheadline: string;
  metaAd: {
    title: string;
    primaryText: string;
    targetAudience: string;
  };
  shortVideoScript: {
    hook: string;
    scene1: string;
    scene2: string;
    scene3: string;
    cta: string;
  };
  whatsappMessage: {
    text: string;
    directUrl: string;
  };
  marketingAngles: Array<{
    title: string;
    description: string;
    tagline: string;
  }>;
}

// Quick presets for trial
const PRESETS = [
  {
    name: "سماعات Pro عازلة للضوضاء",
    price: "199 ر.س",
    offer: "خصم 35% بمناسبة نهاية الأسبوع + شحن مجاني لجميع مناطق المملكة وضمان استبدال ذهبي لمدة سنتين",
    phone: "966501234567",
  },
  {
    name: "عطر ليالي الشرق الفاخر 100 مل",
    price: "280 ر.س",
    offer: "اشتر زجاجة واحصل على الثانية بنصف السعر + عينة مجانية فاخرة وتوصيل فوري بنفس اليوم",
    phone: "966555987654",
  },
  {
    name: "حقيبة جلد طبيعي للأعمال واللابتوب",
    price: "340 ر.س",
    offer: "وفر 120 ريال اليوم فقط + محفظة بطاقات جلدية مجانية مع كل طلب",
    phone: "966540112233",
  },
];

export default function OfferKitLandingPage() {
  // Form State
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [campaign, setCampaign] = useState<CampaignResult | null>(null);
  const [activeTab, setActiveTab] = useState<"meta" | "video" | "whatsapp" | "angles">("meta");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Quick Preset Loader
  const loadPreset = (preset: (typeof PRESETS)[0]) => {
    setProductName(preset.name);
    setPrice(preset.price);
    setOfferDetails(preset.offer);
    setWhatsappNumber(preset.phone);
    setErrors({});
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  // Clean phone number for WhatsApp
  const cleanPhoneForWhatsApp = (phone: string) => {
    let cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
    if (cleaned.startsWith("00")) {
      cleaned = cleaned.substring(2);
    }
    if (cleaned.startsWith("0") && cleaned.length === 10) {
      cleaned = "966" + cleaned.substring(1);
    }
    return cleaned;
  };

  // Form Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!productName.trim()) {
      errs.productName = "يرجى كتابة اسم المنتج أو الخدمة";
    }
    if (!price.trim()) {
      errs.price = "يرجى تحديد السعر";
    }
    if (!offerDetails.trim()) {
      errs.offerDetails = "يرجى كتابة تفاصيل العرض (مثل: الخصم، الهدايا، التوصيل)";
    } else if (offerDetails.trim().length < 6) {
      errs.offerDetails = "يرجى كتابة وصف أطول قليلاً للعرض للحصول على إعلان جذاب";
    }
    if (!whatsappNumber.trim()) {
      errs.whatsappNumber = "يرجى إدخال رقم الواتساب لربطه بروابط الطلب";
    } else {
      const digits = whatsappNumber.replace(/\D/g, "");
      if (digits.length < 8) {
        errs.whatsappNumber = "رقم الهاتف غير صالح، تأكد من عدد الأرقام ومفتاح الدولة";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Generate Campaign Handler
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => {
      setGenerationStep(2);
    }, 600);

    setTimeout(() => {
      setGenerationStep(3);
    }, 1200);

    setTimeout(() => {
      const cleanPhone = cleanPhoneForWhatsApp(whatsappNumber);
      const waText = `مرحباً، أود طلب منتج (${productName.trim()}) بناءً على عرضكم:\nالسعر: ${price.trim()}\nالعرض: ${offerDetails.trim()}\nأرجو إفادتي بتفاصيل الدفع والشحن. شكراً!`;
      const directUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

      const newCampaign: CampaignResult = {
        id: `offer-${Date.now()}`,
        productName: productName.trim(),
        price: price.trim(),
        offerDetails: offerDetails.trim(),
        cleanPhone,
        headline: `عرض استثنائي على ${productName.trim()}: متوفر الآن بسعر ${price.trim()} فقط!`,
        subheadline: `فرصة لا تعوض: ${offerDetails.trim()}. اطلب الآن عبر الواتساب واستفد من هذا العرض الحصري قبل نفاد الكمية.`,
        metaAd: {
          title: `🔥 أقوى عرض على ${productName.trim()} | ${price.trim()}`,
          primaryText: `وصل حديثاً الأكثر طلباً: ${productName.trim()}! 🛍️✨\n\nهل تبحث عن الجودة الفائقة والتوفير الحقيقي؟\nجهزنا لك هذا العرض الخاص:\n🏷️ السعر: ${price.trim()} فقط\n🎁 العرض الحصري: ${offerDetails.trim()}\n\n✅ توصيل سريع وموثوق\n✅ ضمان أصلي وخدمة عملاء عبر الواتساب\n⚡ الكمية محدودة جداً لهذا الأسبوع.\n\nاضغط على الرابط بالأسفل للطلب المباشر والتحدث معنا عبر الواتساب!`,
          targetAudience: `المهتمون بـ ${productName.trim()}، المتسوقون أونلاين، الفئة العمرية 20-50 في المملكة والخليج`,
        },
        shortVideoScript: {
          hook: `🚨 انتبه قبل تشتري ${productName.trim()}! العرض هذا ممكن يغير رأيك تماماً...`,
          scene1: `(0:00 - 0:03): لقطة مقربة للمنتج مع مؤثر صوتي ملفت. كتابة على الشاشة: "وفر فلوسك مع أقوى عرض اليوم!".`,
          scene2: `(0:04 - 0:08): توضيح أثر المنتج وحل المشكلة، واستعراض العرض: ${offerDetails.trim()} بسعر ${price.trim()} فقط.`,
          scene3: `(0:09 - 0:12): تجربة حقيقية أو استعراض العلبة والتوصيل السريع والضمان الذهبي.`,
          cta: `(0:13 - 0:15): "الرابط في البايو أو اضغط زر الواتساب واطلب فوراً قبل لا ينتهي المخزون!"`,
        },
        whatsappMessage: {
          text: waText,
          directUrl,
        },
        marketingAngles: [
          {
            title: "زاوية الندرة والاستعجال (FOMO & Urgency)",
            description: "تعتمد على إشعار المشتري بأن العرض مؤقت والكميات تنفد سريعاً، مما يقلل وقت التفكير.",
            tagline: `كميات محدودة جداً! احصل على ${offerDetails.trim()} قبل إغلاق الطلبات.`,
          },
          {
            title: "زاوية القيمة والتوفير المالي (High Value)",
            description: "تركز على الفارق السعري وما يحصل عليه العميل مجاناً مقارنة بالسوق.",
            tagline: `أفضل قيمة مقابل سعرك: ${productName.trim()} بسعر ${price.trim()} مع إضافات حصرية.`,
          },
          {
            title: "زاوية الراحة والأمان في الشراء (Zero Risk)",
            description: "تزيل تخوفات الشراء أونلاين بالتركيز على الضمان والدفع السهل وخدمة الواتساب المباشرة.",
            tagline: `اطلب وأنت مرتاح عبر الواتساب، منتج أصلي ومضمون مع دعم فوري.`,
          },
        ],
      };

      setCampaign(newCampaign);
      setIsGenerating(false);
      setGenerationStep(0);

      const resultsEl = document.getElementById("campaign-results");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 1800);
  };

  const scrollToForm = () => {
    const el = document.getElementById("generator-form-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const firstInput = document.getElementById("productNameInput");
      firstInput?.focus();
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                OfferKit
              </span>
              <span className="text-[11px] font-semibold text-blue-600 tracking-wide mt-0.5">
                أوفر كيت
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              كيف تعمل
            </a>
            <a href="#features" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              المميزات
            </a>
            <a href="#generator-form-card" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              مُولد الحملات
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              قصص نجاح المتاجر
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollToForm}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-sm shadow-blue-600/25 whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <span>جرب أداتنا مجاناً</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>المنصة الأولى الموجهة لأصحاب المتاجر الإلكترونية في العالم العربي</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.25] text-balance">
              حوّل بيانات منتجك إلى{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                حملة تسويقية متكاملة
              </span>{" "}
              بالذكاء الاصطناعي خلال ثوانٍ
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              توقف عن إضاعة الساعات في كتابة الإعلانات أو انتظار وكالات التسويق. أدخل اسم منتجك وسعرك، وسيقوم أوفر كيت بتوليد نصوص إعلانية محفزة للشراء، سيناريوهات فيديو قصيرة، وروابط طلب مباشرة للواتساب فوراً.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>جرب أداتنا مجاناً</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-center"
              >
                <span>كيف يعمل النظام؟</span>
              </a>
            </div>

            {/* Stats */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-200/80 mt-10">
              <div className="p-3 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">12,400+</p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">حملة أُطلقت بنجاح</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">3.8x</p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">متوسط زيادة المبيعات</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">15 ثانية</p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">زمن إعداد الحملة الكاملة</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">98.4%</p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">رضا أصحاب المتاجر</p>
              </div>
            </div>

            {/* Compatible Platforms */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
              <span>متوافق تماماً مع:</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">منصة سلة (Salla)</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">منصة زد (Zid)</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">شوبيفاي (Shopify)</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">ووكومرس (WooCommerce)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Form Section */}
      <section id="generator-form-card" className="py-16 lg:py-24 bg-white relative border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              أداة الذكاء الاصطناعي الفورية
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              أنشئ حملتك الإعلانية الآن في 4 خطوات بسيطة
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              املأ الحقول التالية بالمعلومات الأساسية لمنتجك، وستحصل فوراً على حملة تسويقية كاملة جاهزة للنشر والإطلاق.
            </p>
          </div>

          {/* Quick presets */}
          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>جرّب تعبئة نموذج جاهز بضغطة زر واحدة:</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* The Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-blue-200" />
                <h3 className="font-bold text-base sm:text-lg">بيانات المنتج والعرض التسويقي</h3>
              </div>
              <span className="text-xs bg-white/15 px-2.5 py-1 rounded-md text-white font-medium">
                توليد فوري ومجاني
              </span>
            </div>

            <form onSubmit={handleGenerate} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. اسم المنتج */}
                <div>
                  <label htmlFor="productNameInput" className="block text-sm font-bold text-slate-800 mb-2">
                    اسم المنتج <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="productNameInput"
                    type="text"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      if (errors.productName) setErrors({ ...errors, productName: "" });
                    }}
                    placeholder="مثال: ساعة ذكية مقاومة للماء مع بطارية 7 أيام"
                    className={`w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.productName
                        ? "border-red-400 focus:ring-red-400"
                        : "border-slate-200 focus:border-blue-600 focus:ring-blue-500/20"
                    }`}
                  />
                  {errors.productName && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.productName}</p>
                  )}
                </div>

                {/* 2. السعر */}
                <div>
                  <label htmlFor="priceInput" className="block text-sm font-bold text-slate-800 mb-2">
                    السعر <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="priceInput"
                    type="text"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      if (errors.price) setErrors({ ...errors, price: "" });
                    }}
                    placeholder="مثال: 199 ر.س (أو 149 بدلاً من 220)"
                    className={`w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.price
                        ? "border-red-400 focus:ring-red-400"
                        : "border-slate-200 focus:border-blue-600 focus:ring-blue-500/20"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.price}</p>
                  )}
                </div>
              </div>

              {/* 3. تفاصيل العرض */}
              <div>
                <label htmlFor="offerDetailsInput" className="block text-sm font-bold text-slate-800 mb-2">
                  تفاصيل العرض والمميزات <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="offerDetailsInput"
                  rows={3}
                  value={offerDetails}
                  onChange={(e) => {
                    setOfferDetails(e.target.value);
                    if (errors.offerDetails) setErrors({ ...errors, offerDetails: "" });
                  }}
                  placeholder="مثال: خصم 30% لنهاية الأسبوع، شحن مجاني لكافة مدن المملكة، سوار إضافي هدية، وضمان استبدال فوري"
                  className={`w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.offerDetails
                      ? "border-red-400 focus:ring-red-400"
                      : "border-slate-200 focus:border-blue-600 focus:ring-blue-500/20"
                  }`}
                />
                {errors.offerDetails && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.offerDetails}</p>
                )}
                <p className="text-[12px] text-slate-500 mt-1">
                  كلما كانت تفاصيل العرض واضحة ومحددة، كانت النصوص الإعلانية المتولدة أقوى في الإقناع.
                </p>
              </div>

              {/* 4. رقم الواتساب */}
              <div>
                <label htmlFor="whatsappNumberInput" className="block text-sm font-bold text-slate-800 mb-2">
                  رقم الواتساب لاستقبال الطلبات <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="whatsappNumberInput"
                    type="tel"
                    dir="ltr"
                    value={whatsappNumber}
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                      if (errors.whatsappNumber) setErrors({ ...errors, whatsappNumber: "" });
                    }}
                    placeholder="+966501234567"
                    className={`w-full pl-28 pr-4 py-3 text-sm bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all text-left font-mono ${
                      errors.whatsappNumber
                        ? "border-red-400 focus:ring-red-400"
                        : "border-slate-200 focus:border-blue-600 focus:ring-blue-500/20"
                    }`}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-emerald-700 font-bold pointer-events-none bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </div>
                </div>
                {errors.whatsappNumber && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.whatsappNumber}</p>
                )}
                <p className="text-[12px] text-slate-500 mt-1">
                  سيتم توليد رابط دردشة مباشر يفتح تطبيق الواتساب لدى العميل مع تعبئة رسالة الطلب تلقائياً.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-4 px-6 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>
                        {generationStep === 1 && "جارٍ تحليل بيانات المنتج والجمهور..."}
                        {generationStep === 2 && "جارٍ صياغة الإعلانات وسيناريو الفيديو..."}
                        {generationStep === 3 && "جارٍ تجهيز روابط الواتساب وزوايا التسويق..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>توليد الحملة بالذكاء الاصطناعي</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Generated Campaign Showcase */}
          {campaign && (
            <div id="campaign-results" className="mt-12 pt-8 border-t border-slate-200 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    تم توليد الحملة التسويقية بنجاح
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    حملة: {campaign.productName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تعديل أو توليد لحملة أخرى</span>
                </button>
              </div>

              {/* Master Headline Banner */}
              <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md">
                <p className="text-xs text-blue-300 font-semibold mb-1">العنوان الرئيسي المقترح للحملة (Headline Hook):</p>
                <h4 className="text-lg sm:text-xl font-bold leading-snug">{campaign.headline}</h4>
                <p className="text-sm text-blue-100/90 mt-2">{campaign.subheadline}</p>
              </div>

              {/* Interactive Tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setActiveTab("meta")}
                    className={`px-5 py-3.5 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "meta"
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>إعلانات فيسبوك وإنستغرام</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("video")}
                    className={`px-5 py-3.5 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "video"
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>سيناريو ريلز وتيك توك</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("whatsapp")}
                    className={`px-5 py-3.5 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "whatsapp"
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>رسالة ورابط الواتساب</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("angles")}
                    className={`px-5 py-3.5 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "angles"
                        ? "border-blue-600 text-blue-700 bg-white"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Target className="w-4 h-4" />
                    <span>3 زوايا تسويقية</span>
                  </button>
                </div>

                <div className="p-6">
                  {/* Tab 1: Meta Ad Copy */}
                  {activeTab === "meta" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">النص الإعلاني الرئيسي (Primary Text):</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(campaign.metaAd.primaryText, "meta")}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedKey === "meta" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ النص الإعلاني</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm whitespace-pre-line leading-relaxed font-sans">
                        {campaign.metaAd.primaryText}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg">
                          <span className="font-bold text-blue-900 block mb-1">الجمهور المستهدف المقترح:</span>
                          <span className="text-slate-700">{campaign.metaAd.targetAudience}</span>
                        </div>
                        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg">
                          <span className="font-bold text-blue-900 block mb-1">عنوان الإعلان (Headline):</span>
                          <span className="text-slate-700">{campaign.metaAd.title}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Short Video Script */}
                  {activeTab === "video" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">سيناريو فيديو 15 ثانية (Hook - Body - CTA):</span>
                        <button
                          type="button"
                          onClick={() => {
                            const fullScript = `${campaign.shortVideoScript.hook}\n\n${campaign.shortVideoScript.scene1}\n${campaign.shortVideoScript.scene2}\n${campaign.shortVideoScript.scene3}\n\n${campaign.shortVideoScript.cta}`;
                            handleCopy(fullScript, "video");
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedKey === "video" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ السيناريو كاملاً</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
                          <span className="text-xs font-bold text-red-800 block mb-1">خطاف البداية (Hook في أول 3 ثوانٍ):</span>
                          <p className="text-sm font-semibold text-red-950">{campaign.shortVideoScript.hook}</p>
                        </div>

                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-sm text-slate-800">
                          <p className="font-medium">{campaign.shortVideoScript.scene1}</p>
                          <p className="font-medium">{campaign.shortVideoScript.scene2}</p>
                          <p className="font-medium">{campaign.shortVideoScript.scene3}</p>
                        </div>

                        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                          <span className="text-xs font-bold text-emerald-800 block mb-1">الدعوة لاتخاذ إجراء (Call To Action):</span>
                          <p className="text-sm font-semibold text-emerald-950">{campaign.shortVideoScript.cta}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: WhatsApp Direct Message & Link */}
                  {activeTab === "whatsapp" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">رسالة الواتساب التلقائية عند ضغط العميل على الرابط:</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(campaign.whatsappMessage.text, "wa-msg")}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedKey === "wa-msg" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ الرسالة</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 text-sm whitespace-pre-line leading-relaxed font-sans">
                        {campaign.whatsappMessage.text}
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">رابط الشراء المباشر للواتساب (Direct Click-to-Chat):</span>
                          <span className="text-xs font-mono text-slate-500">wa.me</span>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={campaign.whatsappMessage.directUrl}
                          className="w-full px-3.5 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg text-slate-700 select-all"
                        />
                        <div className="flex items-center gap-3">
                          <a
                            href={campaign.whatsappMessage.directUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>اختبار الرابط في واتساب</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(campaign.whatsappMessage.directUrl, "wa-url")}
                            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedKey === "wa-url" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>تم نسخ الرابط!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>نسخ الرابط لإعلاناتك</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 4: 3 Marketing Angles */}
                  {activeTab === "angles" && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500">
                        اختبر هذه الزوايا التسويقية الـ 3 في إعلاناتك المختلفة لمعرفة أي زاوية تحقق أعلى مبيعات:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {campaign.marketingAngles.map((angle, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                            <span className="text-xs font-extrabold text-blue-700 block">
                              زاوية 0{idx + 1}: {angle.title}
                            </span>
                            <p className="text-xs text-slate-600 leading-relaxed">{angle.description}</p>
                            <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                              "{angle.tagline}"
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              آلية العمل
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              من فكرة منتج إلى مبيعات متتالية في 3 خطوات
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              صممنا تجربة المستخدم لتكون سريعة وخالية من أي تعقيد تقني لأصحاب المتاجر.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">أدخل بيانات منتجك وعرضك</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                اكتب اسم منتجك، سعره، وتفاصيل الخصم أو العرض الخاص مع رقم الواتساب الذي تريد استقبال الطلبات عليه.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">الذكاء الاصطناعي يصوغ الحملة</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                يقوم محركنا الذكي بتحليل سلوك المستهلك وصياغة خطافات جذابة ونصوص إعلانية مبنية على علم النفس التسويقي.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">انسخ وأطلق مبيعاتك فوراً</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                انسخ نصوص الإعلانات وضع روابط الواتساب في حملاتك، واستقبل طلبات العملاء المؤكدة مباشرة في تطبيقك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Grid */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              لماذا OfferKit؟
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              مبني خصيصاً ليضاعف عوائد متاجرك الإلكترونية
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              حلول متكاملة تغنيك عن تكاليف كتاب الإعلانات المرتفعة وبطء التنفيذ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">نصوص إعلانية موجهة للتحويل</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ليست مجرد نصوص عامة، بل إعلانات مكتوبة بأطر تسويقية مثبتة (AIDA & PAS) لرفع نسبة النقر والطلب.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">إغلاق المبيعات عبر الواتساب</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تحويل الزائر مباشرة من إعلان تيك توك أو إنستغرام لمحادثة واتساب مسبقة التعبئة يرفع معدل الإغلاق بنسبة تفوق 40%.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">سرعة إطلاق المنتجات الرابحة</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                بدل أن تستغرق يوماً كاملاً في تجهيز الحملة لكل منتج، أطلق حملات 10 منتجات جديدة في أقل من نصف ساعة.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">سيناريوهات فيديو مقنعة للمؤثرين</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                احصل على نصوص جاهزة لتقولها للمصور أو المؤثر لإنتاج مقاطع ريلز وتيك توك تخطف الانتباه في أول 3 ثوانٍ.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">تعدد الزوايا التسويقية</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                3 زوايا مختلفة لكل منتج (زاوية التوفير، زاوية حل المشكلة، وزاوية الأمان) لاختبار الحملات وتفادي حرق الجمهور.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">توفير تكاليف الوكالات الباهظة</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                وفر آلاف الريالات شهرياً واستثمر ميزانيتك مباشرة في الإعلانات المدفوعة لزيادة مبيعاتك الفعلية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              آراء أصحاب المتاجر
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              ماذا يقول تجار التجارة الإلكترونية عن OfferKit؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                "وفرت على متجري تكلفة كاتب محتوى إعلاني. حملة عطورنا الأخيرة ولدناها بالكامل عبر أوفر كيت وحققت عائد إعلاني ROAS 4.6x في أول أسبوعين."
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  س.ع
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">سلطان العتيبي</h5>
                  <p className="text-xs text-slate-500">مؤسس متجر نخبة العطور · الرياض</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                "ميزة رابط الواتساب الجاهز مع تفاصيل العرض رفعت نسبة ردود العملاء إلى الضعف. العميل يضغط على الإعلان ويصلنا طلبه مكتوباً وجاهزاً للدفع."
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  م.ش
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">مها الشمري</h5>
                  <p className="text-xs text-slate-500">مديرة متجر رداء الأناقة · جدة</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                "سيناريو الفيديو القصير ممتاز جداً! أعطيته لمصمم الفيديو وصنعنا 3 فيديوهات تيك توك انتشرت بشكل واسع وجلبت مئات الطلبات خلال أيام."
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  ع.خ
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">عبدالله الخالدي</h5>
                  <p className="text-xs text-slate-500">متجر إلكترونيات تك بلس · الدمام</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              الأسئلة الشائعة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              كل ما تحتاج معرفته عن أوفر كيت
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "هل الأداة مجانية لتجربة توليد الحملات؟",
                a: "نعم، يمكنك تجربة توليد حملات إعلانية لمنتجاتك مجاناً وبدون الحاجة لبطاقة ائتمانية لمعاينة جودة النصوص وتجربة روابط الواتساب.",
              },
              {
                q: "كيف تساعدني المنصة في زيادة مبيعات متجري؟",
                a: "تمنحك نصوصاً وسيناريوهات مبنية على علم النفس البيعي (التوفير، الندرة، وسهولة الشراء)، بالإضافة إلى ربط إعلاناتك برقم الواتساب مباشرة مما يقلل تسرب العملاء ويسهل إتمام الطلبات.",
              },
              {
                q: "هل تناسب الأداة المتاجر الناشئة أم الكبيرة؟",
                a: "تناسب الطرفين! أصحاب المتاجر الناشئة يوفرون تكلفة توظيف فريق تسويقي، بينما المتاجر الكبيرة تضاعف سرعة اختبار المنتجات الجديدة والحملات الموسمية.",
              },
              {
                q: "هل يمكنني تعديل النصوص المتولدة بعد نسخها؟",
                a: "بالتأكيد، النصوص ملكك بالكامل ويمكنك تعديل الأسعار، اللهجة، أو إضافة أي شروط خاصة بمتجرك قبل نشرها في منصات التواصل أو الإعلانات الممولة.",
              },
            ].map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full p-4 sm:p-5 text-right font-bold text-slate-900 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${faqOpen === index ? "rotate-180" : ""}`}
                  />
                </button>
                {faqOpen === index && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            جاهز لتحويل منتجاتك إلى مبيعات يومية متواصلة؟
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            ابدأ الآن بإنشاء أول حملة إعلانية لمنتجك خلال 30 ثانية مجاناً وشاهد الفارق في تفاعل عملائك.
          </p>
          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 text-base font-bold text-blue-900 bg-white hover:bg-blue-50 active:bg-blue-100 rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>جرب أداتنا مجاناً</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">OfferKit</span>
            <span className="text-xs text-slate-500 mr-2">منصة حملات التسويق الذكية لأصحاب المتاجر</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              كيف تعمل
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              المميزات
            </a>
            <a href="#generator-form-card" className="hover:text-white transition-colors">
              المولد
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              الأسئلة الشائعة
            </a>
          </div>

          <div className="text-xs text-slate-500">
            جميع الحقوق محفوظة &copy; 2026 OfferKit. صُمم لدعم التجارة الإلكترونية.
          </div>
        </div>
      </footer>
    </div>
  );
}