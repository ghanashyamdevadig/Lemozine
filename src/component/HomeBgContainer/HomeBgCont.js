import React from 'react';
import styles from './HomeBgCont.module.css';
import SearchForm from '../SearchContainer/SearchContainer';
import OurServices from '../OurSevices/OurServices';
import FleetSection from '../ourFleet/OurFleet';
import ContactUs from '../ContactUs/ContactUs';

function HomeBgCont() {
  return (
    <div className={styles.main_container}>
      <div className={styles.title}>
        PREMIUM CAR FOR
        <span> SERVICES</span>
      </div>
       <div className={styles.search_container}>
      <SearchForm />
    </div>
    <div className={styles.car_container}>

    </div>
    <OurServices id="services"/>
    <FleetSection />
    <ContactUs />
    </div>
  )
}

export default HomeBgCont