import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export default function DeveloperIntroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="card group relative aspect-video w-full overflow-hidden rounded-2xl border border-brand-500/30 bg-ink-950/80 shadow-2xl shadow-brand-500/10">
      {/* Background glow behind video */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500/20 via-accent-500/20 to-brand-500/20 blur-xl opacity-60 transition-opacity group-hover:opacity-100" />

      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Video Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-mono font-medium text-brand-400 backdrop-blur-md border border-brand-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" /> Developer Intro
          </span>

          <button
            onClick={toggleFullscreen}
            className="rounded-full bg-black/60 p-2 text-soft hover:text-white backdrop-blur-md transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>

        {/* Play/Pause Center Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={togglePlay}
            className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-brand-500"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-soft">
          <p className="font-mono text-[11px] text-slate-300">Himanshu Bharti — AI & Backend SDE</p>
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-soft hover:text-white backdrop-blur-md border border-soft/40 transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-warn-400" /> Muted
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400" /> Unmuted
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
