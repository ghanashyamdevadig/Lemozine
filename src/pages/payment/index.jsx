import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./payment.module.css";
import apiService from "../api/apiService";
import BookNow from "@/component/BookNowSec/BookNow";
import { useSelector } from "react-redux";
import ToastService from "@/config/toast";
import LoginSignupModal from "@/component/LoginSignUp/LoginSignupModal";

const stripePromise = loadStripe(
  "pk_test_51R6BqeFDa5LOpFSn5VdfMVGzuWDboUyjY8rPZu2aIzjTzIOHYaZgf7FTdHix1P7ikMvs4lPdLiFgxLCN5XtMiduc00f4FwkdLR"
);

const CheckoutForm = ({
  price,
  car,
  onPaymentStatus,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [stripe, setStripe] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const { is_authenticated } = useSelector((state) => state.user);

  useEffect(() => {
    stripePromise.then(setStripe);
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!is_authenticated) {
      setIsModalOpen(true);
      ToastService?.showError("Please login before paying");
      return;
    }
    setProcessing(true);
    onPaymentStatus("Initializing payment...", true);

    try {
      const data = {
        currency: "usd",
        unit_amount: parseFloat(price) * 100,
        description: `Car Rental: ${car}`,
      };

      const res = await apiService.bookings.checkoutSession(data);

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
      setError("Payment initialization failed.");
      onPaymentStatus("Payment initialization failed.", false);
    } finally {
      setProcessing(false);
    }
  }, [is_authenticated, price, car, stripe, onPaymentStatus, setIsModalOpen]);

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
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carPrices = useSelector((state) => state.user?.car_prices);

  useEffect(() => {
    const { car = "", price = "" } = router.query || {};
    setCar(car);
    setPrice(price);
  }, [router.query]);

  const formattedPrice = price ? parseFloat(price).toFixed(2) : "0.00";

  const handlePaymentStatus = useCallback((message, isProcessing) => {
    setPaymentStatus(message);
    setProcessing(isProcessing);
  }, []);

  return (
    <div className={styles.paymentPage}>
      <div style={{ marginTop: "100px" }}>
        <BookNow type={car} isPayment={true} carOptionsData={carPrices} />
      </div>
      <div
        style={{
          marginTop: "100px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CheckoutForm
          price={formattedPrice}
          car={car}
          onPaymentStatus={handlePaymentStatus}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {paymentStatus && (
        <section
          className={`${styles.paymentStatus} ${
            processing ? styles.statusProcessing : styles.statusSuccess
          }`}
        >
          <p>{paymentStatus}</p>
        </section>
      )}

      <LoginSignupModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default PaymentPage;
