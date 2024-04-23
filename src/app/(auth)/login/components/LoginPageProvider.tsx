"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import LoginPageComponent from "./LoginPageComponent";
import GuestGuard from "@/guards/GuestGuard";
import { AppProvider } from "@/contexts/AppContext";

const LoginPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <GuestGuard>
            <LoginPageComponent />
          </GuestGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default LoginPageProvider;
