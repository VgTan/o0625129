import React from "react";
import PageLayout from "../../components/PageLayout";
import LogoText from "../../assets/LogoText";
import Toko from "../../assets/Toko";
import Start from "../../assets/images/mulai.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const GameMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <PageLayout isLoggedIn={!!user}>
      <div className="flex flex-col items-center w-full h-full px-20 py-10">
        <div className="w-2/3">
          <LogoText />
        </div>
        <div className="relative w-full h-full flex items-center justify-center -translate-y-10">
          <Toko />
        </div>
      </div>
      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={() =>navigate('/game/tutorial')}>
        <img
          src={Start}
          alt={"start"}
          className="w-44 h-4w-44 hover:scale-105 transition-transform duration-200 cursor-pointer"
        />
      </button>
    </PageLayout>
  );
};

export default GameMenu;
