import React, { createContext } from 'react';
import { ThemeContextType } from './types';

const ThemeContext = createContext<ThemeContextType>({
    theme: 'a theme',
    setTheme: (theme: string) => { }
})

export default ThemeContext;