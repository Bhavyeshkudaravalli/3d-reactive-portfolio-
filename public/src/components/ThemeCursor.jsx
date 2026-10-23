import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '../context/useTheme';

/**
 * ThemeCursor
 * 
 * Custom reactive cursor tailored to each theme and its animated background:
 * - Dark: Cosmic starlight pointer + orbit ring with revolving micro-satellite + stardust trail
 * - Light: Sunny azure pointer + aerodynamic sun halo + golden sunbeam trail
 * - Dusky: High-tech laser dot + cyberpunk HUD diamond reticle + neon spark trail
 * - Ambient: Jade dew drop + dual water ripple rings + rain mist droplet trail
 * - Sand: Desert compass stone + celestial sundial ring + swirling sand breeze trail
 */
export const ThemeCursor = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  // Position references
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const satelliteAngle = useRef(0);
  const lastSpawnPos = useRef({ x: -100, y: -100 });

  // Theme palettes for cursor
  const themeColors = useMemo(() => {
    switch (theme) {
      case 'dark':
        return {
          dotBg: '#38BDF8',
          dotBorder: '#FFFFFF',
          dotShadow: '0 0 12px #38BDF8, 0 0 6px rgba(255, 255, 255, 0.9)',
          ringBorder: 'rgba(56, 189, 248, 0.75)',
          ringGlow: 'rgba(56, 189, 248, 0.28)',
          accent: '#38BDF8',
          secondary: '#A855F7',
          satellite: '#FFFFFF',
          particles: ['#38BDF8', '#FFFFFF', '#BAE6FD', '#C084FC', '#818CF8'],
        };
      case 'dusky':
        return {
          dotBg: '#F43F5E',
          dotBorder: '#FB923C',
          dotShadow: '0 0 12px #F43F5E, 0 0 6px #FB923C',
          ringBorder: 'rgba(249, 115, 22, 0.85)',
          ringGlow: 'rgba(244, 63, 94, 0.35)',
          accent: '#FB923C',
          secondary: '#EC4899',
          satellite: '#F43F5E',
          particles: ['#FB923C', '#F43F5E', '#C084FC', '#F97316', '#F472B6'],
        };
      case 'ambient':
        return {
          dotBg: '#10B981',
          dotBorder: '#6EE7B7',
          dotShadow: '0 0 12px #10B981, 0 0 5px #6EE7B7',
          ringBorder: 'rgba(16, 185, 129, 0.75)',
          ringGlow: 'rgba(20, 184, 166, 0.3)',
          accent: '#10B981',
          secondary: '#14B8A6',
          satellite: '#34D399',
          particles: ['#10B981', '#34D399', '#14B8A6', '#6EE7B7', '#A7F3D0'],
        };
      case 'sand':
        return {
          dotBg: '#B45309',
          dotBorder: '#F59E0B',
          dotShadow: '0 0 10px #B45309, 0 0 4px #D97706',
          ringBorder: 'rgba(180, 83, 9, 0.8)',
          ringGlow: 'rgba(217, 119, 6, 0.25)',
          accent: '#B45309',
          secondary: '#C2410C',
          satellite: '#F59E0B',
          particles: ['#B45309', '#D97706', '#EA580C', '#F59E0B', '#92400E'],
        };
      case 'light':
      default:
        return {
          dotBg: '#1D4ED8',
          dotBorder: '#F59E0B',
          dotShadow: '0 0 10px rgba(37, 99, 235, 0.8), 0 0 4px #F59E0B',
          ringBorder: 'rgba(29, 78, 216, 0.65)',
          ringGlow: 'rgba(29, 78, 216, 0.2)',
          accent: '#2563EB',
          secondary: '#F59E0B',
          satellite: '#FBBF24',
          particles: ['#1D4ED8', '#2563EB', '#F59E0B', '#FBBF24', '#60A5FA'],
        };
    }
  }, [theme]);

  useEffect(() => {
    // Only enable custom cursor for precise pointer devices (desktops/laptops, not touchscreens)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let particles = [];
    let animationFrameId = null;
    let canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext('2d');

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;
      setIsVisible(true);

      // Instantly position lead dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Check distance moved to spawn trail particles
      const dx = clientX - lastSpawnPos.current.x;
      const dy = clientY - lastSpawnPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 7) {
        lastSpawnPos.current = { x: clientX, y: clientY };
        spawnTrailParticle(clientX, clientY, dx, dy);
      }
    };

    const spawnTrailParticle = (x, y, dx, dy) => {
      if (particles.length > 40) particles.shift();
      const colorArr = themeColors.particles;
      const color = colorArr[Math.floor(Math.random() * colorArr.length)];

      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: -dx * 0.12 + (Math.random() - 0.5) * 1.5,
        vy: -dy * 0.12 + (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3.2 + 1.2,
        alpha: 0.9,
        decay: Math.random() * 0.035 + 0.025,
        color,
        sparkle: Math.random() > 0.5,
      });
    };

    const spawnClickBurst = (x, y) => {
      const colorArr = themeColors.particles;
      for (let i = 0; i < 14; i++) {
        const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.2;
        const speed = Math.random() * 3.5 + 2;
        const color = colorArr[Math.floor(Math.random() * colorArr.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          alpha: 1.0,
          decay: 0.038,
          color,
          sparkle: true,
        });
      }
    };

    const onMouseDown = (e) => {
      setIsClicking(true);
      spawnClickBurst(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable element hovers
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.closest('.btn-theme-gradient') ||
          target.closest('.theme-dropdown-trigger') ||
          target.closest('.theme-dropdown-item'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // Physics Loop: Lerp follower ring + animate satellite + render trail canvas
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);

      // Smooth Lerp for Ring Follower
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      const ease = 0.2;

      const dx = targetX - ringPos.current.x;
      const dy = targetY - ringPos.current.y;
      velocity.current = { x: dx, y: dy };

      ringPos.current.x += dx * ease;
      ringPos.current.y += dy * ease;

      // Orbiting satellite angle rotation
      satelliteAngle.current += 0.065;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Draw Particle Trail Canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Extra sparkle cross flare on bright trail specks
          if (p.sparkle && p.alpha > 0.4) {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size * 2, p.y);
            ctx.lineTo(p.x + p.size * 2, p.y);
            ctx.moveTo(p.x, p.y - p.size * 2);
            ctx.lineTo(p.x, p.y + p.size * 2);
            ctx.stroke();
          }

          ctx.restore();
        }
      }
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [themeColors]);

  // Compute satellite position on orbit ring
  const orbitRadius = isHovering ? 26 : 18;
  const satX = Math.cos(satelliteAngle.current) * orbitRadius;
  const satY = Math.sin(satelliteAngle.current) * orbitRadius;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 1. Lead Cursor Dot (Zero-delay pinpoint tracking) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform transition-[width,height] duration-150 ease-out"
        style={{
          width: isHovering ? '10px' : isClicking ? '4px' : '7px',
          height: isHovering ? '10px' : isClicking ? '4px' : '7px',
          borderRadius: '50%',
          backgroundColor: themeColors.dotBg,
          border: `1.5px solid ${themeColors.dotBorder}`,
          boxShadow: themeColors.dotShadow,
        }}
      />

      {/* 2. Follower Ring & Theme-Specific Reticle (Physics-interpolated organic float) */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform flex items-center justify-center transition-[width,height,transform] duration-200 ease-out"
        style={{
          width: isHovering ? '52px' : isClicking ? '26px' : '36px',
          height: isHovering ? '52px' : isClicking ? '26px' : '36px',
        }}
      >
        {/* Main Follower Ring */}
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isClicking ? 'scale-90' : isHovering ? 'scale-105' : 'scale-100'
          }`}
          style={{
            border: `1.5px solid ${themeColors.ringBorder}`,
            backgroundColor: isHovering ? themeColors.ringGlow : 'transparent',
            boxShadow: `0 0 14px ${themeColors.ringGlow}`,
          }}
        />

        {/* --- Theme-Specific Reticle Adornments --- */}

        {/* DARK THEME: Orbiting Micro-Satellite around Cursor Ring */}
        {theme === 'dark' && (
          <>
            <div
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                backgroundColor: themeColors.satellite,
                boxShadow: '0 0 8px #FFFFFF, 0 0 4px #38BDF8',
                transform: `translate3d(${satX}px, ${satY}px, 0)`,
              }}
            />
            {/* Cardinal Starlight Cross Ticks */}
            <div className="absolute inset-0 flex items-center justify-between px-0.5">
              <span className="w-1 h-0.5 bg-cyan-400/70" />
              <span className="w-1 h-0.5 bg-cyan-400/70" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between py-0.5">
              <span className="w-0.5 h-1 bg-cyan-400/70" />
              <span className="w-0.5 h-1 bg-cyan-400/70" />
            </div>
          </>
        )}

        {/* LIGHT THEME: Aerodynamic Sunlight Halo with Wing Ticks */}
        {theme === 'light' && (
          <>
            <div
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                backgroundColor: '#F59E0B',
                boxShadow: '0 0 6px #F59E0B',
                transform: `translate3d(${satX}px, ${satY}px, 0)`,
              }}
            />
            {/* Solar Flare Corona Ticks */}
            <div className="absolute inset-0 flex items-center justify-between">
              <span className="w-1.5 h-0.5 bg-blue-600/70 rounded-full" />
              <span className="w-1.5 h-0.5 bg-blue-600/70 rounded-full" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between">
              <span className="w-0.5 h-1.5 bg-amber-500/80 rounded-full" />
              <span className="w-0.5 h-1.5 bg-amber-500/80 rounded-full" />
            </div>
          </>
        )}

        {/* DUSKY THEME: Cyberpunk HUD Diamond Corner Brackets */}
        {theme === 'dusky' && (
          <>
            {/* 4 Cyber HUD Corner Brackets */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-orange-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-orange-400" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-pink-500" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-pink-500" />
            {isHovering && (
              <span className="absolute -top-4 font-mono text-[9px] text-orange-400 tracking-wider font-bold animate-pulse">
                SCAN
              </span>
            )}
          </>
        )}

        {/* AMBIENT THEME: Dual Concentric Water Ripple Rings */}
        {theme === 'ambient' && (
          <>
            <div
              className={`absolute inset-1.5 rounded-full border border-teal-400/50 transition-transform duration-300 ${
                isHovering ? 'scale-110' : 'scale-90 animate-ping opacity-30'
              }`}
            />
            <div
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                backgroundColor: '#34D399',
                boxShadow: '0 0 6px #10B981',
                transform: `translate3d(${satX}px, ${satY}px, 0)`,
              }}
            />
          </>
        )}

        {/* SAND THEME: Celestial Desert Sundial & Compass Ticks */}
        {theme === 'sand' && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-0.5">
              <span className="w-1.5 h-0.5 bg-amber-700/80" />
              <span className="w-1.5 h-0.5 bg-amber-700/80" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between py-0.5">
              <span className="w-0.5 h-1.5 bg-amber-700/80" />
              <span className="w-0.5 h-1.5 bg-amber-700/80" />
            </div>
            <div
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                backgroundColor: '#D97706',
                boxShadow: '0 0 6px #B45309',
                transform: `translate3d(${satX}px, ${satY}px, 0)`,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
