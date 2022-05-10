import Stripe from 'stripe';
import { stripe } from './index';

const webhookHandlers = {
  'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
    console.log('success filler data')
  },
  'payment_intent.faled': async (data: Stripe.PaymentIntent) => {
    console.log('failed filler data')
  }
}


export const handleStripeWebhook = asnyc(req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);

  try {
    await webhookHandlers[event.type](event.data.object);
    res.send([ received: true]);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Webhook error ${error.message}`)
  }
}