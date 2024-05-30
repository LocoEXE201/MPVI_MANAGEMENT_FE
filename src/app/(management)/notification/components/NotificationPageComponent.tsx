"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import {
  NotificationDTO,
  NotificationSeenDTO,
  NotificationStatus,
} from "@/models/NotificationDTO";
import {
  database,
  onValue,
  push,
  ref,
  remove,
  update,
} from "@/config/firebaseConfig";
import { FirebaseConstants } from "@/constants/FirebaseConstants";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import { getUserInfo, getUserInfoId } from "@/utils/utils";
import { AccountRoleCode } from "@/enums/accountRole";
import sweetAlert from "@/utils/sweetAlert";
import formatDate from "@/utils/formatDate";
import Swal from "sweetalert2";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import "./index.scss";

const NotificationPageComponent = (props: {}) => {
  const [status, setStatus] = React.useState<string>("");
  const [statusFilteredDate, setStatusFilteredDate] =
    React.useState<string>("");
  const [createMode, setCreateMode] = React.useState<boolean>(false);
  const [updateMode, setUpdateMode] = React.useState<boolean>(false);
  const [updatedData, setUpdatedData] = React.useState<NotificationDTO | null>(
    null
  );
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [viewDetailList, setViewDetailList] = React.useState<string[]>([]);
  const [unseenList, setUnseenList] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleChangeFilteredDate = (event: SelectChangeEvent) => {
    setStatusFilteredDate(event.target.value);
  };

  const handleCreateMode = (status: boolean) => {
    setCreateMode(status);
  };

  const addNotification = (newNotification: NotificationDTO) => {
    push(ref(database, `${FirebaseConstants.MANAGEMENT_NOTIFICATIONS}`), {
      title: newNotification.title,
      subtitle: newNotification.subtitle ?? "",
      tagId: newNotification.tagId ?? "",
      tagName: newNotification.tagName ?? "",
      content: newNotification.content ?? "",
      status: NotificationStatus.Active,
      createdAt: new Date().toISOString(),
      updatedAt: "",
    });
    sweetAlert.alertSuccess("Tạo thành công", "", 2000, "18");
  };

  const updateNotification = (id: string, updateData: NotificationDTO) => {
    update(
      ref(database, `${FirebaseConstants.MANAGEMENT_NOTIFICATIONS}/${id}`),
      {
        title: updateData.title,
        subtitle: updateData.subtitle ?? "",
        tagId: updateData.tagId ?? "",
        tagName: updateData.tagName ?? "",
        content: updateData.content ?? "",
        status: NotificationStatus.Updated,
        createdAt:
          updatedData && updatedData.createdAt ? updatedData.createdAt : "",
        updatedAt: new Date().toISOString(),
      }
    );
    sweetAlert.alertSuccess("Cập nhật thành công", "", 2000, "20");
  };

  const deleteNotification = (id: string) => {
    remove(
      ref(database, `${FirebaseConstants.MANAGEMENT_NOTIFICATIONS}/${id}`)
    );
  };

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: updatedData ? updatedData.title : "",
      subtitle: updatedData ? updatedData.subtitle : "",
      tagId: updatedData ? updatedData.tagId : "",
      tagName: updatedData ? updatedData.tagName : "",
      content: updatedData ? updatedData.content : "",
    },
    onSubmit: (values) => {
      if (createMode) {
        addNotification({
          title: values.title,
          subtitle: values.subtitle,
          tagId: values.tagId,
          tagName: values.tagName,
          content: values.content,
        });
        setCreateMode(false);
      }
      if (updateMode) {
        updateNotification(
          updatedData && updatedData?.id ? updatedData?.id : "",
          {
            title: values.title,
            subtitle: values.subtitle,
            tagId: values.tagId,
            tagName: values.tagName,
            content: values.content,
          }
        );
        setUpdateMode(false);
      }
    },
  });

  const isAdminRole = () => {
    return (
      getUserInfo() &&
      JSON.parse(getUserInfo() ?? "") &&
      JSON.parse(getUserInfo() ?? "").role.find(
        (x: any) => x == AccountRoleCode.SUPER_ADMIN
      )
      // false
    );
  };

  useEffect(() => {
    onValue(
      ref(database, `${FirebaseConstants.MANAGEMENT_NOTIFICATIONS}`),
      (snapshot) => {
        const data = snapshot.val();
        const notificationsList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setNotifications(notificationsList);
      }
    );
  }, []);

  useEffect(() => {
    if (!isAdminRole() && notifications.length > 0) {
      onValue(
        ref(database, `${FirebaseConstants.SEEN_NOTIFICATIONS}`),
        (snapshot) => {
          const data = snapshot.val();
          const seenList = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];

          const userSeen: NotificationSeenDTO = seenList.find(
            (x: NotificationSeenDTO) => x.userLoginId == getUserInfoId()
          );

          if (userSeen && userSeen.id) {
            notifications
              .filter(
                (x: NotificationDTO) =>
                  new Date(x.createdAt ?? "").getTime() >
                  new Date(
                    userSeen && userSeen.latestTime
                      ? userSeen.latestTime
                      : x.createdAt ?? ""
                  ).getTime()
              )
              .forEach((x: NotificationDTO) => {
                setUnseenList((unseenList) => [...unseenList, x.id ?? ""]);
              });
            update(
              ref(
                database,
                `${FirebaseConstants.SEEN_NOTIFICATIONS}/${userSeen.id}`
              ),
              {
                userLoginId: userSeen.userLoginId,
                latestTime: new Date().toISOString(),
              }
            );
          }
        }
      );
    }
  }, [notifications]);

  useEffect(() => {
    if (!updateMode || createMode) {
      setUpdatedData(null);
    }
    if (createMode) {
      form.resetFields();
    }
    if (updateMode && updatedData) {
      form.setFieldValue("title", updatedData?.title ?? "");
      form.setFieldValue("subtitle", updatedData?.subtitle ?? "");
      form.setFieldValue("tagId", updatedData?.tagId ?? "");
      form.setFieldValue("tagName", updatedData?.tagName ?? "");
      form.setFieldValue("content", updatedData?.content ?? "");
    }
  }, [updateMode, createMode, updatedData]);

  if (createMode || updateMode) {
    return (
      <>
        <div className="px-[5rem]">
          <div className="w-full">
            <Form
              onFinish={formik.handleSubmit}
              form={form}
              size="large"
              autoComplete="off"
              className="w-full"
            >
              <h1
                className="w-full text-center mb-1
                 text-[2rem] uppercase text-blue-700"
                style={{ fontWeight: "bolder" }}
              >
                {createMode ? "Tạo Thông Báo Mới" : ""}
                {updateMode ? "Cập Nhật Thông Báo" : ""}
              </h1>
              <div className="row align-items-start justify-content-between">
                <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                  <span className="text-black">
                    Tiêu đề
                    <span className="text-red-500">*</span>
                  </span>
                </p>
                <Form.Item
                  className="col-sm-12 col-md-7 mx-0 px-0"
                  name="title"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Tiêu đề không được để trống",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Nhập tiêu đề"
                  />
                </Form.Item>
              </div>

              <div className="row align-items-start justify-content-between">
                <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                  <span className="text-black">Tiêu đề phụ</span>
                </p>
                <Form.Item
                  className="col-sm-12 col-md-7 mx-0 px-0"
                  name="subtitle"
                  label=""
                  rules={[]}
                  hasFeedback
                >
                  <Input
                    name="subtitle"
                    value={formik.values.subtitle}
                    onChange={formik.handleChange}
                    placeholder="Nhập tiêu đề phụ (Không bắt buộc)"
                  />
                </Form.Item>
              </div>

              <div className="row align-items-start justify-content-between">
                <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                  <span className="text-black">
                    Nội dung
                    <span className="text-red-500">*</span>
                  </span>
                </p>
                <Form.Item
                  className="col-sm-12 col-md-7 mx-0 px-0"
                  name="content"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Nội dung không được để trống",
                    },
                  ]}
                  hasFeedback
                >
                  <TextArea
                    className="min-h-[150px]"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    placeholder="Nhập nội dung"
                  />
                </Form.Item>
              </div>
              <br />
              <Form.Item className="text-center">
                <Button
                  variant="contained"
                  className="w-full"
                  type="submit"
                  sx={{
                    height: "40px",
                  }}
                  startIcon={<AddIcon style={{ color: "#fff" }} />}
                >
                  {createMode ? "TẠO THÔNG BÁO" : ""}
                  {updateMode ? "CẬP NHẬT THÔNG BÁO" : ""}
                </Button>
                <div className="mt-3">
                  <button
                    className="w-full bg-black text-white"
                    type="button"
                    onClick={() => {
                      setCreateMode(false);
                      setUpdateMode(false);
                    }}
                    style={{
                      height: "40px",
                      fontWeight: "600",
                      borderRadius: "5px",
                    }}
                  >
                    HỦY BỎ
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="px-[5rem] w-full flex flex-row items-center justify-between">
        <div className="w-[35%] search">
          <TextField
            id="outlined-basic"
            className="w-full font-baloo-2"
            variant="outlined"
            placeholder="Nhập từ khóa tìm kiếm"
            sx={{
              bgcolor: "#fff",
              width: "80%",
              borderRadius: "4px",
              boxShadow: `0px 2px 1px -1px rgba(255, 182, 193, 0.2),
              0px 1px 1px 0px rgba(255, 182, 193, 0.14),
              0px 1px 3px 0px rgba(255, 182, 193, 0.12)`,
              "& .MuiOutlinedInput-root": {
                height: "40px", // Adjust the height as needed
                "& input": {
                  padding: "10px 14px", // Adjust padding to center the text vertically
                },
              },
              "& .MuiInputAdornment-root": {
                // marginRight: "4px", // Adjust margin to better align icon
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="w-[65%] flex flex-row items-center justify-end">
          <div className="dropdown">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                style={{ color: "grey" }}
              >
                Date
              </InputLabel>
              <Select
                labelId=""
                id=""
                label="Filter"
                value={statusFilteredDate}
                onChange={handleChangeFilteredDate}
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                }}
              >
                <MenuItem value="newest">Mới Nhất</MenuItem>
                <MenuItem value="oldest">Cũ Nhất</MenuItem>
              </Select>
            </FormControl>
            {isAdminRole() ? (
              <>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    style={{ color: "grey" }}
                  >
                    Status
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    label="Filter"
                    value={status}
                    onChange={handleChange}
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                    }}
                  >
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value={NotificationStatus.Active}>
                      {NotificationStatus.Active}
                    </MenuItem>
                    <MenuItem value={NotificationStatus.Updated}>
                      {NotificationStatus.Updated}
                    </MenuItem>
                    {/* <MenuItem value={NotificationStatus.Deleted}>
                  {NotificationStatus.Deleted}
                </MenuItem> */}
                  </Select>
                </FormControl>
              </>
            ) : (
              <></>
            )}
          </div>
          {isAdminRole() ? (
            <>
              <div className="ml-2">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleCreateMode(true);
                  }}
                  sx={{
                    height: "40px",
                  }}
                  startIcon={<AddIcon style={{ color: "#fff" }} />}
                >
                  TẠO THÔNG BÁO
                </Button>
                {/* <Button
            variant="contained"
            onClick={() => {}}
            sx={{
              height: "40px",
              marginLeft: "8px",
              background: "#000",
            }}
            startIcon={<AddIcon style={{ color: "#fff" }} />}
          >
            TẠO TAG MỚI
          </Button> */}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="px-[5rem] w-full">
        <h1
          className="w-full text-center mb-1 mt-1
                 text-[2rem] uppercase text-blue-700"
          style={{ fontWeight: "bolder" }}
        >
          Tất Cả Thông Báo
        </h1>
        {notifications
          .filter((x) => {
            if (status && status != "" && status != "all") {
              return (
                x.status?.trim().toLowerCase() == status.trim().toLowerCase()
              );
            }
            return true;
          })
          .sort((a, b) => {
            if (statusFilteredDate == "oldest") {
              return (
                new Date(a.createdAt ?? "").getTime() -
                new Date(b.createdAt ?? "").getTime()
              );
            }
            return (
              new Date(b.createdAt ?? "").getTime() -
              new Date(a.createdAt ?? "").getTime()
            );
          })
          .map((notification, index) => {
            const {
              id,
              title,
              subtitle,
              tagId,
              tagName,
              content,
              status,
              createdAt,
              updatedAt,
            } = notification;
            return (
              <div
                key={index}
                className={`mb-4 px-[15px] py-[10px] hover:bg-gray-200 
                ${unseenList.find((x: string) => x == id) ? "bg-yellow-100" : ""}`}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                {unseenList.find((x: string) => x == id) ? (
                  <>
                    <h5
                      className="w-full
                 text-[1rem] uppercase newNotification_alarm"
                      style={{ fontWeight: "bolder" }}
                    >
                      {"THÔNG BÁO MỚI"}
                    </h5>
                  </>
                ) : (
                  <></>
                )}
                <h1
                  className="w-full
                 text-[1.6rem] text-blue-500"
                  style={{ fontWeight: "bolder" }}
                >
                  {title}
                </h1>
                <h2
                  className="w-full
                 text-[1.2rem] text-blue-400"
                  style={{ fontWeight: "bolder" }}
                >
                  {subtitle}
                </h2>
                <p className="w-full text-gray-400">
                  Thời gian đăng:{" "}
                  <span className="inline-block text-black">
                    {formatDate.DD_MM_YYYY_Time(createdAt ?? "")}
                  </span>
                </p>
                <p className="text-justify">
                  <span className=" text-gray-400">Nội dung:</span>{" "}
                  {content && content?.length >= 150 ? (
                    <>
                      {!viewDetailList.find((x) => x == id) ? (
                        <>
                          {content?.substring(0, 150).trim() + "..."}{" "}
                          <span
                            className="text-white text-decoration-underline cursor-pointer
                        inline-block px-[5px] py-[1px] bg-blue-500
                        hover:bg-black"
                            style={{
                              fontWeight: "bolder",
                              borderRadius: "3px",
                            }}
                            onClick={() => {
                              if (!viewDetailList.find((x) => x == id)) {
                                setViewDetailList((viewDetailList) => [
                                  ...viewDetailList,
                                  id ?? "",
                                ]);
                              }
                            }}
                          >
                            Xem thêm
                          </span>
                        </>
                      ) : (
                        <>
                          {content}{" "}
                          <span
                            className="text-white text-decoration-underline cursor-pointer
                        inline-block px-[5px] py-[1px] bg-black
                        hover:bg-black"
                            style={{
                              fontWeight: "bolder",
                              borderRadius: "3px",
                            }}
                            onClick={() => {
                              var list: any = [...viewDetailList].filter(
                                (x) => x != id
                              );
                              setViewDetailList(list);
                            }}
                          >
                            Ẩn bớt
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    content
                  )}
                </p>
                {isAdminRole() ? (
                  <>
                    <p className="w-full capitalize text-gray-400">
                      Status:{" "}
                      <span
                        className={`inline-block ml-[3px] capitalize
                      ${status?.trim().toLowerCase() == NotificationStatus.Active.trim().toLowerCase() ? "text-green-500" : ""}
                      ${status?.trim().toLowerCase() == NotificationStatus.Updated.trim().toLowerCase() ? "text-blue-500" : ""}
                      ${status?.trim().toLowerCase() == NotificationStatus.Deleted.trim().toLowerCase() ? "text-red-600" : ""}
                      `}
                      >
                        {status}
                      </span>
                    </p>
                    {updatedAt && updatedAt != "" ? (
                      <>
                        <p className="w-full text-gray-400">
                          Thời gian cập nhật:{" "}
                          <span className="inline-block text-black">
                            {formatDate.DD_MM_YYYY_Time(updatedAt ?? "")}
                          </span>
                        </p>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="w-full mt-1">
                      <button
                        className="text-white"
                        type="submit"
                        style={{
                          fontSize: "15px",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          fontWeight: "bolder",
                          background: "#000",
                        }}
                        onClick={() => {
                          setUpdatedData(notification);
                          setUpdateMode(true);
                        }}
                      >
                        CẬP NHẬT
                      </button>
                      <button
                        className="text-white"
                        type="submit"
                        style={{
                          fontSize: "15px",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          fontWeight: "bolder",
                          background: "red",
                          marginLeft: "5px",
                        }}
                        onClick={() => {
                          Swal.fire({
                            title: `Bạn có chắc muốn xóa thông báo này?`,
                            // icon: "info",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "Xác nhận",
                            cancelButtonText: "Hủy bỏ",
                            allowOutsideClick: false,
                            focusConfirm: false,
                            confirmButtonColor: "red",
                            cancelButtonColor: "black",
                            showCloseButton: false,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteNotification(id ?? "");
                              sweetAlert.alertSuccess(
                                "Xoá thành công",
                                "",
                                2000,
                                "18"
                              );
                            }
                          });
                        }}
                      >
                        XÓA
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default NotificationPageComponent;
