import React from "react";
import styles from "./ContactUs.module.css";

const ContactCTA = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.left}>
        <p className={styles.phone}>
          <div className={styles.icon}>
         <div><img src="/svgSheet/fi_1959251.svg" /></div> <div>
          Give us a call at <span className={styles.phoneNumber}>617-416-4459</span>
         </div>
         </div>
        </p>
        <p className={styles.description}>
          Order your ride now Or leave a message to <br />
          Reserve Your <span className={styles.highlight}>Luxury Experience Today!</span>
        </p>
      </div>
      <div className={styles.right}>
        <form className={styles.form}>
          <label htmlFor="message">Leave us a message...</label>
          <textarea id="message" name="message" placeholder="type your message here..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactCTA;
