import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import Loader2 from "../../components/common/Loader2";
import NoLoggedIn from "../../components/common/NoLoggedIn";
import Navbar from "../../components/common/Navbar";
import TravelStoryCard from "../../components/common/TravelStoryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
Modal.setAppElement("#root");
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/common/EmptyCard";
import { DayPicker, Dropdown } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../components/common/FilterInfoTitle";
import { getEmptyCardMessage } from "../../utils/helper";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [btnDisable, setBtnDisable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const checkLoggedIN = async () => {
    try {
      const user = await axiosInstance.get("/user",{
        headers: { 
          "Content-Type": "multipart/form-data",
          "accesstoken": `${localStorage.getItem("accessToken")}`
        },
      });
      setUserInfo(user.data.user);
      await getAlltravelStories();
      setIsLoggedIn(true);
    } catch (error) {
      setUserInfo(null);
      setIsLoggedIn(false);
    }
  };

  const getAlltravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-user-travelStories",{
        headers: { 
          "Content-Type": "multipart/form-data",
          "accesstoken": `${localStorage.getItem("accessToken")}`
        },
      });
      setAllStories(response.data.stories.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(
        "An unexpected error occurred while fetching travel stories."
      );
      setIsLoading(false);
    }
  };

  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data });
  };

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data: data });
  };

  const updateIsFavorite = async (storyData) => {
    setBtnDisable(true);
    storyData.isFavourite = !storyData.isFavourite;
    await axiosInstance.put(`/update-is-favourite/${storyData._id}`, {
      isFavourite: storyData.isFavourite,
    },{
      headers: { 
        "Content-Type": "multipart/form-data",
        "accesstoken": `${localStorage.getItem("accessToken")}`
      },
    });
    toast.success("Story Updated Successfully");

    if (filterType === "search" && searchQuery) {
      onSearchStory(searchQuery);
    } else if (filterType === "date") {
      filterStoriesByDate(dateRange);
    } else {
      getAlltravelStories();
    }
    getAlltravelStories();
    setBtnDisable(false);
  };

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: {
          query,
        },
      },{
        headers: { 
          "Content-Type": "multipart/form-data",
          "accesstoken": `${localStorage.getItem("accessToken")}`
        },
      });
      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected Error Occured:", error);
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    getAlltravelStories();
  };

  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-stories-filter", {
          params: { startDate, endDate },
        },{
          headers: { 
            "Content-Type": "multipart/form-data",
            "accesstoken": `${localStorage.getItem("accessToken")}`
          },
        });

        if (response.data && response.data.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.log("An unexpected Error Occured:", error);
    }
  };

  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAlltravelStories();
  };

  useEffect(() => {
    checkLoggedIN();
  }, []);

  if (isLoggedIn === null) return <Loader2 />;

  return (
    <>
      {!isLoggedIn ? (
        <NoLoggedIn />
      ) : (
        <div className="bg-[rgb(0,0,0,0.9)]">
          <Navbar
            userInfo={userInfo}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchNote={onSearchStory}
            handleClearSearch={handleClearSearch}
          />
          <div className="container  mx-6 py-10">
            <FilterInfoTitle
              filterType={filterType}
              filterDates={dateRange}
              onClear={() => {
                resetFilter();
              }}
            />

            <div className="flex gap-7">
              {isLoading ? (
                <Loader2 />
              ) : (
                <div className="flex-1 ">
                  {allStories.length > 0 ? (
                    <div className="grid w-[75vw] grid-cols-2 gap-4 ">
                      {allStories.map((item) => {
                        return (
                          <TravelStoryCard
                            key={item._id}
                            imgUrl={item.imageUrl}
                            title={item.title}
                            story={item.story}
                            date={item.visitedDate}
                            userId={item.userId}
                            visitedLocation={item.visitedLocation}
                            isFavourite={item.isFavourite}
                            onClick={() => handleViewStory(item)}
                            onFavouriteClick={() => updateIsFavorite(item)}
                            btnDisable={btnDisable}
                          />
                        );
                      })}
                    </div>  
                  ) : (
                    <EmptyCard message={getEmptyCardMessage(filterType)} />
                  )}
                </div>
              )}

              <div className="w-[336px] h-[90vh] relative right-8">
                <div className="bg-zinc-600 border border-slate-600 shadow-lg shadow-slate-600/60 rounded-lg">
                  <div className="p-4">
                    <DayPicker
                      captionLayout="dropdown-buttons"
                      mode="range"
                      selected={dateRange}
                      onSelect={handleDayClick}
                      pagedNavigation
                      style={{
                        "--rdp-accent-color": "#01b0cb",
                        "--rdp-accent-background-color": "rgb(73,73,73)",
                        "--rdp-day_button-border-radius": "0px",
                        "--rdp-selected-font": "bold medium var(--rdp-font-family)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() =>
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }
            style={{
              overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 50 },
            }}
            className="modal-box custom-scrollbar2 bg-[rgb(37,37,37)]"
          >
            <AddEditTravelStory
              type={openAddEditModal.type}
              storyInfo={openAddEditModal.data}
              onClose={() =>
                setOpenAddEditModal({ isShown: false, type: "add", data: null })
              }
              getAllTravelStories={getAlltravelStories}
            />
          </Modal>

          <Modal
            isOpen={openViewModal.isShown}
            onRequestClose={() =>
              setOpenViewModal({ isShown: false, type: "add", data: null })
            }
            style={{
              overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 50 },
            }}
            className="modal-box custom-scrollbar2 bg-[rgb(37,37,37)] outline-none "
          >
            <ViewTravelStory
              storyInfo={openViewModal.data || null}
              onClose={() => {
                setOpenViewModal({
                  isShown: false,
                });
              }}
              userInfo={userInfo}
              onEditClick={() => {
                setOpenViewModal({
                  isShown: false,
                });
                handleEdit(openViewModal.data || null);
              }}
              onDeleteClick={async () => {
                try {
                  setIsLoading(true);
                  await axiosInstance.delete(
                    `/delete-travelStory/${openViewModal.data._id}`,{
                      headers: { 
                        "Content-Type": "multipart/form-data",
                        "accesstoken": `${localStorage.getItem("accessToken")}`
                      },
                    }
                  );
                  getAlltravelStories();
                  setOpenViewModal({
                    isShown: false,
                  });
                  toast.error("Story Deleted Successfully");
                  setIsLoading(false);
                } catch (error) {
                  console.log(
                    error.message ||
                      "Something went wrong while deleting the story."
                  );
                }
              }}
            />
          </Modal>

          <button
            className="w-16 h-16 flex items-center justify-center rounded-full  bg-[#05B6D3] hover:bg-cyan-400 fixed right-10 bottom-10"
            onClick={() =>
              setOpenAddEditModal({ isShown: true, type: "add", data: null })
            }
          >
            <MdAdd className="text-[32px] text-white " />
          </button>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
};

export default Home;
