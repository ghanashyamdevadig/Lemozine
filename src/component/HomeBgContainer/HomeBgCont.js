import React, { useState } from "react";
import styles from "./HomeBgCont.module.css";
import Carousel from "./Carousel";
import CarouselControls from "./CarouselControls";
import BookingForm from "./BookingForm";
function HomeBgCont() {
const [carouselNavigation, setCarouselNavigation] = useState(null);
  
  return (
    <div className={styles.main_container}>
      <Carousel onNavigate={setCarouselNavigation} />
      <CarouselControls navigation={carouselNavigation} />
      <BookingForm />
    </div>
  );
}

export default HomeBgCont;
