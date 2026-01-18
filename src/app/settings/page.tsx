'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Vibrate,
  Bell,
  RotateCcw,
  Download,
  Upload,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { exportProgress, importProgress } from '@/lib/storage';

export default function SettingsPage() {
  const { progress, updateSettings, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const settings = progress?.settings;

  const handleVoiceToggle = () => {
    if (settings) {
      updateSettings({ voiceEnabled: !settings.voiceEnabled });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ voiceVolume: parseFloat(e.target.value) });
  };

  const handleHapticToggle = () => {
    if (settings) {
      updateSettings({ hapticFeedback: !settings.hapticFeedback });
    }
  };

  const handleReminderToggle = () => {
    if (settings) {
      updateSettings({ reminderEnabled: !settings.reminderEnabled });
    }
  };

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breathwork-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            const success = importProgress(content);
            if (success) {
              window.location.reload();
            } else {
              setImportError('Failed to import data. Invalid format.');
            }
          } catch {
            setImportError('Failed to read file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    resetProgress();
    window.location.href = '/onboarding';
  };

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-breath-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="p-4 pt-6">
        <h1 className="text-2xl font-bold text-breath-text">Settings</h1>
        <p className="text-breath-muted">Customize your experience</p>
      </header>

      {/* Audio Settings */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-breath-muted mb-3 uppercase tracking-wider">
          Audio
        </h2>
        <div className="bg-breath-card rounded-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              {settings.voiceEnabled ? (
                <Volume2 className="text-breath-primary" size={20} />
              ) : (
                <VolumeX className="text-breath-muted" size={20} />
              )}
              <div>
                <p className="text-breath-text font-medium">Voice Guidance</p>
                <p className="text-xs text-breath-muted">Audio cues during exercises</p>
              </div>
            </div>
            <button
              onClick={handleVoiceToggle}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.voiceEnabled ? 'bg-breath-primary' : 'bg-white/10'
              }`}
            >
              <motion.div
                layout
                className="w-5 h-5 bg-white rounded-full m-1"
                animate={{ x: settings.voiceEnabled ? 20 : 0 }}
              />
            </button>
          </div>

          {settings.voiceEnabled && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-breath-text">Volume</p>
                <p className="text-sm text-breath-primary">
                  {Math.round(settings.voiceVolume * 100)}%
                </p>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.voiceVolume}
                onChange={handleVolumeChange}
                className="w-full accent-breath-primary"
              />
            </div>
          )}
        </div>
      </section>

      {/* Feedback Settings */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-breath-muted mb-3 uppercase tracking-wider">
          Feedback
        </h2>
        <div className="bg-breath-card rounded-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <Vibrate
                className={settings.hapticFeedback ? 'text-breath-primary' : 'text-breath-muted'}
                size={20}
              />
              <div>
                <p className="text-breath-text font-medium">Haptic Feedback</p>
                <p className="text-xs text-breath-muted">Vibrations on phase changes</p>
              </div>
            </div>
            <button
              onClick={handleHapticToggle}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.hapticFeedback ? 'bg-breath-primary' : 'bg-white/10'
              }`}
            >
              <motion.div
                layout
                className="w-5 h-5 bg-white rounded-full m-1"
                animate={{ x: settings.hapticFeedback ? 20 : 0 }}
              />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell
                className={settings.reminderEnabled ? 'text-breath-primary' : 'text-breath-muted'}
                size={20}
              />
              <div>
                <p className="text-breath-text font-medium">Daily Reminders</p>
                <p className="text-xs text-breath-muted">Push notifications</p>
              </div>
            </div>
            <button
              onClick={handleReminderToggle}
              className={`w-12 h-7 rounded-full transition-colors ${
                settings.reminderEnabled ? 'bg-breath-primary' : 'bg-white/10'
              }`}
            >
              <motion.div
                layout
                className="w-5 h-5 bg-white rounded-full m-1"
                animate={{ x: settings.reminderEnabled ? 20 : 0 }}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Data Management */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-breath-muted mb-3 uppercase tracking-wider">
          Data
        </h2>
        <div className="bg-breath-card rounded-2xl overflow-hidden">
          <button
            onClick={handleExport}
            className="w-full p-4 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Download className="text-breath-primary" size={20} />
              <div className="text-left">
                <p className="text-breath-text font-medium">Export Data</p>
                <p className="text-xs text-breath-muted">Download your progress as JSON</p>
              </div>
            </div>
            <ChevronRight className="text-breath-muted" size={20} />
          </button>

          <button
            onClick={handleImport}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Upload className="text-breath-primary" size={20} />
              <div className="text-left">
                <p className="text-breath-text font-medium">Import Data</p>
                <p className="text-xs text-breath-muted">Restore from a backup file</p>
              </div>
            </div>
            <ChevronRight className="text-breath-muted" size={20} />
          </button>
        </div>
        {importError && (
          <p className="text-rose-400 text-sm mt-2 px-2">{importError}</p>
        )}
      </section>

      {/* Danger Zone */}
      <section className="px-4">
        <h2 className="text-sm font-semibold text-breath-muted mb-3 uppercase tracking-wider">
          Danger Zone
        </h2>
        <div className="bg-breath-card rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-rose-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="text-rose-400" size={20} />
              <div className="text-left">
                <p className="text-rose-400 font-medium">Reset All Progress</p>
                <p className="text-xs text-breath-muted">This cannot be undone</p>
              </div>
            </div>
            <ChevronRight className="text-breath-muted" size={20} />
          </button>
        </div>
      </section>

      {/* Progress Info */}
      {progress && (
        <section className="px-4 mt-6">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-breath-muted">
              Started: {new Date(progress.startDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-breath-muted">
              Current Day: {progress.currentDay} of 30
            </p>
            <p className="text-xs text-breath-muted">
              Exercises Completed: {progress.completedExercises.length}
            </p>
          </div>
        </section>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowResetConfirm(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-breath-card rounded-2xl p-6 z-50 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-rose-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-breath-text text-center mb-2">
              Reset All Progress?
            </h3>
            <p className="text-breath-muted text-center mb-6">
              This will delete all your data including baseline metrics, completed exercises, and
              weekly tracking. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-white/10 rounded-xl font-medium text-breath-text"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-rose-500 rounded-xl font-medium text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
