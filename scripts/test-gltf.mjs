import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const buf = fs.readFileSync('public/assets/keyboard/keycaps.glb');
const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(arrayBuffer, '', (gltf) => {
  console.log('Scene parsed successfully!');
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.geometry.computeBoundingBox();
      const bb = obj.geometry.boundingBox;
      console.log(`Mesh: "${obj.name}", vertices: ${obj.geometry.attributes.position.count}, BBox: min(${bb.min.x.toFixed(2)}, ${bb.min.y.toFixed(2)}, ${bb.min.z.toFixed(2)}) max(${bb.max.x.toFixed(2)}, ${bb.max.y.toFixed(2)}, ${bb.max.z.toFixed(2)})`);
    }
  });
}, (err) => {
  console.error('Parse error:', err);
});
