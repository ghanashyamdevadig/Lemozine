import React from 'react';
import styles from './CarouselControls.module.css';

const CarouselControls = ({ navigation }) => {
  if (!navigation) return null;

  const { currentIndex, totalSlides } = navigation;

  return (
    <div className={styles.container}>
     
      <div className={styles.dotContainer}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => navigation.goToSlide && navigation.goToSlide(index)}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
          />
        ))}
      </div>
      
    
    </div>
  );
};

export default CarouselControls;