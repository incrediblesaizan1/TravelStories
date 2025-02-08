import React from "react";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-cyan-50 text-center content-center overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40 " />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />
      <h1 className="text-3xl text-red-600">You must be logged in!</h1>
      <button
        type="button"
        className="btn-primary w-36 hover:bg-black "
        onClick={() => navigate("/login")}
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoggedIn;
