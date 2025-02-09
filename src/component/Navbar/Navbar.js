import React, { useRef, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';

function Navbar() {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError('Invalid email format!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');
    alert('Form submitted successfully!');
    closeModal();
  };

  const handleOutsideClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };
  return (
    <nav className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          MyLogo
        </Link>
      </div>

      <div className={styles.about}>
        <Link href="/about">
          About
        </Link>
        <Link href="/about">
          Services
        </Link>
        <Link href="/about">
          Contact Us
        </Link>
      </div>

      <div className={styles.login}>
        <div onClick={openModal}>Sign in <UserOutlined /></div>
      </div>
    </div>
    <dialog ref={modalRef} className={styles.modal} onClick={handleOutsideClick}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <input type="text" name="username" placeholder="Username" className={styles.input} required value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" className={styles.input} required value={formData.email} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" className={styles.input} required value={formData.phone} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className={styles.input} required value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className={styles.input} required value={formData.confirmPassword} onChange={handleChange} />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
          <button onClick={closeModal} className={styles.closeButton}>Close</button>
        </div>
      </dialog>
  </nav>
  )
}

export default Navbar
