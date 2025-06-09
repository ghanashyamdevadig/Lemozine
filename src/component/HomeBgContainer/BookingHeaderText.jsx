import styles from "./BookingHeaderText.module.css";
import React from "react";

const BookingHeaderText = () => {
  return (
    <div className={styles.bgImage}>
    <div className={styles.textContainer}>
        <p className={styles.title}>Select Your Car</p>
      <p className={styles.subtitle}>
        Choose the car type that suits your needs.
      </p>
    </div>
    </div>
  );
};

export default BookingHeaderText;
