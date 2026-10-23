import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Workflow } from './components/Workflow';
import { LeadForm } from './components/LeadForm';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeBackground } from './components/ThemeBackground';
import { AudioToggle } from './components/AudioToggle';
import { ThemeCursor } from './components/ThemeCursor';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'skills',
      'projects',
      'workflow',
      'inquiry',
      'resume',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden bg-transparent"
      style={{ color: 'var(--text-main)' }}
    >
      {/* Dynamic Themed Interactive Cursor & Particle Trail */}
      <ThemeCursor />

      {/* Animated Dynamic Themed Background */}
      <ThemeBackground />

      {/* Floating Ambient Theme Audio Pill */}
      <AudioToggle floating={true} />

      {/* Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* Technical Skills & CS Fundamentals */}
        <Skills />

        {/* Projects Showcase & Featured Hospital Management Case Study */}
        <Projects />

        {/* 4-Step Client Workflow */}
        <Workflow />

        {/* Client Lead Generation & Project Inquiry Form */}
        <LeadForm />

        {/* Resume & Career Qualifications */}
        <Resume />

        {/* Contact Pathways */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
