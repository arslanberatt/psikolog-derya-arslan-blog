import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import Input from "../Inputs/Input";
import AUTH_IMG from "../../assets/auth-img.jpg";
import { validateEmail } from "../../utils/helper";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Lütfen geçerli bir email giriniz");
      return;
    }

    if (!password) {
      setError("Lütfen bir parola giriniz");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        } else {
          setOpenAuthForm(false);
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Bir şeyler yanlış gitti. Lütfen tekrar deneyin");
      }
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Hoşgeldin,</h3>
        <p className="text-xs text-slate-700 mt-[2px] mb-6">
          Lütfen giriş bilgilerini doldur
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="E-mail"
            placeholder="örnek@deryaarslan.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Parola"
            placeholder="Şifre en az 8 karekterli olmalıdır."
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            GİRİŞ YAP
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Hesabınız yok mu?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("signup");
              }}
            >
              Kayıt Ol
            </button>
          </p>
        </form>
      </div>
      <div className="hidden md:block">
        <img src={AUTH_IMG} alt="login" className="h-[400px]" />
      </div>
    </div>
  );
};

export default Login;
