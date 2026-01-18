'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Flame, Target, Clock } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import DayCard from '@/components/DayCard';
import ExerciseCard from '@/components/ExerciseCard';
import { getDaySchedule, getWeekTheme, programSchedule } from '@/lib/program';
import { getExercise } from '@/lib/exercises';

export default function HomePage() {
  const router = useRouter();
  const { progress, isLoading, currentDay, completedToday } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && progress && !progress.onboardingCompleted) {
      router.push('/onboarding');
    } else if (!isLoading && progress && !progress.baselineCompleted) {
      router.push('/baseline');
    }
  }, [isLoading, progress, router]);

  if (!mounted || isLoading || !progress?.baselineCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-breath-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const todaySchedule = getDaySchedule(currentDay);
  const weekTheme = getWeekTheme(Math.ceil(currentDay / 7));
  const completedIds = completedToday.map((c) => c.exerciseId);
  const completedCount = todaySchedule?.exercises.filter(
    (ex) => completedIds.includes(ex.exerciseId)
  ).length || 0;
  const totalForToday = todaySchedule?.exercises.length || 0;

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    for (let day = currentDay; day >= 1; day--) {
      const daySchedule = getDaySchedule(day);
      if (!daySchedule) break;

      const dayCompleted = progress.completedExercises.filter(
        (ex) => ex.day === day
      );
      if (dayCompleted.length > 0) {
        streak++;
      } else if (day !== currentDay) {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="p-4 pt-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-breath-muted text-sm">
              Week {weekTheme?.week} · {weekTheme?.name}
            </p>
            <h1 className="text-2xl font-bold text-breath-text">Day {currentDay}</h1>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full"
          >
            <Flame className="text-orange-400" size={20} />
            <span className="font-semibold text-orange-400">{streak}</span>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-breath-muted">Overall Progress</span>
            <span className="text-breath-text font-medium">{currentDay}/30 days</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentDay / 30) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-breath-primary to-breath-secondary rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Week Theme Banner */}
      {weekTheme && (
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-breath-primary/10 to-breath-secondary/10 rounded-2xl p-4 border border-breath-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-breath-primary/20 flex items-center justify-center">
                <Target className="text-breath-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-breath-text">{weekTheme.focus}</h3>
                <p className="text-sm text-breath-muted mt-1">{weekTheme.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      {todaySchedule && (
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-breath-text">Today&apos;s Practice</h2>
            <span className="text-sm text-breath-muted">
              {completedCount}/{totalForToday} completed
            </span>
          </div>

          <div className="space-y-3">
            {todaySchedule.exercises.map((ex, index) => {
              const exercise = getExercise(ex.exerciseId);
              if (!exercise) return null;

              return (
                <ExerciseCard
                  key={index}
                  exercise={exercise}
                  timeOfDay={ex.timeOfDay}
                  isCompleted={completedIds.includes(ex.exerciseId)}
                  variant="compact"
                />
              );
            })}
          </div>

          {todaySchedule.notes && (
            <div className="mt-4 p-3 bg-breath-card/50 rounded-xl border border-white/5">
              <p className="text-sm text-breath-muted">
                <span className="text-breath-text font-medium">Tip: </span>
                {todaySchedule.notes}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/toolkit')}
            className="p-4 bg-breath-card rounded-2xl border border-white/5 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
              <Clock className="text-amber-400" size={20} />
            </div>
            <h3 className="font-semibold text-breath-text">Quick Shift</h3>
            <p className="text-xs text-breath-muted mt-1">State-shift toolkit</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/progress')}
            className="p-4 bg-breath-card rounded-2xl border border-white/5 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
              <Target className="text-emerald-400" size={20} />
            </div>
            <h3 className="font-semibold text-breath-text">Track KPIs</h3>
            <p className="text-xs text-breath-muted mt-1">Log weekly metrics</p>
          </motion.button>
        </div>
      </section>

      {/* Upcoming Days Preview */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-breath-text">This Week</h2>
          <button className="text-breath-primary text-sm flex items-center gap-1">
            View all
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {programSchedule
            .filter((day) => day.day >= currentDay && day.day <= currentDay + 3)
            .slice(0, 3)
            .map((schedule) => (
              <DayCard
                key={schedule.day}
                schedule={schedule}
                isToday={schedule.day === currentDay}
                isCompleted={
                  progress.completedExercises.filter((ex) => ex.day === schedule.day)
                    .length >= schedule.exercises.length
                }
                completedExercises={
                  progress.completedExercises
                    .filter((ex) => ex.day === schedule.day)
                    .map((ex) => ex.exerciseId)
                }
              />
            ))}
        </div>
      </section>
    </div>
  );
}
