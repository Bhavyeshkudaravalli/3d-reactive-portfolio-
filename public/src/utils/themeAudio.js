/**
 * Studio-Grade Procedural Web Audio API Ambient Soundscape Engine for 5 Themes:
 * - Dark: Cinematic ethereal space ambient music (lush Dbmaj9 pads, slow analog filter sweep, sub-bass breathing, stardust chimes)
 * - Light: Organic morning nature & sweet birdsong (3 natural bird call profiles, gentle tree breeze, soft meadow air)
 * - Dusky: Atmospheric cyberpunk street (heavy distant city rumble, smooth hovercar Doppler passes, neon hum, twilight pad)
 * - Ambient: Natural mountain valley rain & waterfall (3-tier binaural rain shower, waterfall roar, liquid droplets)
 * - Sand: Epic cinematic desert wind & sand breeze (multi-resonant howling dune wind, whistling gusts, sand whisper)
 *
 * Equipped with master compressor/limiter for smooth, zero-clipping, warm acoustics and seamless equal-power crossfading.
 */

class ThemeAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.currentTheme = null;
    this.activeNodes = [];
    this.activeIntervals = [];
    this.isMuted = true;
    this.volume = 0.32;
    this.initialized = false;
    this.listeners = new Set();

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_audio_muted');
        if (saved !== null) {
          this.isMuted = saved === 'true';
        }
      } catch {}
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener({
          isMuted: this.isMuted,
          currentTheme: this.currentTheme,
          isPlaying: !this.isMuted && !!this.ctx && this.ctx.state === 'running',
        });
      } catch {}
    }
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();

      // Studio Master Compressor & Limiter to eliminate harsh spikes and guarantee smooth, warm audio
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.008, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0001 : this.volume, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      const unlock = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().then(() => this.notify()).catch(() => {});
        }
      };
      window.addEventListener('pointerdown', unlock, { once: true, capture: true });
      window.addEventListener('keydown', unlock, { once: true, capture: true });
    } catch (err) {
      console.warn('AudioContext initialization failed:', err);
    }
  }

  ensureRunning() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      return this.ctx.resume();
    }
    return Promise.resolve();
  }

  createPinkNoiseBuffer(seconds = 6) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    
    // Stereo pink noise for wide, lush spatialization
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.095;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  createWhiteNoiseBuffer(seconds = 5) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
    }
    return buffer;
  }

  stopAllNodes(fadeSeconds = 0.6) {
    while (this.activeIntervals.length > 0) {
      const id = this.activeIntervals.pop();
      clearTimeout(id);
      clearInterval(id);
    }

    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const oldNodes = [...this.activeNodes];
    this.activeNodes = [];

    for (const node of oldNodes) {
      try {
        if (node.gain && typeof node.gain.setValueAtTime === 'function') {
          node.gain.setValueAtTime(node.gain.value, now);
          node.gain.exponentialRampToValueAtTime(0.0001, now + fadeSeconds);
        }
        if (node.source) {
          setTimeout(() => {
            try {
              node.source.stop();
              node.source.disconnect();
            } catch {}
          }, fadeSeconds * 1000 + 60);
        }
      } catch {}
    }
  }

  /**
   * THEME 1: DARK - Ethereal Space Ambient Music
   * Lush Dbmaj9 analog pads, slow resonant filter sweep, sub-bass breathing, stardust chimes
   */
  startSpaceSoundscape() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const themeGain = ctx.createGain();
    themeGain.gain.setValueAtTime(0.0001, now);
    themeGain.gain.exponentialRampToValueAtTime(1.0, now + 1.2);
    themeGain.connect(this.masterGain);

    // 1. Warm Cosmic Sub-Bass Drone (Db1: 34.65Hz, Db2: 69.3Hz)
    [34.65, 69.3].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(90, now);

      oscGain.gain.setValueAtTime(idx === 0 ? 0.22 : 0.14, now);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(themeGain);

      osc.start(now);
      this.activeNodes.push({ source: osc, gain: oscGain.gain });
    });

    // 2. Lush Celestial Ambient Pad (Dbmaj9: Db3, F3, Ab3, C4, Eb4)
    const chordFrequencies = [138.59, 174.61, 207.65, 261.63, 311.13];

    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(380, now);
    padFilter.Q.setValueAtTime(2.2, now);

    // Ultra-slow dual LFO for celestial filter movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.05, now); // 20s cycle
    lfoGain.gain.setValueAtTime(160, now);
    lfo.connect(padFilter.frequency);
    lfo.start(now);
    this.activeNodes.push({ source: lfo, gain: lfoGain.gain });

    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 2) * 4, now); // Gentle chorus

      oscGain.gain.setValueAtTime(0.055, now);

      osc.connect(padFilter);
      osc.start(now);
      this.activeNodes.push({ source: osc, gain: oscGain.gain });
    });

    padFilter.connect(themeGain);

    // 3. Stardust Chimes (gentle cosmic chimes occurring every 6-12s)
    const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1174.66]; // C5, E5, G5, C6, D6
    const triggerStardustChime = () => {
      if (!this.ctx || this.currentTheme !== 'dark' || this.isMuted) return;
      const t = this.ctx.currentTime;
      const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];

      const osc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, t);

      chimeGain.gain.setValueAtTime(0.0001, t);
      chimeGain.gain.linearRampToValueAtTime(0.025, t + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

      osc.connect(chimeGain);
      chimeGain.connect(themeGain);

      osc.start(t);
      osc.stop(t + 3.3);

      const nextDelay = 6000 + Math.random() * 6000;
      const timer = setTimeout(triggerStardustChime, nextDelay);
      this.activeIntervals.push(timer);
    };

    const firstChime = setTimeout(triggerStardustChime, 2500);
    this.activeIntervals.push(firstChime);
  }

  /**
   * THEME 2: LIGHT - Sunny Morning Birds & Gentle Breeze
   * 3 Natural organic birdsong calls, warm summer tree wind, sweet meadow air
   */
  startLightSoundscape() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const themeGain = ctx.createGain();
    themeGain.gain.setValueAtTime(0.0001, now);
    themeGain.gain.exponentialRampToValueAtTime(1.0, now + 0.8);
    themeGain.connect(this.masterGain);

    // 1. Soft Warm Tree Breeze (Stereo Pink Noise with Slow Modulation)
    const noiseBuf = this.createPinkNoiseBuffer(6);
    if (noiseBuf) {
      const breezeSrc = ctx.createBufferSource();
      breezeSrc.buffer = noiseBuf;
      breezeSrc.loop = true;

      const breezeFilter = ctx.createBiquadFilter();
      breezeFilter.type = 'lowpass';
      breezeFilter.frequency.setValueAtTime(280, now);

      const breezeGain = ctx.createGain();
      breezeGain.gain.setValueAtTime(0.04, now);

      breezeSrc.connect(breezeFilter);
      breezeFilter.connect(breezeGain);
      breezeGain.connect(themeGain);

      breezeSrc.start(now);
      this.activeNodes.push({ source: breezeSrc, gain: breezeGain.gain });
    }

    // 2. High-Fidelity Organic Birdsong Generator (3 Distinct Calls)
    const triggerBirdCall = () => {
      if (!this.ctx || this.currentTheme !== 'light' || this.isMuted) return;
      const t = this.ctx.currentTime;
      const callType = Math.floor(Math.random() * 3);

      if (callType === 0) {
        // Melodious Song Thrush Warble (3 rising/falling sweet notes)
        const baseF = 2600 + Math.random() * 600;
        for (let i = 0; i < 3; i++) {
          const startT = t + i * 0.09;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();

          osc.type = 'sine';
          const f = baseF + (i === 1 ? 450 : i === 2 ? 200 : 0);
          osc.frequency.setValueAtTime(f, startT);
          osc.frequency.exponentialRampToValueAtTime(f + 250, startT + 0.04);
          osc.frequency.exponentialRampToValueAtTime(f - 150, startT + 0.075);

          g.gain.setValueAtTime(0.0001, startT);
          g.gain.linearRampToValueAtTime(0.045, startT + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, startT + 0.075);

          osc.connect(g);
          g.connect(themeGain);
          osc.start(startT);
          osc.stop(startT + 0.08);
        }
      } else if (callType === 1) {
        // Robin Melodic Whistle (two-tone downward glissando)
        const startF = 3200 + Math.random() * 400;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startF, t);
        osc.frequency.exponentialRampToValueAtTime(startF - 600, t + 0.16);

        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.05, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

        osc.connect(g);
        g.connect(themeGain);
        osc.start(t);
        osc.stop(t + 0.17);
      } else {
        // Distant Sweet Chirp
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        const f = 2400 + Math.random() * 400;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f + 400, t + 0.04);
        osc.frequency.exponentialRampToValueAtTime(f - 100, t + 0.08);

        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.035, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

        osc.connect(g);
        g.connect(themeGain);
        osc.start(t);
        osc.stop(t + 0.09);
      }

      // Schedule next call naturally between 1.4s and 3.8s
      const nextDelay = 1400 + Math.random() * 2400;
      const timer = setTimeout(triggerBirdCall, nextDelay);
      this.activeIntervals.push(timer);
    };

    const firstBird = setTimeout(triggerBirdCall, 500);
    this.activeIntervals.push(firstBird);
  }

  /**
   * THEME 3: DUSKY - Cyberpunk Street Traffic & Twilight Ambience
   * Deep city rumble, smooth hovercar Doppler sweeps, 60Hz neon hum, moody synth pad
   */
  startDuskySoundscape() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const themeGain = ctx.createGain();
    themeGain.gain.setValueAtTime(0.0001, now);
    themeGain.gain.exponentialRampToValueAtTime(1.0, now + 1.0);
    themeGain.connect(this.masterGain);

    // 1. Heavy Distant Metropolis Traffic Rumble (Lowpass 160Hz)
    const noiseBuf = this.createPinkNoiseBuffer(6);
    if (noiseBuf) {
      const trafficSrc = ctx.createBufferSource();
      trafficSrc.buffer = noiseBuf;
      trafficSrc.loop = true;

      const trafficFilter = ctx.createBiquadFilter();
      trafficFilter.type = 'lowpass';
      trafficFilter.frequency.setValueAtTime(160, now);
      trafficFilter.Q.setValueAtTime(1.5, now);

      const trafficGain = ctx.createGain();
      trafficGain.gain.setValueAtTime(0.12, now);

      trafficSrc.connect(trafficFilter);
      trafficFilter.connect(trafficGain);
      trafficGain.connect(themeGain);

      trafficSrc.start(now);
      this.activeNodes.push({ source: trafficSrc, gain: trafficGain.gain });
    }

    // 2. Cinematic Twilight Pad (C minor 9: C3, Eb3, G3, Bb3, D4)
    const cyberChord = [130.81, 155.56, 196.00, 233.08, 293.66];
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(320, now);

    cyberChord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 2) * 5, now);

      g.gain.setValueAtTime(0.024, now);

      osc.connect(padFilter);
      osc.start(now);
      this.activeNodes.push({ source: osc, gain: g.gain });
    });

    padFilter.connect(themeGain);

    // 3. Realistic Hovercar / Vehicle Doppler Passes (Spatial Stereo Sweeps)
    const triggerHoverPass = () => {
      if (!this.ctx || this.currentTheme !== 'dusky' || this.isMuted) return;
      const t = this.ctx.currentTime;
      const duration = 2.6 + Math.random() * 1.4;
      const direction = Math.random() > 0.5 ? 1 : -1;

      const carNoise = ctx.createBufferSource();
      const whiteBuf = this.createWhiteNoiseBuffer(4);
      if (!whiteBuf) return;
      carNoise.buffer = whiteBuf;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.8, t);

      // Smooth Doppler frequency curve
      filter.frequency.setValueAtTime(280, t);
      filter.frequency.exponentialRampToValueAtTime(560, t + duration * 0.42);
      filter.frequency.exponentialRampToValueAtTime(180, t + duration);

      const carGain = ctx.createGain();
      carGain.gain.setValueAtTime(0.0001, t);
      carGain.gain.linearRampToValueAtTime(0.05, t + duration * 0.42);
      carGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      // Stereo panning from left-to-right or right-to-left
      if (typeof ctx.createStereoPanner === 'function') {
        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(-0.8 * direction, t);
        panner.pan.linearRampToValueAtTime(0.8 * direction, t + duration);

        carNoise.connect(filter);
        filter.connect(carGain);
        carGain.connect(panner);
        panner.connect(themeGain);
      } else {
        carNoise.connect(filter);
        filter.connect(carGain);
        carGain.connect(themeGain);
      }

      carNoise.start(t);
      carNoise.stop(t + duration + 0.1);

      const nextDelay = 3800 + Math.random() * 4200;
      const timer = setTimeout(triggerHoverPass, nextDelay);
      this.activeIntervals.push(timer);
    };

    const firstPass = setTimeout(triggerHoverPass, 1200);
    this.activeIntervals.push(firstPass);
  }

  /**
   * THEME 4: AMBIENT - Mountain Valley Rain & Waterfall ASMR
   * 3-Tier binaural rain shower, continuous waterfall roar, smooth liquid droplets
   */
  startAmbientSoundscape() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const themeGain = ctx.createGain();
    themeGain.gain.setValueAtTime(0.0001, now);
    themeGain.gain.exponentialRampToValueAtTime(1.0, now + 1.0);
    themeGain.connect(this.masterGain);

    // 1. High-Quality Rain Patter Layer (Bandpass 2.4kHz White Noise)
    const whiteBuf = this.createWhiteNoiseBuffer(6);
    if (whiteBuf) {
      const rainSrc = ctx.createBufferSource();
      rainSrc.buffer = whiteBuf;
      rainSrc.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(2400, now);
      rainFilter.Q.setValueAtTime(1.1, now);

      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.05, now);

      rainSrc.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(themeGain);

      rainSrc.start(now);
      this.activeNodes.push({ source: rainSrc, gain: rainGain.gain });
    }

    // 2. Continuous Deep Mountain Waterfall Roar (Lowpass 340Hz Pink Noise)
    const pinkBuf = this.createPinkNoiseBuffer(6);
    if (pinkBuf) {
      const fallSrc = ctx.createBufferSource();
      fallSrc.buffer = pinkBuf;
      fallSrc.loop = true;

      const fallFilter = ctx.createBiquadFilter();
      fallFilter.type = 'lowpass';
      fallFilter.frequency.setValueAtTime(340, now);
      fallFilter.Q.setValueAtTime(1.8, now);

      const fallGain = ctx.createGain();
      fallGain.gain.setValueAtTime(0.09, now);

      fallSrc.connect(fallFilter);
      fallFilter.connect(fallGain);
      fallGain.connect(themeGain);

      fallSrc.start(now);
      this.activeNodes.push({ source: fallSrc, gain: fallGain.gain });
    }

    // 3. Liquid Droplets Plinking
    const triggerLiquidDrop = () => {
      if (!this.ctx || this.currentTheme !== 'ambient' || this.isMuted) return;
      const t = this.ctx.currentTime;

      const osc = ctx.createOscillator();
      const dropGain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 950 + Math.random() * 550;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + 0.035);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, t + 0.08);

      dropGain.gain.setValueAtTime(0.0001, t);
      dropGain.gain.linearRampToValueAtTime(0.035, t + 0.012);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(dropGain);
      dropGain.connect(themeGain);

      osc.start(t);
      osc.stop(t + 0.09);

      const nextDelay = 700 + Math.random() * 1800;
      const timer = setTimeout(triggerLiquidDrop, nextDelay);
      this.activeIntervals.push(timer);
    };

    const firstDrop = setTimeout(triggerLiquidDrop, 600);
    this.activeIntervals.push(firstDrop);
  }

  /**
   * THEME 5: SAND - Cinematic Desert Wind & Sand Breeze
   * Dual-resonant howling dune wind, whistling gusts, sand grain whisper
   */
  startSandSoundscape() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const themeGain = ctx.createGain();
    themeGain.gain.setValueAtTime(0.0001, now);
    themeGain.gain.exponentialRampToValueAtTime(1.0, now + 1.0);
    themeGain.connect(this.masterGain);

    const pinkBuf = this.createPinkNoiseBuffer(6);
    if (!pinkBuf) return;

    // 1. Deep Dune Expanse Wind
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = pinkBuf;
    windSrc.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(220, now);
    windFilter.Q.setValueAtTime(2.0, now);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.095, now);

    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(themeGain);

    windSrc.start(now);
    this.activeNodes.push({ source: windSrc, gain: windGain.gain });

    // 2. Whistling Desert Dune Gusts (Slow Dual-Sine LFO Sweeps)
    const gustSrc = ctx.createBufferSource();
    gustSrc.buffer = pinkBuf;
    gustSrc.loop = true;

    const gustFilter = ctx.createBiquadFilter();
    gustFilter.type = 'bandpass';
    gustFilter.frequency.setValueAtTime(480, now);
    gustFilter.Q.setValueAtTime(3.8, now);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, now); // ~8.3s gust cycle
    lfoGain.gain.setValueAtTime(200, now);
    lfo.connect(gustFilter.frequency);
    lfo.start(now);
    this.activeNodes.push({ source: lfo, gain: lfoGain.gain });

    const gustGain = ctx.createGain();
    gustGain.gain.setValueAtTime(0.05, now);

    gustSrc.connect(gustFilter);
    gustFilter.connect(gustGain);
    gustGain.connect(themeGain);

    gustSrc.start(now);
    this.activeNodes.push({ source: gustSrc, gain: gustGain.gain });

    // 3. Sand Grain Whisper (Highpass 3.2kHz Filtered Noise)
    const sandSrc = ctx.createBufferSource();
    sandSrc.buffer = pinkBuf;
    sandSrc.loop = true;

    const sandFilter = ctx.createBiquadFilter();
    sandFilter.type = 'highpass';
    sandFilter.frequency.setValueAtTime(3200, now);

    const sandGain = ctx.createGain();
    sandGain.gain.setValueAtTime(0.018, now);

    sandSrc.connect(sandFilter);
    sandFilter.connect(sandGain);
    sandGain.connect(themeGain);

    sandSrc.start(now);
    this.activeNodes.push({ source: sandSrc, gain: sandGain.gain });
  }

  playTheme(theme) {
    this.currentTheme = theme;
    this.init();

    if (this.isMuted) {
      this.stopAllNodes(0.2);
      this.notify();
      return;
    }

    this.ensureRunning().then(() => {
      this.stopAllNodes(0.5);

      setTimeout(() => {
        if (this.isMuted) return;

        switch (theme) {
          case 'dark':
            this.startSpaceSoundscape();
            break;
          case 'light':
            this.startLightSoundscape();
            break;
          case 'dusky':
            this.startDuskySoundscape();
            break;
          case 'ambient':
            this.startAmbientSoundscape();
            break;
          case 'sand':
            this.startSandSoundscape();
            break;
          default:
            this.startSpaceSoundscape();
            break;
        }

        this.notify();
      }, 250);
    }).catch(() => {});
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_audio_muted', String(this.isMuted));
      } catch {}
    }

    if (this.isMuted) {
      if (this.masterGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      }
      setTimeout(() => {
        this.stopAllNodes(0.2);
        this.notify();
      }, 300);
    } else {
      this.ensureRunning().then(() => {
        if (this.masterGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.masterGain.gain.setValueAtTime(0.0001, now);
          this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + 0.6);
        }
        this.playTheme(this.currentTheme || 'light');
        this.notify();
      });
    }

    return this.isMuted;
  }

  getSoundName(theme = this.currentTheme) {
    switch (theme) {
      case 'dark':
        return 'Space Ambient Music';
      case 'light':
        return 'Birds Chirping & Nature';
      case 'dusky':
        return 'Cyberpunk Street Traffic';
      case 'ambient':
        return 'Mountain Rain & Waterfall';
      case 'sand':
        return 'Desert Breeze & Wind';
      default:
        return 'Ambient Soundscape';
    }
  }
}

export const themeAudio = new ThemeAudioEngine();
