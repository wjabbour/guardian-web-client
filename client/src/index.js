import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { loadCatalogForCurrentUrl } from './lib/catalogLoader';

async function init() {
  await loadCatalogForCurrentUrl();
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}

init();
