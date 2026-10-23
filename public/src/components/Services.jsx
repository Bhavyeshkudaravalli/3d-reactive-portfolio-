import React from 'react';
import { 
  Layout, 
  Briefcase, 
  Sparkles, 
  RefreshCw, 
  Code2, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  Compass
} from 'lucide-react';
import { services } from '../data/services';

const iconMap = {
  Layout: Layout,
  Briefcase: Briefcase,
  Sparkles: Sparkles,
  RefreshCw: RefreshCw,
  Code2: Code2,
  Wrench: Wrench
};

export const Services = ({ onSelectService }) => {
  const handleDiscussService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const inquirySection = document.querySelector('#inquiry');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#0B0F17] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Services I Offer
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Practical web development and software solutions built with clean code and transparent communication.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const IconComponent = iconMap[svc.icon] || Code2;

            return (
              <div
                key={svc.id}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between text-left group relative"
              >
                <div>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {svc.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-800/80">
                    {svc.keyBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-3 border-t border-slate-800/60">
                  <button
                    onClick={() => handleDiscussService(svc.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-cyan-500/10 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 transition-all group/btn"
                  >
                    <span>Discuss Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
