'use client';

import { createContext } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
};

const defaultState: ThemeContextType = {
  theme: 'light',
  toggle: () => {
    throw new Error(
      'toggle function must be overridden by ThemeContextProvider'
    );
  },
};

export const ThemeContext = createContext<ThemeContextType>(defaultState);
