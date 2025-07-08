import React from "react";
import Logout from "../assets/images/Removal-998 1.svg";
import { handleLogout } from "../helpers/db";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/images/back 1.svg";

const AdminLayout = (props) => {
  const { back = false, children } = props;
  const navigate = useNavigate();
  return (
    <div
      className={`relative bg-game-bg h-screen w-full bg-no-repeat bg-cover flex flex-col justify-between z-[100] overflow-clip`}
    >
      <div className="absolute top-0 left-0 p-5 z-10 flex flex-col items-center gap-5">
        {back && (
          <button onClick={() => window.history.back()}>
            <img
              src={BackIcon}
              alt={"Back"}
              className="w-24 h-24 hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </button>
        )}
        <button onClick={handleLogout} className="">
          <img
            src={Logout}
            alt={"logout"}
            className="w-28 h-28 hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
        </button>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
