import React from 'react';
import { 
  GitFork, 
  MessageSquare, 
  FileText, 
  Code, 
  Rocket 
} from 'lucide-react';
import { workflowSteps } from '../data/workflow';

const stepIcons = [MessageSquare, FileText, Code, Rocket];

export const Workflow = () => {
  return (
    <section id="workflow" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <GitFork className="w-4 h-4" />
            <span>PROCESS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            How I Work.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            Structured 4-step execution pipeline from discovery to deployment.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || Code;

            return (
              <div
                key={step.step}
                className="glass-card rounded-3xl p-7 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between text-left relative group"
              >
                <div>
                  {/* Top: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-cyan-400/90 group-hover:text-cyan-300">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-sm font-mono text-cyan-400 font-semibold block mb-3">
                    {step.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
