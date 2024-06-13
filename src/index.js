import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducer/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const container = document.getElementById('root');
const root = createRoot(container);

root.render( 
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </GoogleOAuthProvider>
);
