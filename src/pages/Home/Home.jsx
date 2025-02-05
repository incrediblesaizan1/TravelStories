import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../utils/axiosInstance";
import Loader2 from "../../components/common/Loader2"
import NoLoggedIn from "../../components/common/NoLoggedIn"
import Navbar from '../../components/common/Navbar';
import TravelStoryCard from "../../components/common/TravelStoryCard"


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const checkLoggedIN = async() =>{
    try {
     const user = await axiosInstance("/user")
     setUserInfo(user.data.user)
 getAlltravelStories()
     setIsLoggedIn(true)
    } catch (error) {
      setUserInfo(null)
      setIsLoggedIn(false)
    }
  }

  const getAlltravelStories =  async() =>{
    try {
      const response = await axiosInstance.get("/get-user-travelStories")
      setAllStories(response.data.stories)
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
      <div className='container mx-18 py-10'>
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
    <Loader2 />
  )}
</div>
)}

  <div className='w-[320px]'></div>
      </div>
      </div>
      </>
    )}
    </>
  );
};

export default Home;
