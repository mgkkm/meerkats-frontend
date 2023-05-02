import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  <RecoilRoot>
    <RouterProvider router={Router} />
  </RecoilRoot>
);
reportWebVitals();
