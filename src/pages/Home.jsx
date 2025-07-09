import React, { useState } from "react";
import Splash from "./Splash";
import LogoText from "../assets/LogoText";
import GameButton from "../components/GameButton";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {showSplash ? (
        <Splash
          onContinue={() => {
            setShowSplash(false);
          }}
        />
      ) : (
        <PageLayout isRumput={true} isHome={true}>
          <div className="flex flex-col items-center h-full px-20 py-10">
            <div className="w-2/3">
              <LogoText />
            </div>
            <div className="flex flex-col gap-12 items-center justify-center h-screen w-1/3">
              <GameButton onClick={() => navigate("/login")}>LOGIN</GameButton>
              <GameButton onClick={() => navigate("/game")}>BERMAIN</GameButton>
              <GameButton onClick={() => navigate("/rank")}>
                PERINGKAT
              </GameButton>
            </div>
          </div>
        </PageLayout>
      )}
    </div>
  );
};

export default Home;
