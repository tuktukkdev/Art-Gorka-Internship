import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('admin-root');
const root = createRoot(container);
root.render(<App />);