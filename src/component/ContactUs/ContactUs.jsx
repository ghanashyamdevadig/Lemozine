"use client";

import React from "react";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <section className={styles.orderRideContainer} id="contact">
      <h2 className={styles.orderTitle}>Order your ride now</h2>
      <p className={styles.orderSubTitle}>
        <strong>Give us a call at 617-416-4459</strong>
        <br />

      </p>
      <p className={styles.orderSubTitle}>        Or leave a message to Reserve Your Luxury Experience Today!</p>

      <form className={styles.orderForm}>
        <div className={styles.inputGroup}>
          {/* <div className={styles.inputField}>
            <label>First Name</label>
            <input type="text" placeholder="First Name" required />
          </div>
          <div className={styles.inputField}>
            <label>Email *</label>
            <input type="email" placeholder="Email" required />
          </div> */}
        </div>

        <div className={styles.textAreaField}>
          <label>Leave us a message...</label>
          <textarea placeholder="Type your message here..." required></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </section>
  );
};

export default ContactUs;
