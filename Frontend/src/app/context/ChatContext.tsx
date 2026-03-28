'use client';
import { createContext, useContext, useState } from "react";

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

type ChatContextType = {
  chatOpen: boolean;
  setChatOpen: (val: boolean) => void;
  chat: ChatTurn[];
  setChat: React.Dispatch<React.SetStateAction<ChatTurn[]>>;
  minimized: boolean;
  setMinimized: (val: boolean) => void;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextType>({
  chatOpen: false,
  setChatOpen: () => {},
  chat: [],
  setChat: () => {},
  minimized: false,
  setMinimized: () => {},
  clearChat: () => {},
});

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [minimized, setMinimized] = useState(false);
  
  const clearChat = () => {
    setChat([]);
    setMinimized(false);
  };

  return (
    <ChatContext.Provider value={{ chatOpen, setChatOpen, chat, setChat, minimized, setMinimized, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}
