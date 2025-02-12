import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClear }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-[rgb(53,53,53)] rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-white text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-100 cursor-pointer hover:text-black mr-3"
          onClick={onClear}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
