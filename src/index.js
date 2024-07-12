
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Redirect } from "react-router-dom"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Navigate } from 'react-router-dom';
import WelcomePage from './components/welcomepage/WelcomePage';
import Introduction from './components/introduction/Introduction';
import Home from './pages/home/Home';
import Error from './components/error/Error';
import Dashboard from './components/dashbaord/Dashboard';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    element={isLoggedIn ? <Component /> : <Navigate to="/" replace />}
  />
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />, 
    children: [
      {
        path: "welcomepage",
        element: <WelcomePage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "introduction",
        element: <Introduction />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_FOR_REACT}>
    <RouterProvider router={router} /> 
  </GoogleOAuthProvider>
);

reportWebVitals();