import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css"; // Import the CSS module

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <p className={styles.topic}>Profiler</p>
      </div>
      <div className={styles.rightSection}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#" className={styles.link}>
              Docs
            </a>
          </li>
          <li className={styles.navItem} onClick={handleLogout}>
            <div className={styles.logout}>Logout</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
