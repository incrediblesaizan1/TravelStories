import React from 'react'
import { getInitials } from "../../utils/helper"
import { useNavigate } from "react-router-dom"; 

const ProfileInfo = ({ userInfo }) => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(userInfo ? userInfo.fullname : "")}
      </div>
      <div>
        <p className='text-sm font-medium'>{userInfo.fullname || ""}</p>
      </div>
    </div>
  )
}

export default ProfileInfo
