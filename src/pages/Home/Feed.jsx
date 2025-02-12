import React, { useEffect, useState } from 'react'
import Loader2 from '../../components/common/Loader2';
import { axiosInstance } from '../../utils/axiosInstance';
import Navbar from "../../components/common/Navbar"
import FeedNav from '../../components/common/FeedNav';
import TravelStoryCard from "../../components/common/TravelStoryCard"

const feed = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState(null)

  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axiosInstance("/user");
          setIsLoading(false);
          setIsAuthenticated(true);
        } catch (error) {
          setIsLoading(false);
          setIsAuthenticated(false);
        }
      };
      checkAuth();
      try {
        const fetchPost = async() =>{
         const a =  await axiosInstance.get("get-all-travelStories")
          setPostData(a.data.stories)
          setIsLoading(false) 
       }

       fetchPost()
    } catch (error) {
      setIsLoading(false)
      console.log("Something went wrong while fetching the data", error)
    }
     
    }, []);
    console.log(postData)

  return (
    <>
      {isLoading?<Loader2 />:(
        <>
       {isAuthenticated?<Navbar />:(
        <>
        <FeedNav />
        <div className="p-6 bg-[rgb(0,0,0,0.9)] ">
        {postData?<div className="grid w-[97vw] grid-cols-3 gap-4 ">
                 {  postData.map((item)=>(
                  <TravelStoryCard
                  key={item._id}
                  imgUrl={item.imageUrl}
                  title={item.title}
                  story={item.story}
                  date={item.visitedDate}
                  visitedLocation={item.visitedLocation}
                  isFavourite={item.isFavourite}
                  onClick={() => {}}
                />
                   ))}
                   </div>:<Loader2 />}
                   </div>

        </>
       )}
        </>
      )}
    </>
  )
}

export default feed
