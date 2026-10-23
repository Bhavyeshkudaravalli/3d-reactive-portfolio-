import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/useTheme';

export const ThemeBackground = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initScene();
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates tracking for subtle atmospheric parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // =========================================================
    // SCENE STATE INITIALIZATION
    // =========================================================

    // 1. Dark (Deep Space)
    let stars = [];
    let shootingStars = [];
    let satelliteAngle = 0;
    let nextShootingStarTime = Date.now() + 1800;

    // 2. Light (Village, Clouds, Birds, Vehicles)
    let clouds = [];
    let birds = [];
    let vehicles = [];
    let chimneySmoke = [];
    let windmillBladeAngle = 0;

    // 3. Dusky (Cyberpunk Street)
    let lightStreaks = [];
    let neonFlicker = 1;
    let neonNextToggle = Date.now() + 450;
    let steamPuffs = [];

    // 4. Ambient (Mountain Valley, Waterfall, Multi-Plane Rain)
    let raindrops = [];
    let rainSplashes = [];
    let waterfallMist = [];

    // 5. Sand (Desert Dunes, Sand Breeze, Caravan)
    let sandParticles = [];
    let caravanX = -160;

    const initScene = () => {
      // 1. Dark: Multi-spectral stars with diffraction flares
      stars = Array.from({ length: 320 }, () => {
        const isBright = Math.random() < 0.08;
        const colorType = Math.random();
        let color = 'rgba(255, 255, 255, ';
        if (colorType < 0.25) color = 'rgba(186, 230, 253, '; // Blue giant
        else if (colorType < 0.45) color = 'rgba(254, 240, 138, '; // Yellow sun
        else if (colorType < 0.6) color = 'rgba(254, 205, 211, '; // Red giant

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isBright ? Math.random() * 1.8 + 1.2 : Math.random() * 1.1 + 0.35,
          color,
          isBright,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.035 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          layer: Math.random() * 0.04 + 0.01,
        };
      });

      // 2. Light: Fluffy volumetric clouds with shaded bellies
      clouds = Array.from({ length: 8 }, (_, i) => ({
        x: (width / 7) * i + Math.random() * 80,
        y: Math.random() * (height * 0.38) + 25,
        width: Math.random() * 220 + 140,
        height: Math.random() * 65 + 45,
        speed: Math.random() * 0.32 + 0.14,
        opacity: Math.random() * 0.25 + 0.55,
      }));

      // Bio-kinematic birds with flapping + gliding states
      birds = [
        { x: width * 0.12, y: height * 0.18, speed: 2.2, wingPhase: 0, scale: 0.95, isGliding: false, glideTimer: 0 },
        { x: width * 0.16, y: height * 0.16, speed: 2.2, wingPhase: 0.9, scale: 0.88, isGliding: false, glideTimer: 20 },
        { x: width * 0.09, y: height * 0.21, speed: 2.2, wingPhase: 1.8, scale: 0.78, isGliding: false, glideTimer: 45 },
        { x: width * 0.52, y: height * 0.12, speed: 1.8, wingPhase: 2.4, scale: 0.72, isGliding: false, glideTimer: 10 },
        { x: width * 0.57, y: height * 0.14, speed: 1.8, wingPhase: 3.1, scale: 0.68, isGliding: false, glideTimer: 35 },
      ];

      vehicles = [
        { x: 40, dir: 1, speed: 1.8, type: 'car', color: '#DC2626' },
        { x: width * 0.55, dir: 1, speed: 1.4, type: 'van', color: '#2563EB' },
        { x: width - 60, dir: -1, speed: 1.6, type: 'truck', color: '#059669' },
      ];

      chimneySmoke = Array.from({ length: 30 }, () => ({
        x: width * 0.31 + (Math.random() - 0.5) * 4,
        y: height * 0.78,
        vx: Math.random() * 0.3 + 0.2,
        vy: -Math.random() * 0.6 - 0.4,
        radius: Math.random() * 4 + 2,
        alpha: Math.random() * 0.4 + 0.2,
      }));

      // 3. Dusky: Realistic light streaks with Doppler blur
      lightStreaks = Array.from({ length: 8 }, () => ({
        x: Math.random() * width,
        y: height * 0.81 + Math.random() * (height * 0.14),
        length: Math.random() * 180 + 90,
        speed: (Math.random() * 3.8 + 2.8) * (Math.random() > 0.5 ? 1 : -1),
        color: Math.random() > 0.5 ? '#FF0055' : '#00F0FF',
        alpha: Math.random() * 0.45 + 0.45,
      }));

      steamPuffs = Array.from({ length: 25 }, () => ({
        x: width * 0.22 + (Math.random() - 0.5) * 40,
        y: height * 0.84,
        vx: (Math.random() - 0.5) * 0.4 + 0.3,
        vy: -Math.random() * 0.7 - 0.3,
        radius: Math.random() * 18 + 8,
        alpha: Math.random() * 0.25 + 0.1,
      }));

      // 4. Ambient: 3-Plane Parallax Rain + Waterfall Vapor
      raindrops = Array.from({ length: 220 }, () => {
        const plane = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          length: plane > 0.7 ? 24 : plane > 0.3 ? 16 : 10,
          speed: plane > 0.7 ? 16 : plane > 0.3 ? 12 : 8,
          alpha: plane > 0.7 ? 0.45 : plane > 0.3 ? 0.28 : 0.15,
          plane,
          slant: 2.2,
        };
      });

      waterfallMist = Array.from({ length: 70 }, () => ({
        x: width * 0.71 + (Math.random() - 0.5) * 70,
        y: height * 0.79 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 1.1 + 0.2,
        vy: -Math.random() * 1.2 - 0.4,
        radius: Math.random() * 30 + 16,
        alpha: Math.random() * 0.22 + 0.08,
      }));

      // 5. Sand: Atmospheric blowing dust sheet
      sandParticles = Array.from({ length: 180 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 4.2 + 2.2,
        vy: (Math.random() - 0.5) * 0.9,
        size: Math.random() * 2.4 + 0.5,
        alpha: Math.random() * 0.4 + 0.15,
      }));
    };

    initScene();

    // =========================================================
    // ULTRA-REALISTIC RENDER METHODS
    // =========================================================

    /**
     * THEME 1: DARK - Cinematic Deep Space, Photorealistic Moon, Detailed Satellite & Ionization Meteors
     */
    const renderDark = (time) => {
      // 1. Deep Space Cosmic Nebula Atmosphere
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.38,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a1024');
      bgGrad.addColorStop(0.45, '#050917');
      bgGrad.addColorStop(0.85, '#02040a');
      bgGrad.addColorStop(1, '#010206');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Multi-layer Volumetric Cosmic Dust Clouds (Nebulae)
      const nebulae = [
        { x: width * 0.22, y: height * 0.32, r: width * 0.45, color: 'rgba(99, 102, 241, 0.07)' },
        { x: width * 0.78, y: height * 0.28, r: width * 0.4, color: 'rgba(6, 182, 212, 0.06)' },
        { x: width * 0.5, y: height * 0.65, r: width * 0.5, color: 'rgba(168, 85, 247, 0.04)' },
      ];

      for (const neb of nebulae) {
        const g = ctx.createRadialGradient(neb.x, neb.y, 10, neb.x, neb.y, neb.r);
        g.addColorStop(0, neb.color);
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Multi-Spectral Parallax Starfield with Diffraction Spikes
      const parallaxX = (mouseX - width / 2) * 0.02;
      const parallaxY = (mouseY - height / 2) * 0.02;

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const a = Math.max(0.12, star.alpha + twinkle * 0.38);
        const sx = star.x + parallaxX * star.layer * 22;
        const sy = star.y + parallaxY * star.layer * 22;

        ctx.fillStyle = `${star.color}${a})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Diffraction Cross Flare on the Brightest Stars
        if (star.isBright && a > 0.5) {
          ctx.strokeStyle = `${star.color}${a * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(sx - star.radius * 3.5, sy);
          ctx.lineTo(sx + star.radius * 3.5, sy);
          ctx.moveTo(sx, sy - star.radius * 3.5);
          ctx.lineTo(sx, sy + star.radius * 3.5);
          ctx.stroke();
        }
      }

      // 3. Photorealistic Lunar Sphere with Craters & Atmospheric Halo
      const moonX = width > 768 ? width * 0.8 : width * 0.74;
      const moonY = height * 0.22;
      const moonRadius = width > 768 ? 68 : 50;

      // Orbit Parameters for 3D Elliptical Satellite Path
      const orbitRx = moonRadius * 2.4;
      const orbitRy = moonRadius * 0.78;
      const orbitTilt = -0.32; // Elliptical inclination

      satelliteAngle += 0.016;
      const satCos = Math.cos(satelliteAngle);
      const satSin = Math.sin(satelliteAngle);

      const rawSatX = satCos * orbitRx;
      const rawSatY = satSin * orbitRy;
      const satX = moonX + rawSatX * Math.cos(orbitTilt) - rawSatY * Math.sin(orbitTilt);
      const satY = moonY + rawSatX * Math.sin(orbitTilt) + rawSatY * Math.cos(orbitTilt);
      const isBehindMoon = satSin < 0;

      // Soft Faint Orbital Trajectory Ring
      ctx.save();
      ctx.translate(moonX, moonY);
      ctx.rotate(orbitTilt);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 7]);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbitRx, orbitRy, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Satellite Render Function
      const drawSatellite = (scale = 1, alpha = 1) => {
        ctx.save();
        ctx.translate(satX, satY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;

        // Realistic Silicon Solar Array Wings (Deep Blue with Gold Interconnect Grid)
        ctx.fillStyle = '#0369a1';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 0.8;

        // Left Panel Wing
        ctx.fillRect(-17, -4, 10, 8);
        ctx.strokeRect(-17, -4, 10, 8);
        // Right Panel Wing
        ctx.fillRect(7, -4, 10, 8);
        ctx.strokeRect(7, -4, 10, 8);

        // Panel Grid Lines
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.6)';
        ctx.beginPath();
        ctx.moveTo(-12, -4);
        ctx.lineTo(-12, 4);
        ctx.moveTo(12, -4);
        ctx.lineTo(12, 4);
        ctx.stroke();

        // Satellite Main Bus Chassis (Golden Kapton MLI Foil)
        ctx.fillStyle = '#d97706';
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-5, -5, 10, 10, 2);
        ctx.fill();
        ctx.stroke();

        // Parabolic High-Gain Dish Antenna
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, -8, 4, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(0, -8);
        ctx.stroke();

        // Nav Strobe Beacon (Pulsing Red/Green with Lens Flare Bloom)
        const beaconOn = Math.sin(time * 0.009) > 0;
        ctx.fillStyle = beaconOn ? '#4ade80' : '#f87171';
        ctx.shadowColor = beaconOn ? '#4ade80' : '#f87171';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 6, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      };

      // Draw Satellite Behind Moon if in back half of orbit
      if (isBehindMoon) {
        drawSatellite(0.85, 0.6);
      }

      // Outer Lunar Atmospheric Bloom
      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.85, moonX, moonY, moonRadius * 3.2);
      moonGlow.addColorStop(0, 'rgba(224, 242, 254, 0.32)');
      moonGlow.addColorStop(0.35, 'rgba(56, 189, 248, 0.12)');
      moonGlow.addColorStop(0.75, 'rgba(6, 182, 212, 0.03)');
      moonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Realistic Moon Sphere with Spherical Shading & Surface Details
      const moonSphere = ctx.createRadialGradient(
        moonX - moonRadius * 0.38,
        moonY - moonRadius * 0.38,
        moonRadius * 0.05,
        moonX,
        moonY,
        moonRadius
      );
      moonSphere.addColorStop(0, '#FFFFFF');
      moonSphere.addColorStop(0.3, '#E2E8F0');
      moonSphere.addColorStop(0.7, '#94A3B8');
      moonSphere.addColorStop(0.95, '#475569');
      moonSphere.addColorStop(1, '#1E293B');

      ctx.fillStyle = moonSphere;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Photorealistic Lunar Maria (Dark Basalt Plains) & Rayed Craters
      const maria = [
        { dx: -0.28, dy: -0.22, rx: 0.26, ry: 0.22, rot: 0.2, a: 0.4 },
        { dx: 0.22, dy: 0.24, rx: 0.32, ry: 0.26, rot: -0.3, a: 0.35 },
        { dx: -0.08, dy: 0.36, rx: 0.22, ry: 0.18, rot: 0.1, a: 0.32 },
        { dx: 0.34, dy: -0.16, rx: 0.24, ry: 0.2, rot: 0.4, a: 0.38 },
      ];

      ctx.fillStyle = 'rgba(51, 65, 85, 0.55)';
      for (const m of maria) {
        ctx.beginPath();
        ctx.ellipse(moonX + m.dx * moonRadius, moonY + m.dy * moonRadius, m.rx * moonRadius, m.ry * moonRadius, m.rot, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rayed Impact Crater (Tycho with Ejecta Rays)
      const craterX = moonX + 0.18 * moonRadius;
      const craterY = moonY + 0.45 * moonRadius;
      ctx.strokeStyle = 'rgba(241, 245, 249, 0.4)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i + 0.2;
        ctx.beginPath();
        ctx.moveTo(craterX, craterY);
        ctx.lineTo(craterX + Math.cos(ang) * moonRadius * 0.45, craterY + Math.sin(ang) * moonRadius * 0.45);
        ctx.stroke();
      }

      // Draw Satellite in Front of Moon if in front half of orbit
      if (!isBehindMoon) {
        drawSatellite(1.1, 1.0);
      }

      // 4. Physics-Based Shooting Stars with Plasma Ionization Tail
      const now = Date.now();
      if (now > nextShootingStarTime) {
        shootingStars.push({
          x: Math.random() * (width * 0.8),
          y: Math.random() * (height * 0.4),
          length: Math.random() * 140 + 90,
          speed: Math.random() * 14 + 11,
          angle: (Math.PI / 180) * (38 + Math.random() * 18),
          alpha: 1.0,
        });
        nextShootingStarTime = now + 2400 + Math.random() * 3200;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const meteor = shootingStars[i];
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= 0.024;

        if (meteor.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const meteorGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${meteor.alpha})`);
        meteorGrad.addColorStop(0.25, `rgba(56, 189, 248, ${meteor.alpha * 0.85})`);
        meteorGrad.addColorStop(0.7, `rgba(168, 85, 247, ${meteor.alpha * 0.45})`);
        meteorGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Ionization Plasma Head
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    /**
     * THEME 2: LIGHT - Sunny Day Village, Volumetric Clouds, Kinematic Birds & Country Vehicles
     */
    const renderLight = (time) => {
      // 1. Rayleigh Scattering Atmosphere Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#38BDF8'); // Azure blue
      skyGrad.addColorStop(0.5, '#BAE6FD'); // Soft sky
      skyGrad.addColorStop(0.8, '#FEF08A'); // Golden sunlit horizon
      skyGrad.addColorStop(1, '#86EFAC'); // Emerald meadow
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Radiant Sun & Volumetric God Rays
      const sunX = width * 0.22;
      const sunY = height * 0.18;
      const sunR = 48;

      // Volumetric Sunbeams
      const rayGrad = ctx.createRadialGradient(sunX, sunY, sunR * 0.8, sunX, sunY, sunR * 4.5);
      rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      rayGrad.addColorStop(0.4, 'rgba(253, 224, 71, 0.15)');
      rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Blinding Sun Core
      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
      ctx.fill();

      // 3. Volumetric Shaded Cumulus Clouds
      for (const cloud of clouds) {
        cloud.x += cloud.speed;
        if (cloud.x > width + cloud.width) {
          cloud.x = -cloud.width - 40;
        }

        // Darker Soft Shaded Cloud Belly
        ctx.fillStyle = `rgba(226, 232, 240, ${cloud.opacity * 0.75})`;
        ctx.beginPath();
        ctx.ellipse(cloud.x + cloud.width * 0.5, cloud.y + cloud.height * 0.25, cloud.width * 0.45, cloud.height * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sunlit Fluffy Bright Cloud Puffs
        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
        ctx.beginPath();
        ctx.arc(cloud.x + cloud.width * 0.2, cloud.y, cloud.height * 0.55, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width * 0.45, cloud.y - cloud.height * 0.28, cloud.height * 0.72, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width * 0.75, cloud.y, cloud.height * 0.58, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Multi-Tier Rolling Green Meadows & Village Hills
      const drawHill = (baseY, curveH, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);
        ctx.bezierCurveTo(width * 0.25, baseY - curveH, width * 0.75, baseY + curveH, width, baseY);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      };

      drawHill(height * 0.74, 45, '#86EFAC');
      drawHill(height * 0.81, -35, '#4ADE80');
      drawHill(height * 0.88, 30, '#22C55E');

      // 5. Village Cottages with Stone Chimneys & Billowy Smoke
      const villageY = height * 0.83;

      const drawCottage = (x, y, w, h, roofH) => {
        // Cottage Walls with Timber Beam Accents
        ctx.fillStyle = '#F8FAFC';
        ctx.fillRect(x, y - h, w, h);
        ctx.strokeStyle = '#94A3B8';
        ctx.strokeRect(x, y - h, w, h);

        // Windows with Glint
        ctx.fillStyle = '#60A5FA';
        ctx.fillRect(x + 5, y - h + 6, 8, 8);
        ctx.fillRect(x + w - 13, y - h + 6, 8, 8);

        // Terracotta Tiled Roof
        ctx.fillStyle = '#EA580C';
        ctx.beginPath();
        ctx.moveTo(x - 5, y - h);
        ctx.lineTo(x + w / 2, y - h - roofH);
        ctx.lineTo(x + w + 5, y - h);
        ctx.closePath();
        ctx.fill();

        // Stone Chimney
        ctx.fillStyle = '#78716C';
        ctx.fillRect(x + w - 10, y - h - roofH + 2, 6, 12);
      };

      drawCottage(width * 0.29, villageY, 34, 22, 16);
      drawCottage(width * 0.35, villageY - 4, 30, 20, 14);
      drawCottage(width * 0.63, villageY - 12, 38, 24, 18);

      // Billowy Chimney Smoke Particles
      const chimneyTopX = width * 0.35 + 20;
      const chimneyTopY = villageY - 4 - 14 - 10;

      for (const s of chimneySmoke) {
        s.x += s.vx;
        s.y += s.vy;
        s.radius += 0.05;
        s.alpha -= 0.005;

        if (s.alpha <= 0) {
          s.x = chimneyTopX + (Math.random() - 0.5) * 3;
          s.y = chimneyTopY;
          s.radius = Math.random() * 3 + 2;
          s.alpha = Math.random() * 0.35 + 0.15;
        }

        ctx.fillStyle = `rgba(226, 232, 240, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Traditional Wooden Windmill with Rotating Lattice Sails
      const millX = width * 0.79;
      const millY = villageY - 22;
      // Mill Base
      ctx.fillStyle = '#F1F5F9';
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(millX - 14, millY);
      ctx.lineTo(millX - 9, millY - 48);
      ctx.lineTo(millX + 9, millY - 48);
      ctx.lineTo(millX + 14, millY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Spinning 4-Blade Sails
      windmillBladeAngle += 0.022;
      ctx.save();
      ctx.translate(millX, millY - 48);
      ctx.rotate(windmillBladeAngle);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2.4;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -34);
        ctx.stroke();
        // Lattice Sail Cloth
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 0.8;
        ctx.fillRect(2, -32, 9, 26);
        ctx.strokeRect(2, -32, 9, 26);
        ctx.rotate(Math.PI / 2);
      }
      ctx.restore();

      // 6. Country Road & Realistic Moving Vehicles
      const roadY = height * 0.93;
      ctx.fillStyle = '#64748B';
      ctx.fillRect(0, roadY, width, 48);

      // Road Center Markings
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([18, 16]);
      ctx.beginPath();
      ctx.moveTo(0, roadY + 24);
      ctx.lineTo(width, roadY + 24);
      ctx.stroke();
      ctx.setLineDash([]);

      // Vehicles with Wheels, Chassis & Soft Cast Shadow
      for (const veh of vehicles) {
        veh.x += veh.speed * veh.dir;
        if (veh.dir === 1 && veh.x > width + 80) veh.x = -70;
        if (veh.dir === -1 && veh.x < -80) veh.x = width + 70;

        const vy = roadY + (veh.dir === 1 ? 10 : 28);
        ctx.save();
        ctx.translate(veh.x, vy);
        if (veh.dir === -1) ctx.scale(-1, 1);

        // Ground Contact Shadow
        ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 8, 26, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Vehicle Body
        ctx.fillStyle = veh.color;
        ctx.beginPath();
        ctx.roundRect(-24, -13, 48, 17, 5);
        ctx.fill();

        // Windshield & Cabin Glass
        ctx.fillStyle = '#BAE6FD';
        ctx.fillRect(-11, -19, 22, 9);

        // Headlight Glow
        ctx.fillStyle = '#FEF08A';
        ctx.fillRect(22, -9, 4, 5);

        // Spinning Wheels with Chrome Hubcaps
        ctx.fillStyle = '#1E293B';
        ctx.beginPath();
        ctx.arc(-15, 5, 5.5, 0, Math.PI * 2);
        ctx.arc(15, 5, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#E2E8F0';
        ctx.beginPath();
        ctx.arc(-15, 5, 2, 0, Math.PI * 2);
        ctx.arc(15, 5, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 7. Bio-Kinematic Birds Flapping & Gliding Across the Sky
      for (const bird of birds) {
        bird.x += bird.speed;
        if (bird.x > width + 50) bird.x = -40;

        // Realistic Alternating Flapping / Gliding Kinematics
        bird.glideTimer++;
        if (bird.glideTimer > 90) {
          bird.isGliding = !bird.isGliding;
          bird.glideTimer = 0;
        }

        let wingY = 0;
        if (!bird.isGliding) {
          bird.wingPhase += 0.16;
          wingY = Math.sin(bird.wingPhase) * 8 * bird.scale;
        } else {
          wingY = -2 * bird.scale; // Soaring dihedral wing angle
        }

        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 2.2 * bird.scale;
        ctx.beginPath();
        ctx.moveTo(bird.x - 16 * bird.scale, bird.y + wingY);
        ctx.quadraticCurveTo(bird.x - 8 * bird.scale, bird.y - 4 * bird.scale, bird.x, bird.y);
        ctx.quadraticCurveTo(bird.x + 8 * bird.scale, bird.y - 4 * bird.scale, bird.x + 16 * bird.scale, bird.y + wingY);
        ctx.stroke();
      }
    };

    /**
     * THEME 3: DUSKY - Cyberpunk Megacity, Realistic Neon Tubes, Wet Reflections & Light Streaks
     */
    const renderDusky = (time) => {
      // 1. Twilight Smog Sky Gradient
      const duskGrad = ctx.createLinearGradient(0, 0, 0, height);
      duskGrad.addColorStop(0, '#100820');
      duskGrad.addColorStop(0.4, '#2B0E44');
      duskGrad.addColorStop(0.72, '#5A1752');
      duskGrad.addColorStop(1, '#1A0D26');
      ctx.fillStyle = duskGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Towering Megastructure Skyline with Lit Windows & Rooftop Beacons
      const buildings = [
        { x: width * 0.04, w: 95, h: height * 0.58 },
        { x: width * 0.16, w: 130, h: height * 0.68 },
        { x: width * 0.33, w: 110, h: height * 0.52 },
        { x: width * 0.67, w: 150, h: height * 0.72 },
        { x: width * 0.84, w: 115, h: height * 0.6 },
      ];

      for (const b of buildings) {
        ctx.fillStyle = '#0B0616';
        ctx.fillRect(b.x, height - b.h, b.w, b.h);

        // Rooftop Antenna with Blinking FAA Red Beacon
        ctx.strokeStyle = '#64748B';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(b.x + b.w / 2, height - b.h);
        ctx.lineTo(b.x + b.w / 2, height - b.h - 26);
        ctx.stroke();

        const beaconFlash = Math.sin(time * 0.008 + b.x) > 0.2;
        if (beaconFlash) {
          ctx.fillStyle = '#EF4444';
          ctx.shadowColor = '#EF4444';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(b.x + b.w / 2, height - b.h - 26, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Procedural Lit Office Windows
        const rows = Math.floor(b.h / 26);
        const cols = Math.floor(b.w / 19);
        for (let r = 2; r < rows; r++) {
          for (let c = 1; c < cols; c++) {
            if ((r * 7 + c * 13) % 4 === 0) {
              const winColor = (r + c) % 2 === 0 ? 'rgba(6, 182, 212, 0.5)' : 'rgba(236, 72, 153, 0.4)';
              ctx.fillStyle = winColor;
              ctx.fillRect(b.x + c * 19, height - b.h + r * 26, 7, 11);
            }
          }
        }
      }

      // Neon Tube Flicker Mechanics
      const now = Date.now();
      if (now > neonNextToggle) {
        neonFlicker = Math.random() > 0.12 ? 1 : 0.35;
        neonNextToggle = now + 140 + Math.random() * 480;
      }

      // True Neon Tube Aesthetic (White Gas Core + Colored Diffuse Glow)
      const drawAuthenticNeon = (x, y, text, color, glowHex) => {
        ctx.save();
        ctx.font = 'bold 24px "JetBrains Mono", monospace';

        // Outer Intense Bloom
        ctx.shadowColor = glowHex;
        ctx.shadowBlur = 24 * neonFlicker;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.strokeText(text, x, y);

        // Crisp White Hot Gas Core
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, x, y);

        // Neon Backing Box
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        const metrics = ctx.measureText(text);
        ctx.strokeRect(x - 12, y - 26, metrics.width + 24, 35);
        ctx.restore();
      };

      drawAuthenticNeon(width * 0.12, height * 0.41, 'CYBER 2077', '#EC4899', '#EC4899');
      drawAuthenticNeon(width * 0.72, height * 0.35, 'ネオ TOKYO', '#06B6D4', '#06B6D4');
      drawAuthenticNeon(width * 0.85, height * 0.51, 'NEXUS // 09', '#F59E0B', '#F59E0B');

      // Volumetric Cyber Street Lamps
      const drawVolumetricLamp = (lampX, lampY) => {
        const coneGrad = ctx.createLinearGradient(lampX, lampY, lampX, height);
        coneGrad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
        coneGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(lampX, lampY);
        ctx.lineTo(lampX - 55, height);
        ctx.lineTo(lampX + 55, height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#00F0FF';
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(lampX, lampY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      drawVolumetricLamp(width * 0.28, height * 0.67);
      drawVolumetricLamp(width * 0.61, height * 0.65);

      // Wet Asphalt Street Level with Mirror Reflections
      const streetY = height * 0.81;
      ctx.fillStyle = '#07040E';
      ctx.fillRect(0, streetY, width, height - streetY);

      // Anisotropic Puddle Neon Reflections
      const puddleGrad = ctx.createLinearGradient(0, streetY, 0, height);
      puddleGrad.addColorStop(0, 'rgba(236, 72, 153, 0.28)');
      puddleGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.25)');
      puddleGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = puddleGrad;
      ctx.fillRect(0, streetY, width, height - streetY);

      // Manhole Steam Puffs
      for (const sp of steamPuffs) {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.radius += 0.2;
        sp.alpha -= 0.003;

        if (sp.alpha <= 0) {
          sp.x = width * 0.22 + (Math.random() - 0.5) * 35;
          sp.y = height * 0.84;
          sp.radius = Math.random() * 16 + 6;
          sp.alpha = Math.random() * 0.22 + 0.1;
        }

        ctx.fillStyle = `rgba(148, 163, 184, ${sp.alpha})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // High-Speed Cyberpunk Traffic Light Streaks with Motion Blur
      for (const streak of lightStreaks) {
        streak.x += streak.speed;
        if (streak.speed > 0 && streak.x > width + streak.length) streak.x = -streak.length;
        if (streak.speed < 0 && streak.x < -streak.length) streak.x = width + streak.length;

        ctx.strokeStyle = streak.color;
        ctx.lineWidth = 2.8;
        ctx.shadowColor = streak.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x + (streak.speed > 0 ? streak.length : -streak.length), streak.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    /**
     * THEME 4: AMBIENT - Alpine Mountain Valley, Cascading Waterfall & 3-Plane Rain Shower
     */
    const renderAmbient = (time) => {
      // 1. Deep Emerald Misty Mountain Horizon
      const valleyGrad = ctx.createLinearGradient(0, 0, 0, height);
      valleyGrad.addColorStop(0, '#031411');
      valleyGrad.addColorStop(0.38, '#06241F');
      valleyGrad.addColorStop(0.78, '#093A32');
      valleyGrad.addColorStop(1, '#041714');
      ctx.fillStyle = valleyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Multi-Tier Rugged Alpine Mountain Silhouettes
      const drawAlpineMountain = (baseY, peakX, peakY, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);
        ctx.lineTo(peakX * 0.6, peakY + 40);
        ctx.lineTo(peakX, peakY);
        ctx.lineTo(peakX + (width - peakX) * 0.4, peakY + 55);
        ctx.lineTo(width, baseY + 35);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      };

      drawAlpineMountain(height * 0.54, width * 0.35, height * 0.27, '#072A23');
      drawAlpineMountain(height * 0.61, width * 0.69, height * 0.33, '#0B382F');

      // Midground Rocky Cliff Face with Cleft for Waterfall
      const fallTopX = width * 0.71;
      const fallTopY = height * 0.37;
      const fallBottomY = height * 0.81;

      ctx.fillStyle = '#051E19';
      ctx.beginPath();
      ctx.moveTo(width * 0.42, height);
      ctx.lineTo(width * 0.48, height * 0.44);
      ctx.lineTo(fallTopX - 22, fallTopY);
      ctx.lineTo(fallTopX + 26, fallTopY);
      ctx.lineTo(width * 0.94, height * 0.41);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 3. Multi-Stage Cascading Waterfall with Turbulent White Water
      const fallGrad = ctx.createLinearGradient(fallTopX, fallTopY, fallTopX, fallBottomY);
      fallGrad.addColorStop(0, 'rgba(52, 211, 153, 0.9)');
      fallGrad.addColorStop(0.45, 'rgba(204, 251, 241, 0.95)');
      fallGrad.addColorStop(1, 'rgba(16, 185, 129, 0.75)');

      ctx.fillStyle = fallGrad;
      const sway = Math.sin(time * 0.009) * 5;
      ctx.beginPath();
      ctx.moveTo(fallTopX - 7, fallTopY);
      ctx.bezierCurveTo(
        fallTopX - 12 + sway,
        fallTopY + (fallBottomY - fallTopY) * 0.5,
        fallTopX - 18 - sway,
        fallBottomY - 22,
        fallTopX - 25,
        fallBottomY
      );
      ctx.lineTo(fallTopX + 25, fallBottomY);
      ctx.bezierCurveTo(
        fallTopX + 18 - sway,
        fallBottomY - 22,
        fallTopX + 12 + sway,
        fallTopY + (fallBottomY - fallTopY) * 0.5,
        fallTopX + 7,
        fallTopY
      );
      ctx.closePath();
      ctx.fill();

      // Rising Waterfall Spray & Mist Vapor
      for (const m of waterfallMist) {
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.0035;

        if (m.y < fallBottomY - 80 || m.alpha <= 0) {
          m.x = fallTopX + (Math.random() - 0.5) * 60;
          m.y = fallBottomY + Math.random() * 20;
          m.alpha = Math.random() * 0.25 + 0.12;
        }

        ctx.fillStyle = `rgba(167, 243, 208, ${m.alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dense Pine Forest Canopy across Valley Base
      const drawPine = (tx, ty, th) => {
        ctx.fillStyle = '#02100E';
        ctx.beginPath();
        ctx.moveTo(tx, ty - th);
        ctx.lineTo(tx - th * 0.36, ty);
        ctx.lineTo(tx + th * 0.36, ty);
        ctx.closePath();
        ctx.fill();
      };

      const pineCount = Math.floor(width / 20);
      for (let i = 0; i < pineCount; i++) {
        const tx = i * 22 + ((i * 11) % 16);
        const ty = height * 0.88 + ((i * 5) % 25);
        const th = 34 + ((i * 9) % 26);
        drawPine(tx, ty, th);
      }

      // 4. Multi-Plane Realistic Parallax Rain
      for (const drop of raindrops) {
        drop.x += drop.slant;
        drop.y += drop.speed;

        if (drop.y > height) {
          drop.y = -drop.length - 12;
          drop.x = Math.random() * (width + 120) - 60;
        }

        ctx.strokeStyle = `rgba(167, 243, 208, ${drop.alpha})`;
        ctx.lineWidth = drop.plane > 0.7 ? 1.5 : 1.0;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.slant, drop.y + drop.length);
        ctx.stroke();
      }
    };

    /**
     * THEME 5: SAND - Barchan Sand Dunes, Blinding Desert Sun, Blowing Sand Sheet & Traveling Caravan
     */
    const renderSand = (time) => {
      // 1. Warm Desert Sun & Dust Scattering Gradient
      const sandSky = ctx.createLinearGradient(0, 0, 0, height);
      sandSky.addColorStop(0, '#321609');
      sandSky.addColorStop(0.35, '#783515');
      sandSky.addColorStop(0.68, '#C26A2D');
      sandSky.addColorStop(1, '#F3C079');
      ctx.fillStyle = sandSky;
      ctx.fillRect(0, 0, width, height);

      // 2. Low Blinding Desert Sun & Dust Halo
      const sunX = width * 0.54;
      const sunY = height * 0.41;
      const sunR = 54;

      const sunGlow = ctx.createRadialGradient(sunX, sunY, sunR * 0.5, sunX, sunY, sunR * 3.4);
      sunGlow.addColorStop(0, 'rgba(254, 215, 170, 0.75)');
      sunGlow.addColorStop(0.4, 'rgba(234, 88, 12, 0.3)');
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 3.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FED7AA';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
      ctx.fill();

      // 3. Sweeping Barchan Sand Dunes with Razor Crest Lines
      const drawBarchanDune = (baseY, crestX, crestY, litColor, shadowColor) => {
        // Shadow Side (Slip Face)
        ctx.fillStyle = shadowColor;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);
        ctx.quadraticCurveTo(crestX * 0.6, crestY + 15, crestX, crestY);
        ctx.lineTo(crestX, height);
        ctx.closePath();
        ctx.fill();

        // Lit Windward Face
        ctx.fillStyle = litColor;
        ctx.beginPath();
        ctx.moveTo(crestX, height);
        ctx.lineTo(crestX, crestY);
        ctx.quadraticCurveTo(crestX + (width - crestX) * 0.5, crestY - 20, width, baseY + 25);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      };

      // Far Ridge Dune for Camel Caravan Crossing
      const farDuneY = height * 0.62;
      drawBarchanDune(farDuneY, width * 0.44, farDuneY - 48, '#B45309', '#92400E');

      // 4. Distant Silhouetted Caravan (3 Camels with Cargo + Nomad Guide)
      caravanX += 0.48;
      if (caravanX > width + 160) {
        caravanX = -150;
      }

      const normX = caravanX / width;
      const caravanY = farDuneY - Math.sin(normX * Math.PI) * 44;
      const walkCycle = time * 0.0055;

      // Realistic Camel Renderer with 4-Beat Gait
      const drawCamel = (cx, cy, scale = 0.9, phase = 0) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);
        ctx.fillStyle = '#271106';

        // Cast Shadow Stretching Across Dune
        ctx.fillStyle = 'rgba(39, 17, 6, 0.45)';
        ctx.beginPath();
        ctx.ellipse(14, 10, 24, 4, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#271106';
        // Body Oval
        ctx.beginPath();
        ctx.ellipse(0, -18, 19, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hump & Cargo Pack
        ctx.beginPath();
        ctx.arc(2, -29, 9.5, 0, Math.PI * 2);
        ctx.fill();
        // Cargo Bag Strap
        ctx.fillRect(-6, -24, 14, 6);

        // Long S-Curved Neck & Muzzle
        ctx.beginPath();
        ctx.moveTo(14, -14);
        ctx.quadraticCurveTo(24, -28, 22, -39);
        ctx.lineTo(29, -37);
        ctx.quadraticCurveTo(25, -24, 16, -9);
        ctx.closePath();
        ctx.fill();

        // 4-Beat Walking Legs
        const legFrontA = Math.sin(phase) * 0.38;
        const legFrontB = Math.sin(phase + Math.PI) * 0.38;
        ctx.lineWidth = 2.6;
        ctx.strokeStyle = '#271106';

        // Front Pair
        ctx.beginPath();
        ctx.moveTo(12, -7);
        ctx.lineTo(12 + Math.sin(legFrontA) * 19, 10);
        ctx.moveTo(8, -7);
        ctx.lineTo(8 + Math.sin(legFrontB) * 19, 10);
        // Back Pair
        ctx.moveTo(-9, -7);
        ctx.lineTo(-9 + Math.sin(legFrontB) * 19, 10);
        ctx.moveTo(-14, -7);
        ctx.lineTo(-14 + Math.sin(legFrontA) * 19, 10);
        ctx.stroke();

        ctx.restore();
      };

      // Nomad Traveler Guide with Walking Staff & Flowing Robe
      const drawNomad = (nx, ny, phase) => {
        ctx.save();
        ctx.translate(nx, ny);
        ctx.fillStyle = '#271106';
        ctx.strokeStyle = '#271106';

        // Staff
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(11, -34);
        ctx.lineTo(9, 7);
        ctx.stroke();

        // Flowing Robe / Tunic
        ctx.beginPath();
        ctx.moveTo(0, -23);
        ctx.lineTo(-8, 3);
        ctx.lineTo(8, 3);
        ctx.closePath();
        ctx.fill();

        // Turbaned Head
        ctx.beginPath();
        ctx.arc(0, -27, 4.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      drawNomad(caravanX + 95, caravanY, walkCycle);
      drawCamel(caravanX + 62, caravanY, 0.9, walkCycle);
      drawCamel(caravanX + 16, caravanY, 0.84, walkCycle + 0.8);
      drawCamel(caravanX - 30, caravanY, 0.78, walkCycle + 1.6);

      // Connecting Lead Reins
      ctx.strokeStyle = 'rgba(39, 17, 6, 0.65)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(caravanX + 90, caravanY - 14);
      ctx.quadraticCurveTo(caravanX + 76, caravanY - 6, caravanX + 62, caravanY - 16);
      ctx.quadraticCurveTo(caravanX + 39, caravanY - 6, caravanX + 16, caravanY - 16);
      ctx.quadraticCurveTo(caravanX - 7, caravanY - 6, caravanX - 30, caravanY - 16);
      ctx.stroke();

      // Foreground Dunes with Ridge Highlights
      drawBarchanDune(height * 0.75, width * 0.72, height * 0.68, '#D97706', '#B45309');
      drawBarchanDune(height * 0.86, width * 0.28, height * 0.81, '#EA580C', '#C2410C');
      drawBarchanDune(height * 0.94, width * 0.63, height * 0.89, '#F59E0B', '#D97706');

      // 5. Sand Breeze Dust Sheet Particles Sweeping across Dunes
      for (const sp of sandParticles) {
        sp.x += sp.vx;
        sp.y += sp.vy;

        if (sp.x > width + 30) {
          sp.x = -20;
          sp.y = Math.random() * height;
        }

        ctx.fillStyle = `rgba(254, 215, 170, ${sp.alpha})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // =========================================================
    // MAIN REQUESTANIMATIONFRAME LOOP
    // =========================================================
    const animate = (timestamp) => {
      animationFrameId = requestAnimationFrame(animate);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const activeTheme = themeRef.current;
      switch (activeTheme) {
        case 'dark':
          renderDark(timestamp);
          break;
        case 'dusky':
          renderDusky(timestamp);
          break;
        case 'ambient':
          renderAmbient(timestamp);
          break;
        case 'sand':
          renderSand(timestamp);
          break;
        case 'light':
        default:
          renderLight(timestamp);
          break;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{
          display: 'block',
        }}
        aria-hidden="true"
      />
      {/* Dynamic Theme Atmospheric Readability Scrim Overlay */}
      <div className="theme-bg-scrim absolute inset-0 pointer-events-none transition-all duration-500" />
    </div>
  );
};
