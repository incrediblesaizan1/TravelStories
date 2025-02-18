import React, {  useEffect, useState } from 'react'
import logo from "../../assets/download.png";
import { IoMdClose } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../../utils/axiosInstance"
import ProfileInfo from './ProfileInfo';


const FeedNav = ({setSearch, userInfo}) => {
    const [value, setValue] = useState(null)
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null)

    useEffect(() => {
      try {
        const fetchPost = async() =>{
         const a =  await axiosInstance.get("get-all-travelStories")
          setPostData(a.data.stories)
       }

       fetchPost()
    } catch (error) {
      console.log("Something went wrong while fetching the data", error)
    }
    }, [])
 
  return (
    <div className=" bg-[url('/walpaper/download.svg')] bg-cover bg-left backdrop-blur-2xl flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
    <img src={logo}  alt="logo" width={100} className=' invert' />

    <div className="w-80 flex items-center px-4 bg-[rgb(53,53,53)] rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-white text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={(e)=>setSearch(e.target.value)}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-100 cursor-pointer hover:text-black mr-3"
          onClick={()=>{}}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={()=>{}}
      />
    </div>

    <div className='mr-8'>
            <button  onClick={() => navigate("/dashboard")} className=' cursor-pointer w-32 absolute bottom-7 right-36 h-8 border-none outline-none   text-cyan-300 bg-cyan-900/40 rounded  font-bold '>Feed</button>
          </div>

    <ProfileInfo userInfo={userInfo} />

  </div>
  )
}

export default FeedNav
