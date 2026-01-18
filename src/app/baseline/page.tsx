'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Square, Check, Info, ChevronRight } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { BaselineMetrics } from '@/types';

type TestType = 'intro' | 'bolt' | 'co2' | 'breath-rate' | 'results';
type TestState = 'instructions' | 'running' | 'complete';

interface TestResult {
  bolt: number | null;
  co2: number | null;
  breathRate: number | null;
}

export default function BaselinePage() {
  const router = useRouter();
  const { saveBaseline, progress } = useProgress();

  const [currentTest, setCurrentTest] = useState<TestType>('intro');
  const [testState, setTestState] = useState<TestState>('instructions');
  const [results, setResults] = useState<TestResult>({
    bolt: null,
    co2: null,
    breathRate: null,
  });

  // Timer state
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Breath counter for breath rate test
  const [breathCount, setBreathCount] = useState(0);
  const [breathRateTestDuration] = useState(60); // 60 seconds for breath rate test

  // Redirect if already completed
  useEffect(() => {
    if (progress?.baselineCompleted) {
      router.push('/');
    }
  }, [progress, router]);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 0.1);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Breath rate timer (auto-stop after duration)
  useEffect(() => {
    if (currentTest === 'breath-rate' && isRunning && elapsed >= breathRateTestDuration) {
      handleStopTimer();
    }
  }, [elapsed, currentTest, isRunning, breathRateTestDuration]);

  const handleStartTimer = () => {
    setElapsed(0);
    setBreathCount(0);
    setIsRunning(true);
    setTestState('running');
  };

  const handleStopTimer = useCallback(() => {
    setIsRunning(false);
    setTestState('complete');

    // Calculate and store result based on test type
    if (currentTest === 'bolt') {
      setResults((prev) => ({ ...prev, bolt: Math.round(elapsed) }));
    } else if (currentTest === 'co2') {
      setResults((prev) => ({ ...prev, co2: Math.round(elapsed) }));
    } else if (currentTest === 'breath-rate') {
      // Calculate breaths per minute
      const bpm = Math.round((breathCount / Math.min(elapsed, breathRateTestDuration)) * 60);
      setResults((prev) => ({ ...prev, breathRate: bpm }));
    }
  }, [currentTest, elapsed, breathCount, breathRateTestDuration]);

  const handleCountBreath = () => {
    setBreathCount((prev) => prev + 1);
  };

  const handleNextTest = () => {
    setTestState('instructions');
    setElapsed(0);

    if (currentTest === 'intro') {
      setCurrentTest('bolt');
    } else if (currentTest === 'bolt') {
      setCurrentTest('co2');
    } else if (currentTest === 'co2') {
      setCurrentTest('breath-rate');
    } else if (currentTest === 'breath-rate') {
      setCurrentTest('results');
    }
  };

  const handleSaveResults = () => {
    const baselineMetrics: BaselineMetrics = {
      boltScore: results.bolt,
      co2Tolerance: results.co2,
      restingBreathRate: results.breathRate,
      testedAt: new Date().toISOString(),
    };
    saveBaseline(baselineMetrics);
    router.push('/');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}.${tenths}`;
    }
    return `${secs}.${tenths}`;
  };

  const renderTestContent = () => {
    switch (currentTest) {
      case 'intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm mx-auto"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-breath-primary to-breath-secondary flex items-center justify-center mx-auto mb-6">
              <Info size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-breath-text mb-4">
              Baseline Testing
            </h1>
            <p className="text-breath-muted mb-6">
              Before starting the program, we&apos;ll measure three key metrics to track your progress over 30 days.
            </p>
            <div className="space-y-3 text-left mb-8">
              <div className="p-3 bg-breath-card rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold text-cyan-400">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-breath-text">BOLT Score</h3>
                  <p className="text-xs text-breath-muted">Body oxygen level test</p>
                </div>
              </div>
              <div className="p-3 bg-breath-card rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-breath-text">CO2 Tolerance</h3>
                  <p className="text-xs text-breath-muted">Carbon dioxide tolerance test</p>
                </div>
              </div>
              <div className="p-3 bg-breath-card rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-breath-text">Resting Breath Rate</h3>
                  <p className="text-xs text-breath-muted">Breaths per minute at rest</p>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextTest}
              className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
            >
              Begin Tests
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        );

      case 'bolt':
        return renderTestInterface(
          'BOLT Score',
          'Body Oxygen Level Test',
          [
            'Sit comfortably and relax for 2 minutes',
            'Take a normal breath in through your nose',
            'Take a normal breath out through your nose',
            'Pinch your nose and start the timer',
            'Stop when you feel the FIRST urge to breathe',
          ],
          'Time how long until you feel the first urge to breathe. Don\'t hold until it\'s uncomfortable.',
          'cyan'
        );

      case 'co2':
        return renderTestInterface(
          'CO2 Tolerance',
          'Maximum Exhale Duration',
          [
            'Take a full breath in through your nose',
            'Start the timer as you begin to exhale',
            'Exhale as slowly as possible through your nose',
            'Stop the timer when your lungs are completely empty',
          ],
          'Exhale as slowly and controlled as possible. This measures how well your body tolerates CO2.',
          'purple'
        );

      case 'breath-rate':
        return renderBreathRateTest();

      case 'results':
        return renderResults();

      default:
        return null;
    }
  };

  const renderTestInterface = (
    title: string,
    subtitle: string,
    instructions: string[],
    note: string,
    color: string
  ) => {
    const colorClasses = {
      cyan: 'from-cyan-500 to-blue-500 bg-cyan-500/20 text-cyan-400',
      purple: 'from-purple-500 to-pink-500 bg-purple-500/20 text-purple-400',
    };

    return (
      <AnimatePresence mode="wait">
        {testState === 'instructions' && (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-sm mx-auto"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses].split(' ').slice(0, 2).join(' ')} flex items-center justify-center mx-auto mb-4`}>
              <Play size={32} className="text-white ml-1" />
            </div>
            <h2 className="text-xl font-bold text-breath-text text-center mb-1">
              {title}
            </h2>
            <p className="text-breath-muted text-center mb-6">{subtitle}</p>

            <div className="bg-breath-card rounded-2xl p-4 mb-4">
              <h3 className="font-semibold text-breath-text mb-3">Instructions:</h3>
              <ol className="space-y-2">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full ${colorClasses[color as keyof typeof colorClasses].split(' ').slice(2, 4).join(' ')} flex items-center justify-center text-xs font-bold`}>
                      {index + 1}
                    </span>
                    <span className="text-breath-muted">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6">
              <p className="text-amber-400 text-sm">{note}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartTimer}
              className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Start Test
            </motion.button>
          </motion.div>
        )}

        {testState === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl font-mono font-bold text-breath-text mb-4"
            >
              {formatTime(elapsed)}
            </motion.div>
            <p className="text-breath-muted mb-8">
              {currentTest === 'bolt' ? 'Stop at first urge to breathe' : 'Stop when lungs are empty'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStopTimer}
              className="w-24 h-24 rounded-full bg-rose-500 flex items-center justify-center mx-auto"
            >
              <Square size={40} className="text-white" fill="white" />
            </motion.button>
            <p className="text-breath-muted text-sm mt-4">Tap to stop</p>
          </motion.div>
        )}

        {testState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-breath-text mb-2">
              {title} Complete
            </h2>
            <div className="text-5xl font-mono font-bold text-breath-primary mb-2">
              {Math.round(elapsed)}s
            </div>
            <p className="text-breath-muted mb-8">Your result has been recorded</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextTest}
              className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
            >
              Next Test
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderBreathRateTest = () => {
    return (
      <AnimatePresence mode="wait">
        {testState === 'instructions' && (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-sm mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
              <Play size={32} className="text-white ml-1" />
            </div>
            <h2 className="text-xl font-bold text-breath-text text-center mb-1">
              Resting Breath Rate
            </h2>
            <p className="text-breath-muted text-center mb-6">Breaths per minute</p>

            <div className="bg-breath-card rounded-2xl p-4 mb-4">
              <h3 className="font-semibold text-breath-text mb-3">Instructions:</h3>
              <ol className="space-y-2">
                <li className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-breath-muted">Sit comfortably and relax</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-breath-muted">Breathe naturally through your nose</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-breath-muted">Tap the button each time you EXHALE</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
                  <span className="text-breath-muted">Continue for 60 seconds</span>
                </li>
              </ol>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6">
              <p className="text-amber-400 text-sm">Don&apos;t try to control your breathing. Just observe and count naturally.</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartTimer}
              className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Start Test
            </motion.button>
          </motion.div>
        )}

        {testState === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <div className="text-4xl font-mono font-bold text-breath-muted mb-2">
              {Math.floor(breathRateTestDuration - elapsed)}s
            </div>
            <p className="text-breath-muted text-sm mb-8">remaining</p>

            <div className="text-6xl font-bold text-breath-primary mb-2">
              {breathCount}
            </div>
            <p className="text-breath-muted mb-8">breaths counted</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCountBreath}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30"
            >
              <span className="text-white text-lg font-semibold">Tap on<br/>exhale</span>
            </motion.button>

            <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div
                className="h-full bg-breath-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(elapsed / breathRateTestDuration) * 100}%` }}
              />
            </div>
          </motion.div>
        )}

        {testState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-breath-text mb-2">
              Breath Rate Complete
            </h2>
            <div className="text-5xl font-mono font-bold text-breath-primary mb-2">
              {results.breathRate} <span className="text-2xl">bpm</span>
            </div>
            <p className="text-breath-muted mb-8">breaths per minute</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextTest}
              className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
            >
              View Results
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderResults = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm mx-auto"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-breath-text text-center mb-2">
          Baseline Complete!
        </h1>
        <p className="text-breath-muted text-center mb-8">
          Your starting measurements have been recorded
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-breath-card rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-breath-muted text-sm">BOLT Score</p>
              <p className="text-2xl font-bold text-breath-text">{results.bolt}s</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-breath-muted">Target: 40s+</p>
              <p className={`text-sm ${(results.bolt || 0) >= 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {(results.bolt || 0) >= 40 ? 'Excellent' : (results.bolt || 0) >= 25 ? 'Good' : 'Room to grow'}
              </p>
            </div>
          </div>

          <div className="bg-breath-card rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-breath-muted text-sm">CO2 Tolerance</p>
              <p className="text-2xl font-bold text-breath-text">{results.co2}s</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-breath-muted">Target: 80s+</p>
              <p className={`text-sm ${(results.co2 || 0) >= 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {(results.co2 || 0) >= 80 ? 'Excellent' : (results.co2 || 0) >= 60 ? 'Good' : 'Room to grow'}
              </p>
            </div>
          </div>

          <div className="bg-breath-card rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-breath-muted text-sm">Breath Rate</p>
              <p className="text-2xl font-bold text-breath-text">{results.breathRate} bpm</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-breath-muted">Target: 6-10 bpm</p>
              <p className={`text-sm ${(results.breathRate || 0) <= 12 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {(results.breathRate || 0) <= 10 ? 'Excellent' : (results.breathRate || 0) <= 12 ? 'Good' : 'Room to grow'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-breath-muted text-sm text-center mb-6">
          You&apos;ll measure these again each week to track your progress.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveResults}
          className="w-full py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
        >
          Start Day 1
          <ChevronRight size={20} />
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Header */}
      {currentTest !== 'intro' && currentTest !== 'results' && (
        <header className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            {['bolt', 'co2', 'breath-rate'].map((test, index) => (
              <div
                key={test}
                className={`w-16 h-1 rounded-full ${
                  test === currentTest
                    ? 'bg-breath-primary'
                    : ['bolt', 'co2', 'breath-rate'].indexOf(currentTest) > index
                    ? 'bg-emerald-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </header>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        {renderTestContent()}
      </div>
    </div>
  );
}
