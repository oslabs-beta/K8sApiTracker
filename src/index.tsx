import React, { useState } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import './static/styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);