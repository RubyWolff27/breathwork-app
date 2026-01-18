'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp, Calendar, Edit2, X, Check } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import ProgressChart from '@/components/ProgressChart';
import { WeeklyMetrics } from '@/types';

export default function ProgressPage() {
  const { progress, isLoading, currentDay, saveWeeklyMetrics } = useProgress();
  const [showForm, setShowForm] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [formData, setFormData] = useState<Partial<WeeklyMetrics>>({
    boltScore: 0,
    co2Tolerance: 0,
    restingBreathRate: 0,
    sleepQuality: 5,
    stressRecovery: 5,
    focusDuration: 5,
    energyLevels: 5,
    notes: '',
  });

  useEffect(() => {
    if (currentDay) {
      setCurrentWeek(Math.ceil(currentDay / 7));
    }
  }, [currentDay]);

  const handleSubmitMetrics = () => {
    const metrics: WeeklyMetrics = {
      week: currentWeek,
      recordedAt: new Date().toISOString(),
      boltScore: formData.boltScore || 0,
      co2Tolerance: formData.co2Tolerance || 0,
      restingBreathRate: formData.restingBreathRate || 0,
      sleepQuality: formData.sleepQuality || 5,
      stressRecovery: formData.stressRecovery || 5,
      focusDuration: formData.focusDuration || 5,
      energyLevels: formData.energyLevels || 5,
      notes: formData.notes,
    };

    saveWeeklyMetrics(metrics);
    setShowForm(false);
    setFormData({
      boltScore: 0,
      co2Tolerance: 0,
      restingBreathRate: 0,
      sleepQuality: 5,
      stressRecovery: 5,
      focusDuration: 5,
      energyLevels: 5,
      notes: '',
    });
  };

  if (isLoading || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-breath-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasWeekData = progress.weeklyMetrics.some((m) => m.week === currentWeek);

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="p-4 pt-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-breath-text">Progress</h1>
            <p className="text-breath-muted">Week {currentWeek} of 4</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="w-12 h-12 rounded-full bg-breath-primary flex items-center justify-center"
          >
            <Plus size={24} />
          </motion.button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-breath-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-breath-text">
              {progress.baselineMetrics.boltScore || '-'}
            </p>
            <p className="text-xs text-breath-muted">BOLT</p>
          </div>
          <div className="bg-breath-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-breath-text">
              {progress.baselineMetrics.co2Tolerance || '-'}
            </p>
            <p className="text-xs text-breath-muted">CO2</p>
          </div>
          <div className="bg-breath-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-breath-text">
              {progress.baselineMetrics.restingBreathRate || '-'}
            </p>
            <p className="text-xs text-breath-muted">BPM</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-breath-text mb-3 flex items-center gap-2">
          <TrendingUp size={20} className="text-breath-primary" />
          Key Metrics
        </h2>
        <div className="space-y-4">
          <ProgressChart
            baseline={progress.baselineMetrics}
            weeklyMetrics={progress.weeklyMetrics}
            metric="boltScore"
            title="BOLT Score"
            unit="seconds"
            color="#22d3ee"
          />
          <ProgressChart
            baseline={progress.baselineMetrics}
            weeklyMetrics={progress.weeklyMetrics}
            metric="co2Tolerance"
            title="CO2 Tolerance"
            unit="seconds"
            color="#a855f7"
          />
          <ProgressChart
            baseline={progress.baselineMetrics}
            weeklyMetrics={progress.weeklyMetrics}
            metric="restingBreathRate"
            title="Resting Breath Rate"
            unit="bpm"
            color="#10b981"
          />
        </div>
      </section>

      {/* Weekly Log */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-breath-text mb-3 flex items-center gap-2">
          <Calendar size={20} className="text-breath-primary" />
          Weekly Entries
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((week) => {
            const weekData = progress.weeklyMetrics.find((m) => m.week === week);
            const isActive = week <= currentWeek;

            return (
              <motion.div
                key={week}
                whileHover={isActive ? { scale: 1.01 } : {}}
                className={`p-4 rounded-xl border ${
                  weekData
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : isActive
                    ? 'bg-breath-card border-white/10 cursor-pointer'
                    : 'bg-breath-card/50 border-white/5 opacity-50'
                }`}
                onClick={() => {
                  if (isActive && !weekData) {
                    setCurrentWeek(week);
                    setShowForm(true);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-breath-text">Week {week}</h3>
                    <p className="text-sm text-breath-muted">
                      {weekData
                        ? new Date(weekData.recordedAt).toLocaleDateString()
                        : isActive
                        ? 'Tap to record'
                        : 'Locked'}
                    </p>
                  </div>
                  {weekData ? (
                    <Check className="text-emerald-400" size={20} />
                  ) : isActive ? (
                    <Edit2 className="text-breath-muted" size={16} />
                  ) : null}
                </div>

                {weekData && (
                  <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-breath-text">{weekData.boltScore}</p>
                      <p className="text-xs text-breath-muted">BOLT</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-breath-text">{weekData.co2Tolerance}</p>
                      <p className="text-xs text-breath-muted">CO2</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-breath-text">{weekData.restingBreathRate}</p>
                      <p className="text-xs text-breath-muted">BPM</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-breath-text">{weekData.sleepQuality}</p>
                      <p className="text-xs text-breath-muted">Sleep</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* State-Shift Log */}
      {progress.stateShiftLogs.length > 0 && (
        <section className="px-4">
          <h2 className="text-lg font-semibold text-breath-text mb-3">
            State-Shift Usage
          </h2>
          <div className="bg-breath-card rounded-xl p-4">
            <p className="text-breath-text font-medium">
              {progress.stateShiftLogs.length} techniques used
            </p>
            <p className="text-sm text-breath-muted mt-1">
              Most used:{' '}
              {(() => {
                const counts = progress.stateShiftLogs.reduce((acc, log) => {
                  acc[log.scenario] = (acc[log.scenario] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
                return sorted[0]?.[0]?.replace('-', ' ') || 'None';
              })()}
            </p>
          </div>
        </section>
      )}

      {/* Metrics Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-breath-card rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-breath-text">
                    Week {currentWeek} Check-in
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-6 pb-8">
                  {/* Primary Metrics */}
                  <div>
                    <h3 className="text-sm font-semibold text-breath-muted mb-3">Primary Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-breath-text mb-1 block">
                          BOLT Score (seconds)
                        </label>
                        <input
                          type="number"
                          value={formData.boltScore || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, boltScore: parseInt(e.target.value) || 0 })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-breath-text"
                          placeholder="Enter BOLT score"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-breath-text mb-1 block">
                          CO2 Tolerance (seconds)
                        </label>
                        <input
                          type="number"
                          value={formData.co2Tolerance || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, co2Tolerance: parseInt(e.target.value) || 0 })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-breath-text"
                          placeholder="Enter CO2 tolerance"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-breath-text mb-1 block">
                          Resting Breath Rate (bpm)
                        </label>
                        <input
                          type="number"
                          value={formData.restingBreathRate || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              restingBreathRate: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-breath-text"
                          placeholder="Enter breath rate"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  <div>
                    <h3 className="text-sm font-semibold text-breath-muted mb-3">
                      Subjective Ratings (1-10)
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'sleepQuality', label: 'Sleep Quality' },
                        { key: 'stressRecovery', label: 'Stress Recovery' },
                        { key: 'focusDuration', label: 'Focus Duration' },
                        { key: 'energyLevels', label: 'Energy Levels' },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-breath-text">{label}</label>
                            <span className="text-breath-primary font-bold">
                              {formData[key as keyof typeof formData] as number}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData[key as keyof typeof formData] as number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: parseInt(e.target.value),
                              })
                            }
                            className="w-full accent-breath-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-sm text-breath-text mb-1 block">Notes (optional)</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-breath-text min-h-[100px]"
                      placeholder="Any observations this week..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitMetrics}
                    className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white"
                  >
                    Save Week {currentWeek} Data
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
