import React from "react";
import styles from "./ContactUs.module.css";
import { useSelector } from "react-redux";
import apiService from "@/pages/api/apiService";
const ContactCTA = () => {
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const data = {
      Name: user?.name || "Anonymous",
      email: user?.email || "Anonymous@gmail.com",
      feedback: message,
    };

    try {
      const res = await apiService.users.giveFeedback(data);
      console.log(res, "Feedback Response");
      // Optionally show a success toast/message here
    } catch (error) {
      console.error("Feedback submission failed:", error);
      // Optionally show an error toast/message here
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.left}>
        <p className={styles.phone}>
          <div className={styles.icon}>
            <div>
              <img src="/svgSheet/fi_1959251.svg" />
            </div>
            <div>
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="message">Leave us a message...</label>
          <textarea id="message" name="message" placeholder="type your message here..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactCTA;