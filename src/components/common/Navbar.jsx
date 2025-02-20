import React from "react";
import logo from "../../assets/download.png";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  const navigate = useNavigate()

  return (
    <div className="bg-[url('/walpaper/download.svg')] bg-cover bg-left flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={logo} alt="logo" width={100}  className=' invert' />

      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
        onClear={onClearSearch}
      />
<div className="gap-4 flex items-center">
<div>
            <button  onClick={() => navigate("/feed")} className=' cursor-pointer w-32  h-8 border-none outline-none text-cyan-300 bg-cyan-900/40 rounded  font-bold '>Feed</button>
          </div>
<div>
      <ProfileInfo userInfo={userInfo} />
</div>
    </div>
</div>
  );
};

export default Navbar;
