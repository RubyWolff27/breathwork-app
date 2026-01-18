'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Users,
  Zap,
  Heart,
  Moon,
  RefreshCw,
  Target,
  Shield,
  Brain,
  ArrowRight,
  X,
} from 'lucide-react';
import { stateShiftItems } from '@/lib/program';
import { getExercise } from '@/lib/exercises';
import { StateShiftItem, StateShiftScenario } from '@/types';
import { useProgress } from '@/hooks/useProgress';

const iconMap: Record<string, React.ElementType> = {
  Users,
  Zap,
  Heart,
  Moon,
  RefreshCw,
  Target,
  Shield,
  Brain,
};

const colorMap: Record<StateShiftScenario, { bg: string; border: string; text: string }> = {
  'pre-meeting': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  'energy-boost': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  'post-workout': { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  'sleep-prep': { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  'stress-reset': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  'pre-performance': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  'anxiety-relief': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  'focus-boost': { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
};

export default function ToolkitPage() {
  const router = useRouter();
  const { logStateShift } = useProgress();
  const [selectedItem, setSelectedItem] = useState<StateShiftItem | null>(null);

  const handleSelectExercise = (item: StateShiftItem, exerciseId: string) => {
    // Log the state shift usage
    logStateShift({
      scenario: item.scenario,
      exerciseId,
      usedAt: new Date().toISOString(),
    });

    // Navigate to exercise
    router.push(`/exercise/${exerciseId}?source=toolkit`);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="p-4 pt-6">
        <h1 className="text-2xl font-bold text-breath-text mb-1">State-Shift Toolkit</h1>
        <p className="text-breath-muted">Quick techniques for any situation</p>
      </header>

      {/* Grid of scenarios */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {stateShiftItems.map((item) => {
          const Icon = iconMap[item.icon] || Zap;
          const colors = colorMap[item.scenario];

          return (
            <motion.button
              key={item.scenario}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedItem(item)}
              className={`p-4 rounded-2xl ${colors.bg} border ${colors.border} text-left transition-all`}
            >
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                <Icon className={colors.text} size={20} />
              </div>
              <h3 className="font-semibold text-breath-text text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-breath-muted line-clamp-2">{item.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom sheet for selected item */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-breath-card rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4">
                {/* Handle */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

                {/* Close button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X size={16} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = iconMap[selectedItem.icon] || Zap;
                    const colors = colorMap[selectedItem.scenario];
                    return (
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={colors.text} size={24} />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="text-xl font-bold text-breath-text">{selectedItem.name}</h2>
                    <p className="text-sm text-breath-muted">{selectedItem.description}</p>
                  </div>
                </div>

                {/* Context tips */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-breath-text mb-2">Tips</h3>
                  <ul className="space-y-2">
                    {selectedItem.contextTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-breath-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-breath-primary mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended exercises */}
                <h3 className="font-semibold text-breath-text mb-3">Recommended Techniques</h3>
                <div className="space-y-3 pb-safe">
                  {selectedItem.recommendedExercises.map((exerciseId) => {
                    const exercise = getExercise(exerciseId);
                    if (!exercise) return null;

                    return (
                      <motion.button
                        key={exerciseId}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectExercise(selectedItem, exerciseId)}
                        className="w-full p-4 bg-white/5 rounded-xl flex items-center gap-4 text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-breath-primary/20 flex items-center justify-center">
                          <span className="text-2xl">🫁</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-breath-text">{exercise.name}</h4>
                          <p className="text-xs text-breath-muted">
                            {Math.ceil(exercise.totalDuration / 60)} min · {exercise.cycles} cycles
                          </p>
                        </div>
                        <ArrowRight className="text-breath-muted" size={20} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
