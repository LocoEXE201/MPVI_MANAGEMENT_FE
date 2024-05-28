"use client";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { SortableTable } from "@/components/layouts/table/CategoryTable";
import {
  CallApiGet,
  CallApiPost,
  CallApiPostToken,
  getCategoryByCondition,
} from "@/api/services/service";
import {
  CheckAvailablePosition,
  CheckInlowPosition,
  CheckStonkPosition,
  GetAllCate,
  GetAllCategoryByCondition,
  GetAllSuperCate,
} from "@/api/services/api";
import { StonkPositionTable } from "@/components/layouts/table/StonkPositionTable";
import { LowPostionTable } from "@/components/layouts/table/LowPositionTable";

const CategoryPageComponent = (props: {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuper, setSuper]: any = useState({ superCategoryName: "All" });
  const [superCates, setSuperCates] = useState([]);
  const [cates, setCates] = useState([]);
  const [search, setSearch] = useState("")
  const [checkAvailablePosition, setCheckAvailablePosition]:any = useState();
  const [checkStonkPosition, setCheckStonkPosition]:any = useState();
  const [checkInlowPosition, setCheckInlowPosition]:any = useState();
  const [table, setTable] = useState("SortTable")

  const getSuperCates = async () => {
    CallApiPost(GetAllSuperCate, {}).then((res) => {
      setSuperCates(res.result);
    });
  };

  const getCates = async () => {
    if (selectedSuper?.superCategoryName == "All"&&search?.trim()?.length==0) {
      CallApiGet(GetAllCate).then((res) => {
        console.log("all cates", res)
        setCates(res.result);
      });
    } else {
      getCategoryByCondition(selectedSuper?.superCategoryId, search).then((res) => {
        console.log("cates condition", res)
        setCates(res.result);
      });
    }
  };

  const getCheckAvailablePosition = async () => {
    CallApiPostToken(CheckAvailablePosition, {}).then((res) => {
      setCheckAvailablePosition(res.result);
    });
  };

  const getCheckStonkPosition = async () => {
    CallApiPostToken(CheckStonkPosition, {}).then((res) => {
      setCheckStonkPosition(res.result);
    });
  };

  const getCheckInlowPosition = async () => {
    CallApiPostToken(CheckInlowPosition, {}).then((res) => {
      console.log("get check in low", res);
      setCheckInlowPosition(res.result);
    });
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    getSuperCates();
    getCheckAvailablePosition();
    getCheckStonkPosition();
    getCheckInlowPosition();
  }, []);

  useEffect(() => {
    const dataDoughnut = {
      labels: [ "positionAvailable", "positionFilled"],
      datasets: [
        {
          label: "My First Dataset",
          data: [ checkAvailablePosition?.positionAvailable??0, checkAvailablePosition?.positionFilled??0],
          backgroundColor: [
            // "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut = {
      type: "doughnut",
      data: dataDoughnut,
      options: {},
    };

    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnut"),
      configDoughnut
    );

    return () => {
      chartDoughnut.destroy();
    };
  }, [checkAvailablePosition]);

  useEffect(() => {
    const dataDoughnut = {
      labels: ["others", "stonkquantity"],
      datasets: [
        {
          label: "My First Dataset",
          data: [checkStonkPosition?.total??0-checkStonkPosition?.stonkquantity??0, checkStonkPosition?.stonkquantity??0],
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut = {
      type: "doughnut",
      data: dataDoughnut,
      options: {},
    };

    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnuts"),
      configDoughnut
    );

    return () => {
      chartDoughnut.destroy();
    };
  }, [checkStonkPosition]);

  useEffect(() => {
    const dataDoughnut = {
      labels: ["others", "categoryInlow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [checkInlowPosition?.total??0-checkInlowPosition?.categoryInlow??0, checkInlowPosition?.categoryInlow??0],
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut = {
      type: "doughnut",
      data: dataDoughnut,
      options: {},
    };

    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnutss"),
      configDoughnut
    );

    return () => {
      chartDoughnut.destroy();
    };
  }, [checkInlowPosition]);

  useEffect(() => {
    getCates();
  }, [selectedSuper, search]);

  const RenderTable = () => {
    switch(table){
      case "SortTable":
        return <SortableTable categories={cates} search={search} setSearch={setSearch}/>
      case "StonkPositionTable" :
        return <StonkPositionTable stonkProduct={checkStonkPosition?.stonkProductID}/>
      case "InlowPositionTable" :
        return <LowPostionTable inLowCate={checkInlowPosition?.inLowCateID}/>
      default :
        return <SortableTable categories={cates} search={search} setSearch={setSearch}/>
    }
  }

  return (
    <div
      className=""
      style={{ backgroundColor: "#F1F5F9", paddingTop: "1rem" }}
    >
      <div className="above flex justify-around">
        <div className="flex">
          <div className="relative group">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">{selectedSuper?.superCategoryName}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                <a
                  onClick={() => {setSuper({ superCategoryName: "All" }); toggleDropdown()}}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  All
                </a>

                {superCates?.map((cate: any) => (
                  <a
                    onClick={() => {
                      setSuper(cate);
                      toggleDropdown();
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    {cate?.superCategoryName}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="flex shadow-lg rounded-lg overflow-hidden"
          style={{ backgroundColor: "white" }}
        >
          <div onClick={() => setTable("SortTable")} className="">
            <div
              className="py-1 px-5 bg-gray-50 text-black"
              style={{ fontWeight: "bold" }}
            >
              Doughnut chart
            </div>
            <canvas
              className=""
              id="chartDoughnut"
              style={{ width: "200px", height: "200px" }}
            ></canvas>
            <div
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "smaller",
              }}
            >
              Warehouse available
            </div>
          </div>
          <div onClick={() => setTable("StonkPositionTable")} className="">
            <div className="" style={{ paddingBottom: "2rem" }}></div>
            <canvas
              className=""
              id="chartDoughnuts"
              style={{ width: "200px", height: "200px" }}
            ></canvas>
            <div
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "smaller",
              }}
            >
              Category stonk
            </div>
          </div>
          <div onClick={() => setTable("InlowPositionTable")} className="">
            <div className="" style={{ paddingBottom: "2rem" }}></div>
            <canvas
              className=""
              id="chartDoughnutss"
              style={{ width: "200px", height: "200px" }}
            ></canvas>
            <div
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "smaller",
              }}
            >
              Category in low
            </div>
          </div>
        </div>
      </div>
      <div
        className="below"
        style={{ paddingTop: "1rem", width: "95%", margin: "0 auto" }}
      >
        <RenderTable />
      </div>
    </div>
  );
};

export default CategoryPageComponent;
