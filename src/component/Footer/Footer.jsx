import { useState } from "react";
import styles from "./Footer.module.css";
import { Facebook, Instagram, Linkedin, Phone, ArrowUp } from "lucide-react";
import { useRouter } from "next/router";

export default function Footer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handleScroll = (id) => {

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } 
    setIsDrawerOpen(false);
  };
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
        <p onClick={() =>router.push("/")}>Home</p>
        <p  onClick={() => router.push("/about")}>About Us</p>
        <p  onClick={() => router.push("/services")}>Our Services</p>
        <p onClick={() =>router.push("/")}>Book a Ride</p>
        <p onClick={() => router.push("/contact-us")}>Contact Us</p>
      </nav>

      {/* Legal Links */}
      <div className={styles.legal}>
        <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a>
      </div>

      {/* Floating Buttons */}
      {/* <div className={styles.floatingButtons}>
        <div className={styles.floatingButton}><Phone size={20} /></div>
        <div className={styles.floatingButton}><ArrowUp size={20} /></div>
      </div> */}
    </footer>
  );
}