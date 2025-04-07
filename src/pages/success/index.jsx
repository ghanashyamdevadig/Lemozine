// pages/booking-success.js

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styles from "./SucessPage.module.css";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import apiService from "../api/apiService";
import ToastService from "@/config/toast";
import {useSelector,useDispatch} from "react-redux"
import { resetBookingData,togglePageLoader } from "@/redux/store/userSlice";


export default function SuccessPage() {
  const router = useRouter();
  const dispatch=useDispatch()
  const booking_data = useSelector((state) => state.user?.booking_data);

  useEffect(() => {
    confirmBooking();
  }, []);

  const confirmBooking = async () => {
    console.log(booking_data,"booking_data")
    try {
      const res = await apiService.bookings.booking(booking_data);
      console.log(res, "res for test");
      if (res?.status == 200) {
      } else {
        ToastService.showError("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      ToastService.showError("An error occurred. Please try again.");
    } finally {
      dispatch(togglePageLoader(false));
      dispatch(resetBookingData())
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.iconWrapper}
          initial={{ rotate: 180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <CheckCircle size={72} color="#10B981" />
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Booking Confirmed!
        </motion.h1>

        <p className={styles.subtitle}>
          Your reservation is locked in. Get ready to enjoy your experience!
        </p>

        <motion.button
          className={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
        >
          Back to Home
        </motion.button>
      </motion.div>

      {/* 🎉 Confetti animation */}
      <div className={styles.confetti}></div>
    </div>
  );
}
