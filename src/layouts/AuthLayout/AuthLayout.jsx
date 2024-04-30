import React from "react";
import { Outlet } from "react-router-dom";
import useProgressiveImg from "../../hooks/useProgressiveImg";


const AuthLayout = () => {
  const [src, { blur }] = useProgressiveImg("/src/assets/login_bg_down.png", "/src/assets/login_bg.png");
  return (
    <div
      className="w-screen object-contain relative bg-center h-screen flex items-center justify-center text-white transition-all"
    >
    <img
        src={src}
        className="w-full h-full absolute top-0 left-0 z-[-1] object-cover transition-all"
      />
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

