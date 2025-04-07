import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import styles from "./admin.module.css";
import apiService from "../api/apiService";


const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Pwd@1234", 
};

function Admin({
  scrollLimit = null,
  scrollY = null,
  scrollable,
}) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("adminLoggedIn");

    if (savedAuth === "true") {
      setIsAuthenticated(true);
    } else {
      const username = window.prompt("Enter Admin Username:");
      const password = window.prompt("Enter Admin Password:");

      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        localStorage.setItem("adminLoggedIn", "true");
      } else {
        alert("Incorrect username or password!");
        window.location.href = "/"; 
      }
    }
  }, []);
  useEffect(()=>{
    getBookingList()
  })

   const [bookingDetails , setBookingDetails] = useState([]);

  const getBookingList=async ()=>{
   const res = await apiService.bookings.adminbokings();
   setBookingDetails(res.data?.bookings);
   console.log(res,"res for data")
  }

  const columns = [
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Distance",
      dataIndex: "Distance",
      key: "Distance",
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Pickup Date & Time",
      dataIndex: "PickupDateTime",
      key: "PickupDateTime",
    },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminLoggedIn");
    window.location.reload();
  };

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className={styles.admin}>
      <div className={styles.title}>Booking Details</div>
      <Table
        columns={columns}
        dataSource={bookingDetails}
        scroll={{
          x: scrollable && scrollLimit ? scrollLimit : 900,
          y: scrollY,
        }}
        className="y-scroll-table"
        rowClassName="table-custom"
      />
      ;
    </div>
  );
}

export default Admin;
