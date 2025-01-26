import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

function Navbar() {
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
      </div>

      <div className={styles.login}>
        <button onClick={() => alert('Login button clicked!')}>Login</button>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
