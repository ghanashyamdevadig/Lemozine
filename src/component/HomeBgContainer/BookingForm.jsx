import React, { useState, useEffect, useRef } from "react";
import { Input, DatePicker } from "antd";
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import ToastService from "../../config/toast";
import styles from "./BookingForm.module.css";
import {
  setCarPrices,
  setBookingDetails,
  togglePageLoader,
} from "@/redux/store/userSlice";
import { useDispatch } from "react-redux";
import apiService from "@/pages/api/apiService";
import { useRouter } from "next/router";

const GOOGLE_MAPS_API_KEY = "AIzaSyDWNr5Pjdmkd6F0nAp-4rbBXuRArDs4RCk";

const BookingForm = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupPlaceId, setPickupPlaceId] = useState("");
  const [dropPlaceId, setDropPlaceId] = useState("");
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);

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
        pickupInputRef.current.input,
        { types: ["geocode"] }
      );
      const dropAutocomplete = new window.google.maps.places.Autocomplete(
        dropInputRef.current.input,
        { types: ["geocode"] }
      );

      pickupAutocomplete.addListener("place_changed", () => {
        const place = pickupAutocomplete.getPlace();
        if (place && place.formatted_address && place.place_id) {
          setPickupLocation(place.formatted_address);
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

  function removeText(input) {
    return parseFloat(input); // Extracts the numeric part
  }

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
          console.log(response, status, "response for distance");
          console.log(response?.rows[0]?.elements[0]?.distance?.text);
          let km =
            removeText(response?.rows[0]?.elements[0]?.distance?.text) ?? 0;
          const res = await apiService.users.getCarDetails(km);

          const searchResult = {
            pick_dateTime: pickupDate,
            from_location: pickupLocation,
            to_location: dropLocation,
            km,
          };

          console.log(res?.data, searchResult, "test location");

          dispatch(setBookingDetails(searchResult));

          if (res?.status == 200) {
            console.log("Checked Data");
           

            dispatch(setCarPrices(res?.data));
            dispatch(togglePageLoader(false));
            navigate.push("/bookings");
          } else {
            ToastService.showError("Something went wrong please tr again");
            dispatch(togglePageLoader(false));
          }
        }
      );
    });
  };

const handleBookNow = async () => {
    // Validation
    if (!pickupLocation || !pickupPlaceId) {
      ToastService?.showError(
        "Please select a valid Pick-Up Location from suggestions."
      );
      return;
    }
    if (!dropLocation || !dropPlaceId) {
      ToastService?.showError(
        "Please select a valid Drop Location from suggestions."
      );
      return;
    }
    if (!pickupDate) {
      ToastService?.showError("Please select a Pickup Date and Time.");
      return;
    }

    dispatch(togglePageLoader(true));

      await calculateDistance(pickupPlaceId, dropPlaceId);


   
};

  return (
    <div className={styles.bookingForm}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.formFields}>
            <div>
              <label className={styles.label}>Pick-Up Location</label>
              <div className={styles.inputContainer}>
                <EnvironmentOutlined className={styles.inputIcon} />
                <Input
                  ref={pickupInputRef}
                  placeholder="Enter Pick-Up Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Drop Location */}
            <div>
              <label className={styles.label}>Drop Location</label>
              <div className={styles.inputContainer}>
                <EnvironmentOutlined className={styles.inputIcon} />
                <Input
                  ref={dropInputRef}
                  placeholder="Enter Drop Location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Pickup Date and Time</label>
              <div className={styles.inputContainer}>
                <CalendarOutlined className={styles.inputIcon} />
                <DatePicker
                  showTime
                  value={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  className={styles.input}
                  format="YYYY-MM-DD HH:mm"
                />
              </div>
            </div>

            <button
              type="primary"
              onClick={handleBookNow}
              className={styles.bookButton}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
