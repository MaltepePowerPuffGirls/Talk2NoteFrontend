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

    if(!registerForm.firstname) {
      toast.error('Firstname can not be empty!')
      setLoading(false);
      return;
    }

    if(!registerForm.lastname) {
      toast.error('Lastname can not be empty!')
      setLoading(false);
      return;
    }

    if(!registerForm.password) {
      toast.error('Password can not be empty!')
      setLoading(false);
      return;
    }

    if (!emailRegex.test(registerForm.email)) {
      toast.error("Please enter a valid email!");
      setLoading(false);
      return;
    }


    console.log(registerForm)

    setRegisterForm({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    })

    await axiosCustom.post(REGISTER_URL, {
      firstname: registerForm.firstname,
      lastname: registerForm.lastname,
      email: registerForm.email,
      password: registerForm.password,
    }).then((res)=>{
      toast.success('Registered succesfully')
      setTimeout(()=>{
        navigate('/login')
      }, 5000)
    }).catch((err)=> {
      toast.error('An error occured please try again')
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  

  return (
    <div className="max-w-screen min-h-screen flex items-center justify-center overflow-x-hidden">
    <div className="flex flex-col gap-6 items-center justify-center pt-20 pb-12">

      <div className="bg-white shadow border-t-2 border-main rounded flex flex-col px-2  w-[310px] sm:w-auto">
        <div className="p-5 border-b border-[#f9f9f9]">
          <h3 className="font-bold text-grayUpdated">Register</h3>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstname" className="text-sm font-semibold">
                First Name
              </label>
              <input
                name="firstname"
                id="firstname"
                value={registerForm.firstname}
                onChange={handleInputChange}
                type="text"
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastname" className="text-sm font-semibold">
                Last Name
              </label>
              <input
                name="lastname"
                id="lastname"
                value={registerForm.lastname}
                onChange={handleInputChange}
                type="text"
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={registerForm.email}
              onChange={handleInputChange}
              className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
            />
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleInputChange}
                className="bg-[#FDFDFF] border border-[#e4e6fc] rounded w-full py-2 px-3 transition outline-none focus:border-main"
              />
            </div>
          </div>
        </div>
        <div className="p-5">
        <button onClick={handleRegister} style={{boxShadow: '0 2px 6px #acb5f6'}} className="w-full font-semibold bg-main text-black hover:bg-mainHover transition py-2 text-sm rounded">
          Register
        </button>
      </div>
      </div>

      <div className="text-sm">
        <p className="text-[#9AA8AF]">
          You already have an account?{" "}
          <Link
            to={"/login"}
            className="text-main cursor-pointer hover:text-mainHover"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>

  )
};

export default Register;
