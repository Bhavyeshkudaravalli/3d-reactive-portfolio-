import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Briefcase, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile';
import { ThemeToggle } from './ThemeToggle';
import { AudioToggle } from './AudioToggle';

export const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'How I Work', href: '#workflow', id: 'workflow' },
    { name: 'Resume', href: '#resume', id: 'resume' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'nav-blur shadow-lg shadow-black/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1.5px] shadow-sm shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[var(--bg-primary)] rounded-[10px] flex items-center justify-center transition-colors">
                <span className="font-mono font-bold text-cyan-400 group-hover:text-cyan-300 text-sm tracking-tighter">
                  BK
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors text-base leading-tight">
                {profile.name}
              </span>
              <span className="text-[11px] font-mono text-slate-400 tracking-wide">
                Software Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action / CTA & Theme Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            <AudioToggle />
            <ThemeToggle />
            <a
              href="#inquiry"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#inquiry');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 active:scale-95"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Actions: Audio + Theme Toggle + Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <AudioToggle compact={true} />
            <ThemeToggle compact={true} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl theme-dropdown-trigger focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden nav-blur border-b border-slate-800 shadow-2xl px-5 pt-3 pb-6 animate-fadeIn">
          {/* User Journey Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-2 mb-4 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleLinkClick('#about')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-cyan-500/40"
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>For Recruiters</span>
            </button>
            <button
              onClick={() => handleLinkClick('#inquiry')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-violet-500/40"
            >
              <Briefcase className="w-3.5 h-3.5 text-violet-400" />
              <span>For Clients</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href="#inquiry"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#inquiry');
              }}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 shadow-md"
            >
              Let's Talk — Start Project Inquiry
            </a>
            <a
              href={profile.resumePath}
              download
              className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
