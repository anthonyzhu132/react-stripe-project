import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const stripe = loadStripe(
  'pk_test_51Kqr2CJrNYMwfXujfoPmTCM1xb6qQtTKko5cAg7rehmMFKa4Ab2kJPtLWO9dhROjDcjEmF8CQdidN6zNDnPTcKdR00Mxnxwq83',
);

export const firebaseConfig = {
  // your config
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripe}>
        <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
