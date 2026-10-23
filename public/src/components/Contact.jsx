import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  MessageSquare, 
  MapPin, 
  ExternalLink, 
  Sparkles 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profile } from '../data/profile';

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const whatsappUrl = profile.whatsappNumber
    ? `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(
        `Hi ${profile.preferredName || profile.name}, I would like to connect with you regarding an opportunity!`
      )}`
    : null;

  return (
    <section id="contact" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>CONNECT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Get In Touch.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            Open for internships, full-time software roles & freelance projects.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {/* 1. Email Card */}
          <div className="glass-card rounded-3xl p-7 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between text-left group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Direct Email
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Inquiries & career opportunities.
              </p>
              <p className="text-sm font-mono text-cyan-300 break-all select-all font-semibold">
                {profile.email}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex-1 text-center py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors"
              >
                Send Email
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 2. LinkedIn Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between text-left group">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                LinkedIn Network
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Connect for professional networking & fresher roles.
              </p>
              <p className="text-xs font-mono text-blue-300 truncate">
                {profile.linkedinUrl.replace('https://', '')}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-medium transition-colors"
              >
                <span>View LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. GitHub Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-violet-500/40 transition-all flex flex-col justify-between text-left group">
            <div>
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-105 transition-transform">
                <GithubIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                GitHub Repositories
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Review source code, commits, and project architectures.
              </p>
              <p className="text-xs font-mono text-violet-300 truncate">
                {profile.githubUrl.replace('https://', '')}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/30 text-violet-300 text-xs font-medium transition-colors"
              >
                <span>Explore GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 4. WhatsApp / Location Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between text-left group">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                WhatsApp & Location
              </h3>
              <p className="text-xs text-slate-400 mb-2">
                Quick messages & remote / hybrid availability.
              </p>
              <p className="text-xs font-mono text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {profile.location}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 block text-center py-2">
                  Open for Remote & Relocation
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Copy toast indicator */}
        {copiedEmail && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Email copied to clipboard!</span>
          </div>
        )}

      </div>
    </section>
  );
};
