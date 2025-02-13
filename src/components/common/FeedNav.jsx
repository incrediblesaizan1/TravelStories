import React, {  useState } from 'react'
import logo from "../../assets/download.png";
import { IoMdClose } from 'react-icons/io';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";


const FeedNav = () => {
    const [value, setValue] = useState(null)
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null)
   
  

  return (
    <div className=" bg-[url('/walpaper/download.svg')] bg-cover bg-left backdrop-blur-2xl flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
    <img src={logo}  alt="logo" width={100} />

    <div className="w-80 flex items-center px-4 bg-[rgb(53,53,53)] rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-white text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={()=>{}}
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
            <button  onClick={() => navigate("/login")} className=' cursor-pointer w-32 relative h-8 border-none outline-none  text-zinc-200 bg-cyan-900/40 rounded  font-bold '>Login</button>
            <button  onClick={() => navigate("/signup")} className=' cursor-pointer w-32 h-8 border-none outline-none  text-zinc-200 bg-cyan-900/40 relative -right-5 rounded  font-bold'>SignUp</button>
          </div>

  </div>
  )
}

export default FeedNav
