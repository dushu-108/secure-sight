"use client";

import { Play, Pause, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ControlBarProps {
  currentTime: Date;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPlay: () => void;
  onPause: () => void;
  isPlaying?: boolean;
}

export default function ControlBar({ 
  currentTime, 
  onZoomIn, 
  onZoomOut, 
  onPlay, 
  onPause,
  isPlaying = false
}: ControlBarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-black">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={isPlaying ? onPause : onPlay}
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          <span className="ml-2 text-xs">{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        
        <div className="text-xs text-gray-400 px-3">
          {format(currentTime, 'h:mm a')}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onZoomOut}
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <div className="text-xs text-gray-400 w-16 text-center">
          {100}%
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onZoomIn}
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}