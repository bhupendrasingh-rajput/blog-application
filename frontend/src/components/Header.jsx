import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import Logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom';

const Header = ({ user, setUser, setIsOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const yes = confirm('Do You Want to Logout?');
        if (yes) {
            sessionStorage.clear();
            setUser(null);
            navigate('/');
        }
    };

    return (
        <header className={styles.header}>
            <img src={Logo} alt="logo" className={styles.logo} />
            {!user ? (
                <div className={styles.buttons}>
                    <button className={styles.login} onClick={() => navigate('/login')}>Login</button>
                    <button className={styles.join} onClick={() => navigate('/register')}>Join Now</button>
                </div>
            ) : (
                <div className={styles.buttons}>
                    <span className={styles.login} >{user?.name}</span>
                    <button className={styles.join} onClick={() => setIsOpen(true)}>Create Blog</button>
                    <button className={styles.join} onClick={handleLogout}>Logout</button>
                </div>
            )}
        </header>
    );
};

export default Header;
