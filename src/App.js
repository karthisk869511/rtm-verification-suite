import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Header from './components/header/Header';
import WelcomePage from './components/welcomepage/WelcomePage';
import Footer from './components/footer/Footer';
import Introduction from './components/introduction/Introduction';
import './App.css';
import Dashboard from "./components/dashbaord/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const timeoutDuration = parseInt(process.env.REACT_APP_TIMEOUT_DURATION);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("lastActivity");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      const lastActivity = localStorage.getItem("lastActivity");
      const currentTime = new Date().getTime();
      if (lastActivity && currentTime - lastActivity > timeoutDuration) {
        handleLogout();
      } else {
        localStorage.setItem("lastActivity", currentTime);
      }
    } else {
      navigate("/");
    }
  }, [handleLogout, navigate, timeoutDuration]);

  const onLoginSuccess = async (accessToken) => {
    try {
      if (!accessToken) {
        return;
      }
      console.log("Access Token:", accessToken);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.credentials) {
          localStorage.setItem("accessToken", data.credentials);
          setIsLoggedIn(true);
          navigate("/introduction");
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const onLoginFailure = (error) => {
    console.error("Login failed:", error);
    setLoginError(true);
  };

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginSuccess={onLoginSuccess} 
        onLoginFailure={onLoginFailure} 
        logout={handleLogout} 
        loginError={loginError} 
      />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/introduction" element={<Introduction />} />
       
      </Routes>
      <Dashboard></Dashboard>
      <Footer/>
    </div>
  );
}

export default App;
