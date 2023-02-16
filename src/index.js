import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import styled from 'styled-components';
import {BrowserRouter} from "react-router-dom"
import {StateProvider} from './Components/StateProvider';
import { useStateProvider } from './Components/StateProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <BrowserRouter>
    <StateProvider>
    <App />
    </StateProvider>
    </BrowserRouter>
 
  </React.StrictMode>
);
