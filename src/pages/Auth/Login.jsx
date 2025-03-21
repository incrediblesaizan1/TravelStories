import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/XSe80ORCzHU0rP2rjPdXX.png";
import PasswordInput from "../../components/input/PasswordInput";
import { axiosInstance } from "../../utils/axiosInstance";
import Loader2 from "../../components/common/Loader2";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier) {
      setError("All fields are required.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        identifier,
        password,
      });
      setIsLoading(false);
      console.log("Login successful", response.data);
      localStorage.setItem("accessToken", response.data.user.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40 " />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

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
              Record your travel experience and memories in your personal travel
              journey.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-7">Login</h4>

            <input
              type="text"
              placeholder="Enter your E-Mail or Username"
              className="input-box"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <p className="text-red-500 text-xs pb-1">{error}</p> : ""}

            <button type="submit" className="btn-primary">
              LOGIN
            </button>
            {isLoading && <Loader2 />}
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
