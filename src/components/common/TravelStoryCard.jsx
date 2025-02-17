import React, { useEffect, useId, useState } from "react";
import moment from "moment";
import { GrMapLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import {axiosInstance} from "../../utils/axiosInstance"
import { getInitials } from "../../utils/helper";

const TravelStoryCard = ({
  imgUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onClick,
  onFavouriteClick,
  btnDisable,
  userId
}) => {

  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    
    const findUser = async ()=>{
    const user =  await axiosInstance.get(`/user/${userId}`)
    setUserInfo(user.data.user)
    }

    if(userId){
      findUser()
    }
  }, [userId])
  

  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden bg-[#121212] hover:shadow-lg hover:shadow-slate-800 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
        onClick={onClick}
      />

      <button
        disabled={btnDisable}
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={
            isFavourite
              ? "text-red-500 text-[22px] cursor-pointer hover:text-red-500 "
              : "text-white text-[22px] cursor-pointer hover:text-red-500"
          }
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium text-white">{title}</h6>
            <span className="text-xs text-slate-400">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400 mt-2">{story?.slice(0, 60)} .....</p>

        <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-300 bg-cyan-900/40 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-sm" />
          {visitedLocation.map((item, index) =>
            visitedLocation.length == index + 1 ? (
              <div key={index}>{item}</div>
            ) : (
              `${item},`
            )
          )}
        </div>
        <div className="text-white mt-3 flex items-center gap-1">
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-slate-950 font-medium bg-[rgb(53,53,53)] ">
        {getInitials(userInfo ? userInfo.fullname : "")}
      </div>
          <div className="text-blue-500 mr-2">
          @{userInfo.username}
          </div>
        </div>
          </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
