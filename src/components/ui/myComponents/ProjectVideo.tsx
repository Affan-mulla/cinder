import React, { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const ProjectVideo = ({ link, durationProp }: { link: string, durationProp: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationProp || 0);
  

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const value = parseFloat(e.target.value);
    if (video) {
      video.currentTime = (value / 100) * video.duration;
      setProgress(value);
    }
  };


  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-xl group">
      <video
        ref={videoRef}
        src={link}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-auto bg-black"
      />

      {/* Controls overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto group-hover:bg-black/20 transition">
        <button
          onClick={togglePlay}
          className="p-4 bg-black/50 text-white rounded-full hover:bg-black/80 pointer-events-auto"
        >
          {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
        </button>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center gap-3 transition pointer-events-auto">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full accent-white"
        />
        <Volume2 className="text-white" size={20} /> 
        <span className="text-white text-sm font-mono min-w-[70px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default ProjectVideo;
