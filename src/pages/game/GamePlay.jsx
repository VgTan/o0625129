import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import panduanImg from "../../assets/images/cwpanduan.svg";
import GamePic from "../../assets/images/gamePic.svg";
import { useNavigate } from "react-router";
const GamePlay = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <PageLayout back={"/game"} isGame={true}>
      <div className="flex items-end justify-center h-full px-[10%]">
        <div className="w-1/2 h-max lg:md:translate-y-0 translate-y-7">
          <img src={GamePic} alt="panduan" className="" />
        </div>
        <div className="w-1/2 flex items-end justify-center lg:pb-24 md:pb-16 pb-12 h-full">
          <div className="bg-[#825829] border-[#825829] lg:border-[25px] border-[10px] rounded-3xl w-full relative">
            <div className="bg-[#f5d28d] rounded-3xl w-full h-full lg:p-8 p-2 flex flex-col lg:gap-12 gap-3 lg:py-[10%] py-[5%]">
              
            </div>
            <div className="flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%]">
              <button className="lg:py-1 md:py-[0.18rem] lg:px-12 md:px-9 px-7 rounded-xl bg-[#825829] text-white border-2 border-black font-bold lg:text-3xl md:text-lg transition-transform duration-200">
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GamePlay;
