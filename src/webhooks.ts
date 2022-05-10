import Stripe from 'stripe';
import { stripe } from './index';


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