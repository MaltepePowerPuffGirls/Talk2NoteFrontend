import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import { toast } from "react-toastify";
import axiosCustom from "../services/api";
import { MdMail, MdKey } from "react-icons/md";

const LOGIN_URL = "/api/v1/auth/authenticate";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState();
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!emailRegex.test(user)) {
      toast.error("Please enter a valid email!");
      setLoading(false);
      return;
    }
    if (pwd.trim() === "") {
      toast.error("Please enter a password!");
      setLoading(false);
      return;
    }
    try {
      const response = await axiosCustom.post(
        LOGIN_URL,
        {
          email: user,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.access_token;
      setAuth({ user, accessToken });
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Username or password is wrong");
      resetUser();
      setPwd("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-white text-3xl">Log in</h3>
      </div>
      <div className="flex flex-col gap-4  w-[250px] sm:w-[320px]">
        <div className="flex items-center border-b border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            {...userAttribs}
            className="bg-transparent w-full py-2 pr-1 transition outline-none placeholder-[#B6B6B6]"
          />
          <MdMail className="w-[1.5em] h-[1.5em] " />
        </div>
        <div className="flex items-center border-b border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            className="bg-transparent w-full py-2 pr-1 transition outline-none placeholder-[#B6B6B6] "
          />
          <MdKey className="w-[1.5em] h-[1.5em] )]" />
        </div>
      </div>

      <div className="">
        <label
          htmlFor="persist"
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-[14px] h-[14px] border-2 border-[#B6B6B6] rounded focus-within:border-none focus-within:outline-none transition">
            {check && <div className="w-full h-full bg-[#B6B6B6]"></div>}
          </div>
          <span className="text-grayUpdated text-sm">Remember me</span>
          <input
            type="checkbox"
            className="hidden"
            onChange={toggleCheck}
            id="persist"
            checked={check}
          />
        </label>
      </div>

      <div className="w-full">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="disabled:bg-gray-300 w-full font-semibold bg-[#FF46F8] text-white hover:bg-[#ff46f998] transition py-2 text-sm rounded"
        >
          {loading ? "Loading ..." : "Login"}
        </button>
      </div>

      <div className="flex items-center justify-center font-light text-sm">
        <p className="text-white">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-main font-bold cursor-pointer hover:text-mainHover"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
