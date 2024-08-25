import React from 'react';
import styles from '../styles/Sidebar.module.css';
import { FaHome, FaBook, FaUserFriends, FaQuestionCircle, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <FaHome className={styles.icon} />
      <FaBook className={styles.icon} />
      <FaUserFriends className={styles.icon} />
      <FaQuestionCircle className={styles.icon} />
      <FaCog className={styles.icon} />
    </aside>
  );
};

export default Sidebar;
