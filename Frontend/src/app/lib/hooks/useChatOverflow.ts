import { useEffect } from 'react';
import { useChat } from '../../context/ChatContext';

/**
 * Hook to handle body overflow when chat is open.
 * Prevents background scrolling when chat modal is active.
 */
export function useChatOverflow() {
  const { chatOpen } = useChat();
  
  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [chatOpen]);

  return { chatOpen };
}
