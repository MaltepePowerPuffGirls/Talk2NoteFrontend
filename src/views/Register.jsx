import axiosCustom from "../services/api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const REGISTER_URL = "/api/v1/auth/register";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!registerForm.firstname) {
      toast.error("Firstname can not be empty!");
      setLoading(false);
      return;
    }

    if (!registerForm.lastname) {
      toast.error("Lastname can not be empty!");
      setLoading(false);
      return;
    }

    if (!registerForm.password) {
      toast.error("Password can not be empty!");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(registerForm.email)) {
      toast.error("Please enter a valid email!");
      setLoading(false);
      return;
    }

    console.log(registerForm);

    setRegisterForm({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    await axiosCustom
      .post(REGISTER_URL, {
        firstname: registerForm.firstname,
        lastname: registerForm.lastname,
        email: registerForm.email,
        password: registerForm.password,
      })
      .then((res) => {
        toast.success("Registered succesfully");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((err) => {
        toast.error("An error occured please try again");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-white text-3xl">Sign Up</h3>
      </div>
      <div className="flex flex-col gap-4 w-[250px] sm:w-[320px]">
        <div className="flex items-center border-b border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            name="firstname"
            id="firstname"
            value={registerForm.firstname}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
            placeholder="First Name"
            className="bg-transparent w-full py-2 pr-1 transition outline-none placeholder-[#B6B6B6]"
          />
        </div>
        <div className="flex items-center border-b border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            name="lastname"
            id="lastname"
            value={registerForm.lastname}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
            placeholder="Last Name"
            className="bg-transparent w-full py-2 pr-1 transition outline-none placeholder-[#B6B6B6]"
          />
        </div>
        <div className="flex items-center border-b border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            id="email"
            name="email"
            type="email"
            value={registerForm.email}
            onChange={handleInputChange}
            placeholder="Email"
            autoComplete="off"
            className="bg-transparent w-full py-2 pr-1 transition outline-none placeholder-[#B6B6B6] "
          />
        </div>
        <div className="flex items-center border-b border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={registerForm.password}
            onChange={handleInputChange}
            className="bg-transparent w-full py-2 pr-1 transition outline-none placeholder-[#B6B6B6] "
          />
        </div>
      </div>
      <div className="w-full">
        <button
          onClick={handleRegister}
          disabled={loading}
          className="disabled:bg-gray-300 w-full font-semibold bg-[#FF46F8] text-white hover:bg-[#ff46f998] transition py-2 text-sm rounded"
        >
          {loading ? "Loading ..." : "Register"}
        </button>
      </div>

      <div className="flex items-center justify-center font-light text-sm">
        <p className="text-white">
          Already have an accout?{" "}
          <Link
            to={"/login"}
            className="text-main font-bold cursor-pointer hover:text-mainHover"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;

{
  /* <div className="text-sm">
<p className="text-[#9AA8AF]">
  You already have an account?{" "}
  <Link
    to={"/login"}
    className="text-main cursor-pointer hover:text-mainHover"
  >
    Login
  </Link>
</p>
</div> */
}
