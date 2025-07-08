import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { useNavigate } from "react-router";
import { handleGoogleSignup, handleRegister } from "../../helpers/db";

const Register = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      const result = await handleRegister(e, { email, password, nickname });
      if (result) {
        navigate("/game");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await handleGoogleSignup();
      if (result) {
        navigate("/game");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <PageLayout isRumput={true} back={"/"} isHome={true}>
      <div className="flex justify-center h-screen pt-20 relative z-1">
        <div className="bg-light-blue border-2 border-white p-12 pt-16 pb-8 w-2/5 h-max rounded-3xl relative">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="absolute top-0 right-0 px-3 py-1 bg-[#0D7497] m-3 text-white font-bold flex text-5xl rounded-tr-xl rounded-bl-xl"
          >
            X
          </button>
          <h4 className="font-bold text-4xl text-center">Register</h4>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-1">
              <label className="font-semibold text-2xl" htmlFor="nickname">
                Nickname :
              </label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-input-blue px-4 py-3 border-2 border-black rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-1">
              <label className="font-semibold text-2xl" htmlFor="email">
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
            <div className="flex flex-col gap-2 mb-3">
              <label className="font-semibold text-2xl" htmlFor="password">
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
            <div className="flex justify-center items-center mb-4">
              <button
                type="submit"
                className="py-2 px-12 rounded-xl bg-button-blue text-black border-2 border-black font-bold text-2xl transition-transform duration-200"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center">
            <button
              onClick={handleGoogle}
              className="flex items-center gap-3 px-8 py-2 border rounded-xl bg-input-blue shadow hover:bg-gray-100 transition border-black"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-8 h-8"
              />
              <span className="font-bold text-black text-lg">
                Sign up with Google
              </span>
            </button>
          </div>

          <div className="text-center mt-10 text-black font-semibold text-lg">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-500">
              Login disini
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Register;
