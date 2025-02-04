import React from 'react'
import { getInitials } from "../../utils/helper"
import { useNavigate } from "react-router-dom"; 
import {axiosInstance} from "../../utils/axiosInstance"

const ProfileInfo = ({ userInfo }) => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(userInfo ? userInfo.fullname : "")}
      </div>
      <div>
        <p className='text-lg relative left-2 top-1 font-medium'>{userInfo.fullname || ""}</p>
        <button className='text-sm cursor-pointer hover:text-red-500 text-slate-700 underline' onClick={async()=>{
        await axiosInstance.get("/logout")
        window.close();
          navigate("/login")
        }}>LogOut</button>
      </div>
    </div>
  )
}

export default ProfileInfo
