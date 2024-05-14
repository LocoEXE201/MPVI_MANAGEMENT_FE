"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import LoginPageComponent from "./LoginPageComponent";
import GuestGuard from "@/guards/GuestGuard";
import { AppProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthGoogleContext";
import { useEffect } from "react";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import { PATH_AUTH } from "@/routes/paths";

const LoginPageProvider = (props: {}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        LOCALSTORAGE_CONSTANTS.CURRENT_PAGE,
        PATH_AUTH.login
      );
    }
  }, []);

  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthContextProvider>
            <GuestGuard>
              <LoginPageComponent />
            </GuestGuard>
          </AuthContextProvider>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default LoginPageProvider;
