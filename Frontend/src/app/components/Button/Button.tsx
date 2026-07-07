'use client';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Avatar from '../../../../public/assets/About/profile.webp';

export default function Button() {
  const { chatOpen, setChatOpen } = useChat();
  const [isMac, setIsMac] = useState(false);

  // Detect platform for keyboard shortcut
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setChatOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setChatOpen]);

  const shortcutKey = isMac ? '⌘K' : '⌘K';

  return (
    <motion.button
      type="button"
      onClick={() => setChatOpen(true)}
      aria-busy={chatOpen}
      className={clsx(
        'flex items-center gap-3 rounded-full px-4 py-2 font-medium text-sm transition-all outline-none cursor-pointer select-none',
        // Very subtle, matching your page's lightness
        'bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm',
        'text-gray-700',
        // Gentle hover - matches your nav
        'hover:bg-white/90 hover:text-gray-900 hover:border-gray-300/80 hover:shadow-md',
        'focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:outline-none',
        chatOpen && 'opacity-90'
      )}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Avatar */}
      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
        <Image src={Avatar} alt="Aadi" className="w-full h-full object-cover" />
      </div>
      Chat with Aadi
      {/* Keyboard shortcut */}
      <span
        className={clsx(
          'flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium',
          'bg-gray-100/80 border border-gray-200/60 text-gray-500',
        )}
      >
        {shortcutKey}
      </span>
      
      
    </motion.button>
  );
}
