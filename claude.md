# Breathwork Protocol App

## Project Overview
A modern web app for the 30-day Integrated Athlete-Executive Breathwork Protocol featuring voice-guided exercises, progress tracking, and a state-shift toolkit.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Audio:** Web Speech API
- **Storage:** localStorage
- **Icons:** Lucide React

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard/Home
│   ├── onboarding/        # Welcome flow
│   ├── baseline/          # BOLT, CO2, breath rate tests
│   ├── exercise/[id]/     # Exercise session with breathing animation
│   ├── toolkit/           # State-shift toolkit (8 scenarios)
│   ├── progress/          # KPI tracking with charts
│   └── settings/          # User preferences
├── components/            # Reusable UI components
│   ├── BreathingCircle    # Animated breathing visualization
│   ├── Timer              # Countdown display
│   ├── DayCard            # Daily schedule card
│   ├── ExerciseCard       # Exercise preview
│   └── ProgressChart      # Recharts line/area charts
├── hooks/                 # Custom React hooks
│   ├── useBreathingTimer  # Manages breath phases and cycles
│   ├── useVoiceCues       # Web Speech API integration
│   └── useProgress        # localStorage state management
├── lib/                   # Core logic and data
│   ├── exercises.ts       # 20 exercise definitions with patterns
│   ├── program.ts         # 30-day schedule, week themes, toolkit items
│   ├── storage.ts         # localStorage CRUD operations
│   └── audio.ts           # Voice synthesis and sound effects
└── types/                 # TypeScript type definitions
```

## Key Data Structures

### Exercise Pattern
```typescript
interface BreathPattern {
  inhale: number;      // seconds
  holdIn?: number;     // optional hold after inhale
  exhale: number;      // seconds
  holdOut?: number;    // optional hold after exhale
}
```

### User Progress
- Stored in localStorage under key `breathwork-progress`
- Includes: currentDay, completedExercises, baselineMetrics, weeklyMetrics, settings

## Development Commands
```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## App Flow
1. **Onboarding** → 4-slide intro explaining the protocol
2. **Baseline Testing** → BOLT score, CO2 tolerance, resting breath rate
3. **Dashboard** → Shows current day, today's exercises, week theme
4. **Exercise Session** → Animated breathing circle with voice cues
5. **State-Shift Toolkit** → Quick access to techniques by scenario
6. **Progress Tracking** → Weekly KPI entry, charts showing improvement

## 30-Day Program Structure
- **Week 1 (Foundation):** Diaphragm awakening, nasal breathing, coherent breathing
- **Week 2 (Tolerance):** Box breathing, breath holds, Wim Hof introduction
- **Week 3 (Integration):** State-shifting, pre-performance, recovery protocols
- **Week 4 (Mastery):** Advanced techniques, personalized routines

## Exercises Included
Diaphragm Awakening, Nasal Priming, Coherent Breathing (5.5-5.5), Box Breathing, 3-6-9 Down-Regulation, 4-7-8 Sleep Prep, Physiological Sigh, Power Breathing, Wim Hof, Alternate Nostril, Breath Hold Walking, Recovery Breathing, Morning Activation, Evening Wind Down, Focus Reset, Pre-Performance, Breath Awareness, Quick Energy Boost, Instant Calm, Resonance Breathing

## State-Shift Toolkit Scenarios
Pre-meeting calm, Energy boost, Post-workout recovery, Sleep preparation, Stress reset, Pre-performance, Anxiety relief, Focus boost

## Notes for Development
- All data persists in localStorage - no backend required
- Voice cues use Web Speech API with fallback to bell sounds
- Breathing animations use Framer Motion with easing matched to breath phases
- Charts use Recharts with custom dark theme styling
- Mobile-first design with safe area padding for iOS
