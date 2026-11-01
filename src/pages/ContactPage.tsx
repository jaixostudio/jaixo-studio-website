import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { useStudioData } from '../context/StudioDataContext';

export const ContactPage: React.FC = () => {
  const { siteConfig, services, submitEnquiry } = useStudioData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Website Design & Development');
  const [budget, setBudget] = useState('₹15,000 – ₹30,000');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello JAIXO STUDIO, I am reaching out to discuss a creative design or development project.'
  )}`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'A valid email address is required';
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'A valid contact/WhatsApp phone number is required';
    }
    if (!description.trim() || description.length < 10) {
      errs.description = 'Please describe your project requirements in at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
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

    setIsSuccess(true);
  };

  const handleSendToWhatsApp = () => {
    const message = `*JAIXO STUDIO Contact Enquiry*\n\n*Name:* ${name || 'Prospective Client'}\n*Email:* ${email || 'Not supplied'}\n*Phone:* ${phone || 'Not supplied'}\n*Service:* ${service}\n*Budget:* ${budget}\n\n*Requirements:*\n${description || 'I would like to discuss a project with JAIXO STUDIO.'}`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-20">
      {/* Top Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10141D] border border-[#252B36] text-xs font-heading font-medium tracking-[0.2em] text-[#078BFF] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#078BFF]" />
            <span>Initiate Collaboration</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#F5F5F2] tracking-tight">
            Start a Conversation with JAIXO STUDIO.
          </h1>

          <p className="text-base sm:text-lg text-[#A5AAB5] font-light leading-relaxed">
            Have a project in mind? Fill out our formal enquiry form below or connect instantly through WhatsApp and Instagram.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Configurable Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0F131D] border border-[#252B36] space-y-8">
              <div>
                <h3 className="text-xl font-heading font-bold text-[#F5F5F2]">
                  Direct Studio Channels
                </h3>
                <p className="text-xs text-[#A5AAB5] mt-1 leading-relaxed">
                  We respond promptly during studio hours (10:00 AM – 7:30 PM IST).
                </p>
              </div>

              {/* Instagram Card */}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#10141D] border border-[#252B36] hover:border-[#078BFF]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080B12] border border-[#252B36] flex items-center justify-center text-[#078BFF]">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading uppercase tracking-wider text-[#A5AAB5] block">
                      Instagram Direct
                    </span>
                    <span className="text-sm font-semibold text-[#F5F5F2] group-hover:text-[#078BFF] transition-colors">
                      {siteConfig.instagramHandle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#A5AAB5] group-hover:text-[#078BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* WhatsApp Card */}
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#10141D] border border-[#252B36] hover:border-[#078BFF]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080B12] border border-[#252B36] flex items-center justify-center text-[#078BFF]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading uppercase tracking-wider text-[#A5AAB5] block">
                      WhatsApp Quick Chat
                    </span>
                    <span className="text-sm font-semibold text-[#F5F5F2] group-hover:text-[#078BFF] transition-colors">
                      {siteConfig.whatsappNumber}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#A5AAB5] group-hover:text-[#078BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="p-5 rounded-2xl bg-[#10141D] border border-[#252B36] hover:border-[#078BFF]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#080B12] border border-[#252B36] flex items-center justify-center text-[#078BFF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading uppercase tracking-wider text-[#A5AAB5] block">
                      Formal Email
                    </span>
                    <span className="text-sm font-semibold text-[#F5F5F2] group-hover:text-[#078BFF] transition-colors">
                      {siteConfig.contactEmail}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#A5AAB5] group-hover:text-[#078BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Location & Hours */}
              <div className="pt-4 border-t border-[#252B36] space-y-3 text-xs text-[#A5AAB5]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#078BFF]" />
                  <span>{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#078BFF]" />
                  <span>{siteConfig.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#10141D] border border-[#252B36] flex items-center gap-3.5 text-xs text-[#A5AAB5]">
              <ShieldCheck className="w-5 h-5 text-[#078BFF] shrink-0" />
              <span>
                All client proposals, brand assets, and discussions are kept strictly confidential.
              </span>
            </div>
          </div>

          {/* Right Column: Full Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0F131D] border border-[#252B36]">
              {isSuccess ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#078BFF]/10 border border-[#078BFF]/40 text-[#078BFF] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[#F5F5F2]">
                    Enquiry Successfully Received
                  </h3>
                  <p className="text-sm text-[#A5AAB5] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. Your project brief for <strong className="text-white">{service}</strong> has been logged in our studio workflow. We will analyze your requirements and get back to you with a roadmap.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setDescription('');
                      }}
                      className="px-6 py-2.5 rounded-lg bg-[#252B36] hover:bg-[#2e3644] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                    >
                      Submit Another Request
                    </button>
                    <button
                      onClick={handleSendToWhatsApp}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#078BFF] hover:bg-[#0077e6] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ping on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#F5F5F2]">
                      Project Commission Form
                    </h3>
                    <p className="text-xs text-[#A5AAB5] mt-1">
                      Fill out the details below to receive an itemized proposal and delivery schedule.
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="john@organization.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone & Service Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-2">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="+91 95663 08652"
                        className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-2">
                        Service Required *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] transition-colors"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Custom Cross-Discipline Suite">
                          Custom Cross-Discipline Suite
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Project Budget Tier */}
                  <div>
                    <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-2">
                      Estimated Project Budget (INR)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        'Under ₹10,000',
                        '₹10,000 – ₹25,000',
                        '₹25,000 – ₹50,000',
                        '₹50,000+',
                      ].map((tier) => (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setBudget(tier)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                            budget === tier
                              ? 'bg-[#10141D] border-[#078BFF] text-[#078BFF] font-semibold'
                              : 'bg-[#080B12] border-[#252B36] text-[#A5AAB5] hover:border-[#A5AAB5]/50'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-2">
                      Project Description & Timeline Goals *
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors({ ...errors, description: '' });
                      }}
                      placeholder="Please tell us about your brand, key objectives, reference inspirations, and preferred delivery date..."
                      className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-[#F5F5F2] placeholder-[#A5AAB5]/40 transition-colors"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xl shadow-[#078BFF]/25 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Project Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendToWhatsApp}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#F5F5F2] hover:text-[#078BFF] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#078BFF]" />
                      <span>Direct via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
