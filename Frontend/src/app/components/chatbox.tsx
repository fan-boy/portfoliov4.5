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

const PROJECT_URLS: Record<string, string> = {
  'risk-platform': '/dune/risk-platform',
  'stillsuit': '/dune/stillsuit',
  'workflows': '/dune/workflows',
  'aep-creation': '/dune/aep-creation',
  'universitypark': '/universitypark',
  'chainreactive': '/chainreactive',
  'crashr': '/crashr',
  'cadence': '/cadence',
  'everestos': '/everestos',
};

// Reverse mapping: URL path -> project info for page context
const URL_TO_PROJECT: Record<string, { id: string; name: string }> = {
  '/dune/risk-platform': { id: 'risk-platform', name: 'Risk Platform' },
  '/dune/stillsuit': { id: 'stillsuit', name: 'Stillsuit Design System' },
  '/dune/workflows': { id: 'workflows', name: 'Dynamic Workflows' },
  '/dune/aep-creation': { id: 'aep-creation', name: 'AEP Builder' },
  '/universitypark': { id: 'universitypark', name: 'University Park' },
  '/chainreactive': { id: 'chainreactive', name: 'Chain Reactive' },
  '/crashr': { id: 'crashr', name: 'Crashr' },
  '/cadence': { id: 'cadence', name: 'Cadence' },
  '/everestos': { id: 'everestos', name: 'EverestOS' },
  '/about': { id: 'about', name: 'About Aadi' },
};

const PAGE_PROMPTS: Record<string, string[]> = {
  "/": [
    "Tell me more about Aadi.",
    "What projects has Aadi worked on?"
  ],
  "/about": [
    "What's Aadi's design philosophy?",
    "What are Aadi's key skills?"
  ],
  "/dune/risk-platform": [
    "Tell me about this project.",
    "What was the biggest challenge here?"
  ],
  "/dune/stillsuit": [
    "Tell me about this project.",
    "How does the token system work?"
  ],
  "/dune/workflows": [
    "Tell me about this project.",
    "What problem does this solve?"
  ],
  "/dune/aep-creation": [
    "Tell me about this project.",
    "How does the AI training work?"
  ],
  "/universitypark": [
    "Tell me about this project.",
    "What was your role here?"
  ],
  "/chainreactive": [
    "Tell me about this project.",
    "What made this challenging?"
  ],
  "/crashr": [
    "Tell me about this project.",
    "How does the app work?"
  ],
  "/cadence": [
    "Tell me about this project.",
    "What's unique about Cadence?"
  ],
  "/everestos": [
    "Tell me about this project.",
    "What was the design approach?"
  ],
};

const LoadingShimmer = () => (
  <div className="space-y-2">
    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer" 
         style={{ backgroundSize: '200% 100%' }} />
    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer" 
         style={{ backgroundSize: '200% 100%', animationDelay: '0.1s' }} />
  </div>
);

const ChatMessage = ({ 
  turn, 
  onReferenceClick,
  compact = false
}: { 
  turn: { role: 'user' | 'ai'; text: string; references?: Reference[] }; 
  onReferenceClick: (ref: Reference) => void;
  compact?: boolean;
}) => {
  const isUser = turn.role === 'user';
  
  return (
    <div className={clsx(
      'flex flex-col w-full animate-fade-in',
      isUser ? 'items-end' : 'items-start'
    )}>
      <div className={clsx(
        "rounded-2xl leading-relaxed",
        compact ? "px-3 py-2 text-sm max-w-[90%]" : "px-4 py-3 text-base max-w-[80%]",
        isUser
          ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-md shadow-md"
          : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm"
      )}>
        <div className="whitespace-pre-wrap break-words">{turn.text}</div>
      </div>
      
      {!isUser && turn.references && turn.references.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {turn.references.map((ref, refIdx) => (
            <button
              key={refIdx}
              onClick={() => onReferenceClick(ref)}
              className={clsx(
                "group inline-flex items-center gap-1 font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100 hover:border-indigo-200 transition-colors",
                compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
              )}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {ref.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ChatBox() {
  const { chatOpen, setChatOpen, chat, setChat, minimized, setMinimized } = useChat();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [promptsVisible, setPromptsVisible] = useState(true);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const miniInputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!chatOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (minimized) doClose();
        else if (chat.length > 0) setMinimized(true);
        else doClose();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen, minimized, chat.length]);

  useEffect(() => {
    if (chatOpen && !minimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (chatOpen && minimized && miniInputRef.current) {
      setTimeout(() => miniInputRef.current?.focus(), 100);
    }
  }, [chatOpen, minimized]);

  useEffect(() => {
    if (chatEndRef.current && (chat.length > 0 || loading) && !minimized) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
    }
  }, [chat, loading, minimized]);

  useEffect(() => {
    if (question || chat.length > 0 || loading) setPromptsVisible(false);
  }, [question, chat.length, loading]);

  useEffect(() => {
    if (!chatOpen && chat.length === 0) setPromptsVisible(true);
  }, [chatOpen, chat.length]);

  useEffect(() => {
    if (!chatOpen) setMinimized(false);
  }, [chatOpen, setMinimized]);

  // Lock/unlock body scroll based on chat state
  useEffect(() => {
    if (chatOpen && !minimized) {
      // Full screen - lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Closed or minimized - allow scroll
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [chatOpen, minimized]);

  const doClose = () => {
    setChatOpen(false);
    setQuestion('');
    setLoading(false);
    setMinimized(false);
  };

  const handleReferenceClick = (ref: Reference) => {
    const url = PROJECT_URLS[ref.project];
    if (!url) return;
    
    setMinimized(true);
    
    if (pathname === url) {
      document.getElementById(ref.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`${url}#${ref.section}`);
      setTimeout(() => {
        document.getElementById(ref.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  const handleAsk = async (msg?: string) => {
    const trimmed = (msg ?? question).trim();
    if (!trimmed) return;
    
    setChat(c => [...c, { role: 'user', text: trimmed }]);
    setQuestion('');
    setPromptsVisible(false);
    setLoading(true);
    
    // Get current page context
    const currentProject = URL_TO_PROJECT[pathname || ''] || null;
    
    try {
      const res = await fetch('/api/askaboutadi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: trimmed, 
          history: chat.map(c => ({ role: c.role, text: c.text })),
          currentPage: currentProject
        }),
      });
      const data = await res.json();
      setChat(c => [...c, { role: 'ai', text: data.response || 'No response received.', references: data.references || [] }]);
    } catch {
      setChat(c => [...c, { role: 'ai', text: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const promptChips = PAGE_PROMPTS[pathname || "/"] || [];

  if (!chatOpen) return null;

  // Minimized widget
  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[100] animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
          <button onClick={() => setMinimized(false)} className="text-xs font-medium text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Expand
          </button>
          <button onClick={doClose} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-gray-400">
              <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        {/* Messages */}
        <div className="p-3 max-h-72 overflow-y-auto space-y-2.5 bg-gray-50/30">
          {chat.slice(-4).map((turn, i) => (
            <ChatMessage key={i} turn={turn} onReferenceClick={handleReferenceClick} compact />
          ))}
          {loading && (
            <div className="px-3 py-2 rounded-2xl bg-white border border-gray-100 rounded-bl-md shadow-sm max-w-[90%]">
              <LoadingShimmer />
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); handleAsk(); }} className="p-2 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <input
              ref={miniInputRef}
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask a follow-up..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-300 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className={clsx(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                question.trim() && !loading ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-400"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Full screen chat
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md">
          <AnimatedBlobs expanded={true} loading={loading} />
        </div>
        
        {/* Header */}
        <div className="fixed top-6 right-8 flex gap-2 z-[120]">
          {chat.length > 0 && (
            <button
              onClick={() => setMinimized(true)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-gray-200 bg-white shadow-sm text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Minimize
            </button>
          )}
          <button
            onClick={doClose}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-gray-200 bg-white shadow-sm text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            ESC
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="absolute inset-0 overflow-y-auto pt-24 pb-36 px-6">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            {chat.map((turn, i) => (
              <ChatMessage key={i} turn={turn} onReferenceClick={handleReferenceClick} />
            ))}
            {loading && (
              <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100 rounded-bl-md shadow-sm max-w-[80%] animate-fade-in">
                <LoadingShimmer />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Prompts */}
        {promptsVisible && chat.length === 0 && (
          <div className="fixed left-0 right-0 bottom-28 flex flex-col items-center z-[60]">
            <p className="text-gray-400 text-sm mb-4">Ask anything about Aadi&apos;s work</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl px-6">
              {promptChips.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(prompt)}
                  className="border border-gray-200 bg-white text-gray-700 font-medium rounded-full px-4 py-2 text-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 pb-8 pt-4 flex justify-center z-[80]" style={{ background: 'linear-gradient(to top, white 60%, transparent)' }}>
          <form onSubmit={e => { e.preventDefault(); handleAsk(); }} className="w-full max-w-2xl px-6">
            <div className="rounded-2xl border border-gray-200 shadow-lg bg-white flex gap-2 py-2 px-3">
              <textarea
                ref={inputRef}
                value={question}
                disabled={loading}
                rows={1}
                placeholder="Ask me anything about Aadi..."
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAsk(); }}}
                className="resize-none bg-transparent px-3 py-2 text-base flex-1 outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  loading ? "bg-gray-100 text-gray-300" : question.trim() ? "bg-indigo-500 text-white shadow-md hover:bg-indigo-600" : "bg-gray-100 text-gray-400"
                )}
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
