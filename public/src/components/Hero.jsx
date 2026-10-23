import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  FileDown, 
  Mail, 
  Play, 
  CheckCircle2, 
  Terminal as TerminalIcon 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profile } from '../data/profile';
import { Card3D } from './Card3D';
import { Developer3D } from './Developer3D';

export const Hero = () => {
  const [hasRunCode, setHasRunCode] = useState(false);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-violet-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* 3D Reactive Developer (Man sitting in chair in front of laptop, rotating head to follow cursor) */}
            <Developer3D />

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('#projects')}
                className="btn-theme-gradient inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-200 active:scale-95 group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#inquiry')}
                className="btn-theme-secondary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base sm:text-lg font-bold transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-theme-accent" />
                <span>Work Together</span>
              </button>
            </div>

            {/* Dual User Journey Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-8 max-w-xl">
              <button
                onClick={() => scrollTo('#skills')}
                className="btn-journey text-sm sm:text-base font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <span>👔 Recruiter View</span>
              </button>
              <button
                onClick={() => scrollTo('#inquiry')}
                className="btn-journey text-sm sm:text-base font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <span>💼 Client Inquiry</span>
              </button>
            </div>

            {/* Additional Links: GitHub, LinkedIn, Resume, Email */}
            <div className="flex items-center gap-5 text-slate-300 pt-3 border-t border-slate-800/80 w-full max-w-xl text-sm sm:text-base font-semibold">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={profile.resumePath}
                download
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Download Resume (PDF)"
              >
                <FileDown className="w-5 h-5 text-cyan-400" />
                <span>Resume</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors ml-auto"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
            </div>

          </div>

          {/* Right Column: Modern Developer Terminal Preview with 3D Physics Tilt */}
          <div className="lg:col-span-5 w-full">
            <Card3D maxTilt={7}>
              <div className="terminal-window relative rounded-2xl border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-sm sm:text-base">
                
                {/* Window Title Bar */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2.5 text-slate-400 text-xs sm:text-sm font-mono flex items-center gap-1.5 font-semibold">
                      <TerminalIcon className="w-4 h-4 text-cyan-400" />
                      developer_profile.py
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHasRunCode(!hasRunCode)}
                      className="btn-terminal-run flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold transition-colors active:scale-95"
                      title="Run developer profile simulation"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{hasRunCode ? 'Reset' : 'Run'}</span>
                    </button>
                  </div>
                </div>

                {/* Code Editor Body */}
                <div className="p-6 overflow-x-auto text-left leading-relaxed text-slate-200 bg-slate-950/70 text-sm sm:text-base">
                  <p>
                    <span className="code-keyword">class</span>{' '}
                    <span className="code-entity">SoftwareDeveloper</span>:
                  </p>
                  <div className="pl-5">
                    <p>
                      <span className="code-keyword">def</span>{' '}
                      <span className="code-func">__init__</span>(self):
                    </p>
                    <div className="pl-5 text-slate-200">
                      <p>self.name = <span className="code-string">"{profile.name}"</span></p>
                      <p>self.focus = [<span className="code-string">"Python"</span>, <span className="code-string">"React"</span>, <span className="code-string">"AI/ML"</span>]</p>
                      <p>self.primary = <span className="code-string">"Hospital Management"</span></p>
                      <p>self.status = <span className="code-string">"Available for Roles"</span></p>
                    </div>
                  </div>

                  {/* Simulated Terminal Output */}
                  {hasRunCode ? (
                    <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs sm:text-sm p-4 rounded-xl border border-cyan-500/30 bg-slate-900/90 animate-fadeIn">
                      <p className="flex items-center gap-2 font-bold text-theme-accent">
                        <CheckCircle2 className="w-4 h-4" />
                        $ python developer_profile.py
                      </p>
                      <p className="code-string mt-1.5 font-mono font-semibold">
                        Ready to build. Status: Available for Projects & Full-Time!
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm text-slate-400">
                      <span>Click "Run" to execute</span>
                      <span className="text-theme-accent font-mono font-bold">Python 3.12</span>
                    </div>
                  )}
                </div>

                {/* Bottom live stats pills */}
                <div className="grid grid-cols-3 gap-2 px-5 py-3.5 bg-slate-900/80 border-t border-slate-800/80 text-center text-xs sm:text-sm text-slate-300 font-semibold">
                  <div className="py-2 px-3 rounded-xl bg-slate-800/60">
                    <span className="stat-accent-1 font-bold block text-sm sm:text-base">Python</span>
                    <span>Backend</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-slate-800/60">
                    <span className="stat-accent-2 font-bold block text-sm sm:text-base">React</span>
                    <span>Frontend</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-slate-800/60">
                    <span className="stat-accent-3 font-bold block text-sm sm:text-base">AI / ML</span>
                    <span>Models</span>
                  </div>
                </div>

              </div>
            </Card3D>
          </div>

        </div>
      </div>
    </section>
  );
};
