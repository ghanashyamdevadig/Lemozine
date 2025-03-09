import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./bookings.module.css";
import { useSelector } from "react-redux";
import apiService from "../api/apiService";
const CarSelectionPage = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [price, setPrice] = useState(null);
  const router = useRouter();
  const { query } = router;

  const user_info = useSelector((state) => state.user?.user);
  const car_prices = useSelector((state) => state.user?.car_prices);
  const booking_details = useSelector((state) => state.user?.booking_details);

  const carOptions = [
    {
      type: "Normal",
      basePrice: car_prices?.data[`Normal`],
      description: "Comfortable and affordable ride.",
      imageUrl:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/131249/eqs-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80",
      features: "AC, Bluetooth, GPS, Comfortable Seating",
      maxPassengers: 4,
      luggageSpace: "2 Large Bags",
    },
    {
      type: "Premium",
      basePrice: car_prices?.data[`Premium`],
      description: "Luxurious experience for your journey.",
      imageUrl:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/169989/macan-turbo-ev-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
      features: "Leather Seats, Premium Sound System, Sunroof",
      maxPassengers: 4,
      luggageSpace: "3 Large Bags",
    },
    {
      type: "VIP",
      basePrice: car_prices?.data[`VIP`],
      description: "Exclusive, first-class service.",
      imageUrl:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/132513/7-series-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
      features: "Massage Seats, Private Driver, Executive Lounge",
      maxPassengers: 4,
      luggageSpace: "4 Large Bags",
    },
  ];

  const distance = query.distance || "Not available";

  const calculatePrice = (carType) => {
    const distanceValue = parseFloat(distance.split(" ")[0]);
    if (distanceValue) {
      const selectedCarOption = carOptions.find((car) => car.type === carType);
      const calculatedPrice = selectedCarOption
        ? selectedCarOption.basePrice * distanceValue
        : 0;
      setPrice(calculatedPrice);
    }
  };

  const handleCarSelect = (carType) => {
    setSelectedCar(carType);
    calculatePrice(carType);
  };

  const handleProceedToPayment = async () => {
    console.log(car_prices?.data[selectedCar], "car_prices");
    if (selectedCar) {
      let data = {
        pickup_datetime: booking_details?.pickup_datetime,
        leaving_datetime: booking_details?.leaving_datetime,
        from_location: booking_details?.from_location,
        to_location: booking_details?.to_location,
        distance: booking_details?.distance,
        price: car_prices?.data[selectedCar],
        email: user_info?.email,
        phone_number: user_info?.phone,
        booking_type: selectedCar,
      };
      console.log(data);
      if (car_prices?.data[selectedCar] > 0) {
        const res = await apiService.bookings.booking(data);
        if (res) {
       alert("booking success");
        }
      } else {
        alert("Please recheck the data");
      }
    }

    // if (selectedCar) {
    //   const selectedCarOption = carOptions.find(
    //     (car) => car.type === selectedCar
    //   );
    //   router.push({
    //     pathname: "/payment",
    //     query: {
    //       car: selectedCar,
    //       price: price,
    //       imageUrl: selectedCarOption.imageUrl,
    //       description: selectedCarOption.description,
    //       maxPassengers: selectedCarOption.maxPassengers,
    //       luggageSpace: selectedCarOption.luggageSpace,
    //       features: selectedCarOption.features,
    //     },
    //   });
    // } else {
    //   alert("Please select a car type");
    // }
  };

  return (
    <div className={styles.carSelectionPage}>
      <section className={styles.carSelectionHeader}>
        <h1>Select Your Car</h1>
        <p>Choose the car type that suits your needs</p>
      </section>

      <section className={styles.carOptions}>
        {carOptions.map((carOption) => (
          <div
            key={carOption.type}
            className={`${styles.carOption} ${
              selectedCar === carOption.type ? styles.carOptionSelected : ""
            }`}
            onClick={() => handleCarSelect(carOption.type)}
          >
            <div className={styles.carOptionCard}>
              <div className={styles.carImageContainer}>
                <img
                  src={carOption.imageUrl}
                  alt={carOption.type}
                  className={styles.carImage}
                />
              </div>
              <div className={styles.carDetailsContainer}>
                <h2>{carOption.type}</h2>
                <p>{carOption.description}</p>
                <div className={styles.carDetails}>
                  <p>
                    <strong>Max Passengers:</strong> {carOption.maxPassengers}
                  </p>
                  <p>
                    <strong>Luggage Space:</strong> {carOption.luggageSpace}
                  </p>
                  <p>
                    <strong>Features:</strong> {carOption.features}
                  </p>
                  <p>
                    <strong>Price per Unit Distance:</strong> $
                    {carOption.basePrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {price && selectedCar && (
        <section className={styles.priceSummary}>
          <h3>Your Selection</h3>
          <p>Car: {selectedCar}</p>
          <p>Estimated Price: ${price.toFixed(2)}</p>
        </section>
      )}

      <section className={styles.proceedBtn}>
        <button className={styles.submitBtn} onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </section>
    </div>
  );
};

export default CarSelectionPage;
