
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Prompt = {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  prompts: Prompt[];
  createdAt: Date;
};

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  createNewChat: () => void;
  setCurrentChat: (chatId: string) => void;
  submitPrompt: (prompt: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Project A',
      prompts: [
        {
          id: '1-1',
          title: 'Prompt 1',
          content: 'Tell me about artificial intelligence',
          timestamp: new Date(),
        },
        {
          id: '1-2',
          title: 'Prompt 2',
          content: 'What are the benefits of machine learning?',
          timestamp: new Date(),
        },
        {
          id: '1-3',
          title: 'Prompt 3',
          content: 'How does deep learning work?',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ]);
  
  const [currentChat, setCurrentChatState] = useState<Chat | null>(chats[0]);
  const [loading, setLoading] = useState<boolean>(false);

  const createNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: `New Chat`,
      prompts: [],
      createdAt: new Date(),
    };
    
    setChats([...chats, newChat]);
    setCurrentChatState(newChat);
  };

  const setCurrentChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId) || null;
    setCurrentChatState(chat);
  };

  const submitPrompt = async (promptContent: string) => {
    if (!currentChat) return;
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPrompt: Prompt = {
        id: `prompt-${Date.now()}`,
        title: promptContent.slice(0, 30) + (promptContent.length > 30 ? '...' : ''),
        content: promptContent,
        timestamp: new Date(),
      };
      
      const updatedChat = {
        ...currentChat,
        prompts: [...currentChat.prompts, newPrompt],
      };
      
      setChats(chats.map(chat => 
        chat.id === currentChat.id ? updatedChat : chat
      ));
      
      setCurrentChatState(updatedChat);
    } catch (error) {
      console.error('Error submitting prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chats,
    currentChat,
    loading,
    createNewChat,
    setCurrentChat,
    submitPrompt,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
