"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import LoginPageComponent from "./LoginPageComponent";
import GuestGuard from "@/guards/GuestGuard";
import { AppProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthGoogleContext";

const LoginPageProvider = (props: {}) => {
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
