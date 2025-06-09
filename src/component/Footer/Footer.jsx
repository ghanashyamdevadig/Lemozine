import { useState } from "react";
import styles from "./Footer.module.css";
import { Facebook, Instagram, Linkedin, Phone, ArrowUp } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../assets/images/logo/massliveryLogo.png";

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
      <div className={styles.logoContainer}>
        <Image src={logo} height={50} width={180} priority />
      </div>
      <div className={styles.socialIcons}>
        <div className={styles.icon}>
          <Facebook size={20} />
        </div>
        <div className={styles.icon}>
          <Instagram size={20} />
        </div>
        <div className={styles.icon}>
          <Linkedin size={20} />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navLinks}>
        <p onClick={() => router.push("/")}>Home</p>
        <p onClick={() => handleScroll("about")}>About Us</p>
        <p onClick={() => router.push("/")}>Book a Ride</p>
        <p onClick={() => handleScroll("contact")}>Contact Us</p>
      </nav>

      {/* Legal Links */}
      <div className={styles.legal}>
        <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a>
      </div>

     <div className={styles.rights}>
       © All Rights Reserved 2025
     </div>
    </footer>
  );
}
