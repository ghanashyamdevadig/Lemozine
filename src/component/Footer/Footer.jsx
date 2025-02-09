import styles from "./Footer.module.css";
import { Facebook, Instagram, Linkedin, Phone, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Social Media Icons */}
      <div className={styles.socialIcons}>
        <div className={styles.icon}><Facebook size={20} /></div>
        <div className={styles.icon}><Instagram size={20} /></div>
        <div className={styles.icon}><Linkedin size={20} /></div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navLinks}>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Our Services</a>
        <a href="#">Book a Ride</a>
        <a href="#">Contact Us</a>
      </nav>

      <div className={styles.legal}>
        <a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a> | <a href="#">Our Partners</a>
      </div>
      <div className={styles.paymentIcons}>
        <img src="/images/mastercard.png" alt="MasterCard" />
        <img src="/images/visa.png" alt="Visa" />
        <img src="/images/amex.png" alt="Amex" />
        <img src="/images/discover.png" alt="Discover" />
      </div>

      {/* Floating Buttons */}
      <div className={styles.floatingButtons}>
        <div className={styles.floatingButton}><Phone size={20} /></div>
        <div className={styles.floatingButton}><ArrowUp size={20} /></div>
      </div>
    </footer>
  );
}
