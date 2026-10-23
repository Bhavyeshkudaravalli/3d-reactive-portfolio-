import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { themeAudio } from '../utils/themeAudio';
import { useTheme } from '../context/useTheme';

export const AudioToggle = ({ compact = false, floating = false }) => {
  const { theme } = useTheme();
  const [isMuted, setIsMuted] = useState(themeAudio.isMuted);
  const [soundName, setSoundName] = useState(themeAudio.getSoundName(theme));

  // Sync with audio engine state changes
  useEffect(() => {
    const unsubscribe = themeAudio.subscribe((state) => {
      setIsMuted(state.isMuted);
    });
    return unsubscribe;
  }, []);

  // Update theme soundscape whenever the active theme changes
  useEffect(() => {
    setSoundName(themeAudio.getSoundName(theme));
    if (!isMuted) {
      themeAudio.playTheme(theme);
    }
  }, [theme, isMuted]);

  const handleToggle = () => {
    const newMuted = themeAudio.toggleMute();
    setIsMuted(newMuted);
  };

  if (floating) {
    return (
      <div className="fixed bottom-5 left-5 z-40 animate-fadeIn">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 focus:outline-none ${
            isMuted
              ? 'theme-dropdown-trigger text-muted hover:border-cyan-500/40'
              : 'theme-dropdown-panel ring-1 ring-[var(--accent-primary)]/50 shadow-lg'
          }`}
          title={isMuted ? 'Click to enable ambient theme sound' : `Sound on: ${soundName}`}
          aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
        >
          <div className="relative flex items-center justify-center">
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold leading-tight theme-dropdown-item-title flex items-center gap-1.5">
              {!isMuted && (
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[var(--accent-primary)] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 bg-[var(--accent-primary)] rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 bg-[var(--accent-primary)] rounded-full animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
                </span>
              )}
              {isMuted ? 'Audio Muted' : soundName}
            </span>
            <span className="text-[9px] font-mono theme-dropdown-item-desc">
              {isMuted ? 'Click to Play' : 'Theme Ambiance'}
            </span>
          </div>
        </button>
      </div>
    );
  }

  // Header button version
  return (
    <button
      onClick={handleToggle}
      className={`theme-dropdown-trigger flex items-center gap-2 rounded-xl transition-all duration-200 focus:outline-none ${
        compact ? 'p-2' : 'px-3 py-2'
      } ${!isMuted ? 'ring-1 ring-[var(--accent-primary)]/50' : ''}`}
      title={isMuted ? 'Play Theme Sound' : `Mute (${soundName})`}
      aria-label="Toggle Theme Audio"
    >
      <div
        className="w-5 h-5 rounded-lg flex items-center justify-center transition-colors shrink-0"
        style={{
          backgroundColor: isMuted ? 'rgba(100, 116, 139, 0.15)' : 'rgba(var(--accent-primary), 0.15)',
        }}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
        )}
      </div>

      {!compact && (
        <span className="text-xs font-semibold theme-dropdown-trigger-text">
          {isMuted ? 'Mute' : 'Audio On'}
        </span>
      )}
    </button>
  );
};
