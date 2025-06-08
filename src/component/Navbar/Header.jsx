"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/images/logo/massliveryLogo.png";
import { LogoutOutlined } from "@ant-design/icons";
import { Menu, X } from "lucide-react"; // Menu and Close icons
import { useSelector } from "react-redux";
import LoginSignupModal from "../LoginSignUp/LoginSignupModal";
import { clearUser } from "@/redux/store/userSlice";
import { toggleAuthentication } from "@/redux/store/userSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogoutSubmit = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    dispatch(toggleAuthentication(false));
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <div className={styles.logoContainer}>
              <Image src={logo} height={50} width={180} priority alt="logo" />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>
              HOME
            </a>
            <a href="#" className={styles.navLink}>
              ABOUT US
            </a>
            <a href="#" className={styles.navLink}>
              CONTACTS
            </a>
            {user ? (
              <div className={styles.userNav}>
                <h4>{user.name}</h4>
                <div onClick={handleLogoutSubmit}>
                  <LogoutOutlined onClick={handleLogoutSubmit} />
                </div>
              </div>
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => setIsModalOpen(true)}
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Icon */}
          <div
            className={styles.menuIcon}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu size={28} color="#fff" />
          </div>
        </div>
      </div>

      {/* Slide-in Drawer */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}>
        <div className={styles.drawerHeader}>
          <X
            className={styles.closeIcon}
            onClick={() => setIsDrawerOpen(false)}
          />
        </div>
        <a href="#" className={styles.drawerLink}>
          HOME
        </a>
        <a href="#" className={styles.drawerLink}>
          ABOUT US
        </a>
        <a href="#" className={styles.drawerLink}>
          CONTACTS
        </a>
        <button
          className={styles.drawerLogin}
          onClick={() => setIsModalOpen(true)}
        >
          Login
        </button>
      </div>
      <LoginSignupModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </header>
  );
};

export default Header;
