import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
    
  }
}
