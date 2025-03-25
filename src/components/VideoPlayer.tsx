
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, User } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useChat } from '@/context/ChatContext';

const VideoPlayer: React.FC = () => {
  const { currentChat, loading } = useChat();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  const hasPrompts = currentChat?.prompts && currentChat.prompts.length > 0;
  const latestPrompt = hasPrompts ? currentChat?.prompts[currentChat.prompts.length - 1] : null;

  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle progress change
  const handleProgressChange = (values: number[]) => {
    setProgress(values[0]);
  };

  // Handle volume change
  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
    if (values[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Format time from seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Current prompt display */}
      {latestPrompt && (
        <div className="w-full flex items-center p-4 gap-2 animate-fade-in">
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-accent/20">
            <User className="h-4 w-4 text-accent" />
          </div>
          <p className="text-sm">{latestPrompt.content}</p>
          <button className="ml-auto">
            <svg className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      )}

      {/* Video display */}
      <div className="relative flex-1 flex items-center justify-center bg-card rounded-lg m-4 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted animate-pulse-light flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-muted-foreground animate-pulse">Generating video response...</p>
          </div>
        ) : !hasPrompts ? (
          <div className="text-center p-6">
            <h3 className="text-lg font-medium">No prompts yet</h3>
            <p className="text-muted-foreground mt-2">Submit a prompt to generate a video response</p>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
              <button 
                className="h-16 w-16 rounded-full bg-secondary/80 backdrop-blur flex items-center justify-center"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="rounded-full h-16 w-16 bg-secondary/50 backdrop-blur flex items-center justify-center">
                <Play className="h-6 w-6" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video controls */}
      <div className="p-4 space-y-2">
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground min-w-[40px]">
            {formatTime(progress)}
          </span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground min-w-[40px]">
            {formatTime(100)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/30 transition-colors"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/30 transition-colors"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
