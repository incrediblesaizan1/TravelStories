import React from 'react'
import logo from "../../assets/download.png"
import ProfileInfo from './ProfileInfo'
import SearchBar from './SearchBar'

const Navbar = ({userInfo,searchQuery,setSearchQuery,onSearchNote,handleClearSearch}) => {
  

  const handleSearch = ()=>{
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () =>{
    handleClearSearch();
    setSearchQuery("")
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={logo} alt="logo" width={100}/>

    <SearchBar 
    value={searchQuery}
    onChange={(e)=>{
      setSearchQuery(e.target.value)
    }}
    handleSearch={handleSearch}
    onClear={onClearSearch}
    />

    <ProfileInfo userInfo={userInfo}/>
       </div>

  )
}

export default Navbar
