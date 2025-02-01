import React from 'react';
import styles from './HomeBgCont.module.css';
import SearchForm from '../SearchContainer/SearchContainer';

function HomeBgCont() {
  return (
    <div className={styles.main_container}>
      <div className={styles.title}>
        PRIMIUM CAR FOR
        <span> SERVICES</span>
      </div>
       <div className={styles.search_container}>
      <SearchForm />
    </div>
    <div className={styles.car_container}>

    </div>
    </div>
  )
}

export default HomeBgCont