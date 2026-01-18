import { BreathPhase } from '@/types';

// Voice cue phrases for each phase
export const phrasesForPhase: Record<BreathPhase, string[]> = {
  inhale: [
    'Breathe in through your nose',
    'Inhale slowly',
    'Breathe in',
    'Draw in a deep breath',
  ],
  'hold-in': [
    'Hold',
    'Hold your breath',
    'Pause and hold',
    'Retain the breath',
  ],
  exhale: [
    'Slowly exhale',
    'Breathe out',
    'Release the breath',
    'Exhale fully',
  ],
  'hold-out': [
    'Hold empty',
    'Stay empty',
    'Pause',
    'Wait',
  ],
  rest: [
    'Rest and breathe naturally',
    'Take a moment',
    'Relax',
  ],
};

// Voice synthesis instance
let synth: SpeechSynthesis | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

// Initialize speech synthesis
export function initVoice(): boolean {
  if (typeof window === 'undefined') return false;

  synth = window.speechSynthesis;
  return !!synth;
}

// Get available voices
export function getVoices(): SpeechSynthesisVoice[] {
  if (!synth) return [];
  return synth.getVoices();
}

// Get a preferred voice (calm, clear English voice)
export function getPreferredVoice(): SpeechSynthesisVoice | null {
  const voices = getVoices();

  // Prefer certain voice types for calm guidance
  const preferredNames = [
    'Samantha', // macOS
    'Karen',    // macOS
    'Daniel',   // macOS
    'Google UK English Female',
    'Google UK English Male',
    'Microsoft Zira',
    'Microsoft David',
  ];

  for (const name of preferredNames) {
    const voice = voices.find((v) => v.name.includes(name));
    if (voice) return voice;
  }

  // Fallback to first English voice
  const englishVoice = voices.find((v) => v.lang.startsWith('en'));
  return englishVoice || voices[0] || null;
}

// Speak a phrase
export function speak(
  text: string,
  options: {
    volume?: number;
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
  } = {}
): void {
  if (!synth) {
    initVoice();
  }

  if (!synth) return;

  // Cancel any current speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = getPreferredVoice();
  utterance.volume = options.volume ?? 0.8;
  utterance.rate = options.rate ?? 0.9; // Slightly slower for calm effect
  utterance.pitch = options.pitch ?? 1;

  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }

  currentUtterance = utterance;
  synth.speak(utterance);
}

// Speak a phase cue
export function speakPhaseCue(
  phase: BreathPhase,
  options: { volume?: number; customText?: string } = {}
): void {
  const text = options.customText || getRandomPhrase(phase);
  speak(text, { volume: options.volume });
}

// Get a random phrase for a phase
function getRandomPhrase(phase: BreathPhase): string {
  const phrases = phrasesForPhase[phase];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Stop speaking
export function stopSpeaking(): void {
  if (synth) {
    synth.cancel();
  }
  currentUtterance = null;
}

// Check if currently speaking
export function isSpeaking(): boolean {
  return synth?.speaking ?? false;
}

// Speak countdown
export function speakCountdown(seconds: number): void {
  if (seconds <= 5 && seconds > 0) {
    speak(seconds.toString(), { rate: 1.1 });
  }
}

// Speak cycle completion
export function speakCycleComplete(cycle: number, total: number): void {
  if (cycle < total) {
    speak(`Cycle ${cycle} complete`, { rate: 1 });
  } else {
    speak('Exercise complete. Well done.', { rate: 0.9 });
  }
}

// Speak exercise start
export function speakExerciseStart(exerciseName: string): void {
  speak(`Starting ${exerciseName}. Find a comfortable position.`, {
    rate: 0.85,
  });
}

// Speak transition between phases
export function speakTransition(
  fromPhase: BreathPhase,
  toPhase: BreathPhase
): void {
  speakPhaseCue(toPhase);
}

// Bell sound using Web Audio API
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

// Play a gentle bell/chime sound
export function playBell(volume: number = 0.3): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = 528; // Solfeggio frequency
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 1.5);
}

// Play a soft tick sound
export function playTick(volume: number = 0.1): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
}

// Cleanup audio resources
export function cleanupAudio(): void {
  stopSpeaking();
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
