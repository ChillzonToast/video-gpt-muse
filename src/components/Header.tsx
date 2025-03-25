
import React from 'react';
import { Moon, Bell, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChat } from '@/context/ChatContext';

const Header: React.FC = () => {
  const { currentChat } = useChat();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border glass z-10">
      <div className="flex-1">
        <h1 className="text-xl font-medium truncate">
          {currentChat?.title || 'New Chat'}
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Moon className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Info className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-9 w-9 transition-transform duration-200 hover:scale-105">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>UP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
