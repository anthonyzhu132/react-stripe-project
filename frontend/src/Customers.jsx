import React, { useState, useEffect, Suspense } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useUser, AuthCheck } from 'reactfire';
import firebase from 'firebase/app';
import { fetchFromAPI } from './helpers';
import { auth, db } from './firebase';

export function SignIn() {
  const signIn = async () => {
    const credential = await auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );
    const { uid, email } = credential.user;
    db.collection('users').doc(uid).set({ email }, { merge: true });
  };

  return (
    <button type="button" onClick={signIn}>
      Sign In with Google
    </button>
  );
}

export function SignOut({ user }) {
  return user && (
    <button
      type="button"
      onClick={() => auth.SignOut()}
    >
      Sign Out User
      {' '}
      {user.uid}
    </button>
  );
}

export function SaveCard() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useUser();

  const [setupIntent, setSetupIntent] = useState();
  const [wallet, setWallet] = useState([]);

  // Get wallet data
  const getWallet = async () => {
    if (user) {
      const paymentMethods = await fetchFromAPI('wallet', { method: 'GET' });
      setWallet(paymentMethods);
    }
  };

  // Get user wallet information on mount(render)
  useEffect(() => {
    getWallet();
  }, [user]);

  // Create the setup intent
  const createSetupIntent = async () => {
    const si = await fetchFromAPI('wallet');
    setSetupIntent(si);
  };

  // Handle submit of card details
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
  };
}
