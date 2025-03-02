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
  } = router.query;

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Handle payment form submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Simple validation for payment details
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expirationDate ||
      !paymentDetails.cvv ||
      !paymentDetails.cardholderName
    ) {
      alert("Please fill in all payment details.");
      return;
    }

    // Simulating the payment process
    setProcessing(true);
    setPaymentStatus("Processing payment...");

    // Simulate payment success
    setTimeout(() => {
      setProcessing(false);
      setPaymentStatus("Payment successful! Redirecting to confirmation page...");
      setTimeout(() => {
        router.push("/booking-confirmation"); // Redirect to confirmation page
      }, 2000);
    }, 2500);
  };

  // Detect card type based on first digits
  const getCardType = () => {
    const number = paymentDetails.cardNumber.replace(/\s+/g, '');
    
    if (/^4/.test(number)) return "Visa";
    if (/^5[1-5]/.test(number)) return "Mastercard";
    if (/^3[47]/.test(number)) return "American Express";
    if (/^6(?:011|5)/.test(number)) return "Discover";
    
    return null;
  };

  // Format price for display
  const formattedPrice = price ? parseFloat(price).toFixed(2) : "0.00";

  return (
    <div className={styles.paymentPage}>
      {/* Title */}
      <section className={styles.paymentHeader}>
        <h1>Complete Your Booking</h1>
        <p>Please review your selection and enter your payment information to secure your reservation.</p>
      </section>

      {/* Car and Price Summary */}
      <section className={styles.paymentSummary}>
        <div className={styles.paymentSummaryCard}>
          <div className={styles.carImageContainer}>
            <img src={imageUrl} alt={car} className={styles.carImage} />
          </div>
          
          <div className={styles.carDetails}>
            <h3>{car}</h3>
            
            <div className={styles.carInfoGrid}>
              <div className={styles.carInfoItem}>
                <strong>Passengers</strong>
                <span>{maxPassengers}</span>
              </div>
              
              <div className={styles.carInfoItem}>
                <strong>Luggage Space</strong>
                <span>{luggageSpace}</span>
              </div>
              
              <div className={styles.carInfoItem}>
                <strong>Features</strong>
                <span>{features}</span>
              </div>
              
              <div className={styles.carInfoItem}>
                <strong>Description</strong>
                <span>{description}</span>
              </div>
            </div>
            
            <div className={styles.priceTag}>
              ${formattedPrice}
              <small>total</small>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <form className={styles.paymentForm} onSubmit={handlePaymentSubmit}>
        <h2 className={styles.formTitle}>Payment Information</h2>
        
        <div className={styles.formGroup}>
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            placeholder="As it appears on your card"
            value={paymentDetails.cardholderName}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardholderName: e.target.value,
              })
            }
            required
          />
        </div>

        <div className={styles.formGroup + ' ' + styles.cardNumberGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardNumber: formatCardNumber(e.target.value),
              })
            }
            maxLength="19"
            required
          />
          {getCardType() && (
            <div className={styles.cardIcon}>{getCardType()}</div>
          )}
        </div>

        <div className={styles.formRow}>
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
              required
            />
          </div>

          <div className={styles.formGroup + ' ' + styles.cvvGroup}>
            <label htmlFor="cvv">Security Code (CVV)</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              value={paymentDetails.cvv}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cvv: e.target.value.replace(/[^0-9]/g, ''),
                })
              }
              maxLength="4"
              required
            />
            <div className={styles.cvvTooltip} title="3-4 digits usually found on the back of your card">?</div>
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.submitButtonContainer}>
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={processing}
          >
            {processing ? 'Processing...' : `Complete Payment $${formattedPrice}`}
          </button>
        </div>
      </form>

      {/* Payment Status */}
      {paymentStatus && (
        <section className={`${styles.paymentStatus} ${processing ? styles.statusProcessing : styles.statusSuccess}`}>
          <p>{paymentStatus}</p>
        </section>
      )}
    </div>
  );
};

export default PaymentPage;