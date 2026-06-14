'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

/** A no-op subscribe function — used to make useSyncExternalStore return
 *  different values on server vs. client without triggering any effects. */
function subscribe(cb: () => void) {
  // Nothing to subscribe to; we just need the snapshot to differ
  return () => cb();
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Returns true on the client, false during SSR — hydration-safe with no setState in effects
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,   // client snapshot
    () => false,  // server snapshot
  );

  if (!isClient) {
    return (
      <div className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-transparent" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-10 h-10 rounded-full flex items-center justify-center border border-[#2a2a2a] hover:border-[#c9a84c]/50 bg-[#111111] text-[#cccccc] hover:text-[#c9a84c] transition-all duration-200 cursor-pointer overflow-hidden group shadow-md"
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun size={18} className="group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </motion.div>
    </button>
  );
}
