import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Layers, 
  Lightbulb, 
  AlertCircle,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const implementedCount = project.modules?.filter(m => m.status === 'Implemented').length || 0;
  const inProgressCount = project.modules?.filter(m => m.status === 'In Progress').length || 0;
  const plannedCount = project.modules?.filter(m => m.status === 'Planned').length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div 
        className="modal-dialog-content relative w-full max-w-4xl border border-slate-700/80 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {project.status}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Overview & Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'modules'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Modules & Features ({implementedCount}/{project.modules?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('learnings')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'learnings'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Key Learnings & Architecture</span>
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Executive Summary
                </h4>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {project.shortSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-2 font-mono">
                    <AlertCircle className="w-4 h-4" />
                    Problem Being Solved
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-2 font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    Proposed Engineering Solution
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.proposedSolution}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODULES & STATUS BREAKDOWN */}
          {activeTab === 'modules' && (
            <div className="space-y-5">
              {/* Status Counters */}
              <div className="flex flex-wrap gap-3 pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {implementedCount} Implemented
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  {inProgressCount} In Progress
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                  <Calendar className="w-3.5 h-3.5" />
                  {plannedCount} Planned
                </span>
              </div>

              <div className="space-y-3">
                {project.modules?.map((mod, idx) => {
                  let badge = {
                    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  };
                  if (mod.status === 'In Progress') {
                    badge = {
                      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                      icon: <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    };
                  } else if (mod.status === 'Planned') {
                    badge = {
                      bg: 'bg-slate-800/80 text-slate-400 border-slate-700',
                      icon: <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    };
                  }

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        {badge.icon}
                        <div>
                          <h5 className="text-sm font-semibold text-slate-100">
                            {mod.name}
                          </h5>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {mod.desc}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${badge.bg}`}>
                        {mod.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LEARNINGS & ARCHITECTURE */}
          {activeTab === 'learnings' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Engineering Challenges & Lessons
                </h4>
                <div className="space-y-2.5">
                  {project.keyLearnings?.map((learning, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {learning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
