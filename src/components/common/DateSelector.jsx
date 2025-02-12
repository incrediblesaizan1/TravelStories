import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import { MdClose, MdOutlineDateRange } from "react-icons/md";
import { useScrollTrigger } from "@mui/material";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium  text-cyan-300 bg-cyan-900/40 hover:bg-sky-200/70 rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>

      {openDatePicker && (
        <div className="overflow-hidden w-[70%] p-5 bg-sky-50/80 rounded-lg relative pt-9">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100 hover:bg-sky-100 absolute top-2 right-2 overflow-hidden"
            onClick={() => {
              setOpenDatePicker(false);
            }}
          >
            <MdClose className="text-xl text-sky-600 overflow-hidden" />
          </button>
          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            selected={date}
            onSelect={setDate}
            style={{
              "--rdp-accent-color": "#01f0cb",
              "--rdp-accent-background-color": "#dffbff",
              "--rdp-day_button-border-radius": "8px",
              "--rdp-selected-font": "bold medium var(--rdp-font-family)",
            }}
            pagedNavigation
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
