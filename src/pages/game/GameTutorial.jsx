import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import panduanImg from "../../assets/images/cwpanduan.svg";
import startImg from "../../assets/images/anakmulai.svg";
import { useNavigate } from "react-router";
const GameTutorial = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    if (index < 3) {
      setIndex((prev) => prev + 1);
    } else {
    }
  };
  return (
    <PageLayout
      back={"/game"}
      isTutorial={true}
    >
      {index <= 2 ? (
        <div className="flex items-end justify-center h-full px-[10%]">
          <div className="w-1/2 h-max lg:md:translate-y-12 translate-y-7">
            <img src={panduanImg} alt="panduan" className="w-5/6" />
          </div>
          <div className="w-1/2 flex items-end justify-center lg:pb-24 md:pb-16 pb-12 h-full">
            <div className="bg-[#825829] border-[#825829] lg:border-[25px] border-[10px] rounded-3xl w-full relative">
              {index == 0 && <PanduanTujuan />}
              {index == 1 && <CaraSistem />}
              {index == 2 && <Tips />}
              <div className="flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%]">
                <button
                  onClick={() => handleClick()}
                  className="lg:py-1 md:py-[0.18rem] lg:px-12 md:px-9 px-7 rounded-xl bg-[#825829] text-white border-2 border-black font-bold lg:text-3xl md:text-lg transition-transform duration-200"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-end justify-center h-full w-full cursor-pointer"
          onClick={() => navigate("/game/play")}
        >
          <img src={startImg} alt="start" className="w-1/3" />
        </div>
      )}
    </PageLayout>
  );
};

const PanduanTujuan = () => {
  return (
    <div className="bg-[#f5d28d] rounded-3xl w-full h-full lg:p-8 p-2 flex flex-col lg:gap-12 gap-3 lg:py-[20%] md:py-[10%] py-[5%]">
      <div className="flex flex-col items-center lg:gap-2 gap-1 font-inter text-center">
        <h3 className="font-bold lg:text-2xl md:text-sm text-xs text-center">
          🛒 PANDUAN BERMAIN SHOPSMART 🛍️
        </h3>
        <p className="lg:px-12 lg:text-xl md:text-xs text-[0.6rem]">
          Selamat datang di ShopSmart permainan belanja seru yang melatih
          kecerdasan dalam memilih barang!
        </p>
      </div>
      <div className="flex flex-col items-center lg:gap-2 gap-1 font-inter text-center">
        <h3 className="font-bold lg:text-2xl md:text-sm text-xs">
          🎯 TUJUAN BERMAIN:
        </h3>
        <p className="lg:px-12 lg:text-xl md:text-xs text-[0.6rem]">
          Belanjalah sebanyak mungkin barang dengan cara yang hemat dan cerdas.
          Semakin pintar kamu berbelanja, semakin tinggi poin dan reward yang
          akan kamu dapatkan!
        </p>
      </div>
    </div>
  );
};

const Tips = () => {
  return (
    <div className="bg-[#f5d28d] rounded-3xl w-full h-full lg:p-8 p-2 flex flex-col lg:gap-12 gap-3 lg:py-[10%] py-[5%]">
      <div className="flex flex-col lg:gap-2 gap-1 font-inter">
        <h3 className="font-bold lg:text-2xl md:text-sm text-xs">
          💸 Jika Uangmu Minus?
        </h3>
        <ul className="list-disc lg:pl-8 md:pl-4 pl-3 text-black font-inter lg:text-xl md:text-xs text-[0.6rem] lg:space-y-2 space-y-0">
          <li>
            Kamu akan disarankan untuk mencoba lagi dan memulai dari awal.
          </li>
          <li>
            Tenang! Poin yang sudah kamu kumpulkan sebelumnya akan tetap
            tersimpan.
          </li>
          <li>
            Jika di percobaan berikutnya kamu berhasil mendapatkan poin lebih
            besar dari sebelumnya, maka poin tertinggimu akan diperbarui dan
            dilanjutkan!
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:gap-2 gap-1 font-inter">
        <h3 className="font-bold lg:text-2xl md:text-sm text-xs">
          🧠 Tips Cerdas:
        </h3>
        <ul className="list-disc lg:pl-8 md:pl-4 pl-3 text-black font-inter lg:text-xl md:text-xs text-[0.6rem] lg:space-y-2 space-y-0">
          <li>
            Jangan asal pilih barang mahal! Gabungkan antara jumlah barang dan
            harga yang seimbang.
          </li>
          <li>
            Gunakan strategi! Belanja sebanyak-banyaknya tanpa membuat uangmu
            minus.
          </li>
        </ul>
      </div>
    </div>
  );
};

const CaraSistem = () => {
  return (
    <div className="bg-[#f5d28d] rounded-3xl w-full h-full lg:p-8 p-2 flex flex-col lg:gap-12 gap-3 lg:py-[10%] py-[5%]">
      <div className="flex flex-col lg:gap-2 gap-1 font-inter">
        <h3 className="font-bold lg:text-2xl md:text-sm text-xs">
          📌 Cara Bermain:
        </h3>
        <div>
          <p className="lg:text-xl md:text-xs text-[0.6rem]">
            1. Pilih barang-barang yang tersedia di toko dengan bijak.
          </p>
          <p className="lg:text-xl md:text-xs text-[0.6rem]">
            2. Perhatikan harga setiap barang sebelum membeli.
          </p>
          <p className="lg:text-xl md:text-xs text-[0.6rem]">
            3. Usahakan membeli barang sebanyak-banyaknya dengan total harga
            sehemat mungkin.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:gap-2 gap-1 font-inter">
        <h3 className="font-bold lg:text-2xl md:text-sm text-xs">
          ⭐ Sistem Poin & Reward:
        </h3>
        <ul className="list-disc lg:pl-8 md:pl-4 pl-3 text-black font-inter lg:text-xl md:text-xs text-[0.6rem] lg:space-y-2 space-y-0">
          <li>Barang dengan harga kecil → poin & reward kecil</li>
          <li>Barang dengan harga besar → poin & reward besar</li>
          <li>
            Tapi ingat! Hemat dan cerdaslah dalam memilih, karena belanja
            terbanyak dengan strategi terbaik akan membuatmu jadi juara!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameTutorial;
