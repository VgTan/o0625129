import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import panduanImg from "../../assets/images/cwpanduan.svg";
import GamePic from "../../assets/images/gamePic.svg";
import { useNavigate } from "react-router";
import { getProduct, getSetting } from "../../helpers/db";
import { getPriceFormat } from "../../helpers/helper";
import GameButton from "../../components/GameButton";
const GamePlay = () => {
  const [index, setIndex] = useState(0);
  const [tabPage, setTabPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProduct();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const tabs = [
    { label: "SEMBAKO", value: 0 },
    { label: "CEMILAN", value: 1 },
    { label: "MINUMAN", value: 2 },
    { label: "PERABOTAN", value: 3 },
    { label: "MAINAN", value: 4 },
  ];

  const navigate = useNavigate();
  return (
    <PageLayout back={"/game"} isGame={true}>
      <div className="flex items-end justify-center h-full px-[10%]">
        <div className="w-1/2 h-max lg:md:translate-y-0 translate-y-7">
          <img src={GamePic} alt="panduan" className="" />
        </div>
        <div className="w-1/2 flex items-end justify-center lg:pb-24 md:pb-16 pb-12 h-full">
          <div className="bg-[#825829] border-[#825829] lg:border-[25px] border-[10px] rounded-3xl w-full relative min-h-[70vh] max-h-[100vh]">
            <div className="bg-[#f5d28d] rounded-3xl w-full h-full lg:p-5 p-1 flex flex-col justify-center min-h-[70vh] max-h-[70vh]">
              <div className="bg-[#825829] flex w-full rounded-xl">
                {tabPage === 1 && (
                  <button
                    onClick={() => setTabPage(0)}
                    className="text-white px-4 py-2 font-bold"
                  >
                    &lt;
                  </button>
                )}

                <div className="flex flex-1 items-center">
                  {tabs.slice(tabPage * 3, tabPage * 3 + 3).map((tab) => (
                    <div
                      key={tab.value}
                      onClick={() => setIndex(tab.value)}
                      className={`cursor-pointer px-4 rounded w-1/3 text-center font-inter font-semibold text-xl ${
                        index === tab.value
                          ? "text-[#F67904] font-bold"
                          : "text-white"
                      }`}
                    >
                      <p>{tab.label}</p>
                    </div>
                  ))}
                </div>

                {tabPage === 0 && (
                  <button
                    onClick={() => setTabPage(1)}
                    className="text-white px-4 py-2 font-bold"
                  >
                    &gt;
                  </button>
                )}
              </div>
              <div className="h-80 overflow-y-auto flex flex-wrap gap-y-7">
                {products.length > 0 &&
                  products
                    .filter((item) =>
                      item.kategori
                        ?.toLowerCase()
                        .includes(tabs[index].label.toLowerCase())
                    )
                    .map((product, index) => (
                      <div className="flex flex-col gap-1 items-center w-1/3">
                        <img
                          src={product?.imageUrl}
                          className="w-28 h-28 object-cover"
                        />
                        <div className="flex flex-col items-center justify-center w-full px-7 gap-2">
                          <p className="font-bold font-inter">{product.nama}</p>
                          <GameButton size="normal">
                            {getPriceFormat(product.harga)}
                          </GameButton>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className="flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%]">
              {/* <button className="lg:py-1 md:py-[0.18rem] lg:px-12 md:px-9 px-7 rounded-xl bg-[#825829] text-white border-2 border-black font-bold lg:text-3xl md:text-lg transition-transform duration-200">
                Skip
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GamePlay;
