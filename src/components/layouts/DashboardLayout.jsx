import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "../../components/layouts/SideMenu";
import Navbar from "../../components/layouts/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      <ToastContainer autoClose={1500} />{" "}
      {/* <-- Taşıdık ve her zaman görünür */}
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} setOpenSideMenu={() => {}} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
