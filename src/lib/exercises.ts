import { Exercise, VoiceCue } from '@/types';

// Default voice cues for a standard breath cycle
const standardVoiceCues: VoiceCue[] = [
  { phase: 'inhale', text: 'Breathe in through your nose', timing: 'start' },
  { phase: 'hold-in', text: 'Hold', timing: 'start' },
  { phase: 'exhale', text: 'Slowly exhale', timing: 'start' },
  { phase: 'hold-out', text: 'Hold empty', timing: 'start' },
];

export const exercises: Exercise[] = [
  // Foundation Exercises
  {
    id: 'diaphragm-awakening',
    name: 'Diaphragm Awakening',
    description: 'Reconnect with natural belly breathing to activate your diaphragm and establish proper breathing mechanics.',
    category: 'foundation',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      exhale: 4,
    },
    cycles: 10,
    totalDuration: 80,
    instructions: [
      'Lie down or sit comfortably with one hand on your chest and one on your belly',
      'Breathe in through your nose, letting your belly rise while chest stays still',
      'Exhale slowly, feeling your belly fall naturally',
      'Focus on making the belly hand move while the chest hand stays relatively still',
    ],
    benefits: [
      'Activates the parasympathetic nervous system',
      'Improves breathing efficiency',
      'Reduces shallow chest breathing habits',
      'Foundation for all other techniques',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in, let your belly rise', timing: 'start' },
      { phase: 'exhale', text: 'Exhale, belly falls naturally', timing: 'start' },
    ],
  },
  {
    id: 'nasal-priming',
    name: 'Nasal Priming Sequence',
    description: 'Clear and activate nasal passages for optimal breathing throughout the day.',
    category: 'foundation',
    intensity: 'gentle',
    pattern: {
      inhale: 3,
      exhale: 3,
    },
    cycles: 12,
    totalDuration: 72,
    instructions: [
      'Close your mouth and breathe only through your nose',
      'Take gentle breaths, focusing on feeling air flow through both nostrils',
      'If one nostril is blocked, gently tilt your head to the opposite side',
      'Maintain a quiet, effortless breath',
    ],
    benefits: [
      'Warms and filters incoming air',
      'Produces nitric oxide for better oxygen absorption',
      'Prepares nasal passages for the day',
      'Reduces mouth breathing tendency',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Inhale through your nose', timing: 'start' },
      { phase: 'exhale', text: 'Exhale through your nose', timing: 'start' },
    ],
  },
  {
    id: 'coherent-breathing',
    name: 'Coherent Breathing (5.5-5.5)',
    description: 'The scientifically optimal breathing rhythm at 5.5 breaths per minute for heart-brain coherence.',
    category: 'focus',
    intensity: 'gentle',
    pattern: {
      inhale: 5.5,
      exhale: 5.5,
    },
    cycles: 12,
    totalDuration: 132,
    instructions: [
      'Sit comfortably with eyes closed or softly focused',
      'Breathe in slowly for 5.5 seconds',
      'Breathe out slowly for 5.5 seconds',
      'Find a smooth, continuous rhythm without pausing',
      'Let the breath be effortless and flowing',
    ],
    benefits: [
      'Optimizes heart rate variability',
      'Synchronizes heart and brain rhythms',
      'Reduces blood pressure',
      'Enhances mental clarity and calm',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Inhale slowly', timing: 'start' },
      { phase: 'exhale', text: 'Exhale slowly', timing: 'start' },
    ],
  },
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: 'Navy SEAL technique for calm focus and stress resilience. Equal parts inhale, hold, exhale, hold.',
    category: 'focus',
    intensity: 'moderate',
    pattern: {
      inhale: 4,
      holdIn: 4,
      exhale: 4,
      holdOut: 4,
    },
    cycles: 8,
    totalDuration: 128,
    instructions: [
      'Sit in a comfortable position with back straight',
      'Inhale through your nose for 4 seconds',
      'Hold your breath for 4 seconds',
      'Exhale slowly for 4 seconds',
      'Hold empty for 4 seconds',
      'Repeat, visualizing tracing the sides of a square',
    ],
    benefits: [
      'Activates calm focus under pressure',
      'Used by elite military and athletes',
      'Builds CO2 tolerance',
      'Regulates autonomic nervous system',
    ],
    voiceCues: standardVoiceCues,
  },
  {
    id: '3-6-9-downregulation',
    name: '3-6-9 Down-Regulation',
    description: 'Progressive exhale extension for rapid calming. The extended exhale activates your rest-and-digest system.',
    category: 'recovery',
    intensity: 'gentle',
    pattern: {
      inhale: 3,
      exhale: 6,
      holdOut: 9,
    },
    cycles: 6,
    totalDuration: 108,
    instructions: [
      'Find a comfortable seated position',
      'Inhale gently through your nose for 3 seconds',
      'Exhale slowly through your nose for 6 seconds',
      'Hold empty, relaxed, for 9 seconds',
      'Allow the exhale to fully release all tension',
    ],
    benefits: [
      'Rapid stress reduction',
      'Activates parasympathetic nervous system',
      'Lowers heart rate quickly',
      'Ideal for high-stress moments',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in gently', timing: 'start' },
      { phase: 'exhale', text: 'Long slow exhale', timing: 'start' },
      { phase: 'hold-out', text: 'Rest empty and relaxed', timing: 'start' },
    ],
  },
  {
    id: '4-7-8-sleep',
    name: '4-7-8 Sleep Prep',
    description: 'Dr. Andrew Weil\'s relaxation breath for deep rest and sleep preparation.',
    category: 'sleep',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      holdIn: 7,
      exhale: 8,
    },
    cycles: 4,
    totalDuration: 76,
    instructions: [
      'Place the tip of your tongue against the ridge behind your upper front teeth',
      'Exhale completely through your mouth with a whoosh sound',
      'Close your mouth and inhale quietly through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale completely through your mouth for 8 counts',
      'This is one cycle. Repeat 3 more times.',
    ],
    benefits: [
      'Natural tranquilizer for the nervous system',
      'Improves sleep onset',
      'Reduces anxiety',
      'Can be used for stress management anytime',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Inhale quietly through your nose', timing: 'start' },
      { phase: 'hold-in', text: 'Hold', timing: 'start' },
      { phase: 'exhale', text: 'Exhale completely through your mouth', timing: 'start' },
    ],
  },
  {
    id: 'physiological-sigh',
    name: 'Physiological Sigh',
    description: 'Double inhale followed by long exhale. The fastest way to calm down in real-time.',
    category: 'stress-relief',
    intensity: 'gentle',
    pattern: {
      inhale: 2,
      holdIn: 1, // Brief pause for second inhale
      exhale: 6,
    },
    cycles: 6,
    totalDuration: 54,
    instructions: [
      'Take a deep breath in through your nose',
      'At the top, take a second short inhale to fully expand lungs',
      'Release with a long, slow exhale through your mouth',
      'The double inhale pops open collapsed alveoli in your lungs',
      'The extended exhale triggers immediate calming',
    ],
    benefits: [
      'Fastest real-time stress relief (works in 1-3 breaths)',
      'Resets carbon dioxide levels',
      'Can be done discreetly anywhere',
      'Backed by Stanford neuroscience research',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Deep breath in, then sip in more air', timing: 'start' },
      { phase: 'exhale', text: 'Long slow exhale through mouth', timing: 'start' },
    ],
    specialInstructions: 'The inhale phase includes a double inhale: first breath + second sip of air',
  },
  {
    id: 'power-breathing',
    name: 'Power Breathing',
    description: 'Energizing breath pattern to increase alertness and activate your sympathetic nervous system.',
    category: 'activation',
    intensity: 'intense',
    pattern: {
      inhale: 1,
      exhale: 1,
    },
    cycles: 30,
    totalDuration: 60,
    instructions: [
      'Sit upright with good posture',
      'Take quick, powerful breaths through your nose',
      'Emphasize the exhale by pulling your belly in sharply',
      'Let the inhale happen passively',
      'Maintain a steady rhythm like a bellows',
      'Stop if you feel lightheaded',
    ],
    benefits: [
      'Increases energy and alertness',
      'Warms the body',
      'Clears mental fog',
      'Prepares for physical performance',
    ],
    voiceCues: [
      { phase: 'inhale', text: '', timing: 'start' }, // Silent for rhythm
      { phase: 'exhale', text: '', timing: 'start' },
    ],
    specialInstructions: 'Start with 20 breaths if new to this technique. Do not practice while driving.',
  },
  {
    id: 'wim-hof-round',
    name: 'Wim Hof Breathing',
    description: 'Controlled hyperventilation followed by breath retention. Powerful technique for stress resilience and energy.',
    category: 'activation',
    intensity: 'intense',
    pattern: {
      inhale: 2,
      exhale: 2,
    },
    cycles: 30,
    totalDuration: 120,
    instructions: [
      'Lie down in a comfortable position',
      'Take 30 deep breaths: full inhale, relaxed exhale',
      'On the last exhale, hold your breath as long as comfortable',
      'When you need to breathe, take a deep breath and hold for 15 seconds',
      'This completes one round. Rest and repeat 2-3 rounds.',
    ],
    benefits: [
      'Increases stress resilience',
      'Boosts immune function',
      'Increases energy and focus',
      'Builds mental fortitude',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in fully', timing: 'start' },
      { phase: 'exhale', text: 'Let go', timing: 'start' },
    ],
    specialInstructions: 'Never practice in water or while driving. Lie down to avoid injury if you feel faint.',
  },
  {
    id: 'alternate-nostril',
    name: 'Alternate Nostril Breathing',
    description: 'Ancient yogic technique (Nadi Shodhana) for balancing the nervous system and mental clarity.',
    category: 'focus',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      holdIn: 2,
      exhale: 4,
    },
    cycles: 10,
    totalDuration: 100,
    instructions: [
      'Sit comfortably with spine straight',
      'Use your right thumb to close your right nostril',
      'Inhale through the left nostril',
      'Close left nostril with ring finger, open right',
      'Exhale through the right nostril',
      'Inhale through right, then switch and exhale left',
      'This is one complete cycle',
    ],
    benefits: [
      'Balances left and right brain hemispheres',
      'Reduces anxiety and promotes calm',
      'Enhances focus and mental clarity',
      'Prepares for meditation',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Inhale through left nostril', timing: 'start' },
      { phase: 'hold-in', text: 'Switch', timing: 'start' },
      { phase: 'exhale', text: 'Exhale through right nostril', timing: 'start' },
    ],
  },
  {
    id: 'breath-hold-walk',
    name: 'Breath Hold Walking',
    description: 'Walking while holding breath after exhale. Builds CO2 tolerance and simulates altitude training.',
    category: 'performance',
    intensity: 'moderate',
    pattern: {
      inhale: 3,
      exhale: 3,
      holdOut: 15,
    },
    cycles: 5,
    totalDuration: 105,
    instructions: [
      'Take a normal breath in and out through your nose',
      'After exhaling, pinch your nose and start walking',
      'Count your steps while holding',
      'When you feel a medium urge to breathe, stop and breathe normally',
      'Rest 30-60 seconds, then repeat',
      'Track your step count to measure progress',
    ],
    benefits: [
      'Increases CO2 tolerance',
      'Simulates altitude training benefits',
      'Improves oxygen delivery to tissues',
      'Enhances athletic performance',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in', timing: 'start' },
      { phase: 'exhale', text: 'Breathe out', timing: 'start' },
      { phase: 'hold-out', text: 'Hold and walk', timing: 'start' },
    ],
    specialInstructions: 'Stop holding when you feel a medium urge to breathe. Do not push to discomfort.',
  },
  {
    id: 'recovery-breathing',
    name: 'Post-Workout Recovery',
    description: 'Extended exhale breathing to shift from sympathetic to parasympathetic after exercise.',
    category: 'recovery',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      exhale: 8,
    },
    cycles: 10,
    totalDuration: 120,
    instructions: [
      'Lie down or sit comfortably after your workout',
      'Place one hand on your belly',
      'Inhale through your nose for 4 seconds',
      'Exhale slowly through your nose for 8 seconds',
      'Focus on completely releasing tension with each exhale',
    ],
    benefits: [
      'Accelerates recovery after exercise',
      'Reduces cortisol levels',
      'Lowers heart rate efficiently',
      'Improves post-workout HRV',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in deeply', timing: 'start' },
      { phase: 'exhale', text: 'Long slow exhale, release all tension', timing: 'start' },
    ],
  },
  {
    id: 'morning-activation',
    name: 'Morning Activation',
    description: 'Energizing breath sequence to wake up the body and mind.',
    category: 'activation',
    intensity: 'moderate',
    pattern: {
      inhale: 4,
      holdIn: 4,
      exhale: 4,
    },
    cycles: 10,
    totalDuration: 120,
    instructions: [
      'Stand or sit up straight',
      'Take a deep breath through your nose, filling your chest and belly',
      'Hold at the top for 4 seconds',
      'Exhale powerfully through your mouth',
      'Feel energy spreading through your body',
    ],
    benefits: [
      'Increases morning alertness without caffeine',
      'Oxygenates the brain',
      'Sets positive tone for the day',
      'Activates metabolism',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Deep energizing breath in', timing: 'start' },
      { phase: 'hold-in', text: 'Hold and feel the energy', timing: 'start' },
      { phase: 'exhale', text: 'Exhale with power', timing: 'start' },
    ],
  },
  {
    id: 'evening-wind-down',
    name: 'Evening Wind Down',
    description: 'Gentle breath progression to transition from day to evening relaxation.',
    category: 'sleep',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      exhale: 6,
    },
    cycles: 12,
    totalDuration: 120,
    instructions: [
      'Find a comfortable position, dimming lights if possible',
      'Close your eyes and let go of the day\'s events',
      'Breathe in gently through your nose for 4 seconds',
      'Exhale slowly for 6 seconds, releasing tension',
      'With each exhale, feel yourself becoming more relaxed',
    ],
    benefits: [
      'Transitions body into rest mode',
      'Reduces evening cortisol',
      'Prepares nervous system for sleep',
      'Clears mental chatter',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Gentle breath in', timing: 'start' },
      { phase: 'exhale', text: 'Let go and relax', timing: 'start' },
    ],
  },
  {
    id: 'focus-reset',
    name: 'Focus Reset',
    description: 'Quick technique to regain concentration during work or study.',
    category: 'focus',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      holdIn: 4,
      exhale: 4,
      holdOut: 4,
    },
    cycles: 4,
    totalDuration: 64,
    instructions: [
      'Pause your current activity',
      'Sit up straight and close your eyes',
      'Perform 4 cycles of box breathing',
      'With each cycle, let go of distractions',
      'Return to your task with renewed focus',
    ],
    benefits: [
      'Quickly restores attention',
      'Clears mental fatigue',
      'Reduces cognitive overload',
      'Can be done at desk without notice',
    ],
    voiceCues: standardVoiceCues,
  },
  {
    id: 'pre-performance',
    name: 'Pre-Performance Activation',
    description: 'Optimal arousal breathing before presentations, competitions, or important events.',
    category: 'performance',
    intensity: 'moderate',
    pattern: {
      inhale: 4,
      holdIn: 2,
      exhale: 6,
    },
    cycles: 6,
    totalDuration: 72,
    instructions: [
      'Find a private moment before your event',
      'Stand tall with shoulders back',
      'Inhale confidence and energy for 4 seconds',
      'Brief hold to center yourself',
      'Exhale any nervousness for 6 seconds',
      'Visualize successful performance during exhale',
    ],
    benefits: [
      'Optimizes arousal for peak performance',
      'Reduces pre-event anxiety',
      'Enhances confidence',
      'Sharpens focus',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in confidence', timing: 'start' },
      { phase: 'hold-in', text: 'Center yourself', timing: 'start' },
      { phase: 'exhale', text: 'Release any tension', timing: 'start' },
    ],
  },
  {
    id: 'breath-awareness',
    name: 'Breath Awareness',
    description: 'Simple observation of natural breath without changing it. Foundation of mindfulness.',
    category: 'foundation',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      exhale: 4,
    },
    cycles: 15,
    totalDuration: 120,
    instructions: [
      'Sit comfortably with eyes closed',
      'Simply observe your natural breath',
      'Notice the sensation of air entering and leaving',
      'Don\'t try to control or change the breath',
      'When mind wanders, gently return to breath',
    ],
    benefits: [
      'Develops breath awareness',
      'Foundation for meditation',
      'Reduces mind wandering',
      'Increases present-moment awareness',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Notice the breath coming in', timing: 'start' },
      { phase: 'exhale', text: 'Notice the breath going out', timing: 'start' },
    ],
  },
  {
    id: 'energizing-breath',
    name: 'Quick Energy Boost',
    description: 'Rapid breathing technique for instant energy when feeling sluggish.',
    category: 'activation',
    intensity: 'moderate',
    pattern: {
      inhale: 2,
      exhale: 2,
    },
    cycles: 20,
    totalDuration: 80,
    instructions: [
      'Sit or stand with good posture',
      'Take quick, rhythmic breaths through your nose',
      'Make inhale and exhale equal length',
      'Keep breath shallow in the chest',
      'After 20 breaths, take one deep breath and hold briefly',
    ],
    benefits: [
      'Instant energy boost',
      'Increases oxygen to brain',
      'Clears afternoon fatigue',
      'Alternative to caffeine',
    ],
    voiceCues: [
      { phase: 'inhale', text: '', timing: 'start' },
      { phase: 'exhale', text: '', timing: 'start' },
    ],
    specialInstructions: 'Stop if feeling dizzy. Not recommended before sleep.',
  },
  {
    id: 'calming-breath',
    name: 'Instant Calm',
    description: 'Emergency calming technique for acute stress or anxiety.',
    category: 'stress-relief',
    intensity: 'gentle',
    pattern: {
      inhale: 4,
      exhale: 8,
    },
    cycles: 5,
    totalDuration: 60,
    instructions: [
      'Stop what you\'re doing',
      'Place one hand on your heart',
      'Inhale slowly through your nose for 4 seconds',
      'Exhale even more slowly for 8 seconds',
      'Feel your heart rate slowing with each exhale',
    ],
    benefits: [
      'Rapidly reduces acute stress',
      'Slows heart rate',
      'Can be done anywhere',
      'Works within 5 breaths',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Breathe in slowly', timing: 'start' },
      { phase: 'exhale', text: 'Long calming exhale', timing: 'start' },
    ],
  },
  {
    id: 'resonance-breathing',
    name: 'Resonance Breathing',
    description: 'Breathing at your personal resonance frequency for maximum HRV benefit.',
    category: 'focus',
    intensity: 'gentle',
    pattern: {
      inhale: 5,
      exhale: 5,
    },
    cycles: 12,
    totalDuration: 120,
    instructions: [
      'Sit comfortably with eyes closed',
      'Breathe in slowly for 5 seconds',
      'Breathe out slowly for 5 seconds',
      'Maintain smooth, continuous flow',
      'No pauses between breaths',
      'Aim for about 6 breaths per minute',
    ],
    benefits: [
      'Maximizes heart rate variability',
      'Optimal for heart-brain coherence',
      'Reduces blood pressure',
      'Enhances emotional regulation',
    ],
    voiceCues: [
      { phase: 'inhale', text: 'Smooth breath in', timing: 'start' },
      { phase: 'exhale', text: 'Smooth breath out', timing: 'start' },
    ],
  },
];

// Get exercise by ID
export function getExercise(id: string): Exercise | undefined {
  return exercises.find((ex) => ex.id === id);
}

// Get exercises by category
export function getExercisesByCategory(category: string): Exercise[] {
  return exercises.filter((ex) => ex.category === category);
}

// Get exercises by intensity
export function getExercisesByIntensity(intensity: string): Exercise[] {
  return exercises.filter((ex) => ex.intensity === intensity);
}

// Calculate total duration of an exercise in seconds
export function calculateExerciseDuration(exercise: Exercise): number {
  const { pattern, cycles } = exercise;
  const cycleTime =
    pattern.inhale +
    (pattern.holdIn || 0) +
    pattern.exhale +
    (pattern.holdOut || 0);
  return cycleTime * cycles;
}

// Format duration for display
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}
