'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { BreathPhase, BreathPattern, TimerState } from '@/types';

interface UseBreathingTimerProps {
  pattern: BreathPattern;
  totalCycles: number;
  onPhaseChange?: (phase: BreathPhase) => void;
  onCycleComplete?: (cycle: number) => void;
  onComplete?: () => void;
}

interface UseBreathingTimerReturn extends TimerState {
  start: () => void;
  pause: () => void;
  reset: () => void;
  phaseDuration: number;
}

export function useBreathingTimer({
  pattern,
  totalCycles,
  onPhaseChange,
  onCycleComplete,
  onComplete,
}: UseBreathingTimerProps): UseBreathingTimerReturn {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale');
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(pattern.inhale);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [elapsed, setElapsed] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get the phases in order based on pattern
  const getPhaseSequence = useCallback((): BreathPhase[] => {
    const phases: BreathPhase[] = ['inhale'];
    if (pattern.holdIn && pattern.holdIn > 0) phases.push('hold-in');
    phases.push('exhale');
    if (pattern.holdOut && pattern.holdOut > 0) phases.push('hold-out');
    return phases;
  }, [pattern]);

  // Get duration for a specific phase
  const getPhaseDuration = useCallback(
    (phase: BreathPhase): number => {
      switch (phase) {
        case 'inhale':
          return pattern.inhale;
        case 'hold-in':
          return pattern.holdIn || 0;
        case 'exhale':
          return pattern.exhale;
        case 'hold-out':
          return pattern.holdOut || 0;
        default:
          return 0;
      }
    },
    [pattern]
  );

  // Get next phase
  const getNextPhase = useCallback((): { phase: BreathPhase; isNewCycle: boolean } => {
    const sequence = getPhaseSequence();
    const currentIndex = sequence.indexOf(currentPhase);
    const nextIndex = (currentIndex + 1) % sequence.length;
    const isNewCycle = nextIndex === 0;

    return {
      phase: sequence[nextIndex],
      isNewCycle,
    };
  }, [currentPhase, getPhaseSequence]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setPhaseTimeRemaining((prev) => {
        if (prev <= 0.1) {
          // Phase complete, move to next
          const { phase: nextPhase, isNewCycle } = getNextPhase();

          if (isNewCycle) {
            const newCycle = currentCycle + 1;

            if (newCycle > totalCycles) {
              // All cycles complete
              setIsRunning(false);
              onComplete?.();
              return 0;
            }

            setCurrentCycle(newCycle);
            onCycleComplete?.(currentCycle);
          }

          setCurrentPhase(nextPhase);
          onPhaseChange?.(nextPhase);
          return getPhaseDuration(nextPhase);
        }

        return prev - 0.1;
      });

      setElapsed((prev) => prev + 0.1);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isRunning,
    currentCycle,
    totalCycles,
    getNextPhase,
    getPhaseDuration,
    onPhaseChange,
    onCycleComplete,
    onComplete,
  ]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentPhase('inhale');
    setPhaseTimeRemaining(pattern.inhale);
    setCurrentCycle(1);
    setElapsed(0);
  }, [pattern.inhale]);

  return {
    isRunning,
    currentPhase,
    phaseTimeRemaining,
    currentCycle,
    totalCycles,
    elapsed,
    phaseDuration: getPhaseDuration(currentPhase),
    start,
    pause,
    reset,
  };
}
