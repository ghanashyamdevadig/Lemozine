import React from "react";
import styles from "./BottomCont.module.css";
import Image from "next/image";
import carSeats from "../../assets/images/bgImage/about-chairs.png.webp";

const ComfortSection = () => {
  return (
    <section className={styles.comfortSection}>
      <div className={styles.imageContainer}>
        <Image src={carSeats} alt="Luxury Car Seats" layout="responsive" className={styles.image} />
      </div>
      <div className={styles.content}>
        
        <h2 className={styles.heading}>
         Committed to making every  <span>ride a comfortable one.</span> 
        </h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <img src="/svgSheet/fi_1350120.svg"/>
            <h4 className={styles.title}>Airport Transfer</h4>
            <p className={styles.description}>Effortless airport to hotel transfers—hassle-free and comfortable.</p>
          </div>
          <div className={styles.feature}>
             <img src="/svgSheet/040---Group-Excursion.svg"/>
            <h4 className={styles.title}>Group Transportation</h4>
            <p className={styles.description}>Group travel made easy—luxury limousines for any outing or event.</p>
          </div>
          
          <div className={styles.feature}>
             <img src="/svgSheet/Group.svg"/>
            <h4 className={styles.title}>VIP Service</h4>
            <p className={styles.description}>
              Luxury VIP limousines—perfect for special occasions, corporate events, and more.
            </p>
          </div>
          <div className={styles.feature}>
             <img src="/svgSheet/Group (1).svg"/>
            <h4 className={styles.title}>Special Occasions</h4>
            <p className={styles.description}>
              Make your special moments unforgettable with our elegant, luxurious limousines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComfortSection;
