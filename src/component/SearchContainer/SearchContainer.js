import React, { useState } from "react";
import styles from "./SearchContainer.module.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import apiService from "@/pages/api/apiService";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setCarPrices ,setBookingDetails} from "@/redux/store/userSlice";

// Mock location data for autocomplete
const locationOptions = [
  { label: "Dallas, Texas", value: "Dallas, Texas" },
  { label: "Austin, Texas", value: "Austin, Texas" },
  { label: "Houston, Texas", value: "Houston, Texas" },
  { label: "San Antonio, Texas", value: "San Antonio, Texas" },
];

// Mock function to calculate distance & price
const mockDistanceMatrixAPI = (from, to) => {
  if (!from || !to || from === to) return { distance: Math.random()*100, price: 0 };

  const distance = Math.random() * 50 + 10; // Random distance between 10-60 km
  const price = distance * 5; // Assume $5 per km
  return {
    distance: parseFloat(distance.toFixed(2)),
    price: parseFloat(price.toFixed(2)),
  };
};

const SearchForm = ({ navigation }) => {
  const [pickUpLocation, setPickUpLocation] = useState(locationOptions[0]);
  const [dropLocation, setDropLocation] = useState(locationOptions[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useRouter();
    const dispatch = useDispatch();

  const handleSearch = async () => {
    const { distance, price } = mockDistanceMatrixAPI(
      pickUpLocation?.value,
      dropLocation?.value
    );

    const searchResult = {
      pickup_datetime: startDate ? startDate.toISOString() : null,
      leaving_datetime: endDate ? endDate.toISOString() : null,
      from_location: pickUpLocation?.value,
      to_location: dropLocation?.value,
      distance,
      price,
    };
    dispatch(setBookingDetails(searchResult))
    let res = await calculateCarPrice(distance);
    console.log(res, searchResult,"res for handleSerach");
   
    // navigate.push("/bookings", { data: searchResult });
    // alert(JSON.stringify(searchResult, null, 2));
  };

  const calculateCarPrice = async (distance) => {
    const res = await apiService.users.getCarDetails(distance);
    if(res){
      dispatch(setCarPrices(res))
      navigate.push("/bookings");
    }
 
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Pick up location</label>
        <Select
          options={locationOptions}
          value={pickUpLocation}
          onChange={setPickUpLocation}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Drop location</label>
        <Select
          options={locationOptions}
          value={dropLocation}
          onChange={setDropLocation}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Start</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select start date and time"
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Stop</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select stop date and time"
          className={styles.input}
        />
      </div>

      <div className={styles.searchButton} onClick={handleSearch}>
        Search
      </div>
    </div>
  );
};

export default SearchForm;
