import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styles from "./bookings.module.css";
import apiService from "../api/apiService";
import { togglePageLoader, updateBookingData } from "@/redux/store/userSlice";
import ToastService from "@/config/toast";
import HomeBgCont from "@/component/HomeBgContainer/HomeBgCont";
import BookNow from "@/component/BookNowSec/BookNow";
import BookingHeaderText from "@/component/HomeBgContainer/BookingHeaderText";

const CarSelectionPage = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [price, setPrice] = useState(null);
  const [carOptionsData, setCarOptionsData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;

  const userInfo = useSelector((state) => state.user?.user);
  const carPrices = useSelector((state) => state.user?.car_prices);
  const bookingDetails = useSelector((state) => state.user?.booking_details);

  const distance = parseFloat(query.distance) || 0;

  // Helper to generate car options array
  const generateCarOptionsData = (carPrices) => [
    {
      type: "Normal",
      basePrice: carPrices?.Normal,
      description: "Comfortable and affordable ride.",
      imageUrl:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/131249/eqs-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80",
      features: "AC, Bluetooth, GPS, Comfortable Seating",
      maxPassengers: 4,
      luggageSpace: "2 Large Bags",
    },
    {
      type: "Premium",
      basePrice: carPrices?.Premium,
      description: "Luxurious experience for your journey.",
      imageUrl:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/169989/macan-turbo-ev-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
      features: "Leather Seats, Premium Sound System, Sunroof",
      maxPassengers: 4,
      luggageSpace: "3 Large Bags",
    },
    {
      type: "VIP",
      basePrice: carPrices?.VIP,
      description: "Exclusive, first-class service.",
      imageUrl:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/132513/7-series-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
      features: "Massage Seats, Private Driver, Executive Lounge",
      maxPassengers: 4,
      luggageSpace: "4 Large Bags",
    },
  ];

  useEffect(() => {
    if (carPrices) {
      setCarOptionsData(generateCarOptionsData(carPrices));
    }
  }, [carPrices]);

  const calculatePrice = (carType) => {
    const car = carOptionsData.find((car) => car.type === carType);
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

    const priceValue = carPrices[selectedCar];
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
    dispatch(updateBookingData(bookingData));
    dispatch(togglePageLoader(false));
    const car = carOptionsData.find((car) => car.type === selectedCar);

    const d_bookingData = {
      car: selectedCar,
      price: priceValue,
      imageUrl: car.imageUrl,
      description: car.description,
      maxPassengers: car.maxPassengers,
      luggageSpace: car.luggageSpace,
      features: car.features,
    };
    console.log(d_bookingData, "d_bookingData");
    router.push({
      pathname: "/payment",
      query: d_bookingData,
    });
  };

  return (
    <div>

      <BookingHeaderText />
      <BookNow
        isClick={true}
        handleCarSelect={handleCarSelect}
        handleProceedToPayment={handleProceedToPayment}
        carOptionsData={carPrices}
      />
     
    </div>
  );
};

export default CarSelectionPage;