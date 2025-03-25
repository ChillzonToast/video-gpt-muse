
import React from 'react';
import { PlusCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/context/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar: React.FC = () => {
  const { chats, currentChat, createNewChat, setCurrentChat } = useChat();

  return (
    <div className="w-64 h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80 transition-all duration-200"
          onClick={createNewChat}
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className={`w-full justify-start text-left h-auto py-3 px-3 ${
                currentChat?.id === chat.id
                  ? 'bg-sidebar-accent text-sidebar-foreground'
                  : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
              }`}
              onClick={() => setCurrentChat(chat.id)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium trim-text">{chat.title}</span>
                <span className="text-xs text-muted-foreground">
                  {chat.prompts.length} prompts
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Adele Parkson</span>
            <span className="text-xs text-muted-foreground">Premium User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
