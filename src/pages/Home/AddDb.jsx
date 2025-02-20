import React, { useId, useState } from "react";
import uploadImage from "../../utils/uploadImage";
import { axiosInstance } from "../../utils/axiosInstance";
import Loader2 from "../../components/common/Loader2"

const AddDb = ({ userInfo }) => {

  const [selectfile, setSelectFile ] = useState(null)
  const [preview, setPreview] = useState(userInfo? userInfo.dp: "")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) =>{
    const file = e.target.files[0]
    if(file){
      setSelectFile(file)
      setPreview(URL.createObjectURL(file));
    }
  }
 
  const uploadDP = async(e) =>{
    setLoading(true)
    e.preventDefault();

    const formData = new FormData();
    if (selectfile) {
      formData.append("image", selectfile);
    }

     await axiosInstance.post("/dp",formData,{
      headers: { "Content-Type": "multipart/form-data" },
    })
    setLoading(false)
    window.location.reload()
  }


  return (
    <div className="">
     {loading? <Loader2 />:(
      <>
       <h1 className="text-zinc-400 text-2xl">CHANGE PROFILE PHOTO</h1>
      <div className="flex mt-12 w-36 h-36 mx-auto rounded-full">
      {userInfo ? userInfo.dp?<img src={preview || ""} className=" overflow-hidden w-full h-full rounded-full object-cover" alt="Profile" />: userInfo.fullname? <span className="bg-zinc-600 text-white w-36 h-36 text-center  text-[90px] rounded-full">{userInfo.fullname[0]}</span> : "" : ""}
      </div>
      <form onSubmit={uploadDP} className="mt-8">
        <label className="text-white">
          <span className="cursor-pointer m-4 bg-zinc-500 px-4 py-2 rounded">
            {" "}
            Select File{" "}
          </span>
          <input type="file" className="" onChange={handleFileChange} />
        </label>
        <button
          type="submit"
          className="block mx-auto my-10 cursor-pointer m-4 bg-cyan-500/20 text-white px-4 py-2 rounded"
        >
          UPLOAD
        </button>
      </form>
      </>
     )}
    </div>
  );
};

export default AddDb;
