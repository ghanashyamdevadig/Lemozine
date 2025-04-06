import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./payment.module.css";
import apiService from "../api/apiService";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_51R6BqeFDa5LOpFSn5VdfMVGzuWDboUyjY8rPZu2aIzjTzIOHYaZgf7FTdHix1P7ikMvs4lPdLiFgxLCN5XtMiduc00f4FwkdLR");

const CheckoutForm = ({ price, car, onPaymentStatus }) => {
  const [stripe, setStripe] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const initStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };
    initStripe();
  }, []);

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      onPaymentStatus("Initializing payment...", true);

      const data = {
        currency: "usd",
        unit_amount: parseFloat(price) * 100,
        description: `Car Rental: ${car}`,
      };

      const res = await apiService.bookings.checkoutSession(data);
      console.log("Stripe session:", res);

      if (res?.data?.session_id) {
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.session_id,
        });

        if (result.error) {
          setError(result.error.message);
          onPaymentStatus(`Redirect failed: ${result.error.message}`, false);
        }
      } else {
        setError("Unable to create a checkout session.");
        onPaymentStatus("Unable to create a checkout session.", false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Payment initialization failed.");
      onPaymentStatus("Payment initialization failed.", false);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.paymentForm}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button
        className={styles.payButton}
        onClick={handleCheckout}
        disabled={processing || !stripe}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

const PaymentPage = () => {
  const router = useRouter();
  const [car, setCar] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (router?.query) {
      setCar(router.query.car || "");
      setPrice(router.query.price || "");
      setImageUrl(router.query.imageUrl || "");
    }
  }, [router.query]);

  const formattedPrice = price ? parseFloat(price).toFixed(2) : "0.00";

  const handlePaymentStatus = (message, isProcessing) => {
    setPaymentStatus(message);
    setProcessing(isProcessing);
  };

  return (
    <div className={styles.paymentPage}>
      <section className={styles.paymentHeader}>
        <h1>Complete Your Booking</h1>
        <p>Please review your selection and proceed to secure payment.</p>
      </section>

      <section className={styles.paymentSummary}>
        <div className={styles.paymentSummaryCard}>
          <div className={styles.carImageContainer}>
            <img src={imageUrl} alt={car} className={styles.carImage} />
          </div>
          <div className={styles.carDetails}>
            <h3>{car}</h3>
            <div className={styles.priceTag}>
              ${formattedPrice} <small>total</small>
            </div>
          </div>
        </div>
      </section>

      <CheckoutForm
        price={formattedPrice}
        car={car}
        onPaymentStatus={handlePaymentStatus}
      />

      {paymentStatus && (
        <section
          className={`${styles.paymentStatus} ${
            processing ? styles.statusProcessing : styles.statusSuccess
          }`}
        >
          <p>{paymentStatus}</p>
        </section>
      )}
    </div>
  );
};

export default PaymentPage;
