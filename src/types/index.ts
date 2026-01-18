// Breathing phase types
export type BreathPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out' | 'rest';

// Exercise pattern defines the timing for each phase
export interface BreathPattern {
  inhale: number;       // seconds
  holdIn?: number;      // seconds (optional)
  exhale: number;       // seconds
  holdOut?: number;     // seconds (optional)
}

// Exercise difficulty/intensity
export type ExerciseIntensity = 'gentle' | 'moderate' | 'intense';

// Exercise category
export type ExerciseCategory =
  | 'foundation'
  | 'activation'
  | 'recovery'
  | 'focus'
  | 'sleep'
  | 'stress-relief'
  | 'performance';

// Main exercise definition
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  intensity: ExerciseIntensity;
  pattern: BreathPattern;
  cycles: number;           // number of breath cycles
  totalDuration: number;    // estimated duration in seconds
  instructions: string[];   // step-by-step instructions
  benefits: string[];       // list of benefits
  voiceCues: VoiceCue[];    // voice prompts during exercise
  specialInstructions?: string; // any special notes
}

// Voice cue for audio guidance
export interface VoiceCue {
  phase: BreathPhase;
  text: string;
  timing?: 'start' | 'middle' | 'end';
}

// Week theme in the 30-day program
export interface WeekTheme {
  week: number;
  name: string;
  focus: string;
  description: string;
}

// Daily schedule
export interface DaySchedule {
  day: number;
  week: number;
  theme: string;
  exercises: DayExercise[];
  notes?: string;
}

// Exercise reference in daily schedule
export interface DayExercise {
  exerciseId: string;
  timeOfDay: 'morning' | 'midday' | 'evening' | 'pre-sleep' | 'anytime';
  duration: number; // minutes
  optional?: boolean;
}

// User progress tracking
export interface UserProgress {
  currentDay: number;
  startDate: string;
  completedExercises: CompletedExercise[];
  baselineMetrics: BaselineMetrics;
  weeklyMetrics: WeeklyMetrics[];
  stateShiftLogs: StateShiftLog[];
  settings: UserSettings;
  onboardingCompleted: boolean;
  baselineCompleted: boolean;
}

// Completed exercise record
export interface CompletedExercise {
  exerciseId: string;
  day: number;
  completedAt: string;
  duration: number; // actual duration in seconds
  cyclesCompleted: number;
  notes?: string;
}

// Baseline metrics from Day 0 tests
export interface BaselineMetrics {
  boltScore: number | null;        // seconds
  co2Tolerance: number | null;     // seconds
  restingBreathRate: number | null; // breaths per minute
  testedAt: string | null;
}

// Weekly KPI tracking
export interface WeeklyMetrics {
  week: number;
  recordedAt: string;
  boltScore: number;
  co2Tolerance: number;
  restingBreathRate: number;
  sleepQuality: number;           // 1-10
  stressRecovery: number;         // 1-10
  focusDuration: number;          // 1-10
  energyLevels: number;           // 1-10
  notes?: string;
}

// State-shift toolkit log
export interface StateShiftLog {
  scenario: StateShiftScenario;
  exerciseId: string;
  usedAt: string;
  effectivenessRating?: number; // 1-5
  notes?: string;
}

// State-shift scenarios
export type StateShiftScenario =
  | 'pre-meeting'
  | 'energy-boost'
  | 'post-workout'
  | 'sleep-prep'
  | 'stress-reset'
  | 'pre-performance'
  | 'anxiety-relief'
  | 'focus-boost';

// State-shift toolkit item
export interface StateShiftItem {
  scenario: StateShiftScenario;
  name: string;
  description: string;
  icon: string;
  recommendedExercises: string[]; // exercise IDs
  contextTips: string[];
}

// User settings
export interface UserSettings {
  voiceEnabled: boolean;
  voiceVolume: number;       // 0-1
  hapticFeedback: boolean;
  reminderEnabled: boolean;
  reminderTime?: string;     // HH:mm format
  theme: 'dark' | 'light';
}

// Timer state for exercises
export interface TimerState {
  isRunning: boolean;
  currentPhase: BreathPhase;
  phaseTimeRemaining: number;
  currentCycle: number;
  totalCycles: number;
  elapsed: number;
}

// Test result for baseline tests
export interface TestResult {
  testType: 'bolt' | 'co2' | 'breath-rate';
  value: number;
  unit: string;
  timestamp: string;
}
