import React, { useEffect, useRef, useState } from "react";
import Icon from "../../assets/images/iconadmin.svg";
import Sampah from "../../assets/images/sampah.svg";
import Plus from "../../assets/images/plus.svg";
import EditIcon from "../../assets/images/editIcon 2.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import AdminLayout from "../../components/AdminLayout";
import {
  deleteProductById,
  deleteSettingById,
  editProductById,
  editSettingById,
  getProduct,
  getSetting,
  getUser,
  simpanProdukKeFirestore,
  simpanSettingKeFirestore,
  uploadToCloudinary,
} from "../../helpers/db";
import { getPriceFormat } from "../../helpers/helper";

const Edit = () => {
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const usersData = await getUser();
    setUsers(usersData);

    const productsData = await getProduct();
    setProducts(productsData);

    const settingsData = await getSetting();
    setSettings(settingsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type, data) => {
    const confirmed = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmed) return;
    setLoading(true);
    try {
      if (type === "setting") {
        await deleteSettingById(data.id);
        setSettings((prev) => prev.filter((item) => item.id !== data.id));
      }
      if (type === "product") {
        await deleteProductById(data.id);
        setProducts((prev) => prev.filter((item) => item.id !== data.id));
      }
    } catch (e) {
      alert("Data gagal dihapus");
    } finally {
      setLoading(false);
      alert("Data berhasil dihapus");
    }
  };
  return (
    <AdminLayout isAdmin={true} back>
      {loading && (
        <div className="fixed z-[100] inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-xl px-10 py-6 shadow-lg flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-3xl font-inter font-bold text-black">
              Loading...
            </p>
            <p className="text-sm text-gray-500 mt-1">Mohon tunggu sebentar</p>
          </div>
        </div>
      )}
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
                index === 0
                  ? "bg-[#FE9201F7] text-black font-bold"
                  : "font-semibold"
              }`}
            >
              <p className="text-xl font-inter">Data Pemain</p>
            </div>
            <div
              onClick={() => setIndex(1)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 1
                  ? "bg-[#FE9201F7] text-black font-bold"
                  : "font-semibold"
              }`}
            >
              <p className="text-xl font-inter">Produk Game</p>
            </div>
            <div
              onClick={() => setIndex(2)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 2
                  ? "bg-[#FE9201F7] text-black font-bold"
                  : "font-semibold"
              }`}
            >
              <p className="text-xl font-inter">Peringkat</p>
            </div>
            <div
              onClick={() => setIndex(3)}
              className={`cursor-pointer px-4 py-8 rounded w-1/4 h-full ${
                index === 3
                  ? "bg-[#FE9201F7] text-black font-bold"
                  : "font-semibold"
              }`}
            >
              <p className="text-xl font-inter">Pengaturan</p>
            </div>
          </div>

          <div className="bg-[#FE9000] p-10 border-2 border-black">
            {index === 0 && <DataPemain users={users} />}
            {index === 1 && (
              <ProdukGame
                products={products}
                setLoading={setLoading}
                handleDelete={handleDelete}
                setProducts={setProducts}
              />
            )}
            {index === 2 && <Peringkat />}
            {index === 3 && (
              <Pengaturan
                setSettings={setSettings}
                settings={settings}
                setLoading={setLoading}
                handleDelete={handleDelete}
              />
            )}
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
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl flex flex-col h-80 overflow-y-auto">
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
  const { products, setLoading, handleDelete, setProducts } = props;
  const [isModal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  return (
    <div className="">
      <div className="flex bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-2xl py-4 rounded-t-2xl">
        <p className="w-[15%]">Produk</p>
        <p className="w-[15%]">Nama</p>
        <p className="w-[15%]">Harga</p>
        <p className="w-[15%]">Foto</p>
        <p className="w-[15%]">Reward</p>
        <p className="w-[15%]">Poin</p>
        <div
          className="w-[10%] flex justify-center items-center cursor-pointer"
          onClick={() => setModal(true)}
        >
          <img
            src={EditIcon}
            alt="edit"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl flex flex-col h-80 overflow-y-auto">
        {products &&
          products?.map((product, index) => (
            <div
              key={product.id}
              className="flex border-b-2 border-black text-center items-center text-xl font-inter font-bold"
            >
              <p className="w-[15%] py-4 capitalize">
                {product.kategori || "N/A"}
              </p>
              <p className="w-[15%] py-4">{product.nama || 0}</p>
              <p className="w-[15%] py-4">
                {getPriceFormat(product.harga) || 0}
              </p>
              <div className="w-[15%] flex justify-center items-center py-2">
                <img
                  src={product.imageUrl}
                  alt="profile"
                  className="w-14 h-14 object-cover"
                />
              </div>
              <p className="w-[15%] py-4">{product.reward || 0}</p>
              <p className="w-[15%] py-4">{product.poin || 0}</p>
              <div className="w-[10%] flex justify-center items-center p-2 gap-5">
                <img
                  src={Sampah}
                  alt="sampah"
                  className="w-10 h-10 object-cover cursor-pointer"
                  onClick={() => {
                    handleDelete("product", product);
                  }}
                />
                <img
                  src={Plus}
                  alt="Plus"
                  className="w-10 h-10 object-cover cursor-pointer"
                  onClick={() => {
                    setModal(true);
                    setSelectedProduct(product);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
      {isModal && (
        <ModalProduk
          products={products}
          setProducts={setProducts}
          setModal={setModal}
          setLoading={setLoading}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
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

const Pengaturan = (props) => {
  const { settings, handleDelete, setSettings } = props;
  const [isModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex bg-[#FEA01A] text-center w-full border-2 border-black font-inter font-bold text-2xl py-4 rounded-t-2xl">
        <p className="w-[45%]">Waktu</p>
        <p className="w-[45%]">Putaran Ke-</p>
        <div
          className="w-[10%] flex justify-center items-center cursor-pointer"
          onClick={() => setModal(true)}
        >
          <img
            src={EditIcon}
            alt="edit"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="bg-[#FFDE9A] border-2 border-black text-center rounded-b-2xl flex flex-col h-80 overflow-y-auto">
        {settings?.length > 0 &&
          settings.map((setting, index) => (
            <div
              key={setting?.id}
              className="flex border-b-2 border-black text-center text-xl font-inter font-bold"
            >
              <p className="w-[45%] py-4">{setting?.round || 0}</p>
              <p className="w-[45%] py-4">{setting?.waktu || 0} detik</p>
              <div className="w-[10%] flex justify-center items-center p-2 gap-5">
                <img
                  src={Sampah}
                  alt="sampah"
                  className="w-10 h-10 object-cover cursor-pointer"
                  onClick={() => {
                    handleDelete("setting", setting);
                  }}
                />
                <img
                  src={Plus}
                  alt="Plus"
                  className="w-10 h-10 object-cover cursor-pointer"
                  onClick={() => {
                    setModal(true);
                    setSelectedSetting(setting);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
      {isModal && (
        <ModalSetting
          setModal={setModal}
          setLoading={setLoading}
          selectedSetting={selectedSetting}
          setSettings={setSettings}
          setSelectedSetting={setSelectedSetting}
        />
      )}
    </div>
  );
};

const ModalProduk = (props) => {
  const {
    setModal,
    setLoading,
    products,
    setProducts,
    selectedProduct,
    setSelectedProduct,
  } = props;
  const [form, setForm] = useState({
    kategori: "",
    nama: "",
    harga: "",
    reward: "",
    poin: "",
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        kategori: selectedProduct.kategori || "",
        nama: selectedProduct.nama || "",
        harga: selectedProduct.harga || "",
        reward: selectedProduct.reward || "",
        poin: selectedProduct.poin || "",
      });
      setPreview(selectedProduct.imageUrl || null);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.kategori || !form.nama) {
      alert("Lengkapi semua data terlebih dahulu!");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = selectedProduct?.imageUrl || "";

      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      const productData = {
        ...form,
        harga: Number(form.harga),
        reward: Number(form.reward),
        poin: Number(form.poin),
        imageUrl,
      };

      if (selectedProduct?.id) {
        await editProductById(selectedProduct.id, productData);
        setProducts((prev) =>
          prev.map((p) =>
            p.id === selectedProduct.id
              ? { ...productData, id: selectedProduct.id }
              : p
          )
        );
        alert("Produk berhasil diupdate!");
      } else {
        const newProduct = await simpanProdukKeFirestore(productData);
        setProducts((prev) => [...prev, newProduct]);
        alert("Produk berhasil disimpan!");
      }

      setForm({ kategori: "", nama: "", harga: "", reward: "", poin: "" });
      setFile(null);
      setPreview(null);
      setModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk: " + err.message);
    } finally {
      setLoading(false);
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
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2"
            >
              <option value="">Pilih Kategori</option>
              <option value="sembako">Sembako</option>
              <option value="cemilan">Cemilan</option>
              <option value="minuman">Minuman</option>
              <option value="perabotan">Perabotan</option>
              <option value="mainan">Mainan</option>
            </select>
          </div>

          {/* Input lainnya */}
          {["nama", "harga", "reward", "poin"].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <label className="text-black text-lg font-bold capitalize">
                {field}
              </label>
              <input
                type={field === "nama" ? "text" : "number"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="bg-[#F6B35D] border border-black rounded px-3 py-1 w-1/2"
              />
            </div>
          ))}
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col items-center w-1/3">
          <label className="font-bold text-black text-lg mb-2">
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
          onClick={() => {
            setModal(false);
            setSelectedProduct(null);
          }}
          className="py-1 px-10 rounded-xl bg-[#FC9700] text-black border-2 border-black font-bold text-xl transition-transform duration-200"
        >
          Kembali
        </button>
        <button
          onClick={handleSubmit}
          className="py-1 px-10 rounded-xl bg-button-blue text-black border-2 border-black font-bold text-xl transition-transform duration-200"
        >
          {selectedProduct ? "Simpan Perubahan" : "Tambahkan"}
        </button>
      </div>
    </div>
  );
};

const ModalSetting = (props) => {
  const {
    setModal,
    setLoading,
    selectedSetting,
    setSelectedSetting,
    setSettings,
  } = props;
  const [form, setForm] = useState({
    round: "",
    waktu: "",
  });

  useEffect(() => {
    if (selectedSetting) {
      setForm({
        round: selectedSetting.round || "",
        waktu: selectedSetting.waktu || "",
      });
    }
  }, [selectedSetting]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.round || !form.waktu) {
      alert("Lengkapi semua data terlebih dahulu!");
      setLoading(false);
      return;
    }

    try {
      const settingData = {
        ...form,
        waktu: Number(form.waktu),
        round: Number(form.round),
      };

      if (selectedSetting?.id) {
        await editSettingById(selectedSetting.id, settingData);
        setSettings((prev) =>
          prev.map((p) =>
            p.id === selectedSetting.id
              ? { ...settingData, id: selectedSetting.id }
              : p
          )
        );
        alert("Pengaturan berhasil diupdate!");
      } else {
        const newSetting = await simpanSettingKeFirestore(settingData);
        console.log(newSetting);
        setSettings((prev) => [...prev, newSetting]);

        alert("Pengaturan berhasil disimpan!");
      }

      setForm({ round: "", waktu: "" });
      setModal(false);
      setSelectedSetting(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan pengaturan: " + err.message);
    } finally {
      setLoading(false);
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
      <div className="flex flex-col gap-5 items-center justify-center mt-8 px-8">
        {/* Input lainnya */}
        {["putaran ke-", "waktu (detik)"].map((field) => (
          <div
            key={field}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <label className="text-black text-2xl font-bold capitalize">
              {field}
            </label>
            <input
              type="number"
              name={field === "putaran ke-" ? "round" : "waktu"}
              value={form[field === "putaran ke-" ? "round" : "waktu"]}
              onChange={handleChange}
              className="bg-[#F6B35D] border border-black rounded px-3 py-1 text-center"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-evenly items-center mt-8 translate-y-1/2">
        <button
          onClick={() => {
            setModal(false);
            setSelectedSetting(null);
          }}
          className="py-1 px-10 rounded-xl bg-[#FC9700] text-black border-2 border-black font-bold text-xl transition-transform duration-200"
        >
          Kembali
        </button>
        <button
          onClick={handleSubmit}
          className="py-1 px-10 rounded-xl bg-button-blue text-black border-2 border-black font-bold text-xl transition-transform duration-200"
        >
          {selectedSetting ? "Simpan Perubahan" : "Tambahkan"}
        </button>
      </div>
    </div>
  );
};

export default Edit;
