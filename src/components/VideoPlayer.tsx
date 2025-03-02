
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoPlayerProps {
  trailerUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer = ({ trailerUrl, isOpen, onClose }: VideoPlayerProps) => {
  const videoId = trailerUrl?.split('v=')[1];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="relative pt-[56.25%] w-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
