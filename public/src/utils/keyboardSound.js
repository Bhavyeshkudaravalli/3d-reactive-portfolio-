/**
 * Real mechanical keycap audio engine matching Naresh-Khatri/3d-portfolio
 * Loads decoded press.mp3 and release.mp3 buffers with procedural synth fallback.
 */
class MechanicalSwitchAudio {
  constructor() {
    this.audioCtx = null;
    this.buffers = {};
    this.isMuted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.audioCtx = new AudioContext();

      const unlock = () => {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }
      };
      window.addEventListener('pointerdown', unlock, { once: true, capture: true });
      window.addEventListener('keydown', unlock, { once: true, capture: true });

      // Preload real keycap audio files from /assets/keycap-sounds/
      ['press', 'release'].forEach(async (name) => {
        try {
          const res = await fetch(`/assets/keycap-sounds/${name}.mp3`);
          if (res.ok) {
            const arrayBuf = await res.arrayBuffer();
            const decoded = await this.audioCtx.decodeAudioData(arrayBuf);
            this.buffers[name] = decoded;
          }
        } catch {
          // fall back to procedural synth click
        }
      });
    } catch {
      // Audio context disabled
    }
  }

  playPress() {
    this.playSound('press');
  }

  playRelease() {
    this.playSound('release');
  }

  playClick() {
    this.playPress();
  }

  playHover() {
    if (this.isMuted) return;
    const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (this.lastHoverTime && nowMs - this.lastHoverTime < 50) return;
    this.lastHoverTime = nowMs;

    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Soft tactile mechanical micro-tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1350, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.022);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio policy
    }
  }

  playSound(type = 'press') {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }

    const buffer = this.buffers[type];
    if (buffer) {
      try {
        const source = this.audioCtx.createBufferSource();
        const gain = this.audioCtx.createGain();
        source.buffer = buffer;
        gain.gain.value = type === 'press' ? 0.45 : 0.35;
        source.connect(gain).connect(this.audioCtx.destination);
        source.onended = () => {
          source.disconnect();
          gain.disconnect();
        };
        source.start();
        return;
      } catch {
        // fall through to synth
      }
    }

    // Procedural tactile synth fallback
    this.playSynthClick(type);
  }

  playSynthClick(type) {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      const startFreq = type === 'press' ? 620 : 450;
      const endFreq = type === 'press' ? 140 : 180;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.035);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignored
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const keyboardAudio = new MechanicalSwitchAudio();
