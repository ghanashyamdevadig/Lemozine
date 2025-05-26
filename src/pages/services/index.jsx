import React from 'react'
import Image from "next/image";
import styles from "./services.module.css";
import serviceCar from "../../assets/images/bgImage/service_car.png";
import Car1 from "../../assets/images/bgImage/car1.jpg";
import Car2 from "../../assets/images/bgImage/car2.jpg";
import Car3 from "../../assets/images/bgImage/car3.jpg";
import Car4 from "../../assets/images/bgImage/car4.jpg";

function Services() {
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.heading}>Our Services</h2>
      <p className={styles.subheading}>Flexible and Scalable to Your Needs</p>

      <div className={styles.bannerWrapper}>
        <Image
          src={serviceCar}
          alt="Corporate Travel Solutions for Business Executives"
          className={styles.bannerImage}
          width={1200}
          height={400}
        />
      </div>

      <h3 className={styles.subsectionHeading}>
        Corporate chauffeur services for every occasion
      </h3>

      <div className={styles.serviceCards}>
        <div className={styles.card}>
          <Image src={Car1} alt="Business trips" width={300} height={180} className={styles.images} />
          <h4>Business trips & meetings</h4>
          <p>
            Ensure punctual arrivals, seamless departures, and foster strong
            professional relationships at every meeting.
          </p>
        </div>

        <div className={styles.card}>
          <Image src={Car2} alt="City-to-City travel" width={300} height={180} className={styles.images} />
          <h4>City-to-City travel</h4>
          <p>
            Effortlessly work while traveling City to City. Seamlessly travel
            between London to Manchester or Paris to Lyon, and more.
          </p>
        </div>

        <div className={styles.card}>
          <Image src={Car3} alt="Airport transfers" width={300} height={180} className={styles.images} />
          <h4>Global airport transfers</h4>
          <p>
            Experience seamless airport pick-ups and drop-offs, making your
            corporate travels hassle-free.
          </p>
        </div>

        <div className={styles.card}>
          <Image src={Car4} alt="Client travel" width={300} height={180} className={styles.images} />
          <h4>Client & partner travel</h4>
          <p>
            Impress clients and partners with exceptional chauffeur service,
            elevating their travel experience.
          </p>
        </div>
      </div>

      <ul className={styles.bulletList}>
        <li>Long-Distance Travel: Anywhere in the U.S. starting from New England.</li>
        <li>Hourly Chauffeur Hire: Perfect for meetings, city errands, or special occasions (contact us directly).</li>
        <li>Corporate Transportation: Impress your clients and partners with executive-level service.</li>
        <li>Airport Transfers: Seamless pick-up and drop-off with flight tracking and complimentary wait time.</li>
        <li>Custom Requests: Tailored experiences for any event – weddings, conferences, and more.</li>
      </ul>
    </section>
  )
}

export default Services;