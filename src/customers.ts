import Stripe from 'stripe';
import stripe from '.';
import { db } from './firebase';

export default async function getOrCreateCustomer(userId: string, params?: Stripe.CustomerCreateParams) {
  // Query for user if it exists
  const userSnapshot = await db.collection('users').doc(userId);

  const { stripeCustomerId, email } = userSnapshot.data();

  // If missing customerID, create it
  if (!stripeCustomerId) {
    // Create new
    const customer = await stripe.customers.create({
      email,
      metadata: {
        firebaseUID: userId,
      },
      ...params,
    });
    await userSnapshot.ref.update({ stripeCustomerId: customer.id });
    return customer;
  }
  return await stripe.customers.retrieve(stripeCustomerId) as Stripe.Customer;
}
