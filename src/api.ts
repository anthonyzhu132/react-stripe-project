/* eslint-disable @typescript-eslint/ban-types */
import express, {
  Request, Response, NextFunction,
} from 'express';
import cors from 'cors';
import { createStripeCheckoutSession } from './checkout';
import createPaymentIntent from './payments';
import { handleStripeWebhook } from './webhooks';
import { createSetupIntent } from './customers';

export const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.use(
  express.json({
    verify: (req, res, buffer) => (req.rawBody = buffer),
  }),
);

function runAsync(callback: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
}

app.post('/test', (req: Request, res: Response) => {
  const { amount } = req.body;

  res.status(200).send({ with_tax: amount * 7 });
});

app.post(
  '/checkouts/',
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(await createStripeCheckoutSession(body.line_items));
  }),
);

app.post(
  '/payments',
  runAsync(async ({ body }: Request, res: Response) => {
    res.send(
      await createPaymentIntent(body.amount),
    );
  }),
);

// Save card onto file with setupIntent
app.post(
  '/wallet',
  runAsync(async (req: Request, res: Response) => {
    const user = validateUser(req);
    const setupIntent = await createSetupIntent(user.uid);
    res.send(setupIntent);
  }),
);

app.post('/hooks', runAsync(handleStripeWebhook));
