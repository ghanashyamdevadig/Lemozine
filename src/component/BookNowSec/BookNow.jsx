import React, { useState } from "react";
import styles from "./BookNow.module.css";
import Image from "next/image";
import sedan from "../../assets/images/bgImage/Black-BMW-PNG-HD 1.webp";
import suv from "../../assets/images/bgImage/BMW-X7-Download-Free-PNG 1.webp";
import vip from "../../assets/images/bgImage/stretch-limousine.png 1.webp";
import { ArrowRightOutlined } from "@ant-design/icons";

const data = [
  {
    image: sedan,
    type: "Normal",
    title: "Business Sedan",
    description: "Comfortable and affordable ride.",
    bags: "Luggage Space: 3 Large Bags",
    nested: [
      { seats: "4 seats", svg: "/svgSheet/seats.svg" },
      { seats: "AC", svg: "/svgSheet/ac.svg" },
      { seats: "Bluetooth", svg: "/svgSheet/bluetooth.svg" },
    ],
  },
  {
    image: suv,
    type: "Premium",
    title: "Business SUV",
    description: "Luxurious experience for your journey.",
    bags: "Luggage Space: 3 Large Bags",
    nested: [
      { seats: "4 seats", svg: "/svgSheet/seats.svg" },
      { seats: "AC", svg: "/svgSheet/ac.svg" },
      { seats: "Bluetooth", svg: "/svgSheet/bluetooth.svg" },
    ],
  },
  {
    image: vip,
    type: "VIP",
    title: "VIP",
    description: "Exclusive, first-class service.",
    bags: "Luggage Space: 3 Large Bags",
    nested: [
      { seats: "4 seats", svg: "/svgSheet/seats.svg" },
      { seats: "AC", svg: "/svgSheet/ac.svg" },
      { seats: "Bluetooth", svg: "/svgSheet/bluetooth.svg" },
    ],
  },
];

function BookNow({ isClick, handleCarSelect, handleProceedToPayment }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.book_container}>
      <div className={styles.book_header}>
        {data?.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <div
              className={`${styles.book_vardiv} ${
                isSelected ? styles.selected : ""
              }`}
              key={index}
              onClick={() => {
                isClick && setSelectedIndex(index);
                handleCarSelect(item?.type);
                console.log(item, "item");
              }}
            >
              <div className={styles.book_img}>
                <Image src={item.image} alt={item.title} />
              </div>
              <div className={styles.book_text}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.bags}>{item.bags}</p>
                <div className={styles.book_array}>
                  {item?.nested?.map((arr, idx) => (
                    <div className={styles.book_array_item} key={idx}>
                      <img src={arr.svg} alt="icon" />
                      <span className={styles.seats}>{arr?.seats}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={styles.bookNowButton}
                onClick={isClick ? handleProceedToPayment : scrollToTop}
              >
                Book Now{" "}
                <span className={styles.arrow}>
                  <ArrowRightOutlined />
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookNow;
