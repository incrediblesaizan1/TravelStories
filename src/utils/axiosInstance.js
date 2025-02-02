import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travelstorybackend.vercel.app", // ✅ Replace with your backend URL
  withCredentials: true,  // ✅ Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});