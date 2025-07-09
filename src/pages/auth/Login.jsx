  import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { useNavigate } from "react-router";
import { handleGoogleLogin, handleLogin } from "../../helpers/db";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    try {
      const result = await handleLogin(e, { email, password });
      if (result) {
        navigate("/game");
      }
    } catch (err) {}
  };

  const onGoogleLogin = async () => {
    try {
      const result = await handleGoogleLogin();
      if (result) {
        navigate("/game");
      }
    } catch (err) {}
  };

  return (
    <PageLayout isRumput={true} back={"/"} isHome={true}>
      <div className="flex justify-center items-center relative z-1 h-full">
        <div className="bg-light-blue border-2 border-white p-8 pb-6 min-w-[45%] rounded-3xl relative">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="absolute top-0 right-0 px-3 py-1 bg-[#0D7497] m-3 text-white font-bold flex text-3xl rounded-tr-xl rounded-bl-xl"
          >
            X
          </button>
          <h4 className="font-bold text-3xl text-center">Login</h4>
          <form className="mt-6" onSubmit={onSubmit}>
            <div className="flex flex-col gap-1 mb-5">
              <label className="font-semibold text-xl" htmlFor="email">
                Email :
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input-blue px-4 py-3 border-2 border-black rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col gap-1 mb-6">
              <label className="font-semibold text-xl" htmlFor="password">
                Password :
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input-blue px-4 py-3 border-2 border-black rounded-xl"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="py-1 px-12 rounded-xl bg-button-blue text-black border-2 border-black font-bold text-xl transition-transform duration-200"
              >
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center w-full py-6">
            <div className="flex-grow border-t border-black" />
            <span className="mx-4 text-black font-bold text-xl">atau</span>
            <div className="flex-grow border-t border-black" />
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={onGoogleLogin}
              className="flex items-center gap-3 px-8 py-2 border rounded-xl bg-input-blue shadow hover:bg-gray-100 transition border-black"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-bold text-black text-base">Login with Google</span>
            </button>
          </div>

          <div className="text-center mt-10 text-black font-semibold text-base">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-500">
              Daftar disini
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
