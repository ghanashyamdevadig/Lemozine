"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCarPrices, setBookingDetails ,togglePageLoader} from "@/redux/store/userSlice";
import styles from "./SearchContainer.module.css";
import apiService from "@/pages/api/apiService";
import { useSelector } from "react-redux";
import ToastService from "../../config/toast"
const GOOGLE_MAPS_API_KEY = "AIzaSyDWNr5Pjdmkd6F0nAp-4rbBXuRArDs4RCk";

const SearchForm = () => {

  const {is_authenticated} = useSelector((state) => state.user);


  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupPlaceId, setPickupPlaceId] = useState("");
  const [dropPlaceId, setDropPlaceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);

  const navigate = useRouter();
  const dispatch = useDispatch();

  // Load Google Maps API only once
  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsGoogleLoaded(true);
        document.head.appendChild(script);
      }
    } else if (window.google) {
      setIsGoogleLoaded(true);
    }
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isGoogleLoaded || !pickupInputRef.current || !dropInputRef.current)
      return;

    try {
      const pickupAutocomplete = new window.google.maps.places.Autocomplete(
        pickupInputRef.current,
        { types: ["geocode"] }
      );
      const dropAutocomplete = new window.google.maps.places.Autocomplete(
        dropInputRef.current,
        { types: ["geocode"] }
      );

      pickupAutocomplete.addListener("place_changed", () => {
        const place = pickupAutocomplete.getPlace();
        if (place && place.formatted_address && place.place_id) {
          setPickUpLocation(place.formatted_address);
          setPickupPlaceId(place.place_id);
        }
      });

      dropAutocomplete.addListener("place_changed", () => {
        const place = dropAutocomplete.getPlace();
        if (place && place.formatted_address && place.place_id) {
          setDropLocation(place.formatted_address);
          setDropPlaceId(place.place_id);
        }
      });
    } catch (error) {
      console.error("Error initializing Google Places Autocomplete:", error);
    }
  }, [isGoogleLoaded]);

  // Function to calculate distance between locations
  const calculateDistance = (origins, destinations) => {
    
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject("Google Maps API not loaded");
        return;
      }

      const distanceService = new window.google.maps.DistanceMatrixService();

      distanceService.getDistanceMatrix(
        {
          origins: [{ placeId: origins }],
          destinations: [{ placeId: destinations }],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        async (response, status) => {
          console.log(response?.rows[0]?.elements[0]?.distance?.text);
          let km =
            removeText(response?.rows[0]?.elements[0]?.distance?.text) ?? 0;
          const res = await apiService.users.getCarDetails(km);
          console.log(res, pickUpLocation, dropLocation, "test location");

          const searchResult = {
            pickup_datetime: startDate ? startDate.toISOString() : null,
            leaving_datetime: endDate ? endDate.toISOString() : null,
            from_location: pickUpLocation?.value,
            to_location: dropLocation?.value,
            km,
          };

          dispatch(setBookingDetails(searchResult));

          if (res?.status==200) {
            dispatch(setCarPrices(res));
            navigate.push("/bookings");
            dispatch(togglePageLoader(false));
          }
          else{
            ToastService.showError("Something went wrong please tr again")
            dispatch(togglePageLoader(false));
          }

        }
      );
    });
  };

  function removeText(input) {
    return parseFloat(input); // Extracts the numeric part
  }


  // Handle Search Click
  const handleSearch = async () => {

    isAuthenticated()
    if (!pickupPlaceId || !dropPlaceId) {
      ToastService.showError("Please select valid pickup and drop locations.");
      return;
    }

    if (!startDate || !endDate) {
      ToastService.showError("Please select pickup and return dates.");
      return;
    }

    // setIsLoading(true);

    try {
         dispatch(togglePageLoader(true));
      const distanceResult = await calculateDistance(
        pickupPlaceId,
        dropPlaceId
      );

      const searchResult = {
        pickup_location: pickUpLocation,
        drop_location: dropLocation,
        pickup_datetime: startDate.toISOString(),
        leaving_datetime: endDate.toISOString(),
        distance: distanceResult.distance,
        duration: distanceResult.duration,
        price: distanceResult.price,
      };

      dispatch(setBookingDetails(searchResult));
      dispatch(setCarPrices(distanceResult.price));

      router.push("/bookings");
    } catch (error) {
      console.error("Error calculating distance:", error);
      ToastService.showError("Failed to calculate distance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated=()=>{
    if(!is_authenticated){
      ToastService?.showError("Please login before searching");
      return
    }
   
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Pick-Up Location</label>
        <div className={styles.inputWrapper}>
          <MapPin className={styles.icon} />
          <input
            ref={pickupInputRef}
            type="text"
            placeholder="Enter pickup location"
            className={styles.input}
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Drop Location</label>
        <div className={styles.inputWrapper}>
          <MapPin className={styles.icon} />
          <input
            ref={dropInputRef}
            type="text"
            placeholder="Enter drop location"
            className={styles.input}
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Pickup Date</label>
        <div className={`${styles.inputWrapper} ${styles.datePickerContainer}`}>
          <Calendar className={styles.icon} />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="Select pickup date"
            className={styles.datePicker}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Return Date</label>
        <div className={`${styles.inputWrapper} ${styles.datePickerContainer}`}>
          <Calendar className={styles.icon} />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="Select return date"
            className={styles.datePicker}
          />
        </div>
      </div>

      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchForm;
