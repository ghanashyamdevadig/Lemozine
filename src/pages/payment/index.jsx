import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./payment.module.css";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51R6BqeFDa5LOpFSn5VdfMVGzuWDboUyjY8rPZu2aIzjTzIOHYaZgf7FTdHix1P7ikMvs4lPdLiFgxLCN5XtMiduc00f4FwkdLR");

// CheckoutForm component
const CheckoutForm = ({ price, car, onPaymentStatus }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
    },
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create payment intent from backend API
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount: parseFloat(price) * 100, // Convert to cents
        currency: "usd",
        description: `Car Rental: ${car}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        setError("Failed to initialize payment. Please try again.");
        console.error("Error creating payment intent:", err);
      });
  }, [price, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    if (!billingDetails.name || !billingDetails.email) {
      setError("Please fill in all required fields");
      return;
    }

    setProcessing(true);
    onPaymentStatus("Processing payment...", true);

    // Confirm card payment with client secret
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      onPaymentStatus(`Payment failed: ${payload.error.message}`, false);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      onPaymentStatus("Payment successful! Redirecting...", false);

      // Redirect after payment success
      setTimeout(() => {
        router.push({
          pathname: "/booking-confirmation",
          query: {
            paymentId: payload.paymentIntent.id,
            car,
          },
        });
      }, 2000);
    }
  };

  return (
    <form className={styles.paymentForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Payment Information</h2>
      {/* Billing details inputs */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          className={styles.inpClr}
          placeholder="John Smith"
          required
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className={styles.inpClr}
          type="email"
          placeholder="email@example.com"
          required
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          className={styles.inpClr}
          placeholder="123 Main St"
          required
          value={billingDetails.address.line1}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: { ...billingDetails.address, line1: e.target.value },
            });
          }}
        />
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input
            className={styles.inpClr}
            id="city"
            type="text"
            placeholder="San Francisco"
            required
            value={billingDetails.address.city}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, city: e.target.value },
              });
            }}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input
            id="state"
            className={styles.inpClr}
            type="text"
            placeholder="CA"
            required
            value={billingDetails.address.state}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, state: e.target.value },
              });
            }}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="zip">ZIP</label>
          <input
            className={styles.inpClr}
            id="zip"
            type="text"
            placeholder="94103"
            required
            value={billingDetails.address.postal_code}
            onChange={(e) => {
              setBillingDetails({
                ...billingDetails,
                address: { 
                  ...billingDetails.address, 
                  postal_code: e.target.value.replace(/[^0-9]/g, '')
                },
              });
            }}
          />
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="card">Credit Card</label>
        <div className={styles.cardElementContainer}>
          <CardElement
            id="card"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.submitButtonContainer}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={processing || !stripe || !clientSecret}
        >
          {processing ? 'Processing...' : `Pay $${parseFloat(price).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

// Main PaymentPage Component
const PaymentPage = () => {
  const router = useRouter();
  const { car, price, imageUrl, description, maxPassengers, luggageSpace, features } = router.query;

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePaymentStatus = (message, isProcessing) => {
    setPaymentStatus(message);
    setProcessing(isProcessing);
  };

  const formattedPrice = price ? parseFloat(price).toFixed(2) : "0.00";

  return (
    <div className={styles.paymentPage}>
      <section className={styles.paymentHeader}>
        <h1>Complete Your Booking</h1>
        <p>Please review your selection and enter your payment information to secure your reservation.</p>
      </section>

      <section className={styles.paymentSummary}>
        <div className={styles.paymentSummaryCard}>
          <div className={styles.carImageContainer}>
            <img src={imageUrl} alt={car} className={styles.carImage} />
          </div>
          <div className={styles.carDetails}>
            <h3>{car}</h3>
            {/* Car details */}
            <div className={styles.priceTag}>
              ${formattedPrice}
              <small>total</small>
            </div>
          </div>
        </div>
      </section>

      <Elements stripe={stripePromise}>
        <CheckoutForm price={formattedPrice} car={car} onPaymentStatus={handlePaymentStatus} />
      </Elements>

      {paymentStatus && (
        <section className={`${styles.paymentStatus} ${processing ? styles.statusProcessing : styles.statusSuccess}`}>
          <p>{paymentStatus}</p>
        </section>
      )}
    </div>
  );
};

export default PaymentPage;
