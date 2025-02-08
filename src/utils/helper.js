export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getInitials = (name) =>{
  if(!name) return ""

  const words = name.split(" ")
  let initals = ""

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initals += words[i][0]
  }
return initals.toUpperCase()
}

export const getEmptyCardMessage = (filterType) =>{
  if(filterType){
    if(filterType === "search"){
      return "Oops! No stories found matching your search"
    } else if(filterType === "date"){
      return "No stories found in the given date range"
    }else{
      return "Start creating your first Travel Story! Click the 'ADD' button to join down your thoughts, ideas, and memories. Let's get started!"
    }
  }
}