import React, { useRef, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import { Menu, X } from 'lucide-react';
import logo from "../../assets/images/logo/logo-2.png";
import Image from 'next/image';

function Navbar() {
  const modalRef = useRef(null);
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
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
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDrawerOpen]);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
    setError('');
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
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
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* Login Section */}
        <div className={styles.login}>
          <div onClick={openModal}>Sign in <UserOutlined /></div>
        </div>

        {/* Mobile Menu Button */}
        <div className={styles.menuButton} onClick={toggleDrawer}>
          {isDrawerOpen ? <X size={30} /> : <Menu size={30} />}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div ref={drawerRef} className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <Link href="/about" onClick={closeDrawer}>About</Link>
        <Link href="/services" onClick={closeDrawer}>Services</Link>
        <Link href="/contact" onClick={closeDrawer}>Contact Us</Link>
      </div>

      {/* Login Modal */}
      <dialog ref={modalRef} className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Login</h2>
          <form className={styles.modalForm}>
            <input type="text" name="username" placeholder="Username" className={styles.input} required value={formData.username} />
            <input type="email" name="email" placeholder="Email" className={styles.input} required value={formData.email} />
            <input type="tel" name="phone" placeholder="Phone Number" className={styles.input} required value={formData.phone} />
            <input type="password" name="password" placeholder="Password" className={styles.input} required value={formData.password} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className={styles.input} required value={formData.confirmPassword} />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
          <button onClick={closeModal} className={styles.closeButton}>Close</button>
        </div>
      </dialog>
    </nav>
  );
}

export default Navbar;
