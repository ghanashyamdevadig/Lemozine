import React from 'react';
import Image from 'next/image';
import loaderGif from '../../assets/gif/loader.gif'; // Adjust the path as per your file structure

export default function Loader() {
  return (
    <div style={styles.overlay}>
      <div style={styles.loaderContainer}>
        <Image src={loaderGif} alt="Loading..." width={100} height={100} />
        <p style={styles.text}>Loading, please wait...</p>
      </div>
    </div>
  );
}

const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 200000, // Increased zIndex
    },
    loaderContainer: {
      textAlign: 'center',
    },
    text: {
      marginTop: '10px',
      color: '#fff',
      fontSize: '16px',
    },
  };
  