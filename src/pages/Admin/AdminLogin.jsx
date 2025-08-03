import React, { useState } from "react";
import LOGO from "../../assets/web-logo.png";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/Signup";

const AdminLogin = () => {
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <>
      <div className="bg-white py-2 border-b border-gray-50">
        <div className="container mx-auto">
          <img src={LOGO} alt="logo" className="h-[64px]" />
        </div>
      </div>
      <div className="min-h-[calc(100vh-85px)] flex items-center justify-center">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60">
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
