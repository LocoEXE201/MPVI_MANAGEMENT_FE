import axios from "axios";
import {
  CreateNewSupplier,
  DeleteSupplierByID,
  GetAllCategoryByCondition,
  GetAllSupplierByCondition,
  GetStaffList,
  ImportStaffList,
  Token,
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
