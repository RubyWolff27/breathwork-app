import {
  UserProgress,
  BaselineMetrics,
  WeeklyMetrics,
  CompletedExercise,
  StateShiftLog,
  UserSettings,
} from '@/types';

const STORAGE_KEY = 'breathwork-progress';

// Default settings
const defaultSettings: UserSettings = {
  voiceEnabled: true,
  voiceVolume: 0.8,
  hapticFeedback: true,
  reminderEnabled: false,
  theme: 'dark',
};

// Default baseline metrics
const defaultBaselineMetrics: BaselineMetrics = {
  boltScore: null,
  co2Tolerance: null,
  restingBreathRate: null,
  testedAt: null,
};

// Initialize default progress
const getDefaultProgress = (): UserProgress => ({
  currentDay: 0,
  startDate: new Date().toISOString(),
  completedExercises: [],
  baselineMetrics: defaultBaselineMetrics,
  weeklyMetrics: [],
  stateShiftLogs: [],
  settings: defaultSettings,
  onboardingCompleted: false,
  baselineCompleted: false,
});

// Check if running in browser
const isBrowser = typeof window !== 'undefined';

// Get user progress from localStorage
export function getProgress(): UserProgress {
  if (!isBrowser) return getDefaultProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UserProgress;
    }
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
  }

  return getDefaultProgress();
}

// Save user progress to localStorage
export function saveProgress(progress: UserProgress): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

// Update specific fields in progress
export function updateProgress(updates: Partial<UserProgress>): UserProgress {
  const current = getProgress();
  const updated = { ...current, ...updates };
  saveProgress(updated);
  return updated;
}

// Mark onboarding as completed
export function completeOnboarding(): void {
  updateProgress({ onboardingCompleted: true });
}

// Save baseline metrics
export function saveBaselineMetrics(metrics: BaselineMetrics): void {
  updateProgress({
    baselineMetrics: metrics,
    baselineCompleted: true,
    currentDay: 1,
    startDate: new Date().toISOString(),
  });
}

// Record a completed exercise
export function recordCompletedExercise(exercise: CompletedExercise): void {
  const progress = getProgress();
  const completedExercises = [...progress.completedExercises, exercise];
  updateProgress({ completedExercises });
}

// Check if exercise was completed today
export function isExerciseCompletedToday(exerciseId: string, day: number): boolean {
  const progress = getProgress();
  const today = new Date().toDateString();

  return progress.completedExercises.some(
    (ex) =>
      ex.exerciseId === exerciseId &&
      ex.day === day &&
      new Date(ex.completedAt).toDateString() === today
  );
}

// Get completed exercises for a specific day
export function getCompletedExercisesForDay(day: number): CompletedExercise[] {
  const progress = getProgress();
  return progress.completedExercises.filter((ex) => ex.day === day);
}

// Save weekly metrics
export function saveWeeklyMetrics(metrics: WeeklyMetrics): void {
  const progress = getProgress();
  const existingIndex = progress.weeklyMetrics.findIndex(
    (m) => m.week === metrics.week
  );

  let weeklyMetrics: WeeklyMetrics[];
  if (existingIndex >= 0) {
    weeklyMetrics = [...progress.weeklyMetrics];
    weeklyMetrics[existingIndex] = metrics;
  } else {
    weeklyMetrics = [...progress.weeklyMetrics, metrics];
  }

  updateProgress({ weeklyMetrics });
}

// Get weekly metrics for a specific week
export function getWeeklyMetrics(week: number): WeeklyMetrics | undefined {
  const progress = getProgress();
  return progress.weeklyMetrics.find((m) => m.week === week);
}

// Log a state-shift usage
export function logStateShift(log: StateShiftLog): void {
  const progress = getProgress();
  const stateShiftLogs = [...progress.stateShiftLogs, log];
  updateProgress({ stateShiftLogs });
}

// Update user settings
export function updateSettings(settings: Partial<UserSettings>): void {
  const progress = getProgress();
  const updatedSettings = { ...progress.settings, ...settings };
  updateProgress({ settings: updatedSettings });
}

// Get user settings
export function getSettings(): UserSettings {
  const progress = getProgress();
  return progress.settings;
}

// Advance to next day
export function advanceDay(): number {
  const progress = getProgress();
  const newDay = Math.min(progress.currentDay + 1, 30);
  updateProgress({ currentDay: newDay });
  return newDay;
}

// Get current day
export function getCurrentDay(): number {
  const progress = getProgress();
  return progress.currentDay;
}

// Calculate actual current day based on start date
export function calculateCurrentDay(): number {
  const progress = getProgress();
  if (!progress.startDate || !progress.baselineCompleted) return 0;

  const start = new Date(progress.startDate);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return Math.min(Math.max(diffDays, 1), 30);
}

// Reset all progress
export function resetProgress(): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

// Export progress data as JSON
export function exportProgress(): string {
  const progress = getProgress();
  return JSON.stringify(progress, null, 2);
}

// Import progress data from JSON
export function importProgress(jsonData: string): boolean {
  try {
    const progress = JSON.parse(jsonData) as UserProgress;
    saveProgress(progress);
    return true;
  } catch (error) {
    console.error('Error importing progress:', error);
    return false;
  }
}
