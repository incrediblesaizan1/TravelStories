import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../utils/axiosInstance";
import Loader2 from "../../components/common/Loader2"
import NoLoggedIn from "../../components/common/NoLoggedIn"
import Navbar from '../../components/common/Navbar';
import TravelStoryCard from "../../components/common/TravelStoryCard"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { MdAdd } from 'react-icons/md';
import Modal from "react-modal"
import AddEditTravelStory from "./AddEditTravelStory"

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })


  const checkLoggedIN = async() =>{
    try {
     const user = await axiosInstance("/user")
     setUserInfo(user.data.user)
     await getAlltravelStories()
     setIsLoggedIn(true)
    } catch (error) {
      setUserInfo(null)
      setIsLoggedIn(false)
    }
  }

  const getAlltravelStories =  async() =>{
    try {
      const response = await axiosInstance.get("/get-user-travelStories")
      setAllStories(response.data.stories.reverse())
      setIsLoading(false)
    } catch (error) {
      console.log("An unexpected error occurred while fetching travel stories.")
      setIsLoading(false)
    }
  }

  const handleEdit = (data) =>{}
  const handleViewStory = (data) =>{}

  const updateIsFavorite = async(storyData) =>{
    setIsLoading(true)
    storyData.isFavourite = !storyData.isFavourite; 
    await axiosInstance.put(`/update-is-favourite/${storyData._id}`,{
      "isFavourite": storyData.isFavourite
    })
    toast.success("Story Updated Successfully")
    getAlltravelStories()
    setTimeout(() => {
      setIsLoading(false)
    }, 400);
  }

  useEffect(() => {
  checkLoggedIN()
  }, [])

  
  if (isLoggedIn === null) return <Loader2 />

  return (
    <>
    {!isLoggedIn?<NoLoggedIn /> :(
      <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-16 py-10'>
      <div className='flex gap-7'>
{isLoading? <Loader2 />:(
  <div className='flex-1'>
  {allStories.length > 0 ? (
    <div className='grid grid-cols-3 gap-4 w-[90vw]'>
      {allStories.map((item) => {
        return (
          <TravelStoryCard
            key={item._id}
            imgUrl={item.imageUrl}
            title={item.title}
            story={item.story}
            date={item.visitedDate}
            visitedLocation={item.visitedLocation}
            isFavourite={item.isFavourite}
            onEdit={() => handleEdit(item)}
            onClick={() => handleViewStory(item)}
            onFavouriteClick={() => updateIsFavorite(item)}
          />
        );
      })}
    </div>
  ) : (
    <div className="text-center py-4">No travel stories found.</div>
  )}
</div>
)}

  <div className='w-[320px]'></div>
      </div>
      </div>

      <Modal 
  isOpen={openAddEditModal.isShown}
  onRequestClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
  style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
  className="modal-box custom-scrollbar2"
>
  <AddEditTravelStory 
    type={openAddEditModal.type} 
    storyInfo={openAddEditModal.data} 
    onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
    getAllTravelStories={getAlltravelStories} 
  />
</Modal>

    <button className='w-16 h-16 flex items-center justify-center rounded-full bg-[#05B6D3] hover:bg-cyan-400 fixed right-10 bottom-10' onClick={()=>(
      setOpenAddEditModal({isShown: true, type:"add", data: null})
    )}>
      <MdAdd className='text-[32px] text-white' />
    </button>
      <ToastContainer />
      </>
    )}
    </>
  );
};

export default Home;
