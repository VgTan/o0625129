import React, { useState } from "react";
import PadangRumput from "../assets/images/padangrumput.svg";
import SoundOff from "../assets/images/suarahening.svg";
import SoundOn from "../assets/images/suara.svg";
import BackIcon from "../assets/images/back 1.svg";
import Girl from "../assets/images/cewek 1.svg";
import Boy from "../assets/images/anak 1.svg";
import Uang from "../assets/images/uang.svg";
import Timer from "../assets/images/timer.svg";
import Account from "../assets/images/buttonorang.svg";
import Logout from "../assets/images/Removal-998 1.svg";
import { handleLogout } from "../helpers/db";
import { useNavigate } from "react-router";
const PageLayout = (props) => {
  const {
    children,
    isRumput = false,
    back,
    noOrang = false,
    isLoggedIn = false,
    isTutorial = false,
    isHome = false,
    isGame = false,
  } = props;
  const [isMute, setMute] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={`relative ${
        isTutorial || isGame ? "bg-game-bg" : "bg-main-bg"
      } h-screen w-full bg-no-repeat bg-cover flex flex-col justify-between z-[100] overflow-clip`}
    >
      {isRumput && (
        <img
          src={PadangRumput}
          alt={"PadangRumput"}
          className="absolute bottom-0 z-0 pointer-events-none"
        />
      )}
      {isHome && (
        <>
          <img
            src={Girl}
            alt={"Girl"}
            className="absolute bottom-0 left-[10%] z-[2]"
          />
          <img
            src={Boy}
            alt={"Boy"}
            className="absolute bottom-0 right-[10%] z-[2]"
          />
        </>
      )}

      {isMute ? (
        <img
          src={SoundOff}
          alt={"SoundOff"}
          className="absolute top-0 right-0 p-5 z-1 z-10 hover:scale-105 transition-transform duration-200 cursor-pointer w-36 h-36"
          onClick={() => setMute(!isMute)}
        />
      ) : (
        <img
          src={SoundOn}
          alt={"SoundOn"}
          className="absolute top-0 right-0 p-6 z-1 z-10 hover:scale-105 transition-transform duration-200 cursor-pointer w-36 h-36"
          onClick={() => setMute(!isMute)}
        />
      )}
      {back && (
        <button
          onClick={() => navigate(back)}
          className="absolute top-0 left-0 p-5 z-10"
        >
          <img
            src={BackIcon}
            alt={"Back"}
            className="w-24 h-24 hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
        </button>
      )}
      {isGame && (
        <div className="absolute top-[10%] left-[10%] z-10 rounded-3xl flex flex-col gap-5">
          <div className="flex items-center bg-white/70 px-3 py-2 gap-3 rounded-xl">
            <img src={Timer} alt="Game" className="w-10 h-10" />
            <p className="font-bold font-inter text-2xl">20 Detik</p>
          </div>
          <div className="flex items-center bg-white/70 px-3 py-2 gap-3 rounded-xl">
            <img src={Uang} alt="Game" className="w-10 h-10" />
            <p className="font-bold font-inter text-2xl">20000</p>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="absolute top-0 left-0 p-5 z-10">
          <a href="/account" className="">
            <img
              src={Account}
              alt={"account"}
              className="w-28 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </a>
          <button onClick={handleLogout} className="">
            <img
              src={Logout}
              alt={"logout"}
              className="w-28 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default PageLayout;
