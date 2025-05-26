import React from "react";
import styles from "./DiscoverMore.module.css";
import Image from "next/image";
import carImage from "../../assets/images/bgImage/Luxury-Car-Background-PNG 1.webp"; // Adjust the path as necessary
import { ArrowRightOutlined } from "@ant-design/icons";

function DiscoverMore() {
  return (
    <div className={styles.discoverMore}>
      <div className={styles.backgroundImage}>
        <div className={styles.flexContainer}>
          <div className={styles.leftConatiner}>
            <p className={styles.title_1}>Exceptional Rides</p>
            <p className={styles.title_2}>for Lasting Impressions</p>
            <p className={styles.description}>
              Enjoy seamless, memorable journeys with our professional
              chauffeurs and personalized service.
            </p>
            <button className={styles.disCoverButton}>Discover More <span className={styles.arrow}><ArrowRightOutlined /></span></button>
          </div>
          <div className={styles.rightConatiner}>
            <Image src={carImage} width={840} height={260} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverMore;
