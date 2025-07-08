import React, { useEffect, useState } from "react";
import LogoText from "../assets/LogoText";
import Toko from "../assets/Toko";

const Splash = ({ onContinue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          onContinue(); // ✅ langsung lanjut saat selesai
          return 100;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval); // bersih-bersih aja
  }, [onContinue]);

  return (
    <div className="bg-main-bg h-screen w-full bg-no-repeat bg-cover overflow-hidden flex flex-col justify-between">
      <div className="flex flex-col items-center w-full h-full px-20 py-10">
        <div className="w-2/3">
          <LogoText />
        </div>
        <div className="relative w-full h-full flex items-center justify-center -translate-y-10">
          <Toko />
          {progress < 100 && (
            <div className="w-1/2 h-8 bg-gray-300 absolute bottom-0 rounded-2xl">
              <div
                className="h-full bg-green-500 transition-all duration-75 border-green-800 border-[1px] rounded-2xl"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Splash;
