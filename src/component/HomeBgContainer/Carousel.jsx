import React, { useCallback, useEffect, useState } from 'react';
import styles from './Carousel.module.css';
import Car1 from "../../assets/images/bgImage/Component 1.webp"
import Car2 from "../../assets/images/bgImage/Component 1_3.webp"
import Car3 from "../../assets/images/bgImage/Component 1_4.webp"
import Car4 from "../../assets/images/bgImage/Component 1_5.webp"
import Image from 'next/image';



const Carousel = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Luxury car images with text overlays
  const slides = [
    {
      image:Car1,
      title: 'Premium Sedan',
      subtitle: 'Experience Ultimate Comfort'
    },
    {
      image: Car2,
      title: 'Luxury SUV',
      subtitle: 'Power Meets Elegance'
    },
    {
      image: Car3,
      title: 'Executive Class',
      subtitle: 'Business Travel Redefined'
    },
    {
      image: Car4,
      title: 'Sports Collection',
      subtitle: 'Unleash Your Adventure'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (onNavigate) {
      onNavigate({ nextSlide, prevSlide, goToSlide, currentIndex, totalSlides: slides.length });
    }
  }, [onNavigate, nextSlide, prevSlide, goToSlide, currentIndex, slides.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <div className={styles.container}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.slideVisible : styles.slideHidden
          }`}
        >
          <Image 
            src={slide.image}
            alt={slide.title}
            className={styles.image}
            fill
        priority={index === 0} 
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;