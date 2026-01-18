'use client';

import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
  isActive: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Timer({ seconds, isActive, showLabel = true, size = 'lg' }: TimerProps) {
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return secs.toString();
  };

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`font-mono font-bold text-white ${sizeClasses[size]}`}
        animate={{
          scale: isActive && seconds <= 3 ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {formatTime(seconds)}
      </motion.div>
      {showLabel && (
        <span className="text-breath-muted text-sm">
          {seconds <= 3 && isActive ? 'Get ready...' : 'seconds'}
        </span>
      )}
    </div>
  );
}
