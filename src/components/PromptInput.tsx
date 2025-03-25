
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';

const PromptInput: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const { submitPrompt, loading } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    
    await submitPrompt(prompt);
    setPrompt('');
  };

  return (
    <div className="w-full p-4 border-t border-border">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!prompt.trim() || loading} 
          className="rounded-full px-5 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PromptInput;
