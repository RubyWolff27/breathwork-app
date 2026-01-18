'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  UserProgress,
  CompletedExercise,
  WeeklyMetrics,
  StateShiftLog,
  BaselineMetrics,
  UserSettings,
} from '@/types';
import {
  getProgress,
  saveProgress,
  recordCompletedExercise as saveCompletedExercise,
  saveWeeklyMetrics as persistWeeklyMetrics,
  logStateShift as persistStateShift,
  updateSettings as persistSettings,
  saveBaselineMetrics as persistBaseline,
  completeOnboarding as markOnboardingComplete,
  resetProgress as clearProgress,
  calculateCurrentDay,
  getCompletedExercisesForDay,
} from '@/lib/storage';

interface UseProgressReturn {
  progress: UserProgress | null;
  isLoading: boolean;
  currentDay: number;
  completedToday: CompletedExercise[];
  recordExercise: (exercise: CompletedExercise) => void;
  saveWeeklyMetrics: (metrics: WeeklyMetrics) => void;
  logStateShift: (log: StateShiftLog) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  saveBaseline: (metrics: BaselineMetrics) => void;
  completeOnboarding: () => void;
  resetProgress: () => void;
  refreshProgress: () => void;
}

export function useProgress(): UseProgressReturn {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(() => {
    const stored = getProgress();
    setProgress(stored);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const currentDay = progress?.baselineCompleted ? calculateCurrentDay() : 0;
  const completedToday = progress ? getCompletedExercisesForDay(currentDay) : [];

  const recordExercise = useCallback((exercise: CompletedExercise) => {
    saveCompletedExercise(exercise);
    loadProgress();
  }, [loadProgress]);

  const saveWeeklyMetrics = useCallback((metrics: WeeklyMetrics) => {
    persistWeeklyMetrics(metrics);
    loadProgress();
  }, [loadProgress]);

  const logStateShift = useCallback((log: StateShiftLog) => {
    persistStateShift(log);
    loadProgress();
  }, [loadProgress]);

  const updateSettings = useCallback((settings: Partial<UserSettings>) => {
    persistSettings(settings);
    loadProgress();
  }, [loadProgress]);

  const saveBaseline = useCallback((metrics: BaselineMetrics) => {
    persistBaseline(metrics);
    loadProgress();
  }, [loadProgress]);

  const completeOnboarding = useCallback(() => {
    markOnboardingComplete();
    loadProgress();
  }, [loadProgress]);

  const resetProgress = useCallback(() => {
    clearProgress();
    loadProgress();
  }, [loadProgress]);

  const refreshProgress = useCallback(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    progress,
    isLoading,
    currentDay,
    completedToday,
    recordExercise,
    saveWeeklyMetrics,
    logStateShift,
    updateSettings,
    saveBaseline,
    completeOnboarding,
    resetProgress,
    refreshProgress,
  };
}
