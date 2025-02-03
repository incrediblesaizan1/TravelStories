import React,  { useState, useEffect } from 'react'
import {createBrowserRouter, Navigate,useNavigate, RouterProvider} from "react-router-dom";
import { axiosInstance } from './utils/axiosInstance';
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Home/Home"
import Loader from "./components/common/Loader"


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />
    },
    {
      path: '/dashboard',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

const Root = () =>{
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const checkAuth = async() =>{
      try {
        await axiosInstance("/user")
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1300);
    }
     checkAuth()
  }, [])
  
  if(isLoading){
    return <Loader />
  }
  
  return isAuthenticated? <Navigate to="/dashboard" />:  <Navigate to="login" />

}


export default App
