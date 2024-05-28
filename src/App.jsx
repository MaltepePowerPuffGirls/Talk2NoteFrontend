import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import { ToastContainer } from "react-toastify";
import Register from "./views/Register";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Home from "./views/Home";
import MainLayout from "./layouts/MainLayout/MainLayout";
import PersistLogin from "./components/AuthComponents/PersistLogin/PersistLogin";
import RequireAuth from "./components/AuthComponents/RequireAuth/RequireAuth";
import Create from "./views/Create";
import NoteDetails from "./views/NoteDetails";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, []);
  return (
    <div className="custom-scrollbar overflow-auto">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<MainLayout />}>
            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              <Route path="/notes" element={<Home />}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              <Route path="/notes/:id" element={<NoteDetails />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              <Route path="/notes/create/:id" element={<Create />} />
            </Route>
          </Route>
        </Route>

        {/* Protected Routes */}
      </Routes>

      <ToastContainer toastStyle={{
        backgroundColor: "#421582",
        color:"white"
      }} />
    </div>
  );
}

export default App;
