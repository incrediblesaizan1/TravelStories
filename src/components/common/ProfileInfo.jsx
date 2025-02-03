import React from 'react'
import { getInitials } from "../../utils/helper"
import { useNavigate } from "react-router-dom"; 
import {axiosInstance} from "../../utils/axiosInstance"

const ProfileInfo = ({ userInfo }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
     const response = await axiosInstance.get("/logout")
      if (response.ok) {
        console.log('Logged out successfully');
        console.log(response)
        navigate("/login");
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(userInfo ? userInfo.fullname : "")}
      </div>
      <div>
        <p className='text-sm font-medium'>{userInfo.fullname || ""}</p>
        <button className='text-sm cursor-pointer text-slate-700 underline' onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  )
}

export default ProfileInfo
