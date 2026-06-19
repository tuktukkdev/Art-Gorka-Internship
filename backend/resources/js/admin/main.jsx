import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import App from './App';


const csrf = document.querySelector('meta[name="csrf-token"]')?.content;
if (csrf) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
}

const container = document.getElementById('admin-root');
const root = createRoot(container);
root.render(<App />);