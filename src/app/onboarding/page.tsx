'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Wind, Brain, Heart, Zap } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

const slides = [
  {
    icon: Wind,
    title: 'Welcome to Your Breathwork Journey',
    description:
      'Over the next 30 days, you\'ll master breathing techniques used by elite athletes and executives to optimize performance, recovery, and mental clarity.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Brain,
    title: 'Science-Backed Protocol',
    description:
      'Each technique is grounded in physiology and neuroscience. You\'ll learn to consciously shift your nervous system state using only your breath.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Four Weeks of Progression',
    description:
      'Week 1: Foundation. Week 2: Tolerance Building. Week 3: Integration. Week 4: Mastery. Each week builds on the last.',
    color: 'from-rose-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Daily Practice, Real Results',
    description:
      '10-15 minutes daily. Track your BOLT score, CO2 tolerance, and subjective metrics. Watch measurable improvements week over week.',
    color: 'from-amber-500 to-yellow-500',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useProgress();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      completeOnboarding();
      router.push('/baseline');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.push('/baseline');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Skip button */}
      <div className="flex justify-end">
        <button
          onClick={handleSkip}
          className="text-breath-muted text-sm hover:text-breath-text transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${slide.color} flex items-center justify-center mx-auto mb-8`}
            >
              <Icon size={48} className="text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold text-breath-text mb-4">
              {slide.title}
            </h1>
            <p className="text-breath-muted leading-relaxed">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-breath-primary'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-4">
        {currentSlide > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePrev}
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="flex-1 py-4 bg-breath-primary rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
        >
          {currentSlide === slides.length - 1 ? (
            'Start Baseline Testing'
          ) : (
            <>
              Next
              <ChevronRight size={20} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
