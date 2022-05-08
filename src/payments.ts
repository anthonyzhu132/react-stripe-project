import { stripe } from '.';

export default async function createPaymentIntent(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'cad',
  });

  paymentIntent.status;

  return paymentIntent;
}
