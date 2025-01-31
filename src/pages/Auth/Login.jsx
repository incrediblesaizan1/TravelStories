import React from "react";
import { useNavigate } from "react-router-dom"; // 
import background from "../../assets/XSe80ORCzHU0rP2rjPdXX.png";
import PasswordInput from "../../components/input/PasswordInput"


const Login = () => {
  const navigate = useNavigate(); 

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50"
        >
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Capture Your <br /> Journey
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Record your travel experience and memories in your personal travel journey.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={(e) => e.preventDefault()}>
            <h4 className="text-2xl font-semibold mb-7">Login</h4>
            <input type="text" placeholder="E-Mail" className="input-box" />
            <PasswordInput />

            <button type="submit" className="btn-primary">LOGIN</button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>
            <button
              type="button"
              className="btn-primary btn-light"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
