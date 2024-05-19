"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import GuestGuard from "@/guards/GuestGuard";
import useAuth from "@/hooks/useAuth";
import useAppContext from "@/hooks/useAppContext";
import Swal from "sweetalert2";
import { useAuthGoogle } from "@/contexts/AuthGoogleContext";
import LoginFrame from "./LoginFrame";
import Welcomeframe from "./welcomeframe";
import { PATH_AUTH } from "@/routes/paths";
import Loading from "@/components/Loading/Loading";

const LoginPageComponent = (props: {}) => {
  const router = useRouter();
  const formItemLayout = {};
  const [form] = Form.useForm();
  const { login, loginWithEmail } = useAuth();
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const { googleSignIn, user, logOut } = useAuthGoogle();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logOut();
  }, []);

  useEffect(() => {
    if (user?.email && localStorage.getItem("GOOGLE_AUTH_USING")) {
      enableLoading();
      loginWithEmail(user?.email);
    } else if (user?.email && !localStorage.getItem("GOOGLE_AUTH_USING")) {
      logOut();
    }
    localStorage.removeItem("GOOGLE_AUTH_USING");
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  const handleForgetPassword = () => {
    Swal.fire({
      title: `Đặt lại mật khẩu`,
      html: `Xin bạn vui lòng điền địa chỉ email của tài khoản bạn vào phần dưới đây.`,
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy bỏ",
      focusConfirm: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: (login) => {},
    }).then((result) => {
      if (result.isConfirmed) {
        enableLoading();
        if (result.value && result.value != "") {
          router.push(PATH_AUTH.loginForgotPassword(result.value));
        }
      }
    });
  };

  return (
    <GuestGuard>
      <Loading loading={isLoading} />
      <div className="font-baloo-2 text-lightslategray mq800:gap-[0px_24px] mq1325:flex-wrap relative flex w-full min-w-full flex-row items-start justify-start gap-[0px_49px] overflow-hidden bg-neutral-white text-left text-base tracking-[normal]">
        <Welcomeframe propMargin="0" />
        <div className="min-h-screen justify-center mq800:pt-[31px] mq800:box-border mq800:min-w-full mq1325:flex-1 mq1125:pt-12 mq1125:box-border box-border flex w-[632px] min-w-[632px] max-w-full flex-col items-start px-0 pb-0 pt-[20px]">
          <div className="mq800:flex-wrap mq800:gap-[0px_38px] mq450:gap-[0px_19px] flex max-w-full flex-row items-start justify-start gap-[0px_76px] self-stretch">
            <div className="box-border flex max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-px">
              <div className="mq450:gap-[49px_0px] flex max-w-full flex-col items-start justify-start gap-[5px_0px] self-stretch">
                <div className="text-dimgray-300 box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-[33px] pr-0">
                  <div className="flex max-w-full flex-1 flex-col items-end justify-start gap-[10px_0px]">
                    <div className="flex max-w-full flex-col items-start justify-start gap-[16px_0px] self-stretch">
                      <LoginFrame registerIndividualAccount="Đăng Nhập Tài Khoản Quản Lý" />
                      <div className="border-whitesmoke-100 relative box-border h-px self-stretch border-t-[1px] border-solid" />
                    </div>
                    <Form
                      onFinish={formik.handleSubmit}
                      {...formItemLayout}
                      form={form}
                      size="large"
                      autoComplete="off"
                      className="w-full"
                    >
                      <div className="row align-items-start justify-content-between">
                        <p className="text-lightslategray relative self-stretch pb-1 text-lg font-medium leading-[28px]">
                          <span className="text-black">
                            Email
                            <span className="text-red-500">*</span>
                          </span>
                        </p>
                        <Form.Item
                          className="col-sm-12 col-md-7 mx-0 px-0"
                          name="email"
                          label=""
                          rules={[
                            {
                              required: true,
                              message: "Email không được để trống",
                            },
                            {
                              type: "email",
                              message: "Email không đúng định dạng",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input
                            id="input_email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Nhập email"
                          />
                        </Form.Item>
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

                      <Form.Item className="text-center">
                        <div>
                          <p
                            className="text-yellow-600 cursor-pointer text-end"
                            style={{ fontWeight: "bolder" }}
                            onClick={() => {
                              handleForgetPassword();
                            }}
                          >
                            Quên mật khẩu?
                          </p>
                        </div>
                        <button
                          type="submit"
                          style={{ fontWeight: "bolder" }}
                          className="hover:bg-yellow-600 bg-primary text-white mt-3 box-border flex w-full max-w-full flex-1 cursor-pointer flex-row items-start justify-center overflow-hidden whitespace-nowrap rounded-md bg-primary-colour px-5 py-[21px] [border:none]"
                        >
                          <div className="text-[1.6rem] font-baloo-2 relative mt-0 flex w-full items-center justify-center text-center text-lg font-medium text-neutral-white">
                            Đăng Nhập
                          </div>
                        </button>
                      </Form.Item>
                    </Form>
                    <div className="text-silver-200 mq450:flex-wrap mq450:gap-[0px_17px] flex flex-row items-end justify-center gap-[0px_35px] self-stretch text-center text-xs">
                      <div className="box-border flex h-1.5 min-w-[112px] flex-1 flex-col items-start justify-start px-0 pb-1.5 pt-0">
                        <div className="border-gray-800 relative box-border h-px self-stretch border-t-[1px] border-solid" />
                      </div>
                      <div className="text-[1.3rem] mq450:w-full mq450:h-3 relative flex w-3 items-center justify-center">
                        Hoặc
                      </div>
                      <div className="box-border flex h-1.5 min-w-[112px] flex-1 flex-col items-start justify-start px-0 pb-1.5 pt-0">
                        <div className="border-gray-800 relative box-border h-px self-stretch border-t-[1px] border-solid" />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        localStorage.setItem("GOOGLE_AUTH_USING", "true");
                        handleGoogleSignIn();
                      }}
                      className="hover:bg-gray-200 text-neutral-black mq450:gap-[0rem_2.313rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border box-border flex w-full max-w-full cursor-pointer flex-row items-center justify-center gap-[0rem_1rem] self-stretch rounded-md bg-neutral-white px-[2.688rem] pb-[1.188rem] pt-[1.313rem] mt-5 text-center shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)]"
                    >
                      <div className="cursor-pointer box-border flex flex-row items-center justify-center px-[0rem] pb-[0rem] pt-[0.125rem]">
                        <img
                          className="relative z-[1] h-[1.5rem] min-h-[1.5rem] w-[1.5rem] shrink-0 overflow-hidden"
                          loading="lazy"
                          alt=""
                          src="/Icons/google_icon.svg"
                        />
                        <div className="text-[1.3rem] relative z-[1] w-full self-stretch pl-5 font-medium font-baloo-2">
                          Đăng Nhập Với Google
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
};

export default LoginPageComponent;
