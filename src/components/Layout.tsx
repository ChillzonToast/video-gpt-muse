
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ChatProvider } from '@/context/ChatContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ChatProvider>
      <div className="h-screen w-screen flex overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </ChatProvider>
  );
};

export default Layout;
