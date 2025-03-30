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
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
  toggleAuthentication,
  togglePageLoader,
} from "@/redux/store/userSlice";
import ToastService from "@/config/toast";
import ProfileInitial from "../ProfileInitial/ProfileInitial";

function Navbar() {
  const { page_loader, is_authenticated } = useSelector((state) => state.user);

  const modalRef = useRef(null);
  const drawerRef = useRef(null);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogin, setIsLoginIn] = useState(false);
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

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleScroll = (id) => {

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } 
    setIsDrawerOpen(false);
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
    if (!page_loader) {
      modalRef.current.showModal();
    }
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
    dispatch(togglePageLoader(true));
    setError(""); // Clear previous errors

    // Validate email
    if (!validateEmail(formData.email)) {
      setError("Invalid email format!");
      dispatch(togglePageLoader(false));
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      dispatch(togglePageLoader(false));
      return;
    }

    try {
      const response = await apiService.auth.signup(formData);

      if (response.status === 200) {
        ToastService.showSuccess("Registration Successful");
        setIsLoginIn(!isLogin);
      } else {
        // Handle API errors with more detail if available
        const errorMsg =
          response.data?.message || "Registration failed. Please try again.";
        setError(errorMsg);
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      const errorMsg =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setError(errorMsg);
    } finally {
      dispatch(togglePageLoader(false));
    }
  };

  const handleChangeLogin = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitActn = (e) => {
    if (is_authenticated == true) {
      handleLogoutSubmit();
    } else {
      handleLoginSubmit(e);
    }
  };

  const handleLogoutSubmit = () => {
    dispatch(clearUser());
    dispatch(toggleAuthentication(false));
    closeModal();
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(togglePageLoader(true));
    if (!validateEmail(formDataLogin.email)) {
      setErrorLogin("Invalid email format!");
      return;
    }
    setErrorLogin("");

    try {
      const response = await apiService.auth.login(formDataLogin);
      console.log("Login Successful:", response);
      dispatch(setUser(response.data));
      dispatch(toggleAuthentication(true));
      if (response.status == 200) {
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
        }

        closeModal();
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorLogin("Invalid credentials!");
    } finally {
      dispatch(togglePageLoader(false));
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
        {router.asPath === "/" && <div className={styles.about}>
          <div onClick={() => handleScroll("about")}>About</div>
          <div onClick={() => handleScroll("services")}>Services</div>
          <div onClick={() => handleScroll("contact")}>Contact Us</div>
        </div>}

        {/* Login Section */}

        {/* Mobile Menu Button */}
        {router.asPath === "/" && <div className={styles.menuButton} onClick={toggleDrawer}>
          {isDrawerOpen ? <X size={30} /> : <Menu size={30} />}
        </div>}
      </div>
      <div
        onClick={openModal}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "20px",
          marginTop: "10px",
        }}
      >
        {user ? <ProfileInitial /> : 
          <div onClick={openModal} className={styles.login_Contr}>
            {user ? user.name : "Login"}{" "}  <UserOutlined />
          </div>
        }
      </div>

      {/* Mobile Drawer */}
      {router.asPath === "/" && <div
        ref={drawerRef}
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}
      >
        <div onClick={() => handleScroll("about")}>About</div>
        <div onClick={() => handleScroll("services")}>Services</div>
        <div onClick={() => handleScroll("contact")}>Contact Us</div>
      </div>}

      {/* Login Modal */}
      <dialog
        ref={modalRef}
        className={`${styles.modal} ${page_loader ? styles.modalHidden : ""}`}
        onClick={(e) => {
          if (e.target === modalRef.current) {
            closeModal();
          }
        }}
      >
        <div className={styles.modalContent}>
          <div onClick={closeModal} className={styles.close_modal}>
            <CloseOutlined />
          </div>

          {isLogin ? (
            <div>
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
                <span
                  className={styles.signupLink}
                  onClick={() => {
                    setIsLoginIn(!isLogin);
                  }}
                >
                  Log In
                </span>
              </form>
            </div>
          ) : (
            <div>
              {!is_authenticated ? (
                <h2 className={styles.modalTitle}>Login</h2>
              ) : (
                <ProfileInitial />
              )}
              <form onSubmit={handleSubmitActn} className={styles.modalForm}>
                {!is_authenticated && (
                  <>
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
                  </>
                )}

                {errorLogin && <p className={styles.error}>{errorLogin}</p>}
                <button type="submit" className={styles.submitButton}>
                  {is_authenticated ? "Log Out" : "Log in"}
                </button>
                <p className={styles.signupText}>
                  Don't have an account?
                  <span
                    className={styles.signupLink}
                    onClick={() => {
                      setIsLoginIn(!isLogin);
                    }}
                  >
                    {" "}
                    Sign Up
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </nav>
  );
}

export default Navbar;
