"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./OurServices.module.css";
import Image from "next/image";

import airport from "../../assets/images/services/airport.png";
import group from "../../assets/images/services/team.png";
import vip from "../../assets/images/services/service.png";
import special from "../../assets/images/services/special.png";

function OurServices({ id }) {
  const services = [
    {
      id: 1,
      image: airport,
      title: "Airport Transfer",
      description:
        "Arriving at the airport or need a seamless transfer to your hotel? Our airport transfer service offers a hassle-free and comfortable transportation experience.",
    },
    {
      id: 2,
      image: group,
      title: "Group Transportation",
      description:
        "Planning transportation for a group outing or event? Our limousine service is designed to accommodate your specific needs.",
    },
    {
      id: 3,
      image: vip,
      title: "VIP Service",
      description:
        "Experience the epitome of luxury with our VIP limousine service. Whether it's a special occasion, a corporate function, or an exclusive event, our VIP service is tailored to exceed your expectations.",
    },
    {
      id: 4,
      image: special,
      title: "Special Occasions",
      description:
        "Celebrate your special moments in style with us on your special occasions. Whether it's a birthday, anniversary, prom, or any other milestone, our luxurious vehicles add a touch of elegance.",
    },
  ];

  const sectionRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className={styles.container} id={id}>
      <h3 className={styles.header}>Our Services</h3>
      <p className={styles.description}>
        We offer a range of services to cater to your transportation needs.
        Whether you require an airport transfer, group transportation VIP
        service, or special occasions, we have you covered.
      </p>

      <div className={styles.services_container}>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`${styles.service} ${
              index % 2 === 0 ? styles.left : styles.right
            }`}
            ref={(el) => (sectionRef.current[index] = el)}
          >
            <div className={styles.image_container}>
              <Image
                src={service.image}
                alt={service.title}
                width={80}
                height={80}
              />
            </div>
            <h4 className={styles.title}>{service.title}</h4>
            <p className={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
