import Image from "next/image";
import styles from "./contact.module.css";
import { useRouter } from "next/router";
import car from "../../assets/images/bgImage/contact-us.webp";
import { useEffect } from "react";

export default function ContactUs() {
    const router = useRouter();
    useEffect(() => {
        const cards = document.querySelectorAll(`.${styles.contactCard}`);
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add(styles.visible);
              }
            });
          },
          { threshold: 0.1 }
        );
    
        cards.forEach((card) => observer.observe(card));
    
        return () => observer.disconnect();
      }, []);
  return (
    <section className={styles.contactSection}>
      <div className={styles.hero}>
        <h1>Contact Us</h1>
        {/* <p>
          <span className={styles.breadcrumb} onClick={()=> router.push("/")}>Home</span> » <span>Contact Us</span>
        </p> */}
        <Image
          src={car}
          alt="Fleet of luxury cars"
          className={styles.heroImage}
          width={1400}
          height={300}
        />
      </div>

      <div className={styles.contactContent}>
        <h2>Contact Us for the Best Premium Car Service</h2>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <span className={styles.icon}>✉️</span>
            <p>massliveryride@gmail.com</p>
            <small>Office Email</small>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.icon}>📞</span>
            <p>617-416-4459</p>
            <small>Office Phone</small>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.icon}>📍</span>
            <p>North Andover (MA)</p>
            <small>Office Location</small>
          </div>
        </div>
      </div>
    </section>
  );
} 