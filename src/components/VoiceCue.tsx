'use client';

import { useEffect, useRef } from 'react';
import { BreathPhase } from '@/types';
import { speakPhaseCue, stopSpeaking, playBell } from '@/lib/audio';

interface VoiceCueProps {
  phase: BreathPhase;
  enabled: boolean;
  volume: number;
  onPhaseChange?: boolean;
  customText?: string;
}

export default function VoiceCue({
  phase,
  enabled,
  volume,
  onPhaseChange,
  customText,
}: VoiceCueProps) {
  const lastPhaseRef = useRef<BreathPhase | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Only speak when phase changes
    if (onPhaseChange && phase !== lastPhaseRef.current) {
      lastPhaseRef.current = phase;

      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        speakPhaseCue(phase, { volume, customText });

        // Play bell on certain transitions
        if (phase === 'inhale') {
          playBell(volume * 0.3);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [phase, enabled, volume, onPhaseChange, customText]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // This is a non-visual component
  return null;
}
