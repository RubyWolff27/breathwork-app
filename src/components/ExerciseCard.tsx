'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Clock, CheckCircle2 } from 'lucide-react';
import { Exercise } from '@/types';
import { formatDuration } from '@/lib/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  timeOfDay?: string;
  isCompleted?: boolean;
  variant?: 'default' | 'compact';
}

const intensityColors = {
  gentle: 'bg-emerald-500/20 text-emerald-400',
  moderate: 'bg-amber-500/20 text-amber-400',
  intense: 'bg-rose-500/20 text-rose-400',
};

const categoryIcons: Record<string, string> = {
  foundation: '🌱',
  activation: '⚡',
  recovery: '🌙',
  focus: '🎯',
  sleep: '😴',
  'stress-relief': '🧘',
  performance: '🏆',
};

export default function ExerciseCard({
  exercise,
  timeOfDay,
  isCompleted = false,
  variant = 'default',
}: ExerciseCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/exercise/${exercise.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
            isCompleted
              ? 'bg-emerald-500/10 border border-emerald-500/30'
              : 'bg-breath-card border border-white/5 hover:border-breath-primary/30'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-breath-primary/20 flex items-center justify-center text-lg">
            {categoryIcons[exercise.category] || '🫁'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-breath-text truncate">{exercise.name}</h4>
              {isCompleted && <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 text-sm text-breath-muted">
              {timeOfDay && <span className="capitalize">{timeOfDay}</span>}
              <span>·</span>
              <span>{formatDuration(exercise.totalDuration)}</span>
            </div>
          </div>
          <Play size={20} className="text-breath-primary flex-shrink-0" />
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/exercise/${exercise.id}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`p-4 rounded-2xl transition-all ${
          isCompleted
            ? 'bg-emerald-500/10 border border-emerald-500/30'
            : 'bg-breath-card border border-white/5 hover:border-breath-primary/30 hover:shadow-lg hover:shadow-breath-primary/10'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-breath-primary/30 to-breath-secondary/30 flex items-center justify-center text-2xl">
            {categoryIcons[exercise.category] || '🫁'}
          </div>
          {isCompleted ? (
            <CheckCircle2 size={24} className="text-emerald-400" />
          ) : (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${intensityColors[exercise.intensity]}`}>
              {exercise.intensity}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-breath-text mb-1">{exercise.name}</h3>
        <p className="text-sm text-breath-muted line-clamp-2 mb-3">{exercise.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-breath-muted">
            <Clock size={14} />
            <span className="text-sm">{formatDuration(exercise.totalDuration)}</span>
            <span className="text-sm">· {exercise.cycles} cycles</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-breath-primary flex items-center justify-center">
            <Play size={16} className="text-white ml-0.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
