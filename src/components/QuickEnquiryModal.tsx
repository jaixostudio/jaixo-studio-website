import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export const QuickEnquiryModal: React.FC = () => {
  const { quickEnquiryService, closeQuickEnquiry, submitEnquiry, siteConfig, services } =
    useStudioData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('₹15,000 – ₹30,000');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (quickEnquiryService) {
      setService(quickEnquiryService);
      setIsSubmitted(false);
      setErrors({});
    }
  }, [quickEnquiryService]);

  if (!quickEnquiryService) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!phone.trim() || phone.length < 8) {
      newErrors.phone = 'Please provide a valid phone or WhatsApp number';
    }
    if (!description.trim()) {
      newErrors.description = 'Please briefly describe your project goals';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    submitEnquiry({
      name,
      email,
      phone,
      service,
      budget,
      description,
    });

    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    if (!name.trim()) {
      setErrors({ name: 'Please enter your name first' });
      return;
    }
    const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `*JAIXO STUDIO Project Inquiry*\n\n*Name:* ${name}\n*Service:* ${service || 'General'}\n*Budget:* ${budget}\n*Contact Phone:* ${phone || 'Not provided'}\n*Email:* ${email || 'Not provided'}\n\n*Project Details:*\n${description || 'I would like to discuss a project with JAIXO STUDIO.'}`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeQuickEnquiry} />

      <div className="relative w-full max-w-xl bg-[#0F131D] border border-[#252B36] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#10141D] border-b border-[#252B36]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#078BFF]" />
            <span className="font-heading font-bold text-sm tracking-wide text-[#F5F5F2] uppercase">
              Start Your Project with JAIXO STUDIO
            </span>
          </div>

          <button
            onClick={closeQuickEnquiry}
            className="p-1.5 rounded-lg bg-[#080B12] hover:bg-[#252B36] text-[#A5AAB5] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form or Success State */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#078BFF]/10 border border-[#078BFF]/40 text-[#078BFF] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#F5F5F2]">
                Enquiry Dispatched
              </h3>
              <p className="text-sm text-[#A5AAB5] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. Your project brief has been registered in the studio database. We will review your requirements and reach out within 12–24 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={closeQuickEnquiry}
                  className="px-6 py-2.5 rounded-lg bg-[#252B36] hover:bg-[#2e3644] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                >
                  Close Window
                </button>
                <button
                  onClick={handleWhatsAppDirect}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#078BFF] hover:bg-[#0077e6] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp Now</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="alex@brand.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+91 95663 08652"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] transition-colors"
                  >
                    <option value="General Project Enquiry">General Project Enquiry</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1.5">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Under ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000+'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setBudget(tier)}
                      className={`px-2.5 py-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        budget === tier
                          ? 'bg-[#10141D] border-[#078BFF] text-[#078BFF]'
                          : 'bg-[#080B12] border-[#252B36] text-[#A5AAB5] hover:border-[#A5AAB5]/40'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1.5">
                  Project Description & Goals *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  placeholder="Tell us about your brand, what deliverables you need, and your target timeline..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#078BFF]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Studio Brief</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#F5F5F2] hover:text-[#078BFF] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#078BFF]" />
                  <span>Quick WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
