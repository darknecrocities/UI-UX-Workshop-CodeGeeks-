/**
 * MechanicalSoundEngine v2 — Thick Thock / Thack / Tick
 *
 * Architecture per keypress:
 *   Layer 1 — Impact Transient: filtered white-noise burst (the plastic-on-PCB hit)
 *   Layer 2 — Resonant Body:   pitched sine with fast pitch drop (the housing resonance)
 *   Layer 3 — Harmonic Body:   triangle wave sub-harmonic (adds depth / fullness)
 *   Layer 4 — Top Plate Ring:  very brief high partial (gives the "clack" edge)
 *
 * Switch profiles:
 *   clicky  (Blue)   — sharp noise spike + tight mid ring + clean bottom-out clack
 *   tactile (Brown)  — softer bump noise + warm mid thack + gentle sub
 *   linear  (Red)    — full noise impact + deep low thock + long resonant tail
 */

export type SwitchType = 'clicky' | 'tactile' | 'linear';

class MechanicalSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private masterGain: GainNode | null = null;
  private currentSwitch: SwitchType = 'clicky';

  constructor() {}

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled && !this.ctx) this.initAudioContext();
  }

  public isEnabled(): boolean { return this.enabled; }

  public setSwitchType(type: SwitchType) {
    this.currentSwitch = type;
    this.playSwitchPress();
  }

  public getSwitchType(): SwitchType { return this.currentSwitch; }

  private initAudioContext() {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) {
        this.ctx = new AC();
        this.masterGain = this.ctx.createGain();
        // Higher master volume for punch
        this.masterGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch { /* AudioContext unavailable */ }
  }

  private ensureContext() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  /**
   * Layer 1: White-noise impact burst — creates the plasticky "thwack" transient
   */
  private playNoiseTransient(
    t: number,
    lpFreq: number,    // low-pass cutoff (lower = thockier)
    gainPeak: number,  // initial gain
    decay: number,     // seconds to decay to silence
    pitchMod: number
  ) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 0.1; // 100ms noise buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    // Low-pass filter shapes the colour of the impact
    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(lpFreq * pitchMod, t);
    lpf.Q.value = 1.2;

    // High-pass to remove sub-bass rumble (keeps it tight)
    const hpf = this.ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.setValueAtTime(60, t);
    hpf.Q.value = 0.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    source.connect(hpf);
    hpf.connect(lpf);
    lpf.connect(gain);
    gain.connect(this.masterGain);

    source.start(t);
    source.stop(t + decay + 0.01);
  }

  /**
   * Layer 2: Resonant pitched sine — the deep "thock" body resonance
   */
  private playResonantBody(
    t: number,
    startFreq: number,  // frequency at impact
    endFreq: number,    // frequency it drops to (pitch droop = thock character)
    pitchTime: number,  // how fast it droops
    gainPeak: number,
    decay: number,
    pitchMod: number
  ) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq * pitchMod, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq * pitchMod, t + pitchTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + decay + 0.01);
  }

  /**
   * Layer 3: Sub-harmonic triangle — adds the "thick" body weight
   */
  private playSubHarmonic(
    t: number,
    freq: number,
    gainPeak: number,
    decay: number,
    pitchMod: number
  ) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq * pitchMod, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6 * pitchMod, t + decay);

    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 400;
    lpf.Q.value = 0.7;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    osc.connect(lpf);
    lpf.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + decay + 0.01);
  }

  /**
   * Layer 4: Top-plate ring — the brief metallic "edge" on the attack
   */
  private playTopPlateRing(
    t: number,
    freq: number,
    gainPeak: number,
    decay: number,
    pitchMod: number
  ) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq * pitchMod, t);

    const hpf = this.ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = 800;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    osc.connect(hpf);
    hpf.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + decay + 0.005);
  }

  public playSwitchPress(pitchMod: number = 1.0) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Small random pitch variation per key — like real typing
    const jitter = 0.93 + Math.random() * 0.14;
    const pm = pitchMod * jitter;

    if (this.currentSwitch === 'linear') {
      // ─── RED LINEAR — DEEP THOCK ───────────────────────────────────────────
      // Full-spectrum noise transient (the thick plastic hit)
      this.playNoiseTransient(t, 900, 1.2, 0.055, pm);
      // Deep resonant body: low start, drops even lower → classic thock
      this.playResonantBody(t, 280, 70, 0.045, 0.7, 0.09, pm);
      // Warm sub harmonic for fullness
      this.playSubHarmonic(t, 140, 0.45, 0.10, pm);
      // Very subtle top ring — just a hint of edge
      this.playTopPlateRing(t, 1800, 0.06, 0.012, pm);

    } else if (this.currentSwitch === 'tactile') {
      // ─── BROWN TACTILE — WARM THACK ────────────────────────────────────────
      // Slightly tighter noise burst with higher LP cutoff
      this.playNoiseTransient(t, 1400, 0.9, 0.038, pm);
      // Mid-range resonance — the "thack" sits in a warmer register
      this.playResonantBody(t, 380, 110, 0.030, 0.6, 0.07, pm);
      // Sub harmonic — lighter than linear
      this.playSubHarmonic(t, 190, 0.30, 0.07, pm);
      // A touch more top-plate ring for the bump character
      this.playTopPlateRing(t, 2400, 0.09, 0.010, pm);

    } else {
      // ─── BLUE CLICKY — SHARP TICK-CLACK ────────────────────────────────────
      // Tight sharp noise spike — the leaf spring snap
      this.playNoiseTransient(t, 2400, 1.0, 0.018, pm);
      // The leaf-spring click ring (high mid)
      this.playTopPlateRing(t, 3200, 0.22, 0.014, pm);
      // Bottom-out clack arrives slightly after click
      this.playNoiseTransient(t + 0.010, 800, 0.7, 0.035, pm * 0.9);
      this.playResonantBody(t + 0.010, 320, 90, 0.035, 0.5, 0.07, pm * 0.9);
      // Sub harmonic for the clack weight
      this.playSubHarmonic(t + 0.010, 160, 0.25, 0.065, pm * 0.9);
    }
  }

  public playClick(pitchMultiplier: number = 1.0) {
    this.playSwitchPress(pitchMultiplier);
  }

  public playTap() {
    if (!this.enabled) return;
    // Softer / shorter — for slide nav
    this.playSwitchPress(0.80);
  }

  public playSwitch(state: boolean = true) {
    if (!this.enabled) return;
    this.playSwitchPress(state ? 1.10 : 0.78);
  }

  /**
   * Success — three quick mech taps ascending, like a satisfying keystroke run
   */
  public playSuccess() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    [1.0, 1.12, 1.25].forEach((pm, idx) => {
      setTimeout(() => this.playSwitchPress(pm), idx * 55);
    });
  }

  /**
   * Slop alert — harsh sawtooth buzz with tight overdrive
   */
  public playSlopAlert() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const waveshaper = this.ctx.createWaveShaper();
    const gain = this.ctx.createGain();

    // Generate soft-clip curve
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x));
    }
    waveshaper.curve = curve;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.12);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

    osc.connect(waveshaper);
    waveshaper.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  /**
   * XY canvas — continuous thock on drag
   */
  public playXY(xNorm: number, yNorm: number, velocity: number = 0) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    const baseFreq = this.currentSwitch === 'clicky' ? 340 : this.currentSwitch === 'tactile' ? 240 : 170;
    const freq = baseFreq + Math.max(0, Math.min(1, xNorm)) * 500;
    const vol = Math.min(0.28, 0.06 + Math.min(velocity, 40) * 0.005);

    // Quick noise hit + resonance for XY drag
    const bufSize = Math.ceil(this.ctx.sampleRate * 0.04);
    const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const src = this.ctx.createBufferSource();
    src.buffer = buffer;

    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = freq * 1.5;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.7, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.038);

    src.connect(lpf);
    lpf.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    src.start(t);
    src.stop(t + 0.04);

    const osc = this.ctx.createOscillator();
    osc.type = yNorm > 0.5 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.55, t + 0.04);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(vol * 0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.055);
  }
}

export const sound = new MechanicalSoundEngine();
