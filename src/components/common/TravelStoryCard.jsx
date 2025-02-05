import React, { useState } from 'react'
import moment from 'moment'
import { GrMapLocation } from 'react-icons/gr'
import { FaHeart } from 'react-icons/fa6'

const TravelStoryCard = ({imgUrl, title, story, date, visitedLocation, isFavourite, onClick, onFavouriteClick }) => {
  return (
    <div className='border border-slate-400 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer'>
      <img src={imgUrl} alt={title} className='w-full h-56 object-cover rounded-lg' onClick={onClick} />

    <button className='w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4' onClick={onFavouriteClick}  >
        <FaHeart className={isFavourite?"text-red-500 text-[22px] cursor-pointer hover:text-red-500 ":"text-white text-[22px] cursor-pointer hover:text-red-500"} />
    </button>

      <div className='p-4' onClick={onClick}>
    <div className='flex items-center gap-3'>
        <div className='flex-1'>
            <h6 className='text-sm font-medium'>{title}</h6>
        <span className='text-xs text-slate-500'>{date? moment(date).format("Do MMM YYYY"): "-"}</span>
        </div>

    </div>

    <p className='text-sm text-slate-600 mt-2'>{story?.slice(0,60)}</p>

    <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1'>
 <GrMapLocation className='text-sm' />
 {visitedLocation.map((item, index)=> visitedLocation.length == index + 1 ? `${item}`: `${item},`)}
    </div>

      </div>
    </div>
  )
}

export default TravelStoryCard
