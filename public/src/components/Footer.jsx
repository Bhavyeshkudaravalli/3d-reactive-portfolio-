import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profile } from '../data/profile';

const currentYear = new Date().getFullYear();

export const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black/30 border-t border-slate-800/60 text-slate-400 text-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px]">
                <div className="w-full h-full bg-[#070A10] rounded-[10px] flex items-center justify-center">
                  <span className="font-mono font-bold text-cyan-400 text-xs">BK</span>
                </div>
              </div>
              <span className="font-bold text-white text-base">
                {profile.name}
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Computer Science / IT fresher dedicated to practical software engineering, Python application development, and user-friendly web solutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Path 1: For Recruiters */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              For Tech Recruiters
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('#about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Academic Background
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#skills')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Technical Skills & CS Core
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#projects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Hospital Mgmt Case Study
                </button>
              </li>
              <li>
                <a
                  href={profile.resumePath}
                  download
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>Download Resume (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Path 2: For Clients */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              Collaboration & Inquiries
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('#projects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Featured Projects & Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#workflow')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  How I Work (4-Step Process)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#inquiry')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Start Project Inquiry →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Scroll To Top */}
          <div className="lg:col-span-1 flex lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-slate-400">
            <span>Built with practical focus, clean code, and continuous learning.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
