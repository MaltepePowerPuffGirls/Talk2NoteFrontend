import { Link } from "react-router-dom";
import RegisterForm from "../components/AuthComponents/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-white text-xl sm:text-3xl mt-5">Sign Up</h3>
      </div>

      <RegisterForm />

      <div className="flex items-center justify-center font-light text-xs sm:text-sm">
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
