'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, TrendingUp, Settings, Zap } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/toolkit', icon: Zap, label: 'Toolkit' },
  { href: '/progress', icon: TrendingUp, label: 'Progress' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navigation() {
  const pathname = usePathname();

  // Hide navigation on exercise and baseline pages
  if (pathname.startsWith('/exercise') || pathname.startsWith('/baseline') || pathname.startsWith('/onboarding')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-breath-card/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-breath-primary bg-breath-primary/10'
                    : 'text-breath-muted hover:text-breath-text'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-breath-card" />
    </nav>
  );
}
