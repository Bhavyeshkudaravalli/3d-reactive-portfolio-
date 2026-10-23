import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/useTheme';

export const ThreeCanvas = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Color profiles based on active theme
  const getThemeColors = (currentTheme) => {
    switch (currentTheme) {
      case 'light':
        return {
          wire: 0x2563eb,
          inner: 0x0284c7,
          particles: 0x3b82f6,
          ambient: 0xffffff,
          light1: 0x38bdf8,
          light2: 0x6366f1,
          opacity: 0.75,
        };
      case 'dusky':
        return {
          wire: 0xf97316,
          inner: 0xec4899,
          particles: 0xf43f5e,
          ambient: 0x2d1b4e,
          light1: 0xfb923c,
          light2: 0xa855f7,
          opacity: 0.9,
        };
      case 'ambient':
        return {
          wire: 0x10b981,
          inner: 0x14b8a6,
          particles: 0x34d399,
          ambient: 0x071e19,
          light1: 0x2dd4bf,
          light2: 0x06b6d4,
          opacity: 0.9,
        };
      case 'sand':
        return {
          wire: 0xd97706,
          inner: 0xea580c,
          particles: 0xf59e0b,
          ambient: 0xf7ede2,
          light1: 0xfbbf24,
          light2: 0xd97706,
          opacity: 0.8,
        };
      case 'dark':
      default:
        return {
          wire: 0x06b6d4,
          inner: 0x3b82f6,
          particles: 0x38bdf8,
          ambient: 0x0b1329,
          light1: 0x22d3ee,
          light2: 0x818cf8,
          opacity: 0.85,
        };
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderCssFallback = () => {
      container.innerHTML = `
        <div class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div class="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse"></div>
          <div class="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse"></div>
        </div>
      `;
    };

    // Pre-flight check if WebGL is available in the browser
    const isWebGLAvailable = () => {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl') || testCanvas.getContext('webgl2'))
        );
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      renderCssFallback();
      return;
    }

    let renderer = null;
    let animationFrameId = null;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / (height || 1), 0.1, 1000);
    camera.position.z = 24;

    // 2. Safe WebGL Renderer Initialization
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL context creation failed, gracefully falling back to CSS background:', err);
      renderCssFallback();
      return;
    }

    // Prevent browser from permanently blocking WebGL upon context loss
    const handleContextLost = (event) => {
      event.preventDefault();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      renderCssFallback();
    };

    const canvasElement = renderer.domElement;
    canvasElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Initial theme colors
    const colors = getThemeColors(themeRef.current);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(colors.ambient, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(colors.light1, 2.5, 60);
    pointLight1.position.set(15, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.light2, 2.0, 60);
    pointLight2.position.set(-15, -12, 8);
    scene.add(pointLight2);

    // 4. Central 3D Tech Core
    const group3D = new THREE.Group();

    // Outer Wireframe Polyhedron
    const outerGeo = new THREE.IcosahedronGeometry(7.5, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: colors.wire,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: colors.opacity,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group3D.add(outerMesh);

    // Inner Floating Dual Torus Rings
    const ringGeo1 = new THREE.TorusGeometry(9.2, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colors.inner,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    group3D.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(10.5, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colors.wire,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group3D.add(ringMesh2);

    // Inner Core Pulsing Sphere
    const coreGeo = new THREE.SphereGeometry(2.5, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: colors.inner,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group3D.add(coreMesh);

    scene.add(group3D);
    group3D.position.set(5.5, 0, 0);

    // 5. 3D Particle Constellation
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 60;
      particlePositions[i + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: colors.particles,
      size: 0.22,
      transparent: true,
      opacity: 0.65,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // 6. Mouse Coordinates & Parallax Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w < 1024) {
        group3D.position.set(0, 0, -4);
        group3D.scale.set(0.7, 0.7, 0.7);
      } else {
        group3D.position.set(6, 0, 0);
        group3D.scale.set(1, 1, 1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      group3D.rotation.y = elapsedTime * 0.15 + currentX * 0.6;
      group3D.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 - currentY * 0.5;

      ringMesh1.rotation.z = elapsedTime * 0.2;
      ringMesh2.rotation.x = elapsedTime * 0.25;

      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);

      particlesMesh.rotation.y = elapsedTime * 0.03 + currentX * 0.1;
      particlesMesh.rotation.x = -currentY * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Dynamic theme updates
    container._updateColors = (newTheme) => {
      const c = getThemeColors(newTheme);
      outerMat.color.setHex(c.wire);
      ringMat1.color.setHex(c.inner);
      ringMat2.color.setHex(c.wire);
      coreMat.color.setHex(c.inner);
      particleMat.color.setHex(c.particles);
      ambientLight.color.setHex(c.ambient);
      pointLight1.color.setHex(c.light1);
      pointLight2.color.setHex(c.light2);
      outerMat.opacity = c.opacity;
    };

    // 10. Clean Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      canvasElement.removeEventListener('webglcontextlost', handleContextLost);

      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (typeof renderer.forceContextLoss === 'function') {
          renderer.forceContextLoss();
        }
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  // Update Three.js materials when theme changes
  useEffect(() => {
    if (containerRef.current && containerRef.current._updateColors) {
      containerRef.current._updateColors(theme);
    }
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};
