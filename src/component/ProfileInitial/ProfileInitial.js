import React from "react";
import { useSelector } from "react-redux";
import styles from "./ProfileInitial.module.css";

const ProfileInitial = () => {
  const { user } = useSelector((state) => state.user);

  // Extract the first letter of the user's name or fallback to "?"
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>{initial}</div>
    </div>
  );
};

export default ProfileInitial;
