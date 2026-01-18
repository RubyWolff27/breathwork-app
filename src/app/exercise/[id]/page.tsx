'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Check } from 'lucide-react';
import BreathingCircle from '@/components/BreathingCircle';
import Timer from '@/components/Timer';
import { useBreathingTimer } from '@/hooks/useBreathingTimer';
import { useVoiceCues } from '@/hooks/useVoiceCues';
import { useProgress } from '@/hooks/useProgress';
import { getExercise } from '@/lib/exercises';
import { Exercise, BreathPhase } from '@/types';

type ExerciseState = 'intro' | 'active' | 'complete';

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const exerciseId = params.id as string;
  const dayParam = searchParams.get('day');
  const day = dayParam ? parseInt(dayParam, 10) : undefined;

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [exerciseState, setExerciseState] = useState<ExerciseState>('intro');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const { progress, recordExercise } = useProgress();

  useEffect(() => {
    const ex = getExercise(exerciseId);
    if (ex) {
      setExercise(ex);
    }
  }, [exerciseId]);

  useEffect(() => {
    if (progress?.settings) {
      setVoiceEnabled(progress.settings.voiceEnabled);
    }
  }, [progress]);

  const handlePhaseChange = useCallback((phase: BreathPhase) => {
    if (voiceEnabled) {
      voiceCues.announcePhase(phase);
    }
  }, [voiceEnabled]);

  const handleCycleComplete = useCallback((cycle: number) => {
    if (voiceEnabled) {
      voiceCues.playTransitionBell();
    }
  }, [voiceEnabled]);

  const handleExerciseComplete = useCallback(() => {
    setExerciseState('complete');
    if (voiceEnabled) {
      voiceCues.announceExerciseComplete();
    }

    // Record completion
    if (exercise) {
      recordExercise({
        exerciseId: exercise.id,
        day: day || progress?.currentDay || 1,
        completedAt: new Date().toISOString(),
        duration: timer.elapsed,
        cyclesCompleted: exercise.cycles,
      });
    }
  }, [exercise, day, progress, voiceEnabled]);

  const timer = useBreathingTimer({
    pattern: exercise?.pattern || { inhale: 4, exhale: 4 },
    totalCycles: exercise?.cycles || 10,
    onPhaseChange: handlePhaseChange,
    onCycleComplete: handleCycleComplete,
    onComplete: handleExerciseComplete,
  });

  const voiceCues = useVoiceCues({
    enabled: voiceEnabled,
    volume: progress?.settings?.voiceVolume || 0.8,
  });

  const handleStart = () => {
    setExerciseState('active');
    if (voiceEnabled && exercise) {
      voiceCues.announceExerciseStart(exercise.name);
      setTimeout(() => {
        timer.start();
        voiceCues.announcePhase('inhale');
      }, 3000);
    } else {
      timer.start();
    }
  };

  const handleTogglePlayPause = () => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  const handleReset = () => {
    timer.reset();
    setExerciseState('intro');
  };

  const handleFinish = () => {
    router.back();
  };

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-breath-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-breath-bg to-[#0f172a]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 relative z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        <AnimatePresence mode="wait">
          {exerciseState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-sm"
            >
              <h1 className="text-2xl font-bold text-breath-text mb-2">
                {exercise.name}
              </h1>
              <p className="text-breath-muted mb-6">{exercise.description}</p>

              <div className="bg-breath-card rounded-2xl p-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-breath-text mb-2">Pattern</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-breath-muted">Inhale:</span>
                    <span className="text-breath-text">{exercise.pattern.inhale}s</span>
                  </div>
                  {exercise.pattern.holdIn && (
                    <div className="flex justify-between">
                      <span className="text-breath-muted">Hold:</span>
                      <span className="text-breath-text">{exercise.pattern.holdIn}s</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-breath-muted">Exhale:</span>
                    <span className="text-breath-text">{exercise.pattern.exhale}s</span>
                  </div>
                  {exercise.pattern.holdOut && (
                    <div className="flex justify-between">
                      <span className="text-breath-muted">Hold:</span>
                      <span className="text-breath-text">{exercise.pattern.holdOut}s</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-sm">
                  <span className="text-breath-muted">Cycles:</span>
                  <span className="text-breath-text">{exercise.cycles}</span>
                </div>
              </div>

              {exercise.specialInstructions && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6 text-left">
                  <p className="text-amber-400 text-sm">{exercise.specialInstructions}</p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Begin Exercise
              </motion.button>
            </motion.div>
          )}

          {exerciseState === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <BreathingCircle
                phase={timer.currentPhase}
                duration={timer.phaseDuration}
                isActive={timer.isRunning}
                size={280}
              />

              <div className="mt-8 mb-4">
                <Timer
                  seconds={Math.ceil(timer.phaseTimeRemaining)}
                  isActive={timer.isRunning}
                  size="lg"
                  showLabel={false}
                />
              </div>

              <div className="text-breath-muted text-sm mb-8">
                Cycle {timer.currentCycle} of {timer.totalCycles}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <RotateCcw size={24} />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTogglePlayPause}
                  className="w-20 h-20 rounded-full bg-breath-primary flex items-center justify-center"
                >
                  {timer.isRunning ? (
                    <Pause size={32} fill="white" />
                  ) : (
                    <Play size={32} fill="white" className="ml-1" />
                  )}
                </motion.button>
                <div className="w-14 h-14" /> {/* Spacer for symmetry */}
              </div>
            </motion.div>
          )}

          {exerciseState === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <Check size={48} className="text-emerald-400" />
              </motion.div>

              <h2 className="text-2xl font-bold text-breath-text mb-2">
                Well Done!
              </h2>
              <p className="text-breath-muted mb-2">
                You completed {exercise.name}
              </p>
              <p className="text-sm text-breath-muted mb-8">
                {timer.totalCycles} cycles · {Math.floor(timer.elapsed / 60)}m {Math.floor(timer.elapsed % 60)}s
              </p>

              <div className="space-y-3 max-w-xs mx-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinish}
                  className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white"
                >
                  Continue
                </motion.button>
                <button
                  onClick={handleReset}
                  className="w-full py-4 bg-white/10 rounded-2xl font-semibold text-breath-text"
                >
                  Repeat Exercise
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom safe area */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
