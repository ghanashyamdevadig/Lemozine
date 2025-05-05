import Image from "next/image";
import styles from "./about.module.css";
import car from "../../assets/images/bgImage/contact-us.webp";

export default function About() {

  return (
    <section className={styles.contactSection}>
      <div className={styles.hero}>
        <h1>About Us</h1>
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

      
    </section>
  );
} 