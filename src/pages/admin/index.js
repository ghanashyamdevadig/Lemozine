import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Button } from "antd";
import styles from "./admin.module.css";
import apiService from "../api/apiService";

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

function Admin({ scrollLimit = null, scrollY = null, scrollable }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (formDataLogin) => {
    try {
      const response = await apiService.auth.login(formDataLogin);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Booking list fetch
  const getBookingList = async () => {
    try {
      const res = await apiService.bookings.adminbokings();
      if (res?.data) {
        setBookingData(res?.data?.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  

  // Initial auth check
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminLoggedIn");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsModalVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getBookingList();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const handleLoginSubmit = async () => {
    const { email, password } = loginForm;

    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email, password });
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        localStorage.setItem("adminLoggedIn", "true");
        setIsAuthenticated(true);
        setIsModalVisible(false);
      } else {
        alert("Incorrect email or password!");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.admin}>
      <div className={styles.title}>Booking Details</div>

    <div className={styles.tableContainer}>
        <Table
        columns={columns}
        dataSource={bookingData}
        scroll={{
          x: scrollable && scrollLimit ? scrollLimit : 900,
          y: scrollY,
        }}
        className="y-scroll-table"
        rowClassName="table-custom"
      />
    </div>

      <Modal
        title="Admin Login"
        open={isModalVisible}
        onOk={handleLoginSubmit}
        confirmLoading={loading}
        onCancel={() => (window.location.href = "/")}
        okText="Login"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter Email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          style={{ marginBottom: "1rem" }}
        />
        <Input.Password
          placeholder="Enter Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
      </Modal>
    </div>
  );
}

export default Admin;