import React, { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Volume2, VolumeX, Sparkles, Keyboard as KeyboardIcon, Info, CheckCircle2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { SKILLS_LIST } from '../data/constants';
import { keyboardAudio } from '../utils/keyboardSound';
import { useTheme } from '../context/useTheme';

const KIT = {
  pitch: 1.04468,
  keyY: 1.29117,
  keyHeight: 0.7629,
  logoY: 0.13985,
  keyTop: 0.13102987408638,
};

/**
 * Individual 3D Mechanical Keycap with white centered logo decal and spring physics
 */
const KeycapMesh = React.memo(({ skill, posX, posZ, isPressed, onSelect, geometry }) => {
  const groupRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Pure white logo texture decal
  const decalTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const draw = (img = null) => {
      ctx.clearRect(0, 0, 256, 256);

      if (img) {
        try {
          // Draw bold pure white centered icon
          ctx.drawImage(img, 36, 36, 184, 184);
        } catch {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 72px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(skill.label.slice(0, 2).toUpperCase(), 128, 128);
        }
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 72px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.label.slice(0, 2).toUpperCase(), 128, 128);
      }
    };

    draw();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const iconPath = skill.keyboardIcon || skill.icon;
    if (iconPath) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = iconPath;
      img.onload = () => {
        draw(img);
        texture.needsUpdate = true;
      };
    }

    return texture;
  }, [skill.icon, skill.keyboardIcon, skill.label]);

  // Spring physics loop: animate keycap depression along Y axis
  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = isPressed ? KIT.keyY - 0.42 : isHovered ? KIT.keyY + 0.06 : KIT.keyY;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.35;
  });

  return (
    <group
      ref={groupRef}
      position={[posX, KIT.keyY, posZ]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        keyboardAudio.playHover();
      }}
      onPointerOut={() => {
        setIsHovered(false);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect(skill);
      }}
    >
      {/* 3D Keycap Body Mesh with dynamic emissive glow */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={skill.keyboardColor || skill.color}
          emissive={skill.keyboardColor || skill.color}
          emissiveIntensity={isPressed ? 0.75 : isHovered ? 0.2 : 0}
          roughness={0.34}
          metalness={0.08}
        />
      </mesh>

      {/* Pure White Centered SVG Logo Plane */}
      <mesh position={[0, KIT.logoY, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.54, 0.54]} />
        <meshBasicMaterial map={decalTexture} transparent opacity={0.96} depthWrite={false} />
      </mesh>
    </group>
  );
});

/**
 * 3D Keyboard Scene (loads keycaps.glb, positions the 9 case pieces & 24 keycaps)
 */
function KeyboardDeck({ skills, pressedSkillId, onSelectKey, dragRotation, scale = 1.35 }) {
  const keyboardRef = useRef(null);
  const gltf = useLoader(GLTFLoader, '/assets/keyboard/keycaps.glb');

  // Extract keycap and 9 case piece geometries from keycaps.glb
  const { keycapGeo, caseGeometries } = useMemo(() => {
    let keyGeo = null;
    const cases = [];

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.includes('keycap')) {
          keyGeo = child.geometry.clone();
        } else if (child.name.toLowerCase().includes('case')) {
          cases.push(child.geometry.clone());
        }
      }
    });

    return { keycapGeo: keyGeo, caseGeometries: cases };
  }, [gltf]);

  // Case material: Matte black / obsidian enclosure matching screenshot
  const caseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#171819',
        roughness: 0.64,
        metalness: 0.1,
      }),
    []
  );

  const BASE_ROT = useMemo(() => ({ x: 0.119863, y: 0.0072, z: 0.119863 }), []);

  // Free floating zero-gravity levitation + responsive mouse viewing angle rotation
  useFrame(({ clock, pointer }) => {
    if (!keyboardRef.current) return;
    const time = clock.getElapsedTime();

    // Natural zero-gravity floating levitation
    const floatY = Math.sin(time * 1.5) * 0.22;
    const floatTiltZ = Math.cos(time * 1.2) * 0.04;
    const floatTiltX = Math.sin(time * 1.4) * 0.035;

    // Freely rotating viewing angle responding to mouse pointer + manual drag
    const dragX = dragRotation ? dragRotation.current.x : 0;
    const dragY = dragRotation ? dragRotation.current.y : 0;

    const targetRotY = BASE_ROT.y + pointer.x * 0.95 + dragY;
    const targetRotX = BASE_ROT.x - pointer.y * 0.65 + floatTiltX + dragX;
    const targetRotZ = BASE_ROT.z + pointer.x * 0.15 + floatTiltZ;
    const targetPosY = -0.71 + floatY;

    // Smooth physics damping
    keyboardRef.current.position.y += (targetPosY - keyboardRef.current.position.y) * 0.08;
    keyboardRef.current.rotation.y += (targetRotY - keyboardRef.current.rotation.y) * 0.08;
    keyboardRef.current.rotation.x += (targetRotX - keyboardRef.current.rotation.x) * 0.08;
    keyboardRef.current.rotation.z += (targetRotZ - keyboardRef.current.rotation.z) * 0.08;
    keyboardRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  const cols = 6;

  return (
    <group
      ref={keyboardRef}
      position={[0, -0.71, 0]}
      rotation={[BASE_ROT.x, BASE_ROT.y, BASE_ROT.z]}
      scale={[scale, scale, scale]}
    >
      {/* 9 Case Modular Tiles forming the rounded chassis */}
      {caseGeometries.map((geo, idx) => (
        <mesh
          key={idx}
          geometry={geo}
          material={caseMaterial}
          receiveShadow
          castShadow
          onPointerOver={() => {
            keyboardAudio.playHover();
          }}
        />
      ))}

      {/* 24 Keycaps (4 Rows x 6 Columns) */}
      {skills.map((skill, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        // Position coordinates matching keycaps.glb KIT contract
        const posX = (col - 2.5) * KIT.pitch;
        const posZ = (row - 1.5) * KIT.pitch;

        return (
          <KeycapMesh
            key={skill.id}
            skill={skill}
            posX={posX}
            posZ={posZ}
            isPressed={pressedSkillId === skill.id}
            onSelect={onSelectKey}
            geometry={keycapGeo}
          />
        );
      })}
    </group>
  );
}

/**
 * Fallback keyboard scene while GLB loads
 */
function KeyboardFallback({ scale = 1.35 }) {
  return (
    <mesh position={[0, 0, 0]} scale={[scale, scale, scale]}>
      <boxGeometry args={[7.2, 0.7, 5.0]} />
      <meshStandardMaterial color="#171819" roughness={0.65} />
    </mesh>
  );
}

/**
 * Full 3D Mechanical Keyboard Component
 * Styled with exact colors, structure, and perspective from Chibi / Naresh Khatri's 3D portfolio
 */
export const Keyboard3D = () => {
  const { theme } = useTheme();
  const [activeSkill, setActiveSkill] = useState(() => SKILLS_LIST[18] || SKILLS_LIST[0]); // default JavaScript (Yellow keycap in front corner)
  const [pressedSkillId, setPressedSkillId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const skills = useMemo(() => SKILLS_LIST.slice(0, 24), []);

  // Physical QWERTY shortcut mapping and mnemonic letter mapping
  const { shortcutMap, letterMap } = useMemo(() => {
    const sMap = {};
    const lMap = {};

    skills.forEach((skill) => {
      if (skill.shortcut) {
        sMap[skill.shortcut.toUpperCase()] = skill;
      }
      // First letter of skill name / label as backup trigger
      const firstChar = skill.name.charAt(0).toUpperCase();
      if (!lMap[firstChar]) {
        lMap[firstChar] = skill;
      }
    });

    return { shortcutMap: sMap, letterMap: lMap };
  }, [skills]);

  // Key press trigger action
  const handleSelectKey = useCallback((skill) => {
    if (!skill) return;
    setActiveSkill(skill);
    setPressedSkillId(skill.id);
    keyboardAudio.playPress();

    setTimeout(() => {
      setPressedSkillId((curr) => {
        if (curr === skill.id) {
          keyboardAudio.playRelease();
          return null;
        }
        return curr;
      });
    }, 130);
  }, []);

  // Hardware keyboard typing event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const code = e.code.toUpperCase();
      const letter = e.key.toUpperCase();
      const matchedSkill = shortcutMap[code] || letterMap[letter];

      if (matchedSkill) {
        e.preventDefault();
        setHasTyped(true);
        handleSelectKey(matchedSkill);
      }
    };

    const handleKeyUp = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      keyboardAudio.playRelease();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleSelectKey, letterMap, shortcutMap]);

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

  const [scale, setScale] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 1.15;
    }
    return 1.35;
  });

  const zoomIn = () => setScale((s) => Math.min(1.8, +(s + 0.15).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.9, +(s - 0.15).toFixed(2)));

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const resetAngle = () => {
    dragRotation.current = { x: 0, y: 0 };
    setScale(typeof window !== 'undefined' && window.innerWidth < 640 ? 1.15 : 1.35);
  };

  const toggleSound = () => {
    const muted = keyboardAudio.toggleMute();
    setIsMuted(muted);
  };

  const triggerRandomKey = () => {
    const random = skills[Math.floor(Math.random() * skills.length)];
    handleSelectKey(random);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between w-full gap-4 px-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">
            <KeyboardIcon className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              3D Mechanical Keyboard
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                24 Keys • Freely Floating 3D
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Move cursor to adjust viewing angle • Hover keycaps for tactile audio • Type Q–N
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom In & Zoom Out Controls */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-0.5 shadow-sm">
            <button
              onClick={zoomOut}
              disabled={scale <= 0.9}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800/60 transition-colors"
              title="Decrease keyboard size"
              aria-label="Decrease keyboard size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-medium px-2 text-cyan-400 select-none min-w-[38px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={scale >= 1.8}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800/60 transition-colors"
              title="Increase keyboard size"
              aria-label="Increase keyboard size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={resetAngle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors active:scale-95 shadow-sm"
            title="Reset to default isometric angle and size"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={triggerRandomKey}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors active:scale-95 shadow-sm"
            title="Random keycap trigger"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Random Key</span>
          </button>

          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1.5 shadow-sm ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
            }`}
            title={isMuted ? 'Unmute mechanical audio' : 'Mute mechanical audio'}
            aria-label="Toggle mechanical switch audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px] font-mono">
              {isMuted ? 'Muted' : 'Tactile SFX'}
            </span>
          </button>
        </div>
      </div>

      {/* Freely Floating 3D WebGL Canvas (Outer box removed, enlarged view) */}
      <div 
        className="w-full relative h-[480px] sm:h-[560px] lg:h-[640px] touch-none select-none cursor-grab active:cursor-grabbing flex items-center justify-center overflow-visible"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Canvas
          shadows
          camera={{ position: [-8.5, 9.0, 8.5], fov: 36 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
          onCreated={({ gl, camera }) => {
            camera.lookAt(0, 0.45, 0);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          {/* Studio Lighting matching Chibi product preset */}
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[-6, 8, -3]}
            intensity={2.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.001}
          />
          <directionalLight position={[4, 6, 6]} intensity={0.25} />

          {/* Dynamic theme accent light */}
          <pointLight
            color={
              theme === 'dusky' ? '#f97316' :
              theme === 'light' ? '#2563eb' :
              theme === 'ambient' ? '#10b981' :
              theme === 'sand' ? '#d97706' :
              '#06b6d4'
            }
            intensity={1.2}
            distance={20}
            position={[0, 4, 0]}
          />

          <Suspense fallback={<KeyboardFallback scale={scale} />}>
            <KeyboardDeck
              skills={skills}
              pressedSkillId={pressedSkillId}
              onSelectKey={handleSelectKey}
              dragRotation={dragRotation}
              scale={scale}
            />
          </Suspense>
        </Canvas>

        {/* Floating viewing angle helper pill */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/40 text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Move mouse to tilt viewing angle • Drag to freely orbit • Hover for tactile SFX</span>
        </div>
      </div>

      {/* Active Skill Inspector HUD */}
      {activeSkill && (
        <div className="w-full p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 text-left relative overflow-hidden transition-all duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              {/* 3D Keycap Color Badge */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 shadow-lg relative shrink-0 transition-colors"
                style={{
                  backgroundColor: activeSkill.keyboardColor || activeSkill.color,
                  boxShadow: `0 8px 20px -4px ${activeSkill.keyboardColor || activeSkill.color}70`,
                }}
              >
                <img
                  src={activeSkill.keyboardIcon || activeSkill.icon}
                  alt={activeSkill.label}
                  className="w-8 h-8 object-contain filter brightness-0 invert drop-shadow"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-extrabold text-white">
                    {activeSkill.label}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {activeSkill.level || 'Proficient'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                    [{activeSkill.shortcut ? activeSkill.shortcut.replace('Key', 'Key ') : ''}]
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Category: {activeSkill.category} • Color: {activeSkill.keyboardColor}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Matching Customizer Colors & Geometry</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeSkill.shortDescription}
            </p>
          </div>
        </div>
      )}

      {/* Guide Note */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        <span>Loaded with keycaps.glb model, React Three Fiber & Three.js. Realistic mechanical click audio on key press.</span>
      </div>
    </div>
  );
};
