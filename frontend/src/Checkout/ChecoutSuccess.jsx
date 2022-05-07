import React from 'react';

export default function CheckoutSuccess() {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get('session_id');
  return (
    <h3>
      Checkout Success!
      {' '}
      {sessionId}
    </h3>
  );
}
