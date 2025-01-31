import React,  { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Home/Home"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
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

export default App
