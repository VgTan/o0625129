import React from "react";
import PageLayout from "../../components/PageLayout";
import LogoText from "../../assets/LogoText";
import Toko from "../../assets/Toko";
import Icon from "../../assets/images/iconadmin.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import AdminLayout from "../../components/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout isAdmin={true}>
      <div className="flex justify-center items-center h-full">
        <div className="w-5/6 min-h-[80vh] h-[80vh]">
          <div className="bg-[#62C9F0] border-2 border-black rounded-t-2xl relative flex justify-between items-center w-full h-[25%]">
            <h1
              className="text-6xl text-center p-4 ps-8 font-black"
              style={{
                color: "#FF6900",
                WebkitTextStroke: "3px black",
                fontFamily: "sans-serif",
              }}
            >
              SHOPSMART
            </h1>
            <div className="flex items-center p-2">
              <h2
                className="text-4xl text-center font-black"
                style={{
                  color: "#FFB32A",
                  WebkitTextStroke: "2px black",
                  fontFamily: "sans-serif",
                }}
              >
                Admin Shop
              </h2>
              <img src={Icon} alt="admin_icon" className="h-24" />
            </div>
          </div>
          <div className="bg-[#FFB32A] w-full py-8 border-2 border-black h-[10%]" />
          <div className="bg-[#FE9000] p-6 border-2 border-black h-[65%] flex flex-col justify-center items-center rounded-b-2xl">
            <div className="bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-xl py-3 rounded-t-2xl h-[20%] flex items-center justify-center">
              <h3>SELAMAT DATANG DI MINSHOP!</h3>
            </div>
            <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl py-2 h-[80%]">
              <p className="text-xl font-semibold text-black p-12 px-24">
                Silahkan kelola dan edit konten game dengan mudah dan efisien
                melalui panel ini. Pastikan semua data selalu up to date untuk
                pengalaman pemain yang optimal.
              </p>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => navigate("/dashboard/edit")}
                  className="py-1 px-12 rounded-xl bg-button-blue text-black border-2 border-black font-bold text-2xl transition-transform duration-200"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
