import React, { useState } from 'react';
import {
  CardElement, useStripe, useElements, CardElement,
} from '@stripe/react-stripe-js';
import fetchFromApPI from './helpers';

export default function Payments() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState();

  const createPaymentIntent = async (event) => {
    const validAmount = Math.min(Math.max(amount, 50), 9999999);
    setAmount(validAmount);

    const pi = await fetchFromApPI('payments', { body: { amount: validAmount } });
    setPaymentIntent(pi);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    // Confirm Card Payment Details

    const {
      paymentIntent: updatedPaymentIntent,
      error,
    } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error(error);
      error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
      setPaymentIntent(updatedPaymentIntent);
    }
  };

  return (
    <>
      <div>
        <input
          type="number"
          value={amount}
          disabled={paymentIntent}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          disabled={amount <= 0}
          onClick={createPaymentIntent}
          hidden={paymentIntent}
          type="button"
        >
          `Ready to Pay $
          {(amount / 100).toFixed(2)}
          `
        </button>
      </div>

      <form onSubmit={handleSubmit}>

        <CardElement />
        <button type="submit">
          Pay
        </button>
      </form>

    </>
  );
}
