import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Authentication.css';

const Authentication = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (location.pathname === '/register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  return (
    <div className="auth-page-container">
      <div className="auth-card-wrapper">
        <div className="auth-tabs">
          <Link
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            to="/login"
            onClick={() => setIsLogin(true)}
          >
            Login
          </Link>
          <Link
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            to="/register"
            onClick={() => setIsLogin(false)}
          >
            Register
          </Link>
        </div>
        <div className="auth-content">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
