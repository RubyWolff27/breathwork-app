'use client';

import { useEffect, useCallback, useRef } from 'react';
import { BreathPhase } from '@/types';
import {
  initVoice,
  speakPhaseCue,
  speakCycleComplete,
  speakExerciseStart,
  stopSpeaking,
  playBell,
} from '@/lib/audio';

interface UseVoiceCuesProps {
  enabled: boolean;
  volume: number;
}

interface UseVoiceCuesReturn {
  announcePhase: (phase: BreathPhase, customText?: string) => void;
  announceCycleComplete: (cycle: number, total: number) => void;
  announceExerciseStart: (exerciseName: string) => void;
  announceExerciseComplete: () => void;
  playTransitionBell: () => void;
  stop: () => void;
}

export function useVoiceCues({
  enabled,
  volume,
}: UseVoiceCuesProps): UseVoiceCuesReturn {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (enabled && !initializedRef.current) {
      initVoice();
      initializedRef.current = true;
    }

    return () => {
      stopSpeaking();
    };
  }, [enabled]);

  const announcePhase = useCallback(
    (phase: BreathPhase, customText?: string) => {
      if (!enabled) return;
      speakPhaseCue(phase, { volume, customText });
    },
    [enabled, volume]
  );

  const announceCycleComplete = useCallback(
    (cycle: number, total: number) => {
      if (!enabled) return;
      speakCycleComplete(cycle, total);
    },
    [enabled]
  );

  const announceExerciseStart = useCallback(
    (exerciseName: string) => {
      if (!enabled) return;
      speakExerciseStart(exerciseName);
    },
    [enabled]
  );

  const announceExerciseComplete = useCallback(() => {
    if (!enabled) return;
    playBell(volume * 0.5);
    setTimeout(() => {
      speakCycleComplete(1, 1); // Triggers "Exercise complete" message
    }, 500);
  }, [enabled, volume]);

  const playTransitionBell = useCallback(() => {
    if (!enabled) return;
    playBell(volume * 0.3);
  }, [enabled, volume]);

  const stop = useCallback(() => {
    stopSpeaking();
  }, []);

  return {
    announcePhase,
    announceCycleComplete,
    announceExerciseStart,
    announceExerciseComplete,
    playTransitionBell,
    stop,
  };
}
