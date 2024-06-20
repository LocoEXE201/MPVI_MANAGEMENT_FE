import axios from "axios";
import {
  CreateNewCategory,
  CreateNewSupplier,
  DeleteCategoryByID,
  DeleteSupplierByID,
  GetAllCategoryByCondition,
  GetAllSupplierByCondition,
  GetStaffList,
  ImportStaffList,
  Token,
  UpdateCategory,
  UpdateOrderStatus,
} from "./api";
import { getToken } from "@/utils/jwt";

export const CallApiPost = async (url: string, data: any) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const CallApiPostToken = async (url: string, data: any) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const CallApiGetToken = async (url: string) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const CallApiGet = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

export const getCategoryByCondition = async (
  superID: string,
  search: string
) => {
  const res = await axios.get(
    `${GetAllCategoryByCondition}?${superID?.length > 0 ? `superID=${superID}&` : ""}${search?.trim()?.length > 0 ? `searchKey=${search}` : ""}`
  );
  return res.data;
};
export const updateCategory = async (data: {
  categoryId: number,
  categoryName: string,
  licences: string,
  maxStonkDate: number,
  maxUseDate: number,
  status: string,
  notes: string,
  superCategoryID: number,
  image: string,
  priceSold: number,
  imageFile?: Blob // Optional image file if needed
}) => {
      const res = await axios.post(
          `${UpdateCategory}`,
          data,
          {
              headers: {
                  Accept: "text/plain",
                  Authorization: `Bearer ${getToken()}`,
                  "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
          }
      );
      return res.data;
};
// export const updateCategory = async (data: any) => {
//   const { imageFile, ...jsonData } = data;

//   if (imageFile) {
//     jsonData.imageFile = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result;
//         if (typeof result === 'string') {
//           resolve(result.split(',')[1]); // Remove the base64 prefix
//         } else {
//           reject(new Error("FileReader result is not a string"));
//         }
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(imageFile);
//     });
//   }

//   const headers = {
//     Accept: "text/plain",
//     Authorization: `Bearer ${getToken()}`,
//     "Content-Type": "application/json",
//   };

//   try {
//     const res = await axios.post(
//       "http://14.225.211.1:8084/api/category/UpdateCategory",
//       JSON.stringify(jsonData),
//       { headers, withCredentials: true }
//     );

//     return res.data;
//   } catch (error) {
//     console.error("Error updating category:", error);
//     throw error;
//   }
// };


export const getSuppliersByCondition = async (
  SupplierName: any = undefined
) => {
  const res = await axios.post(
    `${GetAllSupplierByCondition}${SupplierName?.trim()?.length > 0 ? `?SupplierName=${SupplierName}` : ""}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    console.log(orderId);
    console.log(status);
    const res = await axios.post(
      `${UpdateOrderStatus}?id=${orderId}&newStatus=${status}`,
      {},
      {
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${getToken()}`,
        },
        withCredentials: true,
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await axios.post(
      `${DeleteCategoryByID}?Cate_ID=${categoryId}&confirm=true`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteSupplier = async (supplierId: string) => {
  try {
    await axios.post(
      `${DeleteSupplierByID}?SupplierID=${supplierId}&confirm=true`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createNewSupplier = async (data: any) => {
  try {
    const res = await axios.post(`${CreateNewSupplier}?confirm=true`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createNewCategory = async (data: {
  CategoryId: number;
  SupplierId: number;
  CategoryName: string;
  Licences: string;
  MaxStonkDate: number;
  MaxUseDate: number;
  UpdateBy: string;
  UpdateOn: string;
  Status: string;
  Rate: number;
  Quantity: number;
  PriceIn: number;
  DayIn: string;
  ProductionDate: string;
  Notes: string;
  SuperCategoryId: number;
  CreatedBy: string;
  CreatedOn: string;
  Image: string;
  PriceSold: number;
  ImageFile: Blob;
}) => {
  try {
    const res = await axios.post(CreateNewCategory, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getStaffList = async (AdminUserId: string, code: string) => {
  const res = await axios.get(
    `${GetStaffList}?AdminUserID=${AdminUserId}&code=${code}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const importStaffList = async (file: any) => {
  const formData = new FormData();

  formData.append("excelFile", file);

  const res = await axios.post(ImportStaffList, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
