import React, { useEffect, useState } from "react";
import Loader2 from "../../components/common/Loader2";
import { axiosInstance } from "../../utils/axiosInstance";
import Navbar from "../../components/common/Navbar";
import FeedNav from "../../components/common/FeedNav";
import TravelStoryCard from "../../components/common/TravelStoryCard";
import TravelStoryCardFeed from "../../components/common/TravelStoryCardFeed";
import ViewTravelStoryFeed from "./ViewTravelStoryFeed"
import Modal from "react-modal";
Modal.setAppElement("#root");


const feed = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [allPost, setAllPost] = useState(null)
  const [search, setSearch] = useState("");
  const [postFilter, setPostFilter] = useState([]);
 const [openModal, setOpenModal] = useState({
  isShown: false,
  data: null
 })



  useEffect(() => {
    if (!postData) return; // Ensure postData exists
  
    const filteredItems = postData.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  
    setPostData(filteredItems);
    if(search === "" || search.trim() === ""){
      setPostData(allPost)
    }
  }, [search]); 
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance("/user");
        setIsLoading(false);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    try {
      const fetchPost = async () => {
        const a = await axiosInstance.get("get-all-travelStories");
        setPostData(a.data.stories);
        setAllPost(a.data.stories)
        setIsLoading(false);
      };

      fetchPost();
    } catch (error) {
      setIsLoading(false);
      console.log("Something went wrong while fetching the data", error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <Navbar />
              <div className="p-6 bg-[rgb(0,0,0,0.9)] ">
                {postData ? (
                  <div className="grid w-[97vw] grid-cols-3 gap-4 ">
                    {postData.map((item) => (
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
                  </div>
                ) : (
                  <Loader2 />
                )}
              </div>
            </>
          ) : (
            <>
              <FeedNav setSearch={setSearch} />
              <div className="p-6 min-h-[100vh] bg-[rgb(0,0,0,0.9)] ">
                {postData ? (
                  <div className="grid w-[97vw] grid-cols-3 gap-4 ">
                    {postData.map((item) => (
                      <TravelStoryCardFeed
                        key={item._id}
                        imgUrl={item.imageUrl}
                        title={item.title}
                        story={item.story}
                        date={item.visitedDate}
                        visitedLocation={item.visitedLocation}
                        onClick={() => (setOpenModal({
                          isShown:true,
                          data:item
                        }))}
                      />
                    ))}
                  </div>
                ) : (
                  <Loader2 />
                )}
              </div>
            </>
          )}
        </>
      )}
        <Modal
            isOpen={openModal.isShown}
            onRequestClose={() =>
              setOpenModal({ isShown: false, data: null })
            }
            style={{
              overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 50 },
            }}
            className="modal-box custom-scrollbar2 bg-[rgb(37,37,37)] outline-none "
          >
            <ViewTravelStoryFeed
              storyInfo={openModal.data || null}
              onClose={() => {
                setOpenModal({
                  isShown: false,
                });
              }}
            />
          </Modal>
    </>
  );
};

export default feed;
