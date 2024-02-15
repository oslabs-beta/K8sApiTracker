import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './static/styles.css';

// the exclamation point at the end is intentional here, it asserts that the value is not null 
// or undefined, allowing TypeScript to compile the code without type errors. This is useful when 
// you are certain an element exists in the DOM, but TypeScript's static analysis cannot infer
// this certainty. Use this operator with caution, as it bypasses TypeScript's safety checks.
const root = createRoot(document.getElementById('root')!);
root.render(<App />);