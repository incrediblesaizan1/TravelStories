import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //
import background from "../../assets/7h9RE3z9qOfzaZypTPSpP.avif";
import PasswordInput from "../../components/input/PasswordInput";
import { axiosInstance } from "../../utils/axiosInstance";
import Loader2 from "../../components/common/Loader2";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !username || !email) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/signup", {
        fullname: name,
        username: username,
        email: email,
        password: password,
      });
      setIsLoading(false);
      console.log("SignUp successful", response.data);
      console.log(response.data.user.accessToken)
      localStorage.setItem("accessToken", response.data.user.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.error("SignUp error:", err.response?.data || err.message);
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
              Join the <br /> Adventure
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Create an account to start documenting your travels And preserving
              your memories in your personal travel journal.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative px-16 py-4 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-semibold mb-7">Register</h4>

            <input
              type="text"
              placeholder="Enter your Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your UserName"
              className="input-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your E-Mail"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <p className="text-red-500 text-xs pb-1">{error}</p> : ""}

            <button type="submit" className="btn-primary btn-light">
              Create Account
            </button>
            {isLoading && <Loader2 />}

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
