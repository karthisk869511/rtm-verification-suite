import React, {useState}from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import { GoogleLogin } from '@react-oauth/google';
import logo from './assets/logo.gif'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const Header = ({ isLoggedIn, onLoginSuccess, onLoginFailure, logout, loginError }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
      <header >
        <div className="flex items-center justify-between p-5 flex-nowrap relative">
          <div className="flex items-center">
            {isLoggedIn ? (
              <Link to="/introduction" className="sm:mt-2">
                <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 w-auto mb-2 sm:mb-0 sm:ml-0 -ml-2" />
              </Link>
            ) : (
              <img src={logo} alt="Logo" className="h-10 block sm:h-12 md:h-16 lg:h-20 xl:h-24 w-auto opacity-100 mb-2 sm:mb-0 sm:ml-0 -ml-4" />
            )}
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="Ver-text">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Verification Suite</h1>
            </div>
          </div>
          <div className="flex justify-end items-center relative">
            <div className="block sm:hidden relative top-[-0px]">
              <button onClick={handleDropdownToggle} className="text-white">
                <svg
                  className="w-6 h-6"
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10" style={{ marginRight: '20px' }}>
                  {!isLoggedIn && (
                    <div className="google-login-container">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const accessToken = credentialResponse?.credential;
                          onLoginSuccess(accessToken);
                        }}
                        onError={(error) => {
                          onLoginFailure(error);
                        }}
                        className="google-login-btn"
                      />
                    </div>
                  )}
                  {isLoggedIn && (
                    <button className="sign-out-btn w-full text-left px-4 py-2 text-sm text-gray-700" onClick={logout}>
                      Sign out
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="hidden sm:flex items-center">
              {!isLoggedIn && (
                <div className="google-login-container">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const accessToken = credentialResponse?.credential;
                      onLoginSuccess(accessToken);
                    }}
                    onError={(error) => {
                      onLoginFailure(error);
                    }}
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
              <div className="invalid-login">
                <p className="text-red-500">Invalid login attempt</p>
              </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
