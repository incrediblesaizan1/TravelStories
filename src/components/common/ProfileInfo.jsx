import React from "react";
import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

const ProfileInfo = ({ userInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-[rgb(53,53,53)] ">
        {userInfo ? userInfo.dp? <img src={userInfo.dp} className=" overflow-hidden w-full h-full rounded-full object-cover" alt="Profile" />: userInfo.fullname[0] : "" }
      </div>
      <div>
        <p className="text-lg text-zinc-400 relative top-1 font-medium">
          {userInfo.fullname || ""}
        </p>
        <button
          className="text-sm cursor-pointer hover:text-red-500 text-slate-300 underline"
          onClick={async () => {
            await axiosInstance.get("/logout");
            window.close();
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
