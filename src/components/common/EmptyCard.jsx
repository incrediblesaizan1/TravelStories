import React from 'react'
import story from "../../assets/story.svg"

const EmptyCard = ({  message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <img src={story} alt="No notes" className='w-18 text-blue-300' />
      <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
        {message}
      </p>
    </div>
  )
}

export default EmptyCard
