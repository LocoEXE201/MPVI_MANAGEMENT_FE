"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {
  CallApiGet,
  CallApiPost,
  CallApiPostToken,
  createNewCategory,
  deleteCategory,
  getCategoryByCondition,
  getSuppliersByCondition,
  updateCategory,
} from "@/api/services/service";
import {
  CheckAvailablePosition,
  CheckInlowPosition,
  CheckStonkPosition,
  GetAllCate,
  GetAllCategoryByCondition,
  GetAllSuperCate,
  GetAllSupplier,
} from "@/api/services/api";
import { StonkPositionTable } from "@/components/layouts/table/StonkPositionTable";
import { LowPostionTable } from "@/components/layouts/table/LowPositionTable";
import { ChartConfiguration } from "chart.js";
import { toast } from "react-toastify";
import { FormControl, InputLabel } from "@mui/material";
import { Button, MenuItem, Select } from "@nextui-org/react";
import UpdateCategoryPageComponent from "./EditCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import SortableTable from "@/components/layouts/table/CategoryTable";
import axios from "axios";

interface Category {
  categoryId: number;
  categoryName: string;
  licences: string;
  maxStonkDate: number;
  maxUseDate: number;
  status: string;
  notes: string;
  superCategoryID: number;
  image: string;
  priceSold: number;
  imageFile: string;
  // Add any other fields as needed
}

const CategoryPageComponent = (props: {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSuper, setSuper]: any = useState({ superCategoryName: "All" });
  const [superCates, setSuperCates] = useState([]);
  const [cates, setCates] = useState([]);
  const [search, setSearch] = useState("");
  const [checkAvailablePosition, setCheckAvailablePosition]: any = useState();
  const [checkStonkPosition, setCheckStonkPosition]: any = useState();
  const [checkInlowPosition, setCheckInlowPosition]: any = useState();
  const [table, setTable] = useState("SortTable");
  const [suppliers, setSuppliers] = useState([]);
  const [newSup, setNewSup] = useState({ supplierId: 1 });
  const [newCate, setNewCate]: any = useState({
    CategoryId: 0,
    SupplierId: 0,
    CategoryName: "",
    Licences: "",
    MaxStonkDate: 0,
    MaxUseDate: 0,
    UpdateBy: "",
    UpdateOn: new Date().toISOString(),
    Status: "Available",
    Rate: 0,
    Quantity: 0,
    PriceIn: 0,
    DayIn: new Date().toISOString(),
    ProductionDate: new Date().toISOString(),
    Notes: "",
    SuperCategoryId: 1,
    CreatedBy: "",
    CreatedOn: new Date().toISOString(),
    Image: "",
    PriceSold: 0.0,
    ImageFile: new Blob(),
  });
  const [cated, setCated] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectUp, setSelectUp]: any = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const [formData, setFormData] = useState({
  //   categoryId: 0,
  //   categoryName: "",
  //   licences: "",
  //   maxStonkDate: 0,
  //   maxUseDate: 0,
  //   status: "",
  //   notes: "",
  //   superCategoryID: 0,
  //   image: "",
  //   priceSold: 0,
  //   imageFile: null,
  // });

  // useEffect(() => {
  //   // Fetch categories to populate dropdown
  //   const fetchCategories = async () => {
  //     CallApiGet(GetAllCate).then((res) => {
  //       console.log("all cates", res);
  //       setCategories(res.result);
  //     })

  //     // setCategories(response.data);
  //   };
  //   fetchCategories();
  // }, []);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleFileChange = (e: any) => {
  //   const file = e.target.files[0];
  //   setFormData({
  //     ...formData,
  //     imageFile: file,
  //   });
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const response = await updateCategory(formData);
  //   console.log(response);
  //   getCates()
  //   // Optionally, handle response, e.g., show a success message, refresh the list
  //   closeModal();
  // };
  const [updatedCate, setUpdatedCate]: any = useState({
    categoryId: 0,
    categoryName: "",
    licences: "",
    maxStonkDate: 0,
    maxUseDate: 0,
    status: "Available",
    notes: "",
    superCategoryID: 1,
    image: "",
    priceSold: 0,
    imageFile: new Blob(),
  });

  const updateACategory = async () => {
    const requiredFields = [
      "categoryId",
      "categoryName",
      "licences",
      "maxStonkDate",
      "maxUseDate",
      "status",
      "notes",
      "superCategoryID",
      "image",
      "priceSold",
      "imageFile",
    ];
    for (let field of requiredFields) {
      if (
        updatedCate[field] === undefined ||
        updatedCate[field] === null ||
        updatedCate[field] === ""
      ) {
        toast.warning(`Insert ${field}`);
        return;
      }
    }
    updateCategory(updatedCate).then(() => {
      console.log("Response from updateCategory: ", updatedCate);
      getCates();
      setUpdatedCate({
        categoryId: 0,
        categoryName: "",
        licences: "",
        maxStonkDate: 0,
        maxUseDate: 0,
        status: "Available",
        notes: "",
        superCategoryID: 1,
        image: "",
        priceSold: 0,
        imageFile: null,
      });
    });
    unhiddenUpdatedContactdiv();
  };

  const handleCategoryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(event.target.value);
    console.log("Selected categoryId:", categoryId);
    setUpdatedCate((prevState: Category) => ({ ...prevState, categoryId }));
  };
  const unhiddenUpdatedContactdiv = () => {
    const div = document.getElementById("updatecontact");
    if (div?.classList.contains("hidden")) {
      div.classList.remove("hidden");
    } else {
      div?.classList.add("hidden");
    }
  };

  const cancelCategory = async () => {
    selectUp.forEach((catId: any) => {
      deleteCategory(catId);
    });
    getCates();
    toast.success("Cancel successful");
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    // Open your edit modal/pop-up here, passing selectedCategory as props
  };

  // const handleUpdateCategory = async (updatedCategory: Category) => {
  //   try {
  //     const res = await updateCategory(updatedCategory);
  //     console.log("Category updated successfully:", res);
  //     // Optionally, update local state or refresh categories list
  //     // For simplicity, assuming res contains updated category data
  //     const updatedCates = cated.map((c: any) =>
  //       c.categoryId === updatedCategory.categoryId ? updatedCategory : c
  //     );
  //     setCated(updatedCates);
  //     // Close the edit modal/pop-up here
  //   } catch (error) {
  //     console.error("Error updating category:", error);
  //     // Handle error appropriately, e.g., show error message
  //   }
  // };

  const getSuperCates = async () => {
    CallApiPost(GetAllSuperCate, {}).then((res) => {
      setSuperCates(res.result);
    });
  };

  const getSuppliers = async () => {
    CallApiPost(GetAllSupplier, {}).then((res) => {
      setSuppliers(res.result);
    });
  };

  const getCates = async () => {
    if (
      selectedSuper?.superCategoryName == "All" &&
      search?.trim()?.length == 0
    ) {
      CallApiGet(GetAllCate).then((res) => {
        console.log("all cates", res);
        setCates(res.result);
      });
    } else {
      getCategoryByCondition(selectedSuper?.superCategoryId, search).then(
        (res) => {
          console.log("cates condition", res);
          setCates(res.result);
        }
      );
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

  const unhiddenNewContactdiv = () => {
    const div = document.getElementById("newcontact");
    if (div?.classList.contains("hidden")) {
      div.classList.remove("hidden");
    } else {
      div?.classList.add("hidden");
    }
  };

  const handleSuperCategoryIdNew = (event: ChangeEvent<HTMLSelectElement>) => {
    const supplierId = parseInt(event.target.value);
    setNewCate((prevCate: any) => ({
      ...prevCate,
      SupplierId: isNaN(supplierId) ? 0 : supplierId,
    }));
  };

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setNewCate((prevState: any) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      // Access the first file from the array
      setNewCate({ ...newCate, ImageFile: event.target.files[0] });
    }
  };

  const handleImageFileUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setUpdatedCate({ ...updatedCate, imageFile: event.target.files[0] });
    }
  };

  useEffect(() => {
    console.log("Initial state of newCate: ", newCate);
  }, []);

  const createACategory = () => {
    const requiredFields = [
      "CategoryName",
      "Quantity",
      "Licences",
      "MaxStonkDate",
      "MaxUseDate",
      "UpdateBy",
      "UpdateOn",
      "Status",
      "Rate",
      "PriceIn",
      "DayIn",
      "ProductionDate",
      "Notes",
      "CreatedBy",
      "CreatedOn",
      "Image",
      "PriceSold",
      "ImageFile",
    ];
    console.log("Current state of newCate before validation: ", newCate);

    for (let field of requiredFields) {
      const value = newCate[field];
      console.log(`Checking field: ${field}, value: ${value}`);

      if (
        (typeof value === "string" && value.trim().length === 0) ||
        (typeof value === "number" && isNaN(value)) ||
        value === null ||
        value === undefined
      ) {
        toast.warning(`Insert ${field}`);
        return;
      }
    }

    createNewCategory(newCate).then(() => {
      console.log("Response from createNewCategory:", newCate);
      getCates();
      setNewCate({
        CategoryId: 0,
        SupplierId: 0,
        CategoryName: "",
        Licences: "",
        MaxStonkDate: 0,
        MaxUseDate: 0,
        UpdateBy: "",
        UpdateOn: new Date().toISOString(),
        Status: "Available",
        Rate: 0,
        Quantity: 0,
        PriceIn: 0,
        DayIn: new Date().toISOString(),
        ProductionDate: new Date().toISOString(),
        Notes: "",
        SuperCategoryId: 1,
        CreatedBy: "",
        CreatedOn: new Date().toISOString(),
        Image: "",
        PriceSold: 0.0,
        ImageFile: null,
      });
      toast.success("Create successful");
    });

    unhiddenNewContactdiv();
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
      labels: ["positionAvailable", "positionFilled"],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            checkAvailablePosition?.positionAvailable ?? 0,
            checkAvailablePosition?.positionFilled ?? 0,
          ],
          backgroundColor: [
            // "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut: ChartConfiguration = {
      type: "doughnut",
      data: dataDoughnut,
      options: {},
    };

    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnut") as HTMLCanvasElement,
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
          data: [
            checkStonkPosition?.total ??
              0 - checkStonkPosition?.stonkquantity ??
              0,
            checkStonkPosition?.stonkquantity ?? 0,
          ],
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut: ChartConfiguration = {
      type: "doughnut",
      data: dataDoughnut,
      options: {},
    };

    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnuts") as HTMLCanvasElement,
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
          data: [
            checkInlowPosition?.total ??
              0 - checkInlowPosition?.categoryInlow ??
              0,
            checkInlowPosition?.categoryInlow ?? 0,
          ],
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut: ChartConfiguration = {
      type: "doughnut",
      data: dataDoughnut,
      options: {
        plugins: {
          legend: {
            labels: {
              color: window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "white"
                : "black",
            },
          },
        },
      },
    };

    const chartDoughnut = new Chart(
      document.getElementById("chartDoughnutss") as HTMLCanvasElement,
      configDoughnut
    );

    return () => {
      chartDoughnut.destroy();
    };
  }, [checkInlowPosition]);

  useEffect(() => {
    getCates();
  }, [selectedSuper, search]);

  useEffect(() => {
    getSuppliers();
  }, []);

  // useEffect(() => {
  //   setCated();
  // }, []);

  const RenderTable = () => {
    switch (table) {
      case "SortTable":
        return (
          <SortableTable
            categories={cates}
            search={search}
            setSearch={setSearch}
            onEditCategory={handleEditCategory}
            selectedUpState={[selectUp, setSelectUp]}
          />
        );
      case "StonkPositionTable":
        return (
          <StonkPositionTable
            stonkProduct={checkStonkPosition?.stonkProductID}
          />
        );
      case "InlowPositionTable":
        return <LowPostionTable inLowCate={checkInlowPosition?.inLowCateID} />;
      default:
        return (
          <SortableTable
            categories={cates}
            search={search}
            setSearch={setSearch}
            onEditCategory={handleEditCategory}
            selectedUpState={[selectUp, setSelectUp]}
          />
        );
    }
  };

  return (
    <div
      className=""
      style={{ backgroundColor: "#F1F5F9", paddingTop: "1rem" }}
    >
      <div className="min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>
        <div className="above flex justify-around">
          <div className="flex">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingTop: "1rem",
                }}
              >
                  <div className="relative group mb-4">
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                    >
                      <span className="mr-2">
                        {selectedSuper?.superCategoryName}
                      </span>
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
                          onClick={() => {
                            setSuper({ superCategoryName: "All" });
                            toggleDropdown();
                          }}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                        >
                          All
                        </a>

                        {superCates?.map((cate: any, index: any) => (
                          <a
                            key={index}
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
                <div className="flex space-x-4" style={{ marginLeft: '2rem' }}>
                  <div className="mb-4">
                    <button
                      onClick={unhiddenNewContactdiv}
                      className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 mb-4"
                    >
                      Tạo Sản Phẩm Mới
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      onClick={unhiddenUpdatedContactdiv}
                      className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 mb-4"
                    >
                      Cập Nhật Sản Phẩm
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 mb-4"
                      onClick={cancelCategory}
                    >
                      Hủy Sản Phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex shadow-lg rounded-lg overflow-hidden"
            style={{ backgroundColor: "white" }}
          >
            <div onClick={() => setTable("SortTable")} className="">
              <div
                className="py-1 px-5 bg-gray-50 text-black dark:bg-gray-800 dark:text-white"
                style={{ fontWeight: "bold" }}
              >
                Biểu đồ
              </div>
              <canvas
                className=""
                id="chartDoughnut"
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "white",
                }}
              ></canvas>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: "smaller",
                  color: "black",
                }}
                className="dark:text-white"
              >
                Warehouse available
              </div>
            </div>
            <div onClick={() => setTable("StonkPositionTable")} className="">
              <div className="" style={{ paddingBottom: "2rem" }}></div>
              <canvas
                className=""
                id="chartDoughnuts"
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "white",
                }}
              ></canvas>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: "smaller",
                  color: "black",
                }}
                className="dark:text-white"
              >
                Category stonk
              </div>
            </div>
            <div onClick={() => setTable("InlowPositionTable")} className="">
              <div className="" style={{ paddingBottom: "2rem" }}></div>
              <canvas
                className=""
                id="chartDoughnutss"
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "white",
                }}
              ></canvas>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: "smaller",
                  color: "black",
                }}
                className="dark:text-white"
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
          {/* <EditCategoryModal
            category={selectedCategory}
            onUpdate={undefined}
            onClose={() => setSelectedCategory(null)}
          /> */}
          <RenderTable />
        </div>

        <div
          id="newcontact"
          className="text-black transition-all hidden absolute z-20 top-20 right-96 w-7/12 py-10 px-20 border rounded-md bg-white animate-appearance-in"
        >
          <InputLabel className="mb-2">Supplier</InputLabel>
          {/* <select
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.SupplierId}
            onChange={(event) =>
              setNewCate({ ...newCate, SupplierId: event.target.value })
            }
          >
            {suppliers.map((supplier: any) => (
              <option key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.supplierName}
              </option>
            ))}
          </select> */}
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.SupplierId}
            onChange={(event: any) =>
              setNewCate({ ...newCate, SupplierId: event.target.value })
            }
          />
          <InputLabel className="mb-2">Category Name</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.CategoryName}
            onChange={(event: any) =>
              setNewCate({ ...newCate, CategoryName: event.target.value })
            }
          />
          <InputLabel className="mb-2">Quantity</InputLabel>
          <input
            type="number"
            value={newCate?.Quantity}
            className="border mb-5 px-5 py-2 w-2/3"
            onChange={(event: any) =>
              setNewCate({ ...newCate, Quantity: parseInt(event.target.value) })
            }
          />
          <InputLabel className="mb-2">Licences</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.Licences}
            onChange={(event) =>
              setNewCate({ ...newCate, Licences: event.target.value })
            }
          />

          <InputLabel className="mb-2">Max Stonk Date</InputLabel>
          <input
            type="number"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.MaxStonkDate}
            onChange={(event) =>
              setNewCate({ ...newCate, MaxStonkDate: event.target.value })
            }
          />

          <InputLabel className="mb-2">Max Use Date</InputLabel>
          <input
            type="number"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.MaxUseDate}
            onChange={(event) =>
              setNewCate({ ...newCate, MaxUseDate: event.target.value })
            }
          />

          <InputLabel className="mb-2">Update By</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.UpdateBy}
            onChange={(event) =>
              setNewCate({ ...newCate, UpdateBy: event.target.value })
            }
          />

          <InputLabel className="mb-2">Update On</InputLabel>
          <input
            type="datetime-local"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.UpdateOn}
            onChange={(event) =>
              setNewCate({ ...newCate, UpdateOn: event.target.value })
            }
          />
          <InputLabel className="mb-2">Status</InputLabel>
          <select
            className="border mb-5 px-5 py-2"
            value={newCate?.Status}
            onChange={(event) =>
              setNewCate({ ...newCate, Status: event.target.value })
            }
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>
          <InputLabel className="mb-2">Rate</InputLabel>
          <input
            type="number"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.Rate}
            onChange={(event) =>
              setNewCate({ ...newCate, Rate: event.target.value })
            }
          />
          <InputLabel className="mb-2">Price In</InputLabel>
          <input
            type="number"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.PriceIn}
            onChange={(event) =>
              setNewCate({ ...newCate, PriceIn: event.target.value })
            }
          />

          <InputLabel className="mb-2">Day In</InputLabel>
          <input
            type="datetime-local"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.DayIn}
            onChange={(event) =>
              setNewCate({ ...newCate, DayIn: event.target.value })
            }
          />

          <InputLabel className="mb-2">Production Date</InputLabel>
          <input
            type="datetime-local"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.ProductionDate}
            onChange={(event) =>
              setNewCate({ ...newCate, ProductionDate: event.target.value })
            }
          />

          <InputLabel className="mb-2">Description</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.Notes}
            onChange={(event) =>
              setNewCate({ ...newCate, Notes: event.target.value })
            }
          />

          <InputLabel className="mb-2">Super Category ID</InputLabel>
          <select
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.SuperCategoryId}
            onChange={(event) =>
              setNewCate({ ...newCate, SuperCategoryId: event.target.value })
            }
          >
            {superCates.map((cate: any) => (
              <option key={cate.superCategoryId} value={cate.superCategoryId}>
                {cate.superCategoryName}
              </option>
            ))}
          </select>

          <InputLabel className="mb-2">Created By</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.CreatedBy}
            onChange={(event) =>
              setNewCate({ ...newCate, CreatedBy: event.target.value })
            }
          />

          <InputLabel className="mb-2">Created On</InputLabel>
          <input
            type="datetime-local"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.CreatedOn}
            onChange={(event) =>
              setNewCate({ ...newCate, CreatedOn: event.target.value })
            }
          />

          <InputLabel className="mb-2">Image</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.Image}
            onChange={(event) =>
              setNewCate({ ...newCate, Image: event.target.value })
            }
          />

          <InputLabel className="mb-2">Price Sold</InputLabel>
          <input
            type="number"
            step="0.01"
            className="border mb-5 px-5 py-2 w-2/3"
            value={newCate?.PriceSold}
            onChange={(event) =>
              setNewCate({ ...newCate, PriceSold: event.target.value })
            }
          />

          <InputLabel className="mb-2">Image File</InputLabel>
          <input
            type="file"
            className="border mb-5 px-5 py-2 w-2/3"
            onChange={handleImageFileChange}
          />
          <div className="flex justify-between">
            <Button
              onPress={unhiddenNewContactdiv}
              className="border text-red-500"
            >
              Đóng
            </Button>
            <Button onPress={createACategory} className="border text-blue-500">
              Tạo mới
            </Button>
          </div>
        </div>
        <div
          id="updatecontact"
          className="text-black transition-all hidden absolute z-20 top-20 right-96 w-7/12 py-10 px-20 border rounded-md bg-white animate-appearance-in"
        >
          <InputLabel className="mb-2">Category ID</InputLabel>
          <select
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate.categoryId}
            onChange={handleCategoryIdChange}
          >
            {cates.map((cate: any) => (
              <option key={cate.categoryId} value={cate.categoryId}>
                {cate.categoryName}
              </option>
            ))}
          </select>
          {/* <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.categoryId}
            onChange={(event: any) =>
              setUpdatedCate({ ...updatedCate, categoryId: event.target.value })
            }
          /> */}
          <InputLabel className="mb-2">Category Name</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.categoryName}
            onChange={(event: any) =>
              setUpdatedCate({
                ...updatedCate,
                categoryName: event.target.value,
              })
            }
          />
          <InputLabel className="mb-2">Licences</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.licences}
            onChange={(event) =>
              setUpdatedCate({ ...updatedCate, licences: event.target.value })
            }
          />

          <InputLabel className="mb-2">Max Stonk Date</InputLabel>
          <input
            type="number"
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.maxStonkDate}
            onChange={(event) =>
              setUpdatedCate({
                ...updatedCate,
                maxStonkDate: Number(event.target.value),
              })
            }
          />

          <InputLabel className="mb-2">Max Use Date</InputLabel>
          <input
            type="number"
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.maxUseDate}
            onChange={(event) =>
              setUpdatedCate({
                ...updatedCate,
                maxUseDate: Number(event.target.value),
              })
            }
          />

          <InputLabel className="mb-2">Status</InputLabel>
          <select
            className="border mb-5 px-5 py-2"
            value={updatedCate?.status}
            onChange={(event) =>
              setUpdatedCate({ ...updatedCate, status: event.target.value })
            }
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>

          <InputLabel className="mb-2">Description</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.notes}
            onChange={(event) =>
              setUpdatedCate({ ...updatedCate, notes: event.target.value })
            }
          />

          <InputLabel className="mb-2">Super Category ID</InputLabel>
          <select
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.superCategoryId}
            onChange={(event) =>
              setUpdatedCate({
                ...updatedCate,
                superCategoryId: event.target.value,
              })
            }
          >
            {superCates.map((cate: any) => (
              <option key={cate.superCategoryId} value={cate.superCategoryId}>
                {cate.superCategoryName}
              </option>
            ))}
          </select>

          <InputLabel className="mb-2">Image</InputLabel>
          <input
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.image}
            onChange={(event) =>
              setUpdatedCate({ ...updatedCate, image: event.target.value })
            }
          />

          <InputLabel className="mb-2">Price Sold</InputLabel>
          <input
            type="number"
            step="0.01"
            className="border mb-5 px-5 py-2 w-2/3"
            value={updatedCate?.priceSold}
            onChange={(event) =>
              setUpdatedCate({
                ...updatedCate,
                priceSold: Number(event.target.value),
              })
            }
          />

          <InputLabel className="mb-2">Image File</InputLabel>
          <input
            type="file"
            className="border mb-5 px-5 py-2 w-2/3"
            onChange={handleImageFileUpdate}
          />
          <div className="flex justify-between">
            <Button
              onPress={unhiddenUpdatedContactdiv}
              className="border text-red-500"
            >
              Close
            </Button>
            <Button onPress={updateACategory} className="border text-blue-500">
              Confirm
            </Button>
          </div>
          {/* <Modal */}
          {/* isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Update Category"
        >
          <h2>Update Category</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Category ID:
              <select name="categoryId" value={formData.categoryId} onChange={handleInputChange}>
              {categories.map((category: any) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select> */}
          {/* <input
                type="text"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
              /> */}
          {/* </label>
            <label>
              Category Name:
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Licences:
              <input
                type="text"
                name="licences"
                value={formData.licences}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Max Stonk Date:
              <input
                type="number"
                name="maxStonkDate"
                value={formData.maxStonkDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Max Use Date:
              <input
                type="number"
                name="maxUseDate"
                value={formData.maxUseDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Notes:
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Super Category ID:
              <input
                type="number"
                name="superCategoryID"
                value={formData.superCategoryID}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price Sold:
              <input
                type="number"
                name="priceSold"
                value={formData.priceSold}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image File:
              <input type="file" name="imageFile" onChange={handleFileChange} />
            </label>
            <button type="submit">Update Category</button>
          </form>
          <button onClick={closeModal}>Close</button>
        </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageComponent;
