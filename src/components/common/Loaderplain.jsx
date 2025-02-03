import React from 'react'
import { HashLoader } from 'react-spinners';


const Loaderplain = () => {
  return (
    <div className=" h-screen w-[100vw] z-50 left-[-50vw] flex justify-center items-center backdrop-blur-md absolute -top-22">
  <HashLoader
  color="#0080d8"
  size={140}
/>
    </div>
  )
}

export default Loaderplain
