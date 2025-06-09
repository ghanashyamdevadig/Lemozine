import React from 'react'
import styles from './cancel.module.css'
import { useRouter } from 'next/router';

function CancelPage() {
    const router = useRouter();
  return (
    <div className={styles.cancel_container}>
        <div onClick={()=> router.push("/")} className={styles.cancel}>Redirect To Home Page</div>
    </div>
  )
}

export default CancelPage