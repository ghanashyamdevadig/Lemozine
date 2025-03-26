import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51R6BqeFDa5LOpFSn5VdfMVGzuWDboUyjY8rPZu2aIzjTzIOHYaZgf7FTdHix1P7ikMvs4lPdLiFgxLCN5XtMiduc00f4FwkdLR');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Destructure the data from the request body
      const { amount, currency, description } = req.body;

      // Create a PaymentIntent with the amount, currency, and description
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        description,
      });

      // Send the client secret to the frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
