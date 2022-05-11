import React from 'react';
import firebase from 'firebase/app';
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
