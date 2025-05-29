import React from "react";
import styles from "./BelowHeader.module.css";
import Image from "next/image";
import image1 from "../../assets/images/bgImage/image1.webp";
import image2 from "../../assets/images/bgImage/image2.webp";
import image3 from "../../assets/images/bgImage/image3.webp";
import { ArrowRightOutlined } from "@ant-design/icons";

const data = [
  {
    image: image1,
    title: "Airport Transfers",
    desc: "Effortless airport to hotel transfers—hassle-free and comfortable.",
  },
  {
    image: image2,
    title: "Group Transportation",
    desc: "Group travel made easy—luxury limousines for any outing or event.",
  },
  {
    image: image3,
    title: "VIP Service",
    desc: "Luxury VIP limousines—perfect for special occasions, corporate events, and more.",
  },
];

function BelowHeader() {
  return (
    <div className={styles.belowHeader}>
      <div className={styles.container}>
        {data.map((item, index) => {
          return (
            <div className={styles.card} key={index}>
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
              <div>
                <p className={styles.title}>{item?.title} <span className={styles.arrow}><ArrowRightOutlined /></span></p>
                <p className={styles.desc}>{item?.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BelowHeader;
