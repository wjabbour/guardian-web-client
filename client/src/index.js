import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { detectUrlKey, initWebCatalog } from 'guardian-common';

const catalogModules = import.meta.glob('../../common/catalogs/*.js');

async function init() {
  const urlKey = detectUrlKey();
  const loader = catalogModules[`../../common/catalogs/${urlKey}.js`];
  if (loader) {
    const mod = await loader();
    initWebCatalog(mod.catalog);
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}

init();
