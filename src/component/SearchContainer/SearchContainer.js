import React, { useState } from "react";
import styles from "./SearchContainer.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SearchForm = () => {
  const [location, setLocation] = useState("Dallas, Texas");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Pick up & Return location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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

      <div className={styles.searchButton} onClick={() => alert("Search Clicked!")}>
        Search
      </div>
    </div>
  );
};

export default SearchForm;
