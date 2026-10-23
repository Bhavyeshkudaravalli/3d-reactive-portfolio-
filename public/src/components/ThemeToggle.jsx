import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sunset, Sparkles, Waves, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export const ThemeToggle = ({ compact = false }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { id: 'light', label: 'Light', icon: Sun, color: '#2563eb', accent: 'text-blue-500', desc: 'Sunny Village' },
    { id: 'dark', label: 'Dark', icon: Moon, color: '#06b6d4', accent: 'text-cyan-400', desc: 'Midnight Space' },
    { id: 'dusky', label: 'Dusky', icon: Sunset, color: '#f97316', accent: 'text-orange-400', desc: 'Twilight Sunset' },
    { id: 'ambient', label: 'Ambient', icon: Sparkles, color: '#10b981', accent: 'text-emerald-400', desc: 'Emerald Aurora' },
    { id: 'sand', label: 'Sand', icon: Waves, color: '#d97706', accent: 'text-amber-500', desc: 'Desert Dune' },
  ];

  const currentOption = options.find((opt) => opt.id === theme) || options[0];
  const CurrentIcon = currentOption.icon;

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (id) => {
    setTheme(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`theme-dropdown-trigger flex items-center gap-2 rounded-xl transition-all duration-200 focus:outline-none ${
          compact ? 'p-2' : 'px-3 py-2'
        } ${isOpen ? 'open' : ''}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select theme mode"
        title={`Current theme: ${currentOption.label}. Click to switch theme.`}
      >
        <div
          className="w-5 h-5 rounded-lg flex items-center justify-center transition-colors shrink-0"
          style={{ backgroundColor: `${currentOption.color}22` }}
        >
          <CurrentIcon className="w-3.5 h-3.5" style={{ color: currentOption.color }} />
        </div>

        {!compact && (
          <>
            <span className="text-xs font-semibold theme-dropdown-trigger-text">
              {currentOption.label}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: currentOption.color }}
            />
          </>
        )}

        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ color: isOpen ? 'var(--accent-primary)' : 'var(--text-muted)' }}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="theme-dropdown-panel absolute right-0 top-full mt-2 w-56 sm:w-60 z-50 rounded-2xl p-1.5 animate-fadeIn">
          <div className="theme-dropdown-header px-3 py-2 mb-1 flex items-center justify-between">
            <span className="theme-dropdown-header-title text-[11px] font-mono uppercase tracking-wider">
              Theme Modes
            </span>
            <span className="theme-dropdown-header-count text-[10px] font-mono font-bold">
              5 Options
            </span>
          </div>

          <div className="flex flex-col space-y-0.5">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isActive = theme === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`theme-dropdown-item w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                    isActive ? 'theme-dropdown-item-active' : ''
                  }`}
                  role="menuitem"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform"
                    style={{
                      backgroundColor: `${opt.color}20`,
                      border: `1px solid ${opt.color}40`,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: opt.color }} />
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="theme-dropdown-item-title text-xs font-semibold flex items-center gap-1.5">
                      {opt.label}
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: opt.color }}
                        />
                      )}
                    </span>
                    <span className="theme-dropdown-item-desc text-[10px] font-mono truncate">
                      {opt.desc}
                    </span>
                  </div>

                  {isActive && (
                    <Check
                      className="w-4 h-4 shrink-0 transition-all"
                      style={{ color: opt.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
