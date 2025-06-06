import styles from "./BookingHeaderText.module.css";
import React from "react";

const BookingHeaderText = () => {
  return (
    <div className={styles.bgImage}>
      <p className={styles.title}>Select Your Car</p>
      <p className={styles.subtitle}>
        Choose the car type that suits your needs.
      </p>
    </div>
  );
};

export default BookingHeaderText;
