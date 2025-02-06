import React, { useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import DateSelector from "../../components/common/DateSelector";
import { useScrollTrigger } from "@mui/material";
import ImageSelector from "../../components/common/ImageSelector";
import TagInput from "../../components/common/TagInput";
import { axiosInstance } from "../../utils/axiosInstance"
import moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage"

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedDate, setVisitedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [storyImg, setStoryImg] = useState(null);
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [error, setError] = useState("")


  const updateTravelStory = () =>{}


  const addNewTravelStory = async() =>{
    try {
      let imageUrl = ""

      if(storyImg){
        const imgUploadRes = await uploadImage(storyImg)
        imageUrl = imgUploadRes.imageUrl || "";
      }
     
      const response = await axiosInstance.post("/travelStory",{

          "title":title,
          "story": story,
          "visitedLocation":visitedLocation,
          "imageUrl": imageUrl || "",
          "visitedDate": visitedDate ? moment(visitedDate).valueOf():moment().valueOf()

      })

      if(response.data && response.data.story){
        toast.success("Story Added Successfully")
        getAllTravelStories()
        onClose()
      }

    } catch (error) {
      
    }
  }
 
  const handleAddOrUpdateClick = () => {
    console.log({title, storyImg, story, visitedDate, visitedLocation})

    if(!title){
      setError("Please enter the title")
      return
    }

    if(!story){
      setError("Please enter the story")
      return
    }

    setError("")

    if(type === "edit"){
      updateTravelStory();
    }else{
      addNewTravelStory()
    }
    
  };

  const handleDeleteStoryImg = async () => {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" /> UPDATE STORY
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
            className="text-2xl text-slate-950 outline-none"
            placeholder="A day at a great wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">STORY</label>
            <textarea
              type="text"
              className="text-sm resize-none text-slate-950 outline-none bg-slate-100 p-2 roudned"
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
  );
};

export default AddEditTravelStory;
