import React from "react";
import TokoImg from "./images/main_toko.svg";

const Toko = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <img
        src={TokoImg}
        alt="Toko"
        className="w-full h-full object-contain bg-no-repeat"
      />
    </div>
  );
};

export default Toko;
