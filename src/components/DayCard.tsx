'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { DaySchedule } from '@/types';
import { getExercise } from '@/lib/exercises';

interface DayCardProps {
  schedule: DaySchedule;
  isToday?: boolean;
  isCompleted?: boolean;
  completedExercises?: string[];
}

export default function DayCard({
  schedule,
  isToday = false,
  isCompleted = false,
  completedExercises = [],
}: DayCardProps) {
  const totalExercises = schedule.exercises.length;
  const completedCount = schedule.exercises.filter(
    (ex) => completedExercises.includes(ex.exerciseId)
  ).length;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-4 rounded-2xl transition-all ${
        isToday
          ? 'bg-gradient-to-br from-breath-primary/20 to-breath-secondary/20 border-2 border-breath-primary/50'
          : isCompleted
          ? 'bg-emerald-500/10 border border-emerald-500/20'
          : 'bg-breath-card border border-white/5'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              isToday
                ? 'bg-breath-primary text-white'
                : isCompleted
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/10 text-breath-muted'
            }`}
          >
            {schedule.day}
          </div>
          <div>
            <h3 className="font-semibold text-breath-text">
              {isToday && <span className="text-breath-primary">Today · </span>}
              {schedule.theme}
            </h3>
            <p className="text-sm text-breath-muted">Week {schedule.week} · Day {schedule.day}</p>
          </div>
        </div>
        {isCompleted && <CheckCircle2 className="text-emerald-400" size={24} />}
      </div>

      <div className="space-y-2 mb-3">
        {schedule.exercises.slice(0, 3).map((ex, index) => {
          const exercise = getExercise(ex.exerciseId);
          const isDone = completedExercises.includes(ex.exerciseId);
          return (
            <Link key={index} href={`/exercise/${ex.exerciseId}?day=${schedule.day}`}>
              <div
                className={`flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-white/5 ${
                  isDone ? 'opacity-60' : ''
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDone ? 'bg-emerald-400' : 'bg-breath-primary'
                  }`}
                />
                <span className="text-sm text-breath-text flex-1 truncate">
                  {exercise?.name || ex.exerciseId}
                </span>
                <span className="text-xs text-breath-muted capitalize">{ex.timeOfDay}</span>
                {isDone && <CheckCircle2 size={14} className="text-emerald-400" />}
              </div>
            </Link>
          );
        })}
        {schedule.exercises.length > 3 && (
          <div className="text-xs text-breath-muted pl-4">
            +{schedule.exercises.length - 3} more
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-full bg-white/10 rounded-full h-1.5 w-20">
            <div
              className="bg-breath-primary h-1.5 rounded-full transition-all"
              style={{ width: `${(completedCount / totalExercises) * 100}%` }}
            />
          </div>
          <span className="text-xs text-breath-muted">
            {completedCount}/{totalExercises}
          </span>
        </div>
        {isToday && (
          <Link
            href={`/exercise/${schedule.exercises[0]?.exerciseId}?day=${schedule.day}`}
            className="flex items-center gap-1 text-breath-primary text-sm font-medium"
          >
            Start
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
