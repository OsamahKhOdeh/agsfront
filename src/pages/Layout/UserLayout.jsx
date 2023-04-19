import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
//import DashHeader from './DashHeader'
//import DashFooter from './DashFooter'
import "./layout_styles.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

const UserLayout = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};
export default UserLayout;
