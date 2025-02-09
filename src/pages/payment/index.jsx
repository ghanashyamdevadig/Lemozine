import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./payment.module.css";

const PaymentPage = () => {
  const router = useRouter();
  const {
    car,
    price,
    imageUrl,
    description,
    maxPassengers,
    luggageSpace,
    features,
  } = router.query; // Retrieve car and price from query params

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Handle payment form submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Simple validation for payment details
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expirationDate ||
      !paymentDetails.cvv
    ) {
      alert("Please fill in all payment details.");
      return;
    }

    // Simulating the payment process (you can integrate with a payment gateway later)
    setPaymentStatus("Processing payment...");

    // Simulate payment success
    setTimeout(() => {
      setPaymentStatus("Payment successful!");
      setTimeout(() => {
        // Navigate to a booking confirmation page or show success message
        alert("Booking successful!");
        router.push("/"); // Redirect to home after payment
      }, 1500);
    }, 2000);
  };

  return (
    <div className={styles.paymentPage}>
      {/* Title */}
      <section className={styles.paymentHeader}>
        <h1>Payment Details</h1>
        <p>Please review your booking and complete the payment to confirm.</p>
      </section>

      {/* Car and Price Summary */}
      <section className={styles.paymentSummary}>
        <div className={styles.paymentSummaryCard}>
          <h3>Selected Car: {car}</h3>
          <img src={imageUrl} alt={car} className={styles.carImage} />
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Max Passengers:</strong> {maxPassengers}
          </p>
          <p>
            <strong>Luggage Space:</strong> {luggageSpace}
          </p>
          <p>
            <strong>Features:</strong> {features}
          </p>
          <p>Price: ${parseFloat(price).toFixed(2)}</p>
        </div>
      </section>

      {/* Payment Form */}
      <form className={styles.paymentForm} onSubmit={handlePaymentSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="Enter your card number"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardNumber: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="month"
            id="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                expirationDate: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            placeholder="Enter CVV"
            value={paymentDetails.cvv}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cvv: e.target.value,
              })
            }
          />
        </div>

        {/* Submit Button */}
        <div className={styles.submitButtonContainer}>
          <button type="submit" className={styles.submitBtn}>
            Pay ${parseFloat(price).toFixed(2)}
          </button>
        </div>
      </form>

      {/* Payment Status */}
      {paymentStatus && (
        <section className={styles.paymentStatus}>
          <p>{paymentStatus}</p>
        </section>
      )}
    </div>
  );
};

export default PaymentPage;
