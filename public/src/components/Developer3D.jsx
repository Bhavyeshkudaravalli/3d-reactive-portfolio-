import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, RotateCcw, Coffee, MessageSquareCode } from 'lucide-react';
import { useTheme } from '../context/useTheme';

/**
 * 3D Developer Scene
 * Features:
 * - Reactive Man sitting in ergonomic office chair in front of a laptop
 * - Head and neck smoothly rotate and tilt to track mouse cursor direction in real time
 * - Rhythmic typing hands on laptop keyboard
 * - Glowing code screen illuminating face and hands with realistic point lighting
 * - Modern developer desk with steaming coffee mug and succulent plant
 * - Adaptive lighting responding to Dark, Light, Dusky, Ambient, and Sand themes
 */
function ReactiveDeveloperScene({ theme, isCodingFast, dragRotation }) {
  const headRef = useRef(null);
  const torsoRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);
  const rootGroupRef = useRef(null);

  // Theme accent colors
  const themeAccent = useMemo(() => {
    switch (theme) {
      case 'dark':
        return '#06b6d4';
      case 'dusky':
        return '#f97316';
      case 'ambient':
        return '#10b981';
      case 'sand':
        return '#d97706';
      case 'light':
      default:
        return '#2563eb';
    }
  }, [theme]);

  // Procedural Glowing Code Editor Screen Canvas Texture
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    // VS Code dark theme background
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, 512, 320);

    // Window top bar with macOS-style control dots
    ctx.fillStyle = '#141c2e';
    ctx.fillRect(0, 0, 512, 28);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(16, 14, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(32, 14, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(48, 14, 5, 0, Math.PI * 2);
    ctx.fill();

    // Editor tab title
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('bhavyesh_portfolio.py', 65, 17);

    // Syntax-highlighted code lines
    const codeLines = [
      { color: '#818cf8', w: 80, x: 24, y: 50 },
      { color: '#38bdf8', w: 140, x: 110, y: 50 },
      { color: '#94a3b8', w: 40, x: 256, y: 50 },
      // Indented function
      { color: '#c084fc', w: 90, x: 48, y: 76 },
      { color: '#34d399', w: 160, x: 144, y: 76 },
      { color: '#f472b6', w: 70, x: 48, y: 102 },
      { color: '#38bdf8', w: 200, x: 124, y: 102 },
      { color: '#fbbf24', w: 140, x: 48, y: 128 },
      { color: '#818cf8', w: 80, x: 194, y: 128 },
      // Indented logic
      { color: '#60a5fa', w: 110, x: 48, y: 160 },
      { color: '#34d399', w: 190, x: 164, y: 160 },
      { color: '#38bdf8', w: 90, x: 48, y: 186 },
      { color: '#a78bfa', w: 130, x: 144, y: 186 },
      { color: '#34d399', w: 170, x: 48, y: 212 },
      // Return line
      { color: '#c084fc', w: 70, x: 48, y: 246 },
      { color: '#38bdf8', w: 130, x: 124, y: 246 },
    ];

    codeLines.forEach((l) => {
      ctx.fillStyle = l.color;
      ctx.fillRect(l.x, l.y, l.w, 7);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  const BASE_ROT = useMemo(() => ({ x: 0.1, y: -0.32 }), []);

  // Frame physics loop: Real-time reactive cursor tracking + typing animations
  useFrame(({ pointer, clock }) => {
    const time = clock.getElapsedTime();

    // 1. Reactive Head Rotation tracking the mouse cursor
    if (headRef.current) {
      // pointer.x (-1 to 1) controls yaw (left/right look)
      // pointer.y (-1 to 1) controls pitch (up/down look)
      const targetYaw = pointer.x * 0.85;
      const targetPitch = -pointer.y * 0.48;
      const targetRoll = -pointer.x * 0.12;

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetYaw, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetPitch, 0.08);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetRoll, 0.08);
    }

    // 2. Subtle rhythmic typing micro-movements on laptop keyboard
    const typeSpeed = isCodingFast ? 24 : 12;
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = -0.31 + Math.sin(time * typeSpeed) * 0.012;
      rightHandRef.current.position.y = -0.31 + Math.cos(time * typeSpeed + 1.4) * 0.012;
    }

    // 3. Subtle breathing idle motion for torso
    if (torsoRef.current) {
      torsoRef.current.position.y = -0.25 + Math.sin(time * 2.2) * 0.008;
    }

    // 4. Smooth isometric rotation with manual drag orbit damping
    if (rootGroupRef.current && dragRotation) {
      const targetRotY = BASE_ROT.y + dragRotation.current.y;
      const targetRotX = BASE_ROT.x + dragRotation.current.x;
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, targetRotY, 0.08);
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(rootGroupRef.current.rotation.x, targetRotX, 0.08);
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, -0.15, 0]} rotation={[BASE_ROT.x, BASE_ROT.y, 0]}>
      {/* -------------------------------------------------------------
          1. MODERN DEVELOPER DESK & METAL FRAME
          ------------------------------------------------------------- */}
      {/* Tabletop */}
      <mesh position={[0, -0.4, 0.45]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.7]} />
        <meshStandardMaterial color="#17202e" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Desk Mat (Oversized Gaming Mousepad) */}
      <mesh position={[0, -0.355, 0.42]} receiveShadow>
        <boxGeometry args={[2.3, 0.01, 1.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Desk Edge Accent Glow Line */}
      <mesh position={[0, -0.4, 1.3]}>
        <boxGeometry args={[3.22, 0.02, 0.02]} />
        <meshBasicMaterial color={themeAccent} transparent opacity={0.6} />
      </mesh>

      {/* 4 Metal Desk Tube Legs */}
      {[
        [-1.45, -1.25, -0.25],
        [1.45, -1.25, -0.25],
        [-1.45, -1.25, 1.15],
        [1.45, -1.25, 1.15],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.62, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Leg Crossbars */}
      <mesh position={[0, -1.75, 0.45]}>
        <boxGeometry args={[2.9, 0.04, 0.04]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* -------------------------------------------------------------
          2. THE 3D LAPTOP (OPEN IN FRONT OF HIM)
          ------------------------------------------------------------- */}
      <group position={[0, -0.34, 0.38]}>
        {/* Laptop Bottom Chassis / Keyboard Deck */}
        <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.025, 0.65]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Trackpad (Closest to developer) */}
        <mesh position={[0, 0.03, -0.2]}>
          <boxGeometry args={[0.26, 0.005, 0.16]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Keyboard Recess Bed */}
        <mesh position={[0, 0.03, 0.04]}>
          <boxGeometry args={[0.78, 0.005, 0.32]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.7} />
        </mesh>

        {/* Individual Key Row Micro-Bars */}
        {[-0.07, -0.01, 0.05, 0.11].map((z, idx) => (
          <mesh key={idx} position={[0, 0.033, z]}>
            <boxGeometry args={[0.74, 0.004, 0.04]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
        ))}

        {/* Open Display Lid (Hinged at far side, tilted back towards developer) */}
        <group position={[0, 0.03, 0.28]}>
          <group rotation={[0.38, 0, 0]}>
            {/* Display Backing / Metal Lid (Faces away towards desk front) */}
            <mesh position={[0, 0.28, 0]} castShadow>
              <boxGeometry args={[0.9, 0.58, 0.02]} />
              <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Glowing Tech Logo on back of lid */}
            <mesh position={[0, 0.28, 0.012]}>
              <circleGeometry args={[0.045, 24]} />
              <meshBasicMaterial color={themeAccent} />
            </mesh>

            {/* Glowing Display Screen with Code Editor Texture (Faces developer) */}
            <mesh position={[0, 0.28, -0.011]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.85, 0.53]} />
              <meshBasicMaterial map={screenTexture} />
            </mesh>

            {/* Laptop Screen Point Light (illuminates developer face and hands!) */}
            <pointLight
              color={themeAccent}
              intensity={2.8}
              distance={3.2}
              position={[0, 0.28, -0.22]}
            />
          </group>
        </group>
      </group>

      {/* -------------------------------------------------------------
          3. ERGONOMIC DESK CHAIR
          ------------------------------------------------------------- */}
      <group position={[0, 0, -0.58]}>
        {/* Seat Cushion */}
        <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.08, 0.15, 1.02]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>

        {/* Ergonomic Curved Mesh Backrest */}
        <group position={[0, -0.08, -0.48]} rotation={[0.08, 0, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.96, 1.25, 0.1]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
          {/* Backrest Lumbar Trim Band */}
          <mesh position={[0, -0.22, 0.06]}>
            <boxGeometry args={[0.88, 0.1, 0.03]} />
            <meshStandardMaterial color={themeAccent} roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Headrest */}
          <mesh position={[0, 0.68, 0.02]} castShadow>
            <boxGeometry args={[0.6, 0.22, 0.12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
        </group>

        {/* Left & Right Armrests */}
        {[-0.58, 0.58].map((x, idx) => (
          <group key={idx} position={[x, -0.52, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.32, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.05]} castShadow>
              <boxGeometry args={[0.11, 0.04, 0.48]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Hydraulic Piston Column */}
        <mesh position={[0, -1.45, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.95, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* 5-Star Spider Caster Base */}
        <group position={[0, -1.95, 0]}>
          {[0, 72, 144, 216, 288].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 0.44;
            const z = Math.sin(rad) * 0.44;
            return (
              <group key={idx}>
                <mesh position={[x / 2, 0, z / 2]} rotation={[0, -rad, 0]} castShadow>
                  <boxGeometry args={[0.44, 0.04, 0.04]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh position={[x, -0.04, z]} castShadow>
                  <sphereGeometry args={[0.038, 16, 16]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.8} />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* -------------------------------------------------------------
          4. THE DEVELOPER CHARACTER (MAN IN HOODIE SITTING)
          ------------------------------------------------------------- */}
      <group position={[0, 0, -0.52]}>
        {/* Hips & Thighs (Sitting on Chair Cushion) */}
        <mesh position={[0, -0.74, 0]} castShadow>
          <boxGeometry args={[0.76, 0.22, 0.58]} />
          <meshStandardMaterial color="#1e293b" roughness={0.75} />
        </mesh>

        {/* Thighs extending forward */}
        {[-0.22, 0.22].map((x, idx) => (
          <group key={idx} position={[x, -0.75, 0.3]}>
            <mesh castShadow>
              <boxGeometry args={[0.26, 0.22, 0.65]} />
              <meshStandardMaterial color="#1e293b" roughness={0.75} />
            </mesh>
            {/* Lower Legs (bent at knee, going down to floor) */}
            <mesh position={[0, -0.55, 0.32]} castShadow>
              <cylinderGeometry args={[0.1, 0.08, 0.88, 16]} />
              <meshStandardMaterial color="#1e293b" roughness={0.75} />
            </mesh>
            {/* Sneakers */}
            <group position={[0, -1.02, 0.38]}>
              <mesh castShadow>
                <boxGeometry args={[0.22, 0.12, 0.38]} />
                <meshStandardMaterial color="#0f172a" roughness={0.6} />
              </mesh>
              {/* White sneaker sole */}
              <mesh position={[0, -0.07, 0.02]} castShadow>
                <boxGeometry args={[0.24, 0.03, 0.4]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} />
              </mesh>
            </group>
          </group>
        ))}

        {/* Torso & Hoodie (Slight forward posture toward desk) */}
        <group ref={torsoRef} position={[0, -0.25, 0]} rotation={[0.07, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.78, 0.88, 0.46]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>

          {/* Hoodie Collar & Drawstring Accents */}
          <mesh position={[0, 0.42, 0.16]}>
            <torusGeometry args={[0.17, 0.04, 16, 24, Math.PI]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
          <mesh position={[-0.07, 0.24, 0.24]}>
            <cylinderGeometry args={[0.007, 0.007, 0.25, 8]} />
            <meshBasicMaterial color={themeAccent} />
          </mesh>
          <mesh position={[0.07, 0.24, 0.24]}>
            <cylinderGeometry args={[0.007, 0.007, 0.25, 8]} />
            <meshBasicMaterial color={themeAccent} />
          </mesh>

          {/* Left Upper Arm & Forearm reaching desk */}
          <group position={[-0.44, 0.28, 0]}>
            <mesh position={[-0.04, -0.22, 0.14]} rotation={[0.35, 0, -0.15]} castShadow>
              <cylinderGeometry args={[0.09, 0.08, 0.52, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>
            {/* Forearm extending forward onto desk */}
            <mesh position={[0.12, -0.36, 0.56]} rotation={[-1.25, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.075, 0.065, 0.58, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>
          </group>

          {/* Right Upper Arm & Forearm reaching desk */}
          <group position={[0.44, 0.28, 0]}>
            <mesh position={[0.04, -0.22, 0.14]} rotation={[0.35, 0, 0.15]} castShadow>
              <cylinderGeometry args={[0.09, 0.08, 0.52, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>
            {/* Forearm extending forward onto desk */}
            <mesh position={[-0.12, -0.36, 0.56]} rotation={[-1.25, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.075, 0.065, 0.58, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>
          </group>
        </group>

        {/* Left & Right Hands on Keyboard (with typing micro-movement) */}
        <mesh ref={leftHandRef} position={[-0.18, -0.31, 0.9]} castShadow>
          <boxGeometry args={[0.13, 0.05, 0.15]} />
          <meshStandardMaterial color="#fcd5b5" roughness={0.6} />
        </mesh>
        <mesh ref={rightHandRef} position={[0.18, -0.31, 0.9]} castShadow>
          <boxGeometry args={[0.13, 0.05, 0.15]} />
          <meshStandardMaterial color="#fcd5b5" roughness={0.6} />
        </mesh>

        {/* Neck Column */}
        <mesh position={[0, 0.28, 0.04]} castShadow>
          <cylinderGeometry args={[0.11, 0.13, 0.22, 16]} />
          <meshStandardMaterial color="#fcd5b5" roughness={0.5} />
        </mesh>

        {/* -------------------------------------------------------------
            5. REACTIVE HEAD GROUP (ROTATES TO TRACK MOUSE CURSOR)
            ------------------------------------------------------------- */}
        <group ref={headRef} position={[0, 0.52, 0.06]}>
          {/* Head Skull Mesh */}
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[0.33, 32, 32]} />
            <meshStandardMaterial color="#fcd5b5" roughness={0.45} />
          </mesh>

          {/* Stylized Modern Dark Hair */}
          <group position={[0, 0.12, -0.04]}>
            {/* Top Hair Volume */}
            <mesh position={[0, 0.12, 0]} castShadow>
              <boxGeometry args={[0.42, 0.2, 0.44]} />
              <meshStandardMaterial color="#1c1917" roughness={0.6} />
            </mesh>
            {/* Side & Back Hair Trim */}
            <mesh position={[0, -0.02, -0.16]} castShadow>
              <boxGeometry args={[0.43, 0.32, 0.22]} />
              <meshStandardMaterial color="#1c1917" roughness={0.6} />
            </mesh>
            {/* Front Fringe / Bangs */}
            <mesh position={[0, 0.14, 0.16]} rotation={[0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.38, 0.12, 0.14]} />
              <meshStandardMaterial color="#1c1917" roughness={0.6} />
            </mesh>
          </group>

          {/* Eyes (Looking forward towards cursor) */}
          {[-0.1, 0.1].map((x, idx) => (
            <group key={idx} position={[x, 0.02, 0.3]}>
              <mesh>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
              {/* White Specular Catchlight */}
              <mesh position={[0.012, 0.012, 0.03]}>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}

          {/* Eyebrows */}
          {[-0.1, 0.1].map((x, idx) => (
            <mesh key={idx} position={[x, 0.1, 0.31]}>
              <boxGeometry args={[0.09, 0.02, 0.02]} />
              <meshStandardMaterial color="#1c1917" roughness={0.8} />
            </mesh>
          ))}

          {/* Nose */}
          <mesh position={[0, -0.04, 0.33]} castShadow>
            <boxGeometry args={[0.05, 0.09, 0.08]} />
            <meshStandardMaterial color="#f8be9b" roughness={0.5} />
          </mesh>

          {/* Subtle Smile */}
          <mesh position={[0, -0.14, 0.3]}>
            <boxGeometry args={[0.09, 0.018, 0.02]} />
            <meshStandardMaterial color="#e09f7a" />
          </mesh>

          {/* Modern Developer Glasses */}
          <group position={[0, 0.02, 0.34]}>
            {/* Left Frame */}
            <mesh position={[-0.1, 0, 0]}>
              <torusGeometry args={[0.075, 0.01, 12, 24]} />
              <meshStandardMaterial color="#0f172a" metalness={0.4} />
            </mesh>
            {/* Right Frame */}
            <mesh position={[0.1, 0, 0]}>
              <torusGeometry args={[0.075, 0.01, 12, 24]} />
              <meshStandardMaterial color="#0f172a" metalness={0.4} />
            </mesh>
            {/* Glasses Nose Bridge */}
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[0.06, 0.012, 0.01]} />
              <meshStandardMaterial color="#0f172a" metalness={0.4} />
            </mesh>
            {/* Semi-transparent Glass Lens with subtle reflection */}
            {[-0.1, 0.1].map((x, idx) => (
              <mesh key={idx} position={[x, 0, 0]}>
                <circleGeometry args={[0.065, 16]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
              </mesh>
            ))}
          </group>

          {/* Over-Ear Studio Headphones */}
          <group position={[0, 0.04, 0]}>
            {/* Headband arch */}
            <mesh position={[0, 0.22, 0]}>
              <torusGeometry args={[0.36, 0.025, 16, 24, Math.PI]} />
              <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Left & Right Earcups */}
            {[-0.35, 0.35].map((x, idx) => (
              <group key={idx} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.11, 0.11, 0.09, 24]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.6} />
                </mesh>
                {/* Theme-Adaptive Glowing Ring Strip */}
                <mesh position={[0, 0.048, 0]}>
                  <ringGeometry args={[0.07, 0.095, 24]} />
                  <meshBasicMaterial color={themeAccent} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* -------------------------------------------------------------
          6. DESK ACCESSORIES (COFFEE MUG & SUCCULENT PLANT)
          ------------------------------------------------------------- */}
      {/* Ceramic Coffee Mug */}
      <group position={[-1.15, -0.24, 0.6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.075, 0.22, 20]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.09, 0]}>
          <circleGeometry args={[0.078, 16]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#3f2e1e" roughness={0.1} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.05, 0.016, 12, 16, Math.PI]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} />
        </mesh>
        {/* Steam Ring */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.06, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Desk Succulent Plant */}
      <group position={[1.18, -0.24, 0.5]}>
        {/* Terracotta Pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.065, 0.18, 16]} />
          <meshStandardMaterial color="#d97706" roughness={0.8} />
        </mesh>
        {/* Plant Leaves */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial color="#10b981" roughness={0.6} />
        </mesh>
        <mesh position={[0.04, 0.17, 0.03]} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#34d399" roughness={0.5} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          7. GROUND CONTACT SHADOW
          ------------------------------------------------------------- */}
      <mesh position={[0, -2.0, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.7, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/**
 * Fallback while 3D Canvas mounts
 */
function DeveloperFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      <span className="text-xs font-mono text-cyan-400">Loading 3D Reactive Developer...</span>
    </div>
  );
}

/**
 * Full 3D Reactive Developer Component
 */
export const Developer3D = () => {
  const { theme } = useTheme();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isCodingFast, setIsCodingFast] = useState(false);

  const developerQuotes = useMemo(
    () => [
      '☕ Coding & tracking your cursor in real time!',
      '👀 Look around — I follow your mouse pointer!',
      '⚡ Building scalable full-stack & AI apps',
      '🚀 Available for internships & freelance work',
      '💻 Clean code, modern UI & deep learning',
    ],
    []
  );

  const cycleQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % developerQuotes.length);
    setIsCodingFast(true);
    setTimeout(() => setIsCodingFast(false), 1500);
  };

  const dragRotation = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    previousPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousPointer.current.x;
    const deltaY = e.clientY - previousPointer.current.y;
    previousPointer.current = { x: e.clientX, y: e.clientY };

    dragRotation.current.y += deltaX * 0.008;
    dragRotation.current.x += deltaY * 0.008;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const resetAngle = () => {
    dragRotation.current = { x: 0, y: 0 };
  };

  return (
    <div className="flex flex-col items-start w-full relative">
      {/* Top Header Pill with Interactive Speech Bubble */}
      <div className="flex flex-wrap items-center justify-between w-full gap-3 mb-2 z-10">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium shadow-sm shadow-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>3D Reactive Developer</span>
          </div>

          <span className="text-[11px] font-mono text-cyan-400/90 hidden sm:inline px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
            Head tracks your cursor 👀
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={resetAngle}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
            title="Reset viewing angle"
            aria-label="Reset viewing angle"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          <button
            onClick={cycleQuote}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors active:scale-95 shadow-sm"
            title="Click to interact with developer"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] hidden sm:inline">Tap to Interact</span>
          </button>
        </div>
      </div>

      {/* Floating Interactive Speech Thought Bubble */}
      <div
        onClick={cycleQuote}
        className="w-full mb-2 cursor-pointer group select-none transition-transform active:scale-[0.99]"
        title="Click to hear another thought!"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 group-hover:text-white transition-all shadow-md">
          <MessageSquareCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-mono text-[11px] text-cyan-300">
            {developerQuotes[quoteIndex]}
          </span>
          <span className="text-[10px] text-slate-500 font-mono ml-auto pl-2">
            (click)
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className="w-full relative h-[380px] sm:h-[430px] lg:h-[460px] touch-none select-none cursor-grab active:cursor-grabbing flex items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/30 overflow-hidden border border-slate-800/40"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Canvas
          shadows
          camera={{ position: [0.7, 1.3, 3.8], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
          onCreated={({ gl, camera }) => {
            camera.lookAt(0, 0.05, 0.1);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          {/* Studio Lighting */}
          <ambientLight intensity={1.3} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.001}
          />
          <directionalLight position={[-4, 3, -2]} intensity={0.5} />

          {/* Theme Dynamic Key Fill Light */}
          <pointLight
            color={
              theme === 'dusky' ? '#f97316' :
              theme === 'dark' ? '#06b6d4' :
              theme === 'ambient' ? '#10b981' :
              theme === 'sand' ? '#d97706' :
              '#2563eb'
            }
            intensity={1.6}
            distance={8}
            position={[-2, 3, 2]}
          />

          <React.Suspense fallback={null}>
            <ReactiveDeveloperScene
              theme={theme}
              isCodingFast={isCodingFast}
              dragRotation={dragRotation}
            />
          </React.Suspense>
        </Canvas>

        {/* Bottom Helper Pill */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Move cursor to turn head • Drag to orbit desk</span>
        </div>
      </div>
    </div>
  );
};
