import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  useNavigate,
  RouterProvider,
} from "react-router-dom";
import { axiosInstance } from "./utils/axiosInstance";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Loader2 from "./components/common/Loader2";
import Feed from "./pages/Home/Feed"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/feed",
      element: <Feed />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance("/user");
        setIsLoading(false);
        setIsAuthenticated(true);
      } catch (error) {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader2 />;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/feed" />
  );
};

export default App;
