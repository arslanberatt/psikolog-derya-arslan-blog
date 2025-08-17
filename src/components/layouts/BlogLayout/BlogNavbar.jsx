import React, { useContext, useState } from "react";
import Logo from "../../../assets/web-logo.png";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { BLOG_NAVBAR_DATA } from "../../../utils/data";
import SideMenu from "../SideMenu";
import { UserContext } from "../../../context/userContext";
import ProfileInfoCard from "../../Cards/ProfileInfoCard";
import Login from "../../Auth/Login";
import Modal from "../../Modal";
import SearchBarPopup from "../../../pages/Client/components/SearchBarPopup";
import SignUp from "../../Auth/SignUp";

const BlogNavbar = ({ activeMenu }) => {
  const { user, setOpenAuthForm } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  // burada genel scroll fonksiyonunu tanımlıyoruz
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    setOpenSideMenu(false); // side menu açıksa kapat
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
          {/* Hamburger Menu */}
          <button
            className="block md:hidden text-black -mt-1"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          {/* Logo */}
          <Link to="/">
            <img src={Logo} className="h-[48px] md:h-[64px]" />
          </Link>

          {/* Navbar Links */}
          <nav className="hidden md:flex items-center gap-10">
            {BLOG_NAVBAR_DATA.map((item) => {
              if (item?.onlySideMenu) return null;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <li className="text-[15px] text-black font-medium list-none relative group cursor-pointer">
                    {item.label}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-[2px] ${
                        activeMenu == item.label ? "scale-x-100" : "scale-x-0"
                      } bg-sky-500 transition-all duration-500 origin-left group-hover:scale-x-100`}
                    ></span>
                  </li>
                </Link>
              );
            })}

            {/* İletişim Butonu */}
            <button
              onClick={scrollToBottom}
              className="text-[15px] text-black font-medium list-none relative group cursor-pointer"
            >
              İletişim
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] ${
                  activeMenu == "İletişim" ? "scale-x-100" : "scale-x-0"
                } bg-sky-500 transition-all duration-500 origin-left group-hover:scale-x-100`}
              ></span>
            </button>
          </nav>

          {/* Sağdaki Login / Profil */}
          <div className="flex items-center gap-6">
            <button
              className="hover:text-sky-500 cursor-pointer"
              onClick={() => setOpenSearchBar(true)}
            >
              <LuSearch className="text-[22px]" />
            </button>

            {!user ? (
              <button
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-xs md:text-xs text-white font-semibold px-5 md:px-7 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-cyan-200"
                onClick={() => setOpenAuthForm(true)}
              >
                Giriş Yap / Kayıt Ol
              </button>
            ) : (
              <div className="hidden md:block">
                <ProfileInfoCard />
              </div>
            )}
          </div>

          {/* SideMenu */}
          {openSideMenu && (
            <div className="fixed top-[85px] -ml-4 bg-white">
              <SideMenu
                activeMenu={activeMenu}
                isBlogMenu
                setOpenSideMenu={setOpenSideMenu}
                scrollToBottom={scrollToBottom} // iletişim için side menüye de gönderiyoruz
              />
            </div>
          )}
        </div>
      </div>

      {/* Auth & Search Modals */}
      <AuthModel />
      <SearchBarPopup isOpen={openSearchBar} setIsOpen={setOpenSearchBar} />
    </>
  );
};

export default BlogNavbar;

const AuthModel = () => {
  const { openAuthForm, setOpenAuthForm } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <Modal
      isOpen={openAuthForm}
      onClose={() => {
        setOpenAuthForm(false);
        setCurrentPage("login");
      }}
      hideHeader
    >
      <div>
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </div>
    </Modal>
  );
};
