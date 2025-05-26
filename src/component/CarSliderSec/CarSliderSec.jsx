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
    <div className={styles.carSliderSec} ref={imageRef}>
      <div className={styles.main_container}>
        <p className={styles.title_1}>Incredible</p>
        <p className={styles.title_2}>comfort</p>
        <p className={styles.description}>
          We value the time and quality of travel for each of our clients
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
