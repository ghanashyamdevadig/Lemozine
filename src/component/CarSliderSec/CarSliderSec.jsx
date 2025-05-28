import React, { useEffect, useRef, useState } from "react";
import styles from "./CarSliderSec.module.css";
import Image from "next/image";
import carImage from "../../assets/images/bgImage/about-limmo-large.png.webp";

function CarSliderSec() {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentImage = imageRef.current;
    if (currentImage) observer.observe(currentImage);

    return () => {
      if (currentImage) observer.unobserve(currentImage);
    };
  }, []);

  return (
    <div className={styles.carSliderSec} >
      <div className={styles.main_container}>
        <p className={styles.title_1}>About</p>
        <p className={styles.title_2} >Mass Livery</p>
        <p className={styles.description} ref={imageRef}>
          At our site, we are dedicated to providing a seamless and memorable
          transportation experience for our clients. Our team of professional
          chauffeurs and staff are committed to exceeding your expectations,
          ensuring every journey with us is exceptional. We take pride in our
          attention to detail and personalized service, making us a trusted
          choice for discerning customers.
        </p>
      </div>
      <div
        className={`${styles.image_container} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <Image
          src={carImage}
          alt="Luxury Car"
          width={1000}
          height={600}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default CarSliderSec;
