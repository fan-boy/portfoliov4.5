import { useChat } from '../../context/ChatContext';

/**
 * Hook to access chat state.
 * Overflow is now handled internally by ChatBox component.
 */
export function useChatOverflow() {
  const { chatOpen } = useChat();
  // Overflow control moved to ChatBox component to support minimized state
  return { chatOpen };
}
