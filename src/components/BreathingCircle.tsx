'use client';

import { motion } from 'framer-motion';
import { BreathPhase } from '@/types';

interface BreathingCircleProps {
  phase: BreathPhase;
  duration: number; // Duration of current phase in seconds
  isActive: boolean;
  size?: number;
}

const phaseColors: Record<BreathPhase, { primary: string; secondary: string; glow: string }> = {
  inhale: {
    primary: 'from-cyan-400 to-blue-500',
    secondary: 'from-cyan-500/30 to-blue-600/30',
    glow: 'shadow-cyan-500/50',
  },
  'hold-in': {
    primary: 'from-blue-400 to-purple-500',
    secondary: 'from-blue-500/30 to-purple-600/30',
    glow: 'shadow-purple-500/50',
  },
  exhale: {
    primary: 'from-purple-400 to-pink-500',
    secondary: 'from-purple-500/30 to-pink-600/30',
    glow: 'shadow-pink-500/50',
  },
  'hold-out': {
    primary: 'from-pink-400 to-orange-500',
    secondary: 'from-pink-500/30 to-orange-600/30',
    glow: 'shadow-orange-500/50',
  },
  rest: {
    primary: 'from-emerald-400 to-teal-500',
    secondary: 'from-emerald-500/30 to-teal-600/30',
    glow: 'shadow-emerald-500/50',
  },
};

const phaseLabels: Record<BreathPhase, string> = {
  inhale: 'Breathe In',
  'hold-in': 'Hold',
  exhale: 'Breathe Out',
  'hold-out': 'Hold',
  rest: 'Rest',
};

export default function BreathingCircle({
  phase,
  duration,
  isActive,
  size = 280,
}: BreathingCircleProps) {
  const colors = phaseColors[phase];

  // Calculate scale based on phase
  const getScale = () => {
    if (!isActive) return 0.6;
    switch (phase) {
      case 'inhale':
        return 1;
      case 'hold-in':
        return 1;
      case 'exhale':
        return 0.6;
      case 'hold-out':
        return 0.6;
      case 'rest':
        return 0.8;
      default:
        return 0.8;
    }
  };

  // Get animation duration - use phase duration for smooth transition
  const getAnimationDuration = () => {
    if (!isActive) return 0.5;
    if (phase === 'hold-in' || phase === 'hold-out') return 0.3;
    return duration;
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <motion.div
        className={`absolute rounded-full bg-gradient-to-br ${colors.secondary} blur-xl`}
        style={{ width: size * 1.2, height: size * 1.2 }}
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          opacity: isActive ? [0.3, 0.5, 0.3] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring */}
      <motion.div
        className={`absolute rounded-full bg-gradient-to-br ${colors.secondary}`}
        style={{ width: size * 0.9, height: size * 0.9 }}
        animate={{
          scale: getScale() * 0.95,
        }}
        transition={{
          duration: getAnimationDuration(),
          ease: 'easeInOut',
        }}
      />

      {/* Main breathing circle */}
      <motion.div
        className={`absolute rounded-full bg-gradient-to-br ${colors.primary} shadow-2xl ${colors.glow}`}
        style={{ width: size * 0.7, height: size * 0.7 }}
        animate={{
          scale: getScale(),
        }}
        transition={{
          duration: getAnimationDuration(),
          ease: phase === 'inhale' ? 'easeOut' : phase === 'exhale' ? 'easeIn' : 'easeInOut',
        }}
      />

      {/* Inner highlight */}
      <motion.div
        className="absolute rounded-full bg-white/20"
        style={{ width: size * 0.3, height: size * 0.3 }}
        animate={{
          scale: getScale() * 0.8,
          opacity: isActive ? [0.2, 0.4, 0.2] : 0.1,
        }}
        transition={{
          duration: getAnimationDuration(),
          ease: 'easeInOut',
        }}
      />

      {/* Phase label */}
      <motion.div
        className="absolute flex flex-col items-center justify-center text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-2xl font-semibold text-white drop-shadow-lg">
          {phaseLabels[phase]}
        </span>
      </motion.div>
    </div>
  );
}
