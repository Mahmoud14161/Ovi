import { useEffect, useRef, useState } from 'react';
import { VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.08;

    // TRICK: Start muted (browsers ALWAYS allow muted autoplay),
    // then immediately unmute. This bypasses strict autoplay policies.
    audio.muted = true;

    const tryAutoplay = () => {
      audio.play()
        .then(() => {
          // Successfully started muted — now unmute smoothly
          audio.muted = false;
          setIsPlaying(true);
        })
        .catch(() => {
          // Last resort: wait for any user interaction
          const unlock = () => {
            audio.muted = false;
            audio.play()
              .then(() => {
                setIsPlaying(true);
                document.removeEventListener('click', unlock);
                document.removeEventListener('touchstart', unlock);
                document.removeEventListener('scroll', unlock);
                document.removeEventListener('keydown', unlock);
              })
              .catch(() => {});
          };
          document.addEventListener('click', unlock);
          document.addEventListener('touchstart', unlock);
          document.addEventListener('scroll', unlock);
          document.addEventListener('keydown', unlock);
        });
    };

    tryAutoplay();
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error toggling play:", err));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[99] flex items-center gap-3 group">
      {/* Native HTML5 Audio element */}
      <audio
        ref={audioRef}
        src="/bg-music.mp3"
        preload="auto"
        loop
        style={{ display: 'none' }}
      />

      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-brand-surface/90 backdrop-blur-sm border border-brand-border flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <div className="flex items-end gap-[3px] h-4">
            <span className="w-[3px] bg-brand-accent3 rounded-full animate-bounce [animation-duration:0.6s]" style={{ height: '50%' }}></span>
            <span className="w-[3px] bg-brand-accent3 rounded-full animate-bounce [animation-duration:0.9s] [animation-delay:0.15s]" style={{ height: '90%' }}></span>
            <span className="w-[3px] bg-brand-accent3 rounded-full animate-bounce [animation-duration:0.7s] [animation-delay:0.3s]" style={{ height: '35%' }}></span>
            <span className="w-[3px] bg-brand-accent3 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.05s]" style={{ height: '70%' }}></span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-brand-accent3" />
        )}
      </button>

      {/* Tooltip */}
      <span className="bg-brand-surface/95 backdrop-blur-sm border border-brand-border text-brand-text/80 text-xs px-3 py-1.5 rounded-full font-light shadow-md select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-sm:hidden">
        {isPlaying ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
      </span>
    </div>
  );
}
