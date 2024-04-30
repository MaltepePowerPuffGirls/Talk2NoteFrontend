import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{ backgroundImage: "url('src/assets/login_bg.png')" }}
      className="w-screen bg-cover bg-center h-screen flex items-center justify-center text-white"
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,.01))",
        }}
        className="rounded-[30px] border border-[#666666] flex flex-col gap-8 backdrop-blur-[8px] py-10 px-8"
      >
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;


// <div className="text-sm">
// <p className="text-[#9AA8AF]">
//   Don't have an account?{" "}
//   <Link
//     to={"/register"}
//     className="text-main cursor-pointer hover:text-mainHover"
//   >
//     {" "}
//     Create One
//   </Link>
// </p>
// </div>

// <div style={{
//     backgroundImage: 'linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,.01))'
//   }} className="shadow border border-[#666666] rounded-[20px] backdrop-blur-md flex flex-col px-2 w-[300px] sm:w-[330px]">