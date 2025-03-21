import React, { useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import DateSelector from "../../components/common/DateSelector";
import { useScrollTrigger } from "@mui/material";
import ImageSelector from "../../components/common/ImageSelector";
import TagInput from "../../components/common/TagInput";
import { axiosInstance } from "../../utils/axiosInstance";
import moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";
import Loader2 from "../../components/common/Loader2";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateTravelStory = async () => {
    try {
      setIsLoading(true);
      let imageUrl = storyInfo.imageUrl;

      if (storyImg && storyImg !== storyInfo.imageUrl) {
        const imgUploadRes = await uploadImage(storyImg);
        if (imgUploadRes && imgUploadRes.imageUrl) {
          imageUrl = imgUploadRes.imageUrl;
        }
      } else if (!storyImg) {
        setError("Please upload a image.");
        setIsLoading(false);
        return;
      }

      const response = await axiosInstance.put(
        `/edit-travelStory/${storyInfo._id}`,
        {
          title: title,
          story: story,
          visitedLocation: visitedLocation,
          imageUrl: imageUrl || "",
          visitedDate: visitedDate
            ? moment(visitedDate).valueOf()
            : moment().valueOf(),
        },{
          headers: { 
            "Content-Type": "multipart/form-data",
            "accesstoken": `${localStorage.getItem("accessToken")}`
          },
        }
      );

      if (response.data && response.data.story) {
        toast.success("Story Updated Successfully");
        getAllTravelStories();
        onClose();
      }
      setIsLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const addNewTravelStory = async () => {
    try {
      setIsLoading(true);
      let imageUrl = "";

      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      } else if (!storyImg) {
        setError("Please upload a image.");
        setIsLoading(false);
        return;
      }

      const response = await axiosInstance.post("/travelStory", {
        title: title,
        story: story,
        visitedLocation: visitedLocation,
        imageUrl: imageUrl || "",
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      },{
        headers: { 
          "Content-Type": "multipart/form-data",
          "accesstoken": `${localStorage.getItem("accessToken")}`
        },
      }
    );

      if (response.data && response.data.story) {
        toast.success("Story Added Successfully");
        getAllTravelStories();
        onClose();
      }
      setIsLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!story) {
      setError("Please enter the story");
      return;
    }

    setError("");

    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

  const handleDeleteStoryImg = async () => {};

  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : (
        <div className="relative bg-[rgb(37,37,37)]">
          <div className="flex items-center  justify-between">
            <h5 className="text-xl font-medium  text-slate-400">
              {type === "add" ? "Add Story" : "Update Story"}
            </h5>
            <div>
              <div className="flex  items-center gap-3 bg-[rgb(37,37,37)] p-2 rounded-l-lg">
                {type === "add" ? (
                  <button
                    className="btn-small border-none outline-none  text-cyan-300 bg-cyan-900/40"
                    onClick={handleAddOrUpdateClick}
                  >
                    <MdAdd className="text-lg " /> ADD STORY
                  </button>
                ) : (
                  <>
                    <button
                      className="btn-small border-none outline-none  text-cyan-300 bg-cyan-900/40"
                      onClick={handleAddOrUpdateClick}
                    >
                      <MdUpdate className="text-lg " /> UPDATE STORY
                    </button>
                  </>
                )}
                <button className="cursor-pointer" onClick={onClose}>
                  <MdClose className="text-xl text-slate-400" />
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
              )}
            </div>
          </div>

          <div>
            <div className=" flex-1 flex flex-col gap-2 pt-4">
              <label className="input-label">TITLE</label>
              <input
                type="text"
                className="text-2xl text-slate-200 outline-none"
                placeholder="A day at a great wall"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="my-3 ">
                <DateSelector date={visitedDate} setDate={setVisitedDate} />
              </div>

              <ImageSelector
                image={storyImg}
                setImage={setStoryImg}
                handleDeleteImg={handleDeleteStoryImg}
              />

              <div className="flex flex-col  gap-2 mt-4">
                <label className="input-label">STORY</label>
                <textarea
                  type="text"
                  className="text-sm resize-none text-slate-300 outline-none  bg-zinc-600/20 p-2 roudned"
                  placeholder="Your Story"
                  rows={10}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                ></textarea>
              </div>

              <div className="pt-3">
                <label className="input-label">VISITED LOCATION</label>
                <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditTravelStory;
