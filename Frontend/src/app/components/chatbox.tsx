'use client';

import { useChat } from '../context/ChatContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import AnimatedBlobs from './AnimatedBlobs';

type Reference = {
  project: string;
  section: string;
  label: string;
};

type ChatTurn = { 
  role: 'user' | 'ai'; 
  text: string;
  references?: Reference[];
};

// Map project IDs to their URLs
const PROJECT_URLS: Record<string, string> = {
  'risk-platform': '/dune/risk-platform',
  'stillsuit': '/dune/stillsuit',
  'workflows': '/dune/workflows',
  'universitypark': '/universitypark',
  'chainreactive': '/chainreactive',
  'crashr': '/crashr',
  'cadence': '/cadence',
  'everestos': '/everestos',
};

const PAGE_PROMPTS: Record<string, string[]> = {
  "/": [
    "Tell me more about Adi.",
    "What projects has Adi worked on?"
  ],
};

// Shimmer loading component
const LoadingShimmer = () => (
  <div className="space-y-2.5">
    <div className="space-y-2">
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-3/4 animate-shimmer" 
           style={{ backgroundSize: '200% 100%' }} />
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full animate-shimmer" 
           style={{ backgroundSize: '200% 100%', animationDelay: '0.1s' }} />
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-2/3 animate-shimmer" 
           style={{ backgroundSize: '200% 100%', animationDelay: '0.2s' }} />
    </div>
  </div>
);

// Message component with animation
const ChatMessage = ({ 
  turn, 
  index, 
  onReferenceClick 
}: { 
  turn: ChatTurn; 
  index: number;
  onReferenceClick: (ref: Reference) => void;
}) => {
  const isUser = turn.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.23, 1, 0.32, 1],
        delay: index === 0 ? 0 : 0.05 
      }}
      className={clsx(
        'flex flex-col w-full',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      <div className={clsx(
        "px-4 py-3 rounded-2xl text-base leading-relaxed max-w-[80%]",
        isUser
          ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-md shadow-md"
          : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm"
      )}>
        <div className="whitespace-pre-wrap break-words">
          {turn.text}
        </div>
      </div>
      
      {/* Reference chips */}
      {!isUser && turn.references && turn.references.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex flex-wrap gap-2 mt-2"
        >
          {turn.references.map((ref, refIdx) => (
            <button
              key={refIdx}
              onClick={() => onReferenceClick(ref)}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100 hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
            >
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 16 16" 
                fill="none" 
                className="flex-shrink-0 transition-transform group-hover:translate-x-0.5"
              >
                <path 
                  d="M6 12L10 8L6 4" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {ref.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function ChatBox() {
  const { chatOpen, setChatOpen } = useChat();
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const [promptsVisible, setPromptsVisible] = useState(true);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!chatOpen) return;
    
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        doClose();
        return;
      }
      
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };
    
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (chatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [chatOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current && (chat.length > 0 || loading)) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end'
        });
      }, 100);
    }
  }, [chat, loading]);

  // Hide prompts if user types or chat is non-empty
  useEffect(() => {
    if (question || chat.length > 0 || loading) setPromptsVisible(false);
  }, [question, chat.length, loading]);

  // Reset prompts when chat is closed
  useEffect(() => {
    if (!chatOpen && chat.length === 0) setPromptsVisible(true);
  }, [chatOpen, chat.length]);

  const doClose = () => {
    setChatOpen(false);
    setQuestion('');
    setLoading(false);
  };

  const handleReferenceClick = (ref: Reference) => {
    const url = PROJECT_URLS[ref.project];
    if (!url) return;
    
    const fullUrl = `${url}#${ref.section}`;
    
    // Check if we're already on the right page
    if (pathname === url) {
      // Just scroll to the section
      const element = document.getElementById(ref.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to the page, then scroll after load
      router.push(fullUrl);
      setTimeout(() => {
        const element = document.getElementById(ref.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
    // Don't close chat - user can close it when ready
  };

  const handleAsk = async (msg?: string) => {
    const trimmed = (msg ?? question).trim();
    if (!trimmed) return;
    
    const newUserMessage: ChatTurn = { role: 'user', text: trimmed };
    setChat(current => [...current, newUserMessage]);
    setQuestion('');
    setPromptsVisible(false);
    setLoading(true);
    
    try {
      const res = await fetch('/api/askaboutadi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: trimmed,
          history: chat.map(c => ({ role: c.role, text: c.text }))
        }),
      });
      const data = await res.json();
      
      const aiMessage: ChatTurn = { 
        role: 'ai', 
        text: data.response || 'No response received.',
        references: data.references || []
      };
      setChat(current => [...current, aiMessage]);
    } catch (err) {
      console.error(err);
      setChat(current => [...current, { role: 'ai', text: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const promptChips = PAGE_PROMPTS[pathname || "/"] || [];

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          {/* Overlay & Blobs */}
          <motion.div
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pointer-events-none relative w-full h-screen">
              <AnimatedBlobs expanded={true} loading={loading} />
            </div>
            
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="fixed top-6 right-8 flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-gray-200 bg-white/90 shadow-sm text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 transition-all z-[120]"
              onClick={doClose}
              tabIndex={0}
            >
              <span className="font-semibold tracking-wide">ESC</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.button>
          </motion.div>

          {/* Chat history */}
          <motion.div
            className="fixed left-0 right-0 bottom-0 top-0 z-[60] flex flex-col items-center w-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div 
              ref={chatContainerRef}
              className="flex-1 w-full max-w-2xl mx-auto flex flex-col pt-[100px] pb-[140px] px-6 pointer-events-auto overflow-y-auto"
              style={{ height: '100vh', scrollBehavior: 'smooth' }}
            >
              <div className="flex-1"></div>
              <div className="flex flex-col gap-4">
                {chat.map((turn, i) => (
                  <ChatMessage 
                    key={i} 
                    turn={turn} 
                    index={i}
                    onReferenceClick={handleReferenceClick}
                  />
                ))}
                
                {/* Loading state */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 rounded-2xl bg-white border border-gray-100 rounded-tl-md shadow-sm max-w-[75%]"
                  >
                    <LoadingShimmer />
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          </motion.div>

          {/* Prompt chips */}
          <AnimatePresence>
            {promptsVisible && chat.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.15 }}
                className="fixed left-0 right-0 bottom-[120px] z-[85] w-full flex flex-col items-center pointer-events-auto"
              >
                <p className="text-gray-400 text-sm mb-4 select-none">
                  Ask anything about Adi&apos;s work
                </p>
                {promptChips.length > 0 && (
                  <div className="flex flex-wrap gap-2 max-w-2xl w-full px-6 justify-center">
                    {promptChips.map((prompt, idx) => (
                      <motion.button
                        key={prompt + idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        type="button"
                        onClick={() => handleAsk(prompt)}
                        className="border border-gray-200 bg-white/80 text-gray-700 font-medium rounded-full px-4 py-2 text-sm transition-all hover:bg-white hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat input */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="fixed left-0 right-0 bottom-0 pb-8 pt-4 z-[80] w-full pointer-events-auto flex justify-center"
            style={{
              background: "linear-gradient(to top, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0))",
            }}
            onSubmit={e => {
              e.preventDefault();
              handleAsk();
            }}
          >
            <div className="rounded-2xl border border-gray-200 shadow-lg bg-white flex gap-2 py-2 px-3 items-center max-w-2xl w-full mx-6">
              <textarea
                ref={inputRef}
                value={question}
                disabled={loading}
                rows={1}
                placeholder="Ask me anything about Adi..."
                onChange={e => setQuestion(e.target.value)}
                className="resize-none bg-transparent px-3 py-2 text-base flex-1 font-normal border-none outline-none placeholder-gray-400"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAsk();
                  }
                }}
                autoFocus
              />
              
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className={clsx(
                  "flex items-center justify-center w-10 h-10 rounded-xl transition-all",
                  loading
                    ? "bg-gray-100 text-gray-300 cursor-wait"
                    : question.trim()
                      ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105"
                      : "bg-gray-100 text-gray-400",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                )}
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
