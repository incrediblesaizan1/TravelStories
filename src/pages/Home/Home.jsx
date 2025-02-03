import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../utils/axiosInstance";
import Loader from "../../components/common/Loader"

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
  {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <Loader />}
    </div>
  );
};

export default Home;
