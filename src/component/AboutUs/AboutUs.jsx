import React from 'react'
import styles from "./AboutUs.module.css"

function AboutUs({id}) {
  return (
    <div className={styles.container} id={id}>
     <h3 className={styles.header}>About My site</h3>
     <p className={styles.description}>
     At our site, we are dedicated to providing a seamless and memorable transportation experience for our clients. Our team of professional chauffeurs and staff are committed to exceeding your expectations, ensuring every journey with us is exceptional. We take pride in our attention to detail and personalized service, making us a trusted choice for discerning customers.
      </p>
      <div className={styles.discover_button}>
        Discover More
      </div>
     </div>
  )
}

export default AboutUs