"use client";

import authApi from "@/api/auth/authApi";
import Loading from "@/components/Loading/Loading";
import useAppContext from "@/hooks/useAppContext";
import { PATH_AUTH } from "@/routes/paths";
import { ResponseDTO } from "@/types/responseDTO";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LoginForgotPasswordComponent: NextPage = () => {
  const router = useRouter();
  const params = useParams();
  const email = params.email as string;
  const [userEmail, setUserEmail] = useState<string>("");
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
      password: "",
    },
    onSubmit: (values) => {
      const { code, password } = values;
      enableLoading();
      authApi
        .confirmResetPassCode(userEmail, code, password)
        .then((response) => {
          disableLoading();
          var res: ResponseDTO = response.data;
          if (res.isSuccess) {
            Swal.fire({
              title: `Đặt lại mật khẩu thành công`,
              icon: "success",
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: "Bấm vào đây để đăng nhập",
              allowOutsideClick: false,
              focusConfirm: true,
              confirmButtonColor: "green",
              showCloseButton: false,
            }).then((result) => {
              router.push(PATH_AUTH.login);
            });
          }
          if (!res.isSuccess) {
            Swal.fire({
              title: `Mã xác nhận không đúng`,
              html: "Xin bạn vui lòng kiểm tra lại mã xác nhận trong email và nhập lại lần nữa.",
              icon: "info",
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: "Xác nhận",
              allowOutsideClick: false,
              focusConfirm: true,
              confirmButtonColor: "#3085d6",
              showCloseButton: true,
            });
          }
        })
        .catch((err) => {
          disableLoading();
          console.log(err);
        })
        .finally(() => {
          disableLoading();
        });
    },
  });

  const sendCodeForgotPassword: any = (email: string) => {
    authApi
      .sendCodeForgotPassword(email)
      .then((response) => {
        var res: ResponseDTO = response.data;
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (userEmail == "") {
      var userEmailFormat = `${email.split("%40")[0]}@${email.split("%40")[1]}`;
      setUserEmail(userEmailFormat);
    }
    if (userEmail != "") {
      sendCodeForgotPassword(userEmail);
    }
  }, [userEmail]);

  if (userEmail == "") return <></>;

  return (
    <section className="w-screen h-screen">
      <Loading loading={isLoading} />
      <div
        className="font-baloo-2 h-full flex flex-row justify-center items-center"
        style={{ width: "50vw", margin: "0 auto" }}
      >
        <Form
          onFinish={formik.handleSubmit}
          form={form}
          size="large"
          autoComplete="off"
          className="w-full"
        >
          <h1
            className="font-baloo text-primay text-center"
            style={{ fontSize: "3rem", fontWeight: "bolder" }}
          >
            Đặt Lại Mật Khẩu
          </h1>
          <p className="text-center font-baloo-2 text-[1.2rem]">
            Chúng tôi vừa gửi một mã xác nhận đến email của bạn:<br></br>
            <strong>{userEmail}</strong>
            <br></br>
            Bạn vui lòng kiểm tra email và nhập mã xác nhận cùng mật khẩu mới
            bên dưới đây.<br></br>
            Trong trường hợp bạn chưa nhận được mã xác nhận, bạn vui lòng{" "}
            <a
              className="links_hover text-primay font-medium"
              onClick={() => {
                sendCodeForgotPassword(userEmail);
                enableLoading();
                setTimeout(() => {
                  disableLoading();
                  setTimeout(() => {
                    Swal.fire({
                      html: `Chúng tôi vừa gửi một mã xác nhận mới đến email của bạn.
                    Bạn vui lòng kiểm tra và tiếp tục nhập mã xác nhận để cài lại mật khẩu.`,
                      showCancelButton: false,
                      confirmButtonText: "Xác nhận",
                      confirmButtonColor: "#3085d6",
                      focusConfirm: true,
                      allowOutsideClick: false,
                    });
                  }, 200);
                }, 500);
              }}
            >
              {" "}
              bấm vào đây{" "}
            </a>{" "}
            để được gửi lại mã xác nhận mới vào email.
            <br></br>
          </p>

          <div className="row align-items-start justify-content-between">
            <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
              <span>
                Mã xác nhận
                <span className="text-red-500">*</span>
              </span>
            </p>
            <Form.Item
              className="col-sm-12 col-md-7 mx-0 px-0"
              name="code"
              label=""
              rules={[
                {
                  required: true,
                  message: "Mã xác nhận không được bỏ trống",
                },
              ]}
              hasFeedback
            >
              <Input
                name="code"
                type="text"
                value={formik.values.code}
                onChange={formik.handleChange}
                placeholder="Nhập mã xác nhận"
              />
            </Form.Item>{" "}
          </div>

          <div className="row align-items-start justify-content-between">
            <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
              <span className="text-black">
                Mật khẩu
                <span className="text-red-500">*</span>
              </span>
            </p>
            <Form.Item
              className="col-sm-12 col-md-7 mx-0 px-0"
              name="password"
              label=""
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
                {
                  min: 8,
                  message: "Mật khẩu phải có độ dài từ 8 đến 20 kí tự",
                },
                {
                  max: 20,
                  message: "Mật khẩu phải có độ dài từ 8 đến 20 kí tự",
                },
                // {
                //   pattern: /[a-zA-Z]/,
                //   message: "Mật khẩu phải có ít nhất 1 kí tự chữ",
                // },
                {
                  pattern: /[A-Z]/,
                  message: "Mật khẩu phải có ít nhất 1 kí tự chữ in hoa",
                },
                {
                  pattern: /\d/,
                  message: "Mật khẩu phải có ít nhất 1 kí tự số",
                },
                {
                  pattern: /[^a-zA-Z\d]/,
                  message:
                    "Mật khẩu phải có ít nhất 1 kí tự đặc biệt (!, @, #, $, %, ^, &, *,...)",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
          </div>

          <div className="row align-items-start justify-content-between">
            <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
              <span>
                Xác nhận mật khẩu
                <span className="text-red-500">*</span>
              </span>
            </p>
            <Form.Item
              className="col-sm-12 col-md-7 mx-0 px-0"
              name="confirm_password"
              label=""
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Mật khẩu xác nhận không được bỏ trống",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Mật khẩu xác nhận không khớp với mật khẩu đã nhập"
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                name="confirm_password"
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>
          </div>

          <Form.Item className="text-center">
            <button
              type="submit"
              className="hover:bg-yellow-600 text-white bg-primay mt-3 box-border flex w-full max-w-full flex-1 cursor-pointer flex-row items-start justify-center overflow-hidden whitespace-nowrap rounded-md bg-primary-colour px-5 py-[10px] [border:none]"
            >
              <div className="font-barlow relative mt-0 flex w-full items-center justify-center text-center text-lg font-medium text-neutral-white">
                Xác Nhận Cài Lại Mật Khẩu Mới
              </div>
            </button>
            <button
              type="button"
              className="hover:bg-yellow-600 text-white bg-black mt-3 box-border flex w-full max-w-full flex-1 cursor-pointer flex-row items-start justify-center overflow-hidden whitespace-nowrap rounded-md bg-primary-colour px-5 py-[10px] [border:none]"
              onClick={() => {
                Swal.fire({
                  title: `Bạn có chắc muốn tạm dừng việc cài đặt lại mật khẩu?`,
                  icon: "warning",
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "Không, tiếp tục",
                  cancelButtonText: "Có, quay lại",
                  allowOutsideClick: false,
                  focusConfirm: true,
                  cancelButtonColor: "red",
                  confirmButtonColor: "green",
                  showCloseButton: false,
                }).then((result) => {
                  if (result.isDenied === true || result.isDismissed === true) {
                    router.push(PATH_AUTH.login);
                  }
                });
              }}
            >
              <div className="font-barlow relative mt-0 flex w-full items-center justify-center text-center text-lg font-medium text-neutral-white">
                Quay lại
              </div>
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
export default LoginForgotPasswordComponent;
