import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/AuthPage.module.css';

const AuthPage = () => {
    const location = useLocation();

    return (
        <div className={styles.authContainer}>
            {location.pathname === '/login' && <LoginForm />}
            {location.pathname === '/register' && <RegisterForm />}
        </div>
    );
};

export default AuthPage;
