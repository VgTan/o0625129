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
        <div className="w-11/12">
          <div className="bg-[#62C9F0] border-2 border-black rounded-t-2xl relative flex justify-between items-center w-full">
            <h1
              className="text-7xl text-center p-10 font-black"
              style={{
                color: "#FF6900",
                WebkitTextStroke: "3px black",
                fontFamily: "sans-serif",
              }}
            >
              SHOPSMART
            </h1>
            <div className="flex items-center">
              <h2
                className="text-5xl text-center font-black"
                style={{
                  color: "#FFB32A",
                  WebkitTextStroke: "2px black",
                  fontFamily: "sans-serif",
                }}
              >
                Admin Shop
              </h2>
              <img src={Icon} alt="admin_icon" className="h-min" />
            </div>
          </div>
          <div className="bg-[#FFB32A] w-full py-10 border-2 border-black" />
          <div className="bg-[#FE9000] p-10 border-2 border-black">
            <div className="bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-3xl py-4 rounded-t-2xl">
              <h3>SELAMAT DATANG DI MINSHOP!</h3>
            </div>
            <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl py-12">
              <p className="text-3xl font-semibold text-black p-12 px-24">
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
