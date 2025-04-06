import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styles from "./bookings.module.css";
import apiService from "../api/apiService";
import { togglePageLoader, updateBookingData } from "@/redux/store/userSlice";
import ToastService from "@/config/toast";

const carOptionsData = (carPrices) => [
  {
    type: "Normal",
    basePrice: carPrices?.data["Normal"],
    description: "Comfortable and affordable ride.",
    imageUrl:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/131249/eqs-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80",
    features: "AC, Bluetooth, GPS, Comfortable Seating",
    maxPassengers: 4,
    luggageSpace: "2 Large Bags",
  },
  {
    type: "Premium",
    basePrice: carPrices?.data["Premium"],
    description: "Luxurious experience for your journey.",
    imageUrl:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/169989/macan-turbo-ev-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
    features: "Leather Seats, Premium Sound System, Sunroof",
    maxPassengers: 4,
    luggageSpace: "3 Large Bags",
  },
  {
    type: "VIP",
    basePrice: carPrices?.data["VIP"],
    description: "Exclusive, first-class service.",
    imageUrl:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/132513/7-series-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    features: "Massage Seats, Private Driver, Executive Lounge",
    maxPassengers: 4,
    luggageSpace: "4 Large Bags",
  },
];

const CarSelectionPage = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [price, setPrice] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;

  const userInfo = useSelector((state) => state.user?.user);
  const carPrices = useSelector((state) => state.user?.car_prices);
  const bookingDetails = useSelector((state) => state.user?.booking_details);

  const carOptions = carOptionsData(carPrices);
  const distance = parseFloat(query.distance) || 0;

  const calculatePrice = (carType) => {
    const car = carOptions.find((car) => car.type === carType);
    if (car) setPrice(car.basePrice * distance);
  };

  const handleCarSelect = (carType) => {
    setSelectedCar(carType);
    calculatePrice(carType);
  };

  const handleProceedToPayment = async () => {
    dispatch(togglePageLoader(true));
    if (!selectedCar) {
      ToastService.showError("Please select a car type");
      dispatch(togglePageLoader(false));
      return;
    }

    const priceValue = carPrices?.data[selectedCar];
    if (!priceValue) {
      dispatch(togglePageLoader(false));
      ToastService.showError("Invalid car price. Please try again.");
      return;
    }

    const bookingData = {
      pickup_datetime: bookingDetails?.pickup_datetime || "11-22-44",
      leaving_datetime: bookingDetails?.leaving_datetime || "11-22-44",
      from_location: bookingDetails?.from_location || "Unknown",
      to_location: bookingDetails?.to_location || "Unknown",
      distance: bookingDetails?.distance || 100,
      price: priceValue,
      email: userInfo?.email,
      phone_number: userInfo?.phone,
      booking_type: selectedCar,
    };
    console.log(bookingData,"bookingData setting")
    dispatch(updateBookingData(bookingData));
    dispatch(togglePageLoader(false));
    const car = carOptions.find((car) => car.type === selectedCar);

    router.push({
      pathname: "/payment",
      query: {
        car: selectedCar,
        price: priceValue,
        imageUrl: car.imageUrl,
        description: car.description,
        maxPassengers: car.maxPassengers,
        luggageSpace: car.luggageSpace,
        features: car.features,
      },
    });
    // try {
    //   const res = await apiService.bookings.booking(bookingData);
    //   console.log(res, "res for test");
    //   if (res?.status == 200) {

    //   } else {
    //     ToastService.showError("Booking failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Booking Error:", error);
    //   ToastService.showError("An error occurred. Please try again.");
    // }
    // finally{
    //   dispatch(togglePageLoader(false));
    // }
  };

  return (
    <div className={styles.carSelectionPage}>
      <section className={styles.carSelectionHeader}>
        <h1>Select Your Car</h1>
        <p>Choose the car type that suits your needs.</p>
      </section>

      <section className={styles.carOptions}>
        {carOptions.map((car) => (
          <div
            key={car.type}
            className={`${styles.carOption} ${
              selectedCar === car.type ? styles.carOptionSelected : ""
            }`}
            onClick={() => handleCarSelect(car.type)}
          >
            <div className={styles.carOptionCard}>
              <img
                src={car.imageUrl}
                alt={car.type}
                className={styles.carImage}
              />
              <div className={styles.carDetailsContainer}>
                <h2>{car.type}</h2>
                <p>{car.description}</p>
                <p>
                  <strong>Max Passengers:</strong> {car.maxPassengers}
                </p>
                <p>
                  <strong>Luggage Space:</strong> {car.luggageSpace}
                </p>
                <p>
                  <strong>Features:</strong> {car.features}
                </p>
                <p>
                  <strong>Price per Unit Distance:</strong> ${car.basePrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {price && (
        <section className={styles.priceSummary}>
          <h3>Your Selection</h3>
          <p>Car: {selectedCar}</p>
          <p>Estimated Price: ${price.toFixed(2)}</p>
        </section>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTops: "20px",
        }}
      >
        <button className={styles.submitBtn} onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CarSelectionPage;
