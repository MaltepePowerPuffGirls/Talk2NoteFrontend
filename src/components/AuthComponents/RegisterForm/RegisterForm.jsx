import React, { useEffect, useState } from "react";
import axiosCustom from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthInput from "../AuthInput";
import Button from "../Button";

const RegisterForm = () => {
  const REGISTER_URL = "/api/v1/auth/register";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      <div className="flex flex-col gap-4 w-[250px] sm:w-[320px]">
        <AuthInput
          inputAttribs={{
            name: "firstname",
            id: "firstname",
            type: "text",
            placeholder: "First Name",
            value: registerForm.firstname,
            onChange: handleInputChange,
          }}
          isLoginInput={false}
        />
        <AuthInput
          inputAttribs={{
            name: "lastname",
            id: "lastname",
            type: "text",
            placeholder: "Last Name",
            value: registerForm.lastname,
            onChange: handleInputChange,
          }}
          isLoginInput={false}
        />
        <AuthInput
          inputAttribs={{
            name: "email",
            id: "email",
            type: "email",
            placeholder: "Email",
            value: registerForm.email,
            onChange: handleInputChange,
          }}
          isLoginInput={false}
        />
        <AuthInput
          inputAttribs={{
            name: "password",
            id: "password",
            type: "password",
            placeholder: "Password",
            value: registerForm.password,
            onChange: handleInputChange,
          }}
          isLoginInput={false}
        />
      </div>
      <Button
        onClick={handleRegister}
        loading={loading}
        text="Register"
      />
    </>
  );
};

export default RegisterForm;
