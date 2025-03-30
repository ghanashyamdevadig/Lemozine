import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import styles from "./admin.module.css";
import apiService from "../api/apiService";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

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

  const getBookingList=async ()=>{
   const res = await apiService.bookings.adminbokings();
   console.log(res,"res for data")
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminLoggedIn");
    window.location.reload();
  };

  if (!isAuthenticated) {
    return null; 
  }

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  return (
    <div className={styles.admin}>
      <div className={styles.title}>Booking Details</div>
      <Table
        columns={columns}
        dataSource={data}
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
