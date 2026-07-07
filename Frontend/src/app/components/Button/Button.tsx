'use client';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Avatar from '../../../../public/assets/About/profile.webp';

export default function Button() {
  const { chatOpen, setChatOpen } = useChat();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

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

  // Hide when chat is open
  if (chatOpen) return null;

  return (
    <motion.button
      type="button"
      onClick={() => setChatOpen(true)}
      className="flex items-center gap-3 rounded-full pl-2 pr-4 py-2 font-medium text-sm bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm text-gray-700 hover:bg-white/90 hover:text-gray-900 hover:border-gray-300/80 hover:shadow-md transition-all outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-gray-200"
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Prominent avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
        <Image src={Avatar} alt="Aadi" className="w-full h-full object-cover" />
      </div>
      Chat with Aadi
      {/* Keyboard shortcut */}
      <span className="flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100/80 border border-gray-200/60 text-gray-500">
        {shortcutKey}
      </span>
    </motion.button>
  );
}
