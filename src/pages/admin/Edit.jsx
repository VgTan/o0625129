import React, { useEffect, useRef, useState } from "react";
import Icon from "../../assets/images/iconadmin.svg";
import Sampah from "../../assets/images/sampah.svg";
import EditIcon from "../../assets/images/editIcon 2.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import AdminLayout from "../../components/AdminLayout";
import { getUser } from "../../helpers/db";

const Edit = () => {
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUsers(data);
    };

    fetchData();
  }, []);
  console.log(users);
  return (
    <AdminLayout isAdmin={true} back>
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
          <div className="bg-[#FFB32A] w-full border-2 border-black flex">
            <div
              onClick={() => setIndex(0)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 0 ? "bg-[#FE9201F7] text-black font-bold" : ""
              }`}
            >
              <p>Data Pemain</p>
            </div>
            <div
              onClick={() => setIndex(1)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 1 ? "bg-[#FE9201F7] text-black font-bold" : ""
              }`}
            >
              <p>Produk Game</p>
            </div>
            <div
              onClick={() => setIndex(2)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 2 ? "bg-[#FE9201F7] text-black font-bold" : ""
              }`}
            >
              <p>Peringkat</p>
            </div>
            <div
              onClick={() => setIndex(3)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 3 ? "bg-[#FE9201F7] text-black font-bold" : ""
              }`}
            >
              <p>Pengaturan</p>
            </div>
          </div>

          <div className="bg-[#FE9000] p-10 border-2 border-black">
            {index === 0 && <DataPemain users={users} />}
            {index === 1 && <ProdukGame products={products} />}
            {index === 2 && <Peringkat />}
            {index === 3 && <Pengaturan />}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const DataPemain = (props) => {
  const { users } = props;
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-2xl py-4 rounded-t-2xl">
        <p className="w-[24%]">Nama Pemain</p>
        <p className="w-[24%]">Banyak Putaran</p>
        <p className="w-[24%]">Poin Barang</p>
        <p className="w-[24%]">Foto Profil</p>
        <div className="w-[4%]">
          <img
            src={EditIcon}
            alt="sampah"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl flex flex-col">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex border-b-2 border-black text-center text-xl font-inter font-bold"
          >
            <p className="w-[24%] py-4">{user.displayName || "N/A"}</p>
            <p className="w-[24%] py-4">{user.rounds || 0}</p>
            <p className="w-[24%] py-4">{user.points || 0}</p>
            <div className="w-[24%] flex justify-center items-center py-2">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="w-[4%] flex justify-center items-center p-2">
              <img
                src={Sampah}
                alt="sampah"
                className="w-10 h-10 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProdukGame = (props) => {
  const { products } = props;
  const [isModal, setModal] = useState(false);
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-2xl py-4 rounded-t-2xl">
        <p className="w-[16%]">Produk</p>
        <p className="w-[16%]">Nama</p>
        <p className="w-[16%]">Harga</p>
        <p className="w-[16%]">Foto</p>
        <p className="w-[16%]">Reward</p>
        <p className="w-[16%]">Poin</p>
        <div className="w-[4%]">
          <img
            onClick={() => setModal(true)}
            src={EditIcon}
            alt="edit"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl flex flex-col">
        {products &&
          products?.map((product, index) => (
            <div
              key={product.id}
              className="flex border-b-2 border-black text-center text-xl font-inter font-bold"
            >
              <p className="w-[16%] py-4">{product.displayName || "N/A"}</p>
              <p className="w-[16%] py-4">{product.rounds || 0}</p>
              <p className="w-[16%] py-4">{product.points || 0}</p>
              <div className="w-[16%] flex justify-center items-center py-2">
                <img
                  src={product.photoURL || "https://via.placeholder.com/40"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <p className="w-[16%] py-4">{product.points || 0}</p>
              <p className="w-[16%] py-4">{product.points || 0}</p>
              <div className="w-[4%] flex justify-center items-center p-2">
                <img
                  src={Sampah}
                  alt="sampah"
                  className="w-10 h-10 object-cover"
                />
              </div>
            </div>
          ))}
      </div>
      {isModal && <ModalProduk setModal={setModal} />}
    </div>
  );
};

const Peringkat = () => {
  return (
    <>
      <div className="bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-3xl py-4 rounded-t-2xl">
        <h3>SELAMAT DATANG DI MINSHOP!</h3>
      </div>
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl py-12">
        <p className="text-3xl font-semibold text-black p-12 px-24">
          Silahkan kelola dan edit konten game dengan mudah dan efisien melalui
          panel ini. Pastikan semua data selalu up to date untuk pengalaman
          pemain yang optimal.
        </p>
        <div className="flex justify-center items-center"></div>
      </div>
    </>
  );
};

const Pengaturan = () => {
  return (
    <>
      <div className="bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-3xl py-4 rounded-t-2xl">
        <h3>SELAMAT DATANG DI MINSHOP!</h3>
      </div>
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl py-12">
        <p className="text-3xl font-semibold text-black p-12 px-24">
          Silahkan kelola dan edit konten game dengan mudah dan efisien melalui
          panel ini. Pastikan semua data selalu up to date untuk pengalaman
          pemain yang optimal.
        </p>
        <div className="flex justify-center items-center"></div>
      </div>
    </>
  );
};

const ModalProduk = (props) => {
  const { setModal } = props;
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleImageClick = () => {
    fileInputRef.current.click(); // ← klik input file tersembunyi
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };
  return (
    <div className="bg-[#FA8A00] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-white border-2 px-4 min-w-[50%]">
      <div className="flex gap-12 items-center justify-center relative">
        <div className="w-1/6">
          <img src={Icon} alt="icon" />
        </div>
        <div className="w-5/6">
          <p
            className="text-5xl text-start p-10 font-black tracking-tighter"
            style={{
              color: "#FFB32A",
              WebkitTextStroke: "2px black",
              fontFamily: "sans-serif",
            }}
          >
            MINSHOP PRODUK
          </p>
        </div>
      </div>
      <div className="flex mt-8 px-8">
        <div className="flex flex-col gap-4 w-2/3">
          {/* Kategori */}
          <div className="flex items-center justify-between">
            <label className="text-black text-lg font-bold">Kategori</label>
            <select className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2">
              <option value="">Pilih Kategori</option>
              <option value="game">Sembako</option>
              <option value="game">Cemilan</option>
              <option value="barang">Minuman</option>
              <option value="barang">Perbotan</option>
              <option value="barang">Mainan</option>
            </select>
          </div>

          {/* Nama Produk */}
          <div className="flex items-center justify-between">
            <label className="text-black text-lg font-bold">Nama Produk</label>
            <input
              type="text"
              className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2"
            />
          </div>

          {/* Harga */}
          <div className="flex items-center justify-between">
            <label className="text-black text-lg font-bold">Harga</label>
            <input
              type="number"
              className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2"
            />
          </div>

          {/* Reward */}
          <div className="flex items-center justify-between">
            <label className="text-black text-lg font-bold">Reward</label>
            <input
              type="number"
              className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2"
            />
          </div>

          {/* Poin */}
          <div className="flex items-center justify-between">
            <label className="text-black text-lg font-bold">Poin</label>
            <input
              type="number"
              className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2"
            />
          </div>
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col items-center w-1/3">
          <label className="font-bold text-black text-lg font-bold mb-2">
            Gambar Produk
          </label>
          <div
            className="w-40 h-40 bg-[#F6B35D] border border-black rounded flex justify-center items-center cursor-pointer overflow-hidden"
            onClick={handleImageClick}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src="/camera-icon.svg" alt="Upload" className="w-10 h-10" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="flex justify-evenly items-center mt-8 translate-y-1/2">
        <button
          onClick={() => setModal(false)}
          className="py-1 px-10 rounded-xl bg-[#FC9700] text-black border-2 border-black font-bold text-xl transition-transform duration-200"
        >
          Kembali
        </button>
        <button className="py-1 px-10 rounded-xl bg-button-blue text-black border-2 border-black font-bold text-xl transition-transform duration-200">
          Tambahkan
        </button>
      </div>
    </div>
  );
};

export default Edit;
