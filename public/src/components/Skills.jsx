import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Info,
  Keyboard as KeyboardIcon,
  LayoutGrid
} from 'lucide-react';
import { skills, skillCategories } from '../data/skills';
import { Keyboard3D } from './Keyboard3D';

export const Skills = () => {
  const [viewMode, setViewMode] = useState('3d-keyboard'); // '3d-keyboard' | 'grid'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (level) => {
    switch (level) {
      case 'Proficient':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          desc: 'High comfort & regular use'
        };
      case 'Familiar':
        return {
          bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          dot: 'bg-cyan-400',
          desc: 'Applied in projects & coursework'
        };
      case 'Learning':
      default:
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400',
          desc: 'Currently studying & practicing'
        };
    }
  };

  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-mono font-bold tracking-wider mb-4">
            <Cpu className="w-4 h-4" />
            <span>TECH STACK</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Technical Skills.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
            Python, React, AI/ML models, and database architecture.
          </p>

          {/* Mode Selector: 3D Keyboard vs Grid */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 mt-6 shadow-lg">
            <button
              onClick={() => setViewMode('3d-keyboard')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all ${
                viewMode === '3d-keyboard'
                  ? 'btn-theme-gradient text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyboardIcon className="w-4 h-4" />
              <span>3D Keyboard</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all ${
                viewMode === 'grid'
                  ? 'btn-theme-gradient text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Skill Cards</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: 3D Interactive Mechanical Keyboard */}
        {viewMode === '3d-keyboard' && (
          <div className="animate-fadeIn">
            <Keyboard3D columns={6} />
          </div>
        )}

        {/* View Mode 2: Detailed Category Cards & Search Filter */}
        {viewMode === 'grid' && (
          <div className="animate-fadeIn">
            {/* Filter Controls & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 w-full sm:w-auto">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Quick Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search skills, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSkills.map((skill) => {
                const badge = getStatusBadge(skill.level);
                return (
                  <div
                    key={skill.name}
                    className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Skill Name + Level Badge */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <h3 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-base">
                          {skill.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border shrink-0 ${badge.bg}`}
                          title={badge.desc}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {skill.level}
                        </span>
                      </div>

                      {/* Practical Description */}
                      <p className="text-xs text-slate-400 leading-relaxed mb-4 text-left">
                        {skill.description}
                      </p>
                    </div>

                    {/* Bottom Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 group-hover:text-slate-300 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSkills.length === 0 && (
              <div className="p-10 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
                <p>No skills found matching "{searchQuery}".</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 text-xs text-cyan-400 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Honest Transparency Note Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start sm:items-center gap-3 text-left">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-200">Transparency Note:</span>{' '}
            Skill statuses are classified as <span className="text-emerald-400 font-medium">Proficient</span> (daily code practice),{' '}
            <span className="text-cyan-400 font-medium">Familiar</span> (built projects and coursework), and{' '}
            <span className="text-amber-400 font-medium">Learning</span> (active deep-dive). No deceptive percentage bars.
          </div>
        </div>

      </div>
    </section>
  );
};
