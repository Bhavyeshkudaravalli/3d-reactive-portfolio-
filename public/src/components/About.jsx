import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Target, 
  Sparkles, 
  Briefcase, 
  Award, 
  Download,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { profile } from '../data/profile';
import { Card3D } from './Card3D';

export const About = () => {
  return (
    <section id="about" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <Target className="w-4 h-4" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Background & Credentials.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium">
            Computer Science (AI & ML) student building practical web apps & intelligent models.
          </p>
        </div>

        {/* 4 High-Impact Stat Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 text-left">
            <span className="text-cyan-400 font-mono text-xs sm:text-sm uppercase tracking-wider block font-bold mb-1">Degree</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">2026</h3>
            <p className="text-slate-400 text-sm font-medium">B.Tech Final Year</p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 text-left">
            <span className="text-emerald-400 font-mono text-xs sm:text-sm uppercase tracking-wider block font-bold mb-1">Academics</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">7.33</h3>
            <p className="text-slate-400 text-sm font-medium">Cumulative CGPA</p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 text-left">
            <span className="text-blue-400 font-mono text-xs sm:text-sm uppercase tracking-wider block font-bold mb-1">Experience</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">Codec Tech</h3>
            <p className="text-slate-400 text-sm font-medium">Web Dev Intern</p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800/80 text-left">
            <span className="text-amber-400 font-mono text-xs sm:text-sm uppercase tracking-wider block font-bold mb-1">Status</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">Open</h3>
            <p className="text-slate-400 text-sm font-medium">Full-Time & Internships</p>
          </div>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left Column: Work Experience & Focus */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-slate-800/80">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-7 h-7 text-cyan-400" />
                <span>Work Experience</span>
              </h3>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Web Development Intern <span className="text-cyan-400">@ Codec Technologies</span>
                  </h4>
                  <span className="text-xs sm:text-sm font-mono text-slate-400 font-semibold">
                    April 2025 – May 2025
                  </span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>Engineered responsive web interfaces using JavaScript, HTML5 & CSS3.</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>Collaborated with engineering team on Git version control and code reviews.</span>
                  </div>
                </div>
              </div>

              {/* Direct Resume Download Button */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Download Complete Resume</h4>
                  <p className="text-sm text-slate-400">PDF document with full academic & project details.</p>
                </div>
                <a
                  href={profile.resumePath}
                  download="Bhavyesh_Kuduravalli_Resume.pdf"
                  className="btn-theme-gradient inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white shadow-lg shrink-0 active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Details & Certifications */}
          <div className="lg:col-span-5 space-y-6">
            <Card3D maxTilt={6}>
              <div className="glass-card rounded-3xl p-8 border border-slate-800/80 space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                  <GraduationCap className="w-7 h-7 text-blue-400" />
                  <span>Education</span>
                </h3>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-cyan-400 font-bold mb-1">
                      <span>2022 - 2026</span>
                      <span>CGPA: 7.33</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">B.Tech, Computer Science (AI & ML)</h4>
                    <p className="text-sm text-slate-400 mt-1">Amrita Sai Institute of Science & Technology</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-cyan-400 font-bold mb-1">
                      <span>2022</span>
                      <span>Score: 640/1000</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">Senior Secondary (Class 12)</h4>
                    <p className="text-sm text-slate-400 mt-1">Sri Sarada Junior College, Vijayawada</p>
                  </div>
                </div>

                {/* Key Certifications */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Certifications</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200">
                      🏆 Tata Data Visualization
                    </span>
                    <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200">
                      ☁️ AWS Cloud Foundation
                    </span>
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
