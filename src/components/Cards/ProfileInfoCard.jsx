import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, setUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setOpenSideMenu((prevState) => !prevState);
    navigate("/");
  };

  return (
    user && (
      <div className="flex flex-col items-start gap-2">
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name || ""}
        </div>
        <button
          className="text-red-600 text-sm font-semibold cursor-pointer hover:underline"
          onClick={() => handleLogout()}
        >
          Çıkış Yap
        </button>
      </div>
    )
  );
};

export default ProfileInfoCard;
