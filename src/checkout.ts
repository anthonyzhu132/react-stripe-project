/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import Stripe from 'stripe';
import { stripe } from './index';

// eslint-disable-next-line import/prefer-default-export
export async function createStripeCheckoutSession(
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
) {
  const url = 'http://localhost:3000'; // process.env.WEBAPP_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/failed`,
  });

  return session;
}
