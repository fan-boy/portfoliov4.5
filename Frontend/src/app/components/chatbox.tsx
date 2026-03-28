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

  // Handle keyboard shortcuts - Only ESC when chat is open
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

  // Auto-scroll to bottom when new messages arrive
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
    
    // Close the chat
    doClose();
    
    // Navigate to the page with section hash
    const fullUrl = `${url}#${ref.section}`;
    router.push(fullUrl);
    
    // Smooth scroll after navigation (slight delay for page load)
    setTimeout(() => {
      const element = document.getElementById(ref.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
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
            className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="pointer-events-none relative w-full h-screen">
              <AnimatedBlobs expanded={true} loading={loading} />
            </div>
            {/* CLOSE button */}
            <button
              className="fixed top-6 right-8 flex items-center gap-1 rounded-full px-3 py-1 border border-gray-200 bg-white/90 shadow text-xs font-medium text-gray-400 hover:bg-indigo-50 hover:text-indigo-700 transition z-[120]"
              onClick={doClose}
              tabIndex={0}
            >
              <span className="font-semibold tracking-wide">ESC</span>
              <svg width="16" height="16" viewBox="0 0 16 16" className="ml-1" fill="none">
                <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Chat history */}
          <motion.div
            className="fixed left-0 right-0 bottom-0 top-0 z-[60] flex flex-col items-center w-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div 
              ref={chatContainerRef}
              className="flex-1 w-full max-w-3xl mx-auto flex flex-col pt-[120px] pb-[120px] px-6 pointer-events-auto overflow-y-auto"
              style={{ height: '100vh', scrollBehavior: 'smooth' }}
            >
              <div className="flex-1"></div>
              <div className="flex flex-col gap-3">
                {chat.map((turn, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'flex flex-col w-full',
                      turn.role === 'ai' ? 'items-start' : 'items-end'
                    )}
                  >
                    <div className={clsx(
                      "px-4 py-2 rounded-2xl max-w-[75%] text-base leading-relaxed",
                      turn.role === 'user'
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                    )}>
                      <div className="whitespace-pre-wrap break-words">
                        {turn.text}
                      </div>
                    </div>
                    
                    {/* Reference chips for AI messages */}
                    {turn.role === 'ai' && turn.references && turn.references.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 ml-1">
                        {turn.references.map((ref, refIdx) => (
                          <button
                            key={refIdx}
                            onClick={() => handleReferenceClick(ref)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full hover:bg-indigo-100 hover:border-indigo-300 transition-colors"
                          >
                            <svg 
                              width="12" 
                              height="12" 
                              viewBox="0 0 16 16" 
                              fill="none" 
                              className="flex-shrink-0"
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
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-sm rounded-bl-md">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          </motion.div>

          {/* Prompt chips - Only when no chat */}
          {promptsVisible && chat.length === 0 && (
            <div className="fixed left-0 right-0 bottom-[100px] z-[85] w-full flex flex-col items-center pointer-events-auto">
              <div className="text-gray-400 text-sm mb-4 select-none">
                Start a conversation. Ask anything about Adi!
              </div>
              {promptChips.length > 0 && (
                <div className="flex flex-wrap gap-3 max-w-3xl w-full px-6 justify-center">
                  {promptChips.map((prompt, idx) => (
                    <button
                      key={prompt + idx}
                      type="button"
                      onClick={() => handleAsk(prompt)}
                      className="border border-indigo-200 bg-indigo-50 text-indigo-700 font-medium rounded-full px-4 py-2 text-sm transition hover:bg-indigo-100 hover:border-indigo-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat input */}
          <motion.form
            className="fixed left-0 right-0 bottom-0 pb-6 z-[80] w-full pointer-events-auto flex justify-center"
            style={{
              background: "linear-gradient(to top, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0))",
              minHeight: '80px'
            }}
            onSubmit={e => {
              e.preventDefault();
              handleAsk();
            }}
          >
            <div className="rounded-full border border-gray-200 shadow-md bg-white/90 flex gap-2 py-2 px-3 items-center max-w-3xl w-full mx-6">
              <textarea
                ref={inputRef}
                value={question}
                disabled={loading}
                rows={1}
                placeholder="Ask me anything about Adi..."
                onChange={e => setQuestion(e.target.value)}
                className="resize-none bg-transparent px-3 py-1.5 text-base flex-1 font-normal border-none outline-none placeholder-gray-400"
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
                  "flex items-center gap-2 rounded-full px-4 py-1.5 font-medium text-sm border transition",
                  loading
                    ? "bg-indigo-100 border-indigo-200 text-indigo-300 cursor-wait"
                    : "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                )}
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-sm text-[11px] font-medium border border-indigo-300 text-indigo-700 bg-white">
                {"\u23CE"}
                </span>
                {loading ? 'Sending...' : 'Ask'}
              </button>
            </div>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
