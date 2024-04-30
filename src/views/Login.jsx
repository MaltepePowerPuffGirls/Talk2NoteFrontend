import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/AuthComponents/LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-white text-xl sm:text-3xl">Log in</h3>
      </div>
      <LoginForm/>
      <div className="flex items-center justify-center font-light text-xs sm:text-sm">
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
