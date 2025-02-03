import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../utils/axiosInstance";
import Loader from "../../components/common/Loader"
import NoLoggedIn from "../../components/common/NoLoggedIn"
import Navbar from '../../components/common/Navbar';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [userInfo, setUserInfo] = useState(null)


  const checkLoggedIN = async() =>{
    try {
     const user = await axiosInstance("/user")
     setUserInfo(user.data.user)
     setIsLoggedIn(true)
    } catch (error) {
      setUserInfo(null)
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
  checkLoggedIN()
  }, [])

  if (isLoggedIn === null) return <Loader />

  return (
    <>
    {!isLoggedIn?<NoLoggedIn /> :(
      <>
      <Navbar userInfo={userInfo} />
      </>
    )}
    </>
  );
};

export default Home;
