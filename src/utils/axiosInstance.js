import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travelstorybackend.vercel.app", 
  withCredentials: true,  
  headers: {
    "Content-Type": "application/json",
  },
});