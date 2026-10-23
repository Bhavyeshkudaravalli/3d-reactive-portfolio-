import React from 'react';
import { 
  FileDown, 
  Eye, 
  GraduationCap, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Briefcase,
  Award,
  Layers 
} from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

export const Resume = () => {
  const proficientSkills = skills.filter((s) => s.level === 'Proficient');
  const familiarSkills = skills.filter((s) => s.level === 'Familiar');

  return (
    <section id="resume" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <FileDown className="w-4 h-4" />
            <span>RESUME</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Curriculum Vitae.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            Recruiter-ready summary of education, internship experience & technical skills.
          </p>

          {/* Download CTA Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.resumePath}
              download="Bhavyesh_Kuduravalli_Resume.pdf"
              className="btn-theme-gradient inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white shadow-xl transition-all active:scale-95"
            >
              <FileDown className="w-5 h-5" />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl text-base font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>View in Browser</span>
            </a>
          </div>
        </div>

        {/* Interactive Resume Sheet Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl max-w-5xl mx-auto text-left relative overflow-hidden">
          
          {/* Header Banner */}
          <div className="border-b border-slate-800 pb-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {profile.name}
              </h3>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1">
                {profile.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {profile.location} • {profile.phone} • {profile.email}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Fresher / Entry-Level Ready
              </span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Professional Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              {profile.shortBio}
            </p>
          </div>

          {/* Section: Education */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Education
            </h4>
            
            <div className="space-y-3">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 className="text-sm font-bold text-white">{edu.degree}</h5>
                    <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      {edu.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{edu.institution} • {edu.duration}</p>
                  {edu.coursework && (
                    <div className="pt-2 border-t border-slate-800/80 mt-2">
                      <span className="text-[11px] font-mono text-slate-400 block mb-1">Key Subjects:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course, cIdx) => (
                          <span key={cIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Work Experience */}
          {profile.experience && profile.experience.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Work Experience & Internship
              </h4>

              <div className="space-y-3">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h5 className="text-sm font-bold text-white">
                        {exp.role} <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                      </h5>
                      <span className="text-xs font-mono text-slate-400">
                        {exp.duration} ({exp.type})
                      </span>
                    </div>
                    <ul className="space-y-1.5 mt-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Key Projects Highlight */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" />
              Projects & Engineering Work
            </h4>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-white">{proj.title}</h5>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {proj.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{proj.techStack.slice(0, 3).join(', ')}</span>
                  </div>
                  <p className="text-xs text-slate-300">{proj.shortSummary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Toolkit Breakdown */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Technical Skill Proficiencies
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Proficient (Regular Practice)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proficientSkills.map((s) => (
                    <span key={s.name} className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Familiar (Applied & Tools)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {familiarSkills.map((s) => (
                    <span key={s.name} className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                Certifications & Course Credentials
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {profile.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left">
                    <h5 className="text-xs font-bold text-white mb-1">{cert.title}</h5>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1.5">
                      {cert.issuer} • {cert.date}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
