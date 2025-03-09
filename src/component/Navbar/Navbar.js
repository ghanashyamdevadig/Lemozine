"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/logo/logo-2.png";
import Image from "next/image";
import { useRouter } from "next/router";
import apiService from "../../pages/api/apiService";

function Navbar() {
  const modalRef = useRef(null);
  const drawerRef = useRef(null);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const [errorLogin, setErrorLogin] = useState("");
  const [error, setError] = useState("");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleScroll = (id) => {
    router.push(`#${id}`, undefined, { shallow: true });

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close(); // Ensure the modal is closed
    }
    setError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    alert("Form submitted successfully!");
    console.log(formData, "formData");
    const response = await apiService.auth.signup(formData);
    console.log("Registration Successful:", response.data);
  };

  const handleOutsideClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevents the click from bubbling up
    closeModal();
  };

  const handleChangeLogin = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formDataLogin.email)) {
      setErrorLogin("Invalid email format!");
      return;
    }
    setErrorLogin("");

    try {
      const response = await apiService.auth.login(formDataLogin);
      console.log("Login Successful:", response.data);
      alert("Login successful!");
      closeModal();
    } catch (error) {
      console.error("Login failed:", error);
      setErrorLogin("Invalid credentials!");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Link href="/">
            <div className={styles.logoContainer}>
              <Image src={logo} width={70} height={70} alt="Mass Livery Logo" />
              <p>Mass Livery</p>
            </div>
          </Link>
        </div>

        {/* Desktop About Links */}
        <div className={styles.about}>
          <div onClick={() => handleScroll("about")}>About</div>
          <div onClick={() => handleScroll("services")}>Services</div>
          <div onClick={() => handleScroll("contact")}>Contact Us</div>
        </div>

        {/* Login Section */}
        <div className={styles.login}>
          <div onClick={openModal}>
            Login <UserOutlined />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className={styles.menuButton} onClick={toggleDrawer}>
          {isDrawerOpen ? <X size={30} /> : <Menu size={30} />}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}
      >
        <div onClick={() => handleScroll("about")}>About</div>
        <div onClick={() => handleScroll("services")}>Services</div>
        <div onClick={() => handleScroll("contact")}>Contact Us</div>
      </div>

      {/* Login Modal */}
      <dialog
        ref={modalRef}
        className={styles.modal}
        onClick={handleOutsideClick}
      >
        <div className={styles.modalContent}>
          <div onClick={handleCloseClick} className={styles.close_modal}>
            <CloseOutlined />
          </div>
          {/* <>
            <h2 className={styles.modalTitle}>Sign Up</h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <input
                type="text"
                name="name"
                placeholder="name"
                className={styles.input}
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input}
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className={styles.input}
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                required
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={styles.input}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitButton}>
                Sign Up
              </button>
            </form>
          </> */}
          <>
            <h2 className={styles.modalTitle}>Login</h2>
            <form onSubmit={handleLoginSubmit} className={styles.modalForm}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input}
                required
                value={formDataLogin.email}
                onChange={handleChangeLogin}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                required
                value={formDataLogin.password}
                onChange={handleChangeLogin}
              />
              {errorLogin && <p className={styles.error}>{errorLogin}</p>}
              <button type="submit" className={styles.submitButton}>
                Login
              </button>
              <p className={styles.signupText}>
                Don't have an account?
                <span className={styles.signupLink}>
                  {" "}
                  Sign Up
                </span>
              </p>
            </form>
          </>
        </div>
      </dialog>
    </nav>
  );
}

export default Navbar;
