import moment from "moment";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import { getInitials } from "../../utils/helper";

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
  userInfo
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div className="flex justify-between w-full">
       <div className="flex items-center gap-1">
            <div className="w-11 h-11 flex items-center justify-center rounded-full text-slate-950 font-medium bg-[rgb(53,53,53)] ">
              {getInitials(userInfo ? userInfo.fullname : "")}
            </div>
            <div>
              <p className="text-lg text-zinc-400 font-medium">
                {userInfo.fullname || ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[rgb(37,37,37)] p-2 rounded-l-lg">
            <button className="btn-small border-none outline-none  text-cyan-300 bg-cyan-900/40" onClick={onEditClick}>
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdDeleteOutline className="text-lg" /> Delete
            </button>

            <button className="cursor-pointer" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-[rgb(181,181,181)]">
            {storyInfo?.title || "Untitled Story"}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo?.visitedDate
                ? moment(storyInfo.visitedDate).format("Do MMM YYYY")
                : "Unknown Date"}
            </span>
            <div className="inline-flex items-center gap-2 text-[13px]  text-cyan-300 bg-cyan-900/40 rounded px-2 py-1">
              <GrMapLocation className="text-sm" />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length == index + 1
                    ? ` ${item}`
                    : `${item},`
                )}
            </div>
          </div>
        </div>
        <img
          src={storyInfo && storyInfo.imageUrl}
          alt="selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
          <p className="text-sm text-slate-400 leading-6 text-justify whitespace-pre-line">
            {storyInfo?.story || "No story content available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
