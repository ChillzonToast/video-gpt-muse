
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
  videoUrl?: string;
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
      prompts: [],
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
      // Create new prompt
      const newPrompt: Prompt = {
        id: `prompt-${Date.now()}`,
        title: promptContent.slice(0, 30) + (promptContent.length > 30 ? '...' : ''),
        content: promptContent,
        timestamp: new Date(),
      };
      
      // Send request to API
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptContent }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }
      
      // Get the video blob from the response
      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      
      // Update the current chat with the new prompt and video URL
      const updatedChat = {
        ...currentChat,
        prompts: [...currentChat.prompts, newPrompt],
        videoUrl,
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
