import React, { useState } from 'react';
import { Input, DatePicker, Button } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);

  const handleBookNow = () => {
    console.log('Booking:', {
      pickupLocation,
      dropLocation,
      pickupDate: pickupDate ? pickupDate.format('YYYY-MM-DD') : null,
    });
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
