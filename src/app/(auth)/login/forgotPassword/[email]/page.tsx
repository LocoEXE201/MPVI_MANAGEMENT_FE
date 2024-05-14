"use client";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/JWTContext";
import LoginForgotPasswordComponent from "./LoginForgotPasswordComponent";

const ResetPasswordProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <LoginForgotPasswordComponent />
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default ResetPasswordProvider;
