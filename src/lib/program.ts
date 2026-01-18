import { DaySchedule, WeekTheme, StateShiftItem, StateShiftScenario } from '@/types';

// Week themes and descriptions
export const weekThemes: WeekTheme[] = [
  {
    week: 1,
    name: 'Foundation',
    focus: 'Establishing Proper Breathing Mechanics',
    description: 'Build the foundation with diaphragmatic breathing, nasal breathing, and basic awareness. Focus on quality over quantity.',
  },
  {
    week: 2,
    name: 'Tolerance Building',
    focus: 'Expanding CO2 Tolerance & Breath Control',
    description: 'Introduce breath holds and extended exhales. Build capacity for longer breath cycles and improved oxygen efficiency.',
  },
  {
    week: 3,
    name: 'Integration',
    focus: 'Applying Breath to Performance & Recovery',
    description: 'Connect breathing to real-world scenarios. Learn state-shifting techniques and context-specific applications.',
  },
  {
    week: 4,
    name: 'Mastery',
    focus: 'Advanced Techniques & Personalization',
    description: 'Master advanced techniques and develop your personal breathwork toolkit for any situation.',
  },
];

// Get week theme by week number
export function getWeekTheme(week: number): WeekTheme | undefined {
  return weekThemes.find((w) => w.week === week);
}

// 30-day program schedule
export const programSchedule: DaySchedule[] = [
  // Week 1: Foundation
  {
    day: 1,
    week: 1,
    theme: 'Breath Awareness',
    exercises: [
      { exerciseId: 'diaphragm-awakening', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'breath-awareness', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'nasal-priming', timeOfDay: 'evening', duration: 3 },
    ],
    notes: 'Focus on noticing your breath without changing it. Place a hand on your belly to feel diaphragm movement.',
  },
  {
    day: 2,
    week: 1,
    theme: 'Diaphragm Activation',
    exercises: [
      { exerciseId: 'diaphragm-awakening', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'nasal-priming', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'breath-awareness', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Check breathing multiple times throughout the day. Are you breathing through your nose?',
  },
  {
    day: 3,
    week: 1,
    theme: 'Nasal Breathing',
    exercises: [
      { exerciseId: 'nasal-priming', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'diaphragm-awakening', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Try to breathe through your nose for the entire day, including during light exercise.',
  },
  {
    day: 4,
    week: 1,
    theme: 'Coherent Rhythm',
    exercises: [
      { exerciseId: 'coherent-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'breath-awareness', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Introduce the 5.5-5.5 rhythm. This is your baseline for calm, focused breathing.',
  },
  {
    day: 5,
    week: 1,
    theme: 'Extending the Exhale',
    exercises: [
      { exerciseId: 'diaphragm-awakening', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: '3-6-9-downregulation', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Notice how the extended exhale affects your nervous system.',
  },
  {
    day: 6,
    week: 1,
    theme: 'Evening Protocol',
    exercises: [
      { exerciseId: 'coherent-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'nasal-priming', timeOfDay: 'midday', duration: 3 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 5 },
      { exerciseId: '4-7-8-sleep', timeOfDay: 'pre-sleep', duration: 5 },
    ],
    notes: 'Establish your pre-sleep routine. Notice sleep quality tonight.',
  },
  {
    day: 7,
    week: 1,
    theme: 'Week 1 Integration',
    exercises: [
      { exerciseId: 'diaphragm-awakening', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'midday', duration: 10 },
      { exerciseId: 'breath-awareness', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Review and consolidate Week 1 techniques. Complete Week 1 KPI check-in.',
  },

  // Week 2: Tolerance Building
  {
    day: 8,
    week: 2,
    theme: 'Introducing Box Breathing',
    exercises: [
      { exerciseId: 'nasal-priming', timeOfDay: 'morning', duration: 3 },
      { exerciseId: 'box-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Box breathing adds breath holds. Start with 4-second boxes.',
  },
  {
    day: 9,
    week: 2,
    theme: 'Building Holds',
    exercises: [
      { exerciseId: 'box-breathing', timeOfDay: 'morning', duration: 8 },
      { exerciseId: 'breath-hold-walk', timeOfDay: 'midday', duration: 5 },
      { exerciseId: '3-6-9-downregulation', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Track your breath hold walking steps. This becomes your progress metric.',
  },
  {
    day: 10,
    week: 2,
    theme: 'Alternate Nostril',
    exercises: [
      { exerciseId: 'alternate-nostril', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'box-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Alternate nostril breathing balances both brain hemispheres.',
  },
  {
    day: 11,
    week: 2,
    theme: 'Extended Holds',
    exercises: [
      { exerciseId: 'box-breathing', timeOfDay: 'morning', duration: 8 },
      { exerciseId: 'breath-hold-walk', timeOfDay: 'midday', duration: 8 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Try extending your box breathing to 5-second intervals if comfortable.',
  },
  {
    day: 12,
    week: 2,
    theme: 'Energizing Breath',
    exercises: [
      { exerciseId: 'power-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'focus-reset', timeOfDay: 'midday', duration: 3 },
      { exerciseId: '4-7-8-sleep', timeOfDay: 'pre-sleep', duration: 5 },
    ],
    notes: 'Power breathing activates your system. Notice the energy shift.',
  },
  {
    day: 13,
    week: 2,
    theme: 'Wim Hof Introduction',
    exercises: [
      { exerciseId: 'wim-hof-round', timeOfDay: 'morning', duration: 15 },
      { exerciseId: 'recovery-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Lie down for Wim Hof. Start with just one round.',
  },
  {
    day: 14,
    week: 2,
    theme: 'Week 2 Integration',
    exercises: [
      { exerciseId: 'box-breathing', timeOfDay: 'morning', duration: 8 },
      { exerciseId: 'breath-hold-walk', timeOfDay: 'midday', duration: 8 },
      { exerciseId: 'alternate-nostril', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Complete Week 2 KPI check-in. Compare to baseline and Week 1.',
  },

  // Week 3: Integration
  {
    day: 15,
    week: 3,
    theme: 'State Shifting',
    exercises: [
      { exerciseId: 'morning-activation', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'physiological-sigh', timeOfDay: 'midday', duration: 3 },
      { exerciseId: 'calming-breath', timeOfDay: 'evening', duration: 3 },
    ],
    notes: 'Practice switching between activation and calming states.',
  },
  {
    day: 16,
    week: 3,
    theme: 'Pre-Performance',
    exercises: [
      { exerciseId: 'pre-performance', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'box-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Use pre-performance breath before an important task today.',
  },
  {
    day: 17,
    week: 3,
    theme: 'Recovery Focus',
    exercises: [
      { exerciseId: 'coherent-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'recovery-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: '3-6-9-downregulation', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Practice recovery breathing after any physical activity today.',
  },
  {
    day: 18,
    week: 3,
    theme: 'Stress Response',
    exercises: [
      { exerciseId: 'physiological-sigh', timeOfDay: 'morning', duration: 3 },
      { exerciseId: 'calming-breath', timeOfDay: 'midday', duration: 3 },
      { exerciseId: 'box-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Use physiological sigh whenever you notice stress today.',
  },
  {
    day: 19,
    week: 3,
    theme: 'Focus Enhancement',
    exercises: [
      { exerciseId: 'morning-activation', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'focus-reset', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'resonance-breathing', timeOfDay: 'evening', duration: 10 },
    ],
    notes: 'Use focus reset every 90 minutes during work.',
  },
  {
    day: 20,
    week: 3,
    theme: 'Sleep Optimization',
    exercises: [
      { exerciseId: 'energizing-breath', timeOfDay: 'morning', duration: 3 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 10 },
      { exerciseId: '4-7-8-sleep', timeOfDay: 'pre-sleep', duration: 5 },
    ],
    notes: 'Full sleep protocol tonight. Track sleep quality.',
  },
  {
    day: 21,
    week: 3,
    theme: 'Week 3 Integration',
    exercises: [
      { exerciseId: 'pre-performance', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'physiological-sigh', timeOfDay: 'midday', duration: 3 },
      { exerciseId: 'recovery-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Complete Week 3 KPI check-in. Review your state-shift log.',
  },

  // Week 4: Mastery
  {
    day: 22,
    week: 4,
    theme: 'Advanced Box',
    exercises: [
      { exerciseId: 'box-breathing', timeOfDay: 'morning', duration: 10 },
      { exerciseId: 'breath-hold-walk', timeOfDay: 'midday', duration: 10 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Extend box breathing to 6-second intervals if ready.',
  },
  {
    day: 23,
    week: 4,
    theme: 'Advanced Wim Hof',
    exercises: [
      { exerciseId: 'wim-hof-round', timeOfDay: 'morning', duration: 20 },
      { exerciseId: 'recovery-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Try 2-3 rounds of Wim Hof. Track your breath hold times.',
  },
  {
    day: 24,
    week: 4,
    theme: 'Personal Protocol AM',
    exercises: [
      { exerciseId: 'morning-activation', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'power-breathing', timeOfDay: 'morning', duration: 3 },
      { exerciseId: 'box-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Experiment with your ideal morning activation sequence.',
  },
  {
    day: 25,
    week: 4,
    theme: 'Personal Protocol PM',
    exercises: [
      { exerciseId: 'coherent-breathing', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'focus-reset', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 10 },
      { exerciseId: '4-7-8-sleep', timeOfDay: 'pre-sleep', duration: 5 },
    ],
    notes: 'Refine your evening wind-down routine.',
  },
  {
    day: 26,
    week: 4,
    theme: 'Stress Resilience',
    exercises: [
      { exerciseId: 'wim-hof-round', timeOfDay: 'morning', duration: 15 },
      { exerciseId: 'physiological-sigh', timeOfDay: 'midday', duration: 3 },
      { exerciseId: 'calming-breath', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Practice staying calm under deliberately induced stress (cold shower, etc.).',
  },
  {
    day: 27,
    week: 4,
    theme: 'Peak Performance',
    exercises: [
      { exerciseId: 'morning-activation', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'pre-performance', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'recovery-breathing', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'resonance-breathing', timeOfDay: 'evening', duration: 10 },
    ],
    notes: 'Apply your full toolkit to a challenging activity today.',
  },
  {
    day: 28,
    week: 4,
    theme: 'Week 4 Review',
    exercises: [
      { exerciseId: 'coherent-breathing', timeOfDay: 'morning', duration: 10 },
      { exerciseId: 'box-breathing', timeOfDay: 'midday', duration: 10 },
      { exerciseId: 'alternate-nostril', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Complete Week 4 KPI check-in. Final measurements.',
  },
  {
    day: 29,
    week: 4,
    theme: 'Personal Mastery',
    exercises: [
      { exerciseId: 'morning-activation', timeOfDay: 'morning', duration: 5 },
      { exerciseId: 'focus-reset', timeOfDay: 'midday', duration: 5 },
      { exerciseId: 'evening-wind-down', timeOfDay: 'evening', duration: 5 },
    ],
    notes: 'Design and practice your own daily breathwork routine.',
  },
  {
    day: 30,
    week: 4,
    theme: 'Celebration & Commitment',
    exercises: [
      { exerciseId: 'breath-awareness', timeOfDay: 'morning', duration: 10 },
      { exerciseId: 'coherent-breathing', timeOfDay: 'midday', duration: 10 },
      { exerciseId: 'resonance-breathing', timeOfDay: 'evening', duration: 10 },
    ],
    notes: 'Reflect on your 30-day journey. Set intentions for continued practice.',
  },
];

// Get schedule for a specific day
export function getDaySchedule(day: number): DaySchedule | undefined {
  return programSchedule.find((d) => d.day === day);
}

// Get all schedules for a specific week
export function getWeekSchedule(week: number): DaySchedule[] {
  return programSchedule.filter((d) => d.week === week);
}

// State-shift toolkit definitions
export const stateShiftItems: StateShiftItem[] = [
  {
    scenario: 'pre-meeting',
    name: 'Pre-Meeting Calm',
    description: 'Center yourself before an important meeting or presentation',
    icon: 'Users',
    recommendedExercises: ['box-breathing', 'pre-performance', 'physiological-sigh'],
    contextTips: [
      'Find a quiet moment 5 minutes before',
      'Stand tall to enhance confidence',
      'Focus on your breath to quiet mental chatter',
    ],
  },
  {
    scenario: 'energy-boost',
    name: 'Energy Boost',
    description: 'Quick pick-me-up when feeling sluggish or tired',
    icon: 'Zap',
    recommendedExercises: ['power-breathing', 'energizing-breath', 'morning-activation'],
    contextTips: [
      'Best done standing or sitting upright',
      'Open a window for fresh air if possible',
      'Follow with a short walk for best effect',
    ],
  },
  {
    scenario: 'post-workout',
    name: 'Post-Workout Recovery',
    description: 'Accelerate recovery after exercise',
    icon: 'Heart',
    recommendedExercises: ['recovery-breathing', '3-6-9-downregulation', 'coherent-breathing'],
    contextTips: [
      'Start immediately after cooldown',
      'Lie down if possible',
      'Focus on belly breathing',
    ],
  },
  {
    scenario: 'sleep-prep',
    name: 'Sleep Preparation',
    description: 'Wind down and prepare for restful sleep',
    icon: 'Moon',
    recommendedExercises: ['evening-wind-down', '4-7-8-sleep', '3-6-9-downregulation'],
    contextTips: [
      'Dim lights during practice',
      'Avoid screens after this routine',
      'Practice in bed for best results',
    ],
  },
  {
    scenario: 'stress-reset',
    name: 'Stress Reset',
    description: 'Quick relief from acute stress or conflict',
    icon: 'RefreshCw',
    recommendedExercises: ['physiological-sigh', 'calming-breath', 'box-breathing'],
    contextTips: [
      'Step away from the stressful situation',
      'Even 3 breaths can help',
      'Place hand on heart for grounding',
    ],
  },
  {
    scenario: 'pre-performance',
    name: 'Pre-Performance',
    description: 'Optimal arousal before competition or performance',
    icon: 'Target',
    recommendedExercises: ['pre-performance', 'box-breathing', 'power-breathing'],
    contextTips: [
      'Time it 10-15 minutes before event',
      'Visualize success during practice',
      'Combine with positive self-talk',
    ],
  },
  {
    scenario: 'anxiety-relief',
    name: 'Anxiety Relief',
    description: 'Calm anxious thoughts and physical symptoms',
    icon: 'Shield',
    recommendedExercises: ['physiological-sigh', 'calming-breath', '4-7-8-sleep'],
    contextTips: [
      'Ground your feet on the floor',
      'Focus only on the exhale',
      'Repeat until symptoms subside',
    ],
  },
  {
    scenario: 'focus-boost',
    name: 'Focus Boost',
    description: 'Sharpen concentration for deep work',
    icon: 'Brain',
    recommendedExercises: ['focus-reset', 'box-breathing', 'alternate-nostril'],
    contextTips: [
      'Clear your workspace first',
      'Set intention for focus session',
      'Use every 90 minutes for sustained focus',
    ],
  },
];

// Get state-shift item by scenario
export function getStateShiftItem(scenario: StateShiftScenario): StateShiftItem | undefined {
  return stateShiftItems.find((item) => item.scenario === scenario);
}
