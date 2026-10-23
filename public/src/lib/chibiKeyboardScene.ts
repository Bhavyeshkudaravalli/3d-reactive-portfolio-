/**
 * Chibi 3D Keyboard Scene Generator
 * 
 * Generates a ChibiDocument compatible with @chibi3d/runtime and the Chibi keycaps kit.
 */
import {
  createDocument,
  createMaterial,
  newId,
} from '@chibi3d/runtime';
import { SKILLS_LIST } from '../data/constants';

export const KEYBOARD_MODEL_URL = '/assets/keyboard/keycaps.glb';

export function createChibiKeyboardDocument(skills = SKILLS_LIST, columns = 6) {
  const cols = Math.min(columns, skills.length);
  const rows = Math.ceil(skills.length / cols);
  
  const doc = createDocument('Portfolio Skills Keyboard');
  doc.root = [];
  doc.nodes = {};
  doc.materials = {};
  
  doc.environment = {
    ...doc.environment,
    preset: 'studio',
    shadows: true,
    softShadows: true,
    exposure: 1.0,
    toneMapping: 'linear',
  };

  doc.camera = {
    position: [0, 8.5, 12.5],
    target: [0, -0.2, 0],
    fov: 38,
    parallax: 0.15,
  };

  const assetId = newId('as');
  doc.assets[assetId] = {
    id: assetId,
    kind: 'glb',
    name: 'keycaps.glb',
    hash: 'bhavyesh-3d-keyboard-keycaps',
    size: 204284,
  };

  const caseMatId = newId('mt');
  doc.materials[caseMatId] = {
    ...createMaterial(caseMatId, 'Keyboard Case'),
    color: '#0f172a',
    roughness: 0.45,
    metalness: 0.6,
  };

  const keys = skills.map((skill) => {
    const matId = newId('mt');
    doc.materials[matId] = {
      ...createMaterial(matId, `Key ${skill.name}`),
      color: skill.keyboardColor || skill.color,
      roughness: 0.35,
      metalness: 0.15,
    };
    return {
      skill,
      materialId: matId,
      shortcut: skill.shortcut,
    };
  });

  return {
    document: doc,
    keys,
    cols,
    rows,
  };
}
