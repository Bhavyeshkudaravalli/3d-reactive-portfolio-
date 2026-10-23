import { createContext } from 'react';

export const THEMES = [
  { id: 'light', label: 'Light', icon: 'Sun', color: '#2563eb', desc: 'Sunny Village' },
  { id: 'dark', label: 'Dark', icon: 'Moon', color: '#06b6d4', desc: 'Midnight Space' },
  { id: 'dusky', label: 'Dusky', icon: 'Sunset', color: '#f97316', desc: 'Twilight Sunset' },
  { id: 'ambient', label: 'Ambient', icon: 'Sparkles', color: '#10b981', desc: 'Emerald Aurora' },
  { id: 'sand', label: 'Sand', icon: 'Waves', color: '#d97706', desc: 'Desert Dune' },
];

export const ThemeContext = createContext();
