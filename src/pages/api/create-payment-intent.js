// File: pages/api/create-payment-intent.js
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// Replace with your actual secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { amount, currency, description } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      // Optional: Specify payment method types to support
      payment_method_types: ['card'],
      // Optional: Add metadata
      metadata: {
        type: 'car_rental',
      },
    });

    // Send the client secret to the client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
}