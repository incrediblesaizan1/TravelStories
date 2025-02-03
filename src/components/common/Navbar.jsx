import React from 'react'
import logo from "../../assets/download.png"
import ProfileInfo from './ProfileInfo'

const Navbar = ({userInfo}) => {
  
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={logo} alt="logo" width={100}/>


    <ProfileInfo userInfo={userInfo}/>
       </div>

  )
}

export default Navbar
