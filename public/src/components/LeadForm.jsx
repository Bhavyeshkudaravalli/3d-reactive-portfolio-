import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Sparkles, 
  Clock, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { profile } from '../data/profile';

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    service: 'Web Development / Portfolio',
    timeline: 'Within 1-2 weeks',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide a brief project description.';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Please provide at least 10 characters describing your idea.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback if canvas not available
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || status === 'submitting') return;

    setStatus('submitting');
    setFeedbackMessage('');

    const { apiEndpoint, web3FormsKey, formspreeId, fallbackEmail } = profile.formConfig;

    try {
      // 1. Primary: Direct /api/contact endpoint powered by Resend
      if (apiEndpoint) {
        try {
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              company: formData.company || 'Not specified',
              service: formData.service,
              timeline: formData.timeline,
              description: formData.description
            })
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              setStatus('success');
              setFeedbackMessage('Thank you! Your project inquiry has been sent directly to Bhavyesh. I will review your requirements and get back to you within 24 hours.');
              triggerCelebration();
              return;
            }
          }
        } catch (apiErr) {
          console.warn('Backend API endpoint unavailable, attempting fallbacks:', apiErr);
        }
      }

      // 2. Fallback: If Web3Forms key is configured
      if (web3FormsKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Project Inquiry from ${formData.fullName} - ${formData.service}`,
            name: formData.fullName,
            email: formData.email,
            company: formData.company || 'Not specified',
            service: formData.service,
            timeline: formData.timeline,
            message: formData.description
          })
        });
        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setFeedbackMessage('Thank you! Your project inquiry has been sent successfully. I will get back to you within 24 hours.');
          triggerCelebration();
          return;
        }
      }

      // 2. If Formspree ID is configured
      if (formspreeId) {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            company: formData.company || 'N/A',
            service: formData.service,
            timeline: formData.timeline,
            message: formData.description
          })
        });
        if (response.ok) {
          setStatus('success');
          setFeedbackMessage('Thank you! Your inquiry was sent via Formspree. I will reply to your email shortly.');
          triggerCelebration();
          return;
        }
      }

      // 3. Fallback: API keys not yet configured in environment
      // Gracefully open mailto client with prefilled details and display setup guidance
      const subject = encodeURIComponent(`Project Inquiry: ${formData.service} - from ${formData.fullName}`);
      const body = encodeURIComponent(
        `Hi ${profile.name},\n\nI would like to discuss a project with you:\n\n` +
        `• Name: ${formData.fullName}\n` +
        `• Email: ${formData.email}\n` +
        `• Company: ${formData.company || 'N/A'}\n` +
        `• Requested Service: ${formData.service}\n` +
        `• Preferred Timeline: ${formData.timeline}\n\n` +
        `Project Overview:\n${formData.description}\n\n` +
        `Best regards,\n${formData.fullName}`
      );

      const mailtoUrl = `mailto:${fallbackEmail || profile.email}?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoUrl;

      setStatus('success');
      setShowConfigNotice(true);
      setFeedbackMessage(
        `Inquiry pre-filled! Your email client has been opened with your inquiry details. Once sent, I'll review and reply to ${formData.email}.`
      );
      triggerCelebration();

    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setFeedbackMessage('An unexpected error occurred. Please use direct email or WhatsApp below.');
    }
  };

  const whatsappUrl = profile.whatsappNumber
    ? `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(
        `Hi ${profile.preferredName || profile.name}, I came across your portfolio and would like to discuss a software/web project with you!`
      )}`
    : null;

  return (
    <section id="inquiry" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Let's Build Together.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            Send a project proposal or career inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="glass-card rounded-2xl p-7 border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-2">
                Why Work With Me?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                As a developing software professional, I bring fresh energy, strong dedication, modern development tools, and transparent collaboration to every task.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">24-Hour Response Time</h4>
                    <p className="text-[11px] text-slate-400">I review and respond to every serious project message promptly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">Clear Scope & Realistic Milestones</h4>
                    <p className="text-[11px] text-slate-400">No surprises or jargon. We agree on features and timeline upfront.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">Dedicated Collaboration</h4>
                    <p className="text-[11px] text-slate-400">Focused attention on your project requirements and continuous updates.</p>
                  </div>
                </div>
              </div>

              {/* Direct Alternative Channels */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Prefer Direct Messaging?
                </span>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                  </a>
                )}

                <a
                  href={`mailto:${profile.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Direct Email: {profile.email}</span>
                </a>

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Generation Form */}
          <div className="lg:col-span-7 w-full text-left">
            <div className="glass-card rounded-2xl p-7 sm:p-8 border border-slate-800/80 shadow-2xl relative">
              
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-white">Inquiry Received!</p>
                    <p className="mt-1 text-slate-300">{feedbackMessage}</p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          fullName: '',
                          email: '',
                          company: '',
                          service: 'Web Development / Portfolio',
                          timeline: 'Within 1-2 weeks',
                          description: ''
                        });
                      }}
                      className="mt-3 text-xs text-cyan-400 underline font-medium"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </div>
              )}

              {showConfigNotice && (
                <div className="mb-6 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                  <p>
                    <strong>Developer Note:</strong> To receive form inquiries directly in your inbox without mailto, add your free key in <code>.env</code> as <code>VITE_WEB3FORMS_KEY</code> or <code>VITE_FORMSPREE_KEY</code>.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-white">Submission Issue</p>
                    <p className="mt-1">{feedbackMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 text-xs focus:outline-none transition-colors ${
                        errors.fullName ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 text-xs focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Company / Business (Optional) & Service Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Business or Organization <span className="text-slate-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Studio / Brand / Self"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                      Inquiry Type / Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Web Development / Portfolio" className="bg-slate-900 text-slate-100">
                        Web Development / Portfolio
                      </option>
                      <option value="Python Application Development" className="bg-slate-900 text-slate-100">
                        Python Application Development
                      </option>
                      <option value="AI & Deep Learning Project" className="bg-slate-900 text-slate-100">
                        AI & Deep Learning Project
                      </option>
                      <option value="Internship / Full-Time Opportunity" className="bg-slate-900 text-slate-100">
                        Internship / Full-Time Opportunity
                      </option>
                      <option value="General Collaboration / Other" className="bg-slate-900 text-slate-100">
                        General Collaboration / Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Preferred Timeline */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                    Preferred Timeline <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Flexible / No rush">Flexible / No rush</option>
                  </select>
                </div>

                {/* Row 4: Project Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-slate-300 font-medium">
                      Project Description <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formData.description.length} characters
                    </span>
                  </div>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe what you would like to build, any reference sites you like, and your main goals..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 text-xs focus:outline-none transition-colors ${
                      errors.description ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500 text-center font-mono">
                  🔒 No spam. Your contact info is strictly used to reply to your inquiry.
                </p>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
