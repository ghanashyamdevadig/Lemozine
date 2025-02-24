"use client";

import React from "react";
import styles from "./ourfleet.module.css"; // Import the CSS module

const FleetSection = () => {
  return (
    <section className={styles.fleetContainer}>
      <h2 className={styles.fleetTitle}>Explore Our Fleet</h2>

      {/* Line with Dots */}
      <div className={styles.fleetLineContainer}>
        <div className={styles.fleetLine}></div>
        <div className={styles.fleetDots}>
          <div className={styles.fleetDot}></div>
          <div className={styles.fleetDot}></div>
          <div className={styles.fleetDot}></div>
        </div>
      </div>

      {/* Fleet Items */}
      <div className={styles.fleetItems}>
        <div className={styles.fleetItem}>
          <h3 className={styles.fleetItemTitle}>Elegant Sedans</h3>
          <p className={styles.fleetItemDescription}>
            Our elegant sedans offer a blend of sophistication and comfort, ideal for business travel or intimate outings. Enjoy luxurious interiors and advanced amenities for a smooth, quiet ride.
          </p>
        </div>

        <div className={styles.fleetItem}>
          <h3 className={styles.fleetItemTitle}>Luxurious SUVs</h3>
          <p className={styles.fleetItemDescription}>
            Our luxurious SUVs provide ample space and a commanding presence on the road. Perfect for family trips or group outings, they combine rugged capability with refined comfort.
          </p>
        </div>

        <div className={styles.fleetItem}>
          <h3 className={styles.fleetItemTitle}>Premium Limousines</h3>
          <p className={styles.fleetItemDescription}>
            Experience ultimate luxury with our premium limousines, perfect for special occasions or corporate events. Enjoy plush interiors and personalized service for a memorable ride.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
