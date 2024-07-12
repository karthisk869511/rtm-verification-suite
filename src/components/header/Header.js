import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './assets/logo.gif';
import { GoogleLogin } from '@react-oauth/google';
import signinIcon from './assets/sign-in.png';

const Header = ({ isLoggedIn, onLoginSuccess, onLoginFailure, logout, loginError }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 480);
  const [showCustomSignIn, setShowCustomSignIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobileView(width < 480);
      if (!isMobileView) {
        setShowCustomSignIn(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileView]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCustomSignInClick = () => {
    setShowCustomSignIn(true);
  };

  const handleGoogleSignInSuccess = (credentialResponse) => {
    const accessToken = credentialResponse?.credential;
    onLoginSuccess(accessToken);
  };

  const handleGoogleSignInError = (error) => {
    onLoginFailure(error);
  };

  return (
    <header>
      <div className="header-container">
        {isLoggedIn ? (
          <Link to="/introduction" className="logo-link">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </Link>
        ) : (
          <div className="logo-container disabled">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        )}
        <div className="verification-container">
          <h1 className="verification-text">Verification Suite</h1>
        </div>
        <div className="auth-container">
          <div className="dropdown">
            <button onClick={handleDropdownToggle} className="dropdown-button">
              <svg
                className="dropdown-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {!isLoggedIn && !isMobileView && (
                  <div className="google-login-container">
                    <GoogleLogin
                      onSuccess={handleGoogleSignInSuccess}
                      onError={handleGoogleSignInError}
                      className="google-login-btn"
                    />
                  </div>
                )}
                {isLoggedIn && (
                  <button className="sign-out-btn" onClick={logout}>
                    Sign out
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="desktop-auth">
            {!isLoggedIn && (
              <div className="google-login-container">
                <GoogleLogin
                  onSuccess={handleGoogleSignInSuccess}
                  onError={handleGoogleSignInError}
                  className="google-login-btn"
                />
              </div>
            )}
            {isLoggedIn && (
              <button className="sign-out-btn" onClick={logout}>
                Sign out
              </button>
            )}
          </div>
          {loginError && (
            <div className="login-error">
              <p className="login-error-text">Invalid login attempt</p>
            </div>
          )}
        </div>
        {isMobileView && (
          <div className="custom-sign-in-container">
            {!isLoggedIn && (
              <img
                src={signinIcon}
                alt="Sign In"
                className="sign-in-icon"
                onClick={handleCustomSignInClick}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
