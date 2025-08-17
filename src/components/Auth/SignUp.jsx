import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import Input from "../Inputs/Input";
import AUTH_IMG from "../../assets/auth-img.jpg";
import { validateEmail } from "../../utils/helper";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Lütfen isim soyisim giriniz");
      return;
    }

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
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        navigate("/");
        setOpenAuthForm(false);
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
    <div className="flex items-center h-[520px]">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Hesap oluştur</h3>
        <p className="text-xs text-slate-700 mt-[2px] mb-6">
          Lütfen kayıt bilgilerini doldur
        </p>
        <form onSubmit={handleSignUp}>
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="İsim Soyisim"
            placeholder="İsim Soyisim"
            type="text"
          />
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
            placeholder="Şifre en az 6 karekterli olmalıdır."
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            KAYIT OL
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Zaten bir hesabnız var mı?{" "}
            <button
              className="font-medium text-sky-300 underline cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
              }}
            >
              Giriş yap
            </button>
          </p>
        </form>
      </div>
      <div className="hidden md:block">
        <img src={AUTH_IMG} alt="login" className="h-[520px]" />
      </div>
    </div>
  );
};

export default SignUp;
