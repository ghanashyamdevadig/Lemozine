"use client";

import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import styles from "./LoginSignupModal.module.css";
import apiService from "@/pages/api/apiService";
import ToastService from "@/config/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  toggleAuthentication,
  togglePageLoader,
} from "@/redux/store/userSlice";

function LoginSignupModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const { page_loader } = useSelector((state) => state.user);

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    setError("");
    setErrorLogin("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setFormDataLogin({ email: "", password: "" });
  };

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    dispatch(togglePageLoader(true));
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      dispatch(togglePageLoader(false));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      dispatch(togglePageLoader(false));
      return;
    }

    try {
      const response = await apiService.auth.signup(formData);
      if (response.status === 200) {
        ToastService.showSuccess("Registration successful!");
        setIsLogin(false);
      } else {
        setError(response.data?.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unexpected error occurred.");
    } finally {
      dispatch(togglePageLoader(false));
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    dispatch(togglePageLoader(true));

    if (!validateEmail(formDataLogin.email)) {
      setErrorLogin("Invalid email format!");
      dispatch(togglePageLoader(false));
      return;
    }

    setErrorLogin("");

    try {
      const response = await apiService.auth.login(formDataLogin);
      if (response.status === 200) {
        dispatch(setUser(response.data));
        dispatch(toggleAuthentication(true));
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        closeModal();
      } else {
        setErrorLogin("Login failed.");
      }
    } catch (err) {
      setErrorLogin("Invalid credentials!");
    } finally {
      dispatch(togglePageLoader(false));
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closable={false}
      className={page_loader ? styles.modalHidden : ""}
      centered
      width={400}
      bodyStyle={{ padding: 0 }}
    >
      <div className={styles.close} onClick={closeModal}>
        <CloseOutlined />
      </div>
      {isLogin ? (
        <form onSubmit={handleSubmitSignup} className={styles.form}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Sign Up</button>
          <p className={styles.linklabel}>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(false)} className={styles.link}>
              Log In
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmitLogin} className={styles.form}>
          <h2 className={styles.title}>Login to your account</h2>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formDataLogin.email}
            onChange={handleChangeLogin}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formDataLogin.password}
            onChange={handleChangeLogin}
            required
          />
          {errorLogin && <p className={styles.error}>{errorLogin}</p>}
          <button type="submit">Login now</button>
          <p className={styles.linklabel}>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(true)} className={styles.link}>
              Sign Up
            </span>
          </p>
        </form>
      )}
    </Modal>
  );
}

export default LoginSignupModal;
