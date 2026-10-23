import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projects } from '../data/projects';
import { HospitalDashboardMockup } from './HospitalDashboardMockup';
import { ProjectModal } from './ProjectModal';
import { Card3D } from './Card3D';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const featuredProject = projects.find((p) => p.isFeatured) || projects[0];
  const standardProjects = projects.filter((p) => !p.isFeatured);

  const filteredStandardProjects = standardProjects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return p.status.includes('Completed');
    if (filter === 'in-progress') return p.status.includes('In Progress');
    return true;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <FolderGit2 className="w-4 h-4" />
            <span>PROJECTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Featured Projects.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            Production-ready software & intelligent web applications.
          </p>
        </div>

        {/* ============================================================== */}
        {/* FEATURED CASE STUDY: HOSPITAL MANAGEMENT SYSTEM               */}
        {/* ============================================================== */}
        {featuredProject && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
                MAIN CASE STUDY
              </h3>
            </div>

            <Card3D maxTilt={5}>
              <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/80 relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Side: Case Study Narrative */}
                <div className="lg:col-span-6 flex flex-col text-left space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-mono flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {featuredProject.status}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-xs sm:text-sm font-mono font-semibold">
                      {featuredProject.category}
                    </span>
                  </div>

                  <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {featuredProject.title}
                  </h4>
                  
                  <p className="text-base sm:text-lg font-bold text-cyan-300/90 font-mono">
                    {featuredProject.subtitle}
                  </p>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    {featuredProject.shortSummary}
                  </p>

                  {/* Problem & Solution Callout */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2.5">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block font-semibold">
                        The Challenge:
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {featuredProject.problemSolved}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block font-semibold">
                        The Solution:
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {featuredProject.proposedSolution}
                      </p>
                    </div>
                  </div>

                  {/* Implemented vs Planned Module Progress Preview */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-slate-400">Development Progress:</span>
                      <span className="text-cyan-400">5 Modules Implemented • 3 In Progress/Planned</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Patient Registration</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Doctor Management</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Admin Dashboard</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Role-Based Auth</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Appointment Slots (In Progress)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>Billing & PDF (Planned)</span>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => setSelectedProject(featuredProject)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
                    >
                      <span>Explore Full Case Study & Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  </div>
                </div>

                {/* Right Side: Visual Mockup Showcase */}
                <div className="lg:col-span-6 w-full">
                  <div className="p-2 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/60 border border-slate-800 shadow-inner">
                    <HospitalDashboardMockup />
                    <p className="text-[11px] text-slate-400 font-mono text-center mt-3">
                      Interactive UI component representation of the Hospital Management System
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      )}

        {/* ============================================================== */}
        {/* OTHER NOTABLE PROJECTS                                        */}
        {/* ============================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white text-left">
                Additional Projects & Systems
              </h3>
              <p className="text-xs text-slate-400 text-left">
                Web tools, CRUD utilities, and foundational applications
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filter === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({standardProjects.length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filter === 'completed' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filter === 'in-progress' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                In Progress
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStandardProjects.map((proj) => {
              const isCompleted = proj.status.includes('Completed');
              return (
                <Card3D key={proj.id} maxTilt={8} className="h-full">
                  <div className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between text-left group h-full">
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                        {proj.category}
                      </span>
                      <span
                        className={`text-xs font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {proj.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {proj.shortSummary}
                      </p>
                    </div>

                    {/* Problem / Solution preview */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
                      <p className="text-slate-300">
                        <strong className="text-slate-200">Focus:</strong> {proj.proposedSolution}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300/90 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <span>View Full Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                          title="GitHub Source"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card3D>
              );
            })}
          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
