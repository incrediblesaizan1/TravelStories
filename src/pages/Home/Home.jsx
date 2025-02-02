import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../utils/axiosInstance";

const Home = () => {
  const [data, setData] = useState(null);  

  const fetchData = async () => {   
    try {
      const response = await axiosInstance.get("/user");  
      setData(response.data);  
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div>
  {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
};

export default Home;
