import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date?.from).format("Do MMM YYYY")
      : "N/A";
    const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY") : "N/A";

    return (
      <div className="flex items-center gap-2 bg-zinc-700 text-slate-300 px-3 py-2 rounded">
        <p className="text-xs font-medium">
          {startDate} - {endDate}
        </p>

        <button onClick={onClear} className="cursor-pointer">
          <MdOutlineClose />
        </button>
      </div>
    );
  };
  return (
    filterType && (
      <div className="mb-5">
        {filterType === "search" ? (
          <h3 className="text-lg font-medium text-slate-400">Search Results</h3>
        ) : (
          <div className="flex  items-center gap-2">
            <h3 className="text-lg font-medium text-slate-400">Travel Stories from </h3>
            <DateRangeChip date={filterDates}  />
          </div>
        )}
      </div>
    )
  );
};

export default FilterInfoTitle;
