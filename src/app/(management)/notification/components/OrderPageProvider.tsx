"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import NotificationPageComponent from "./OrderPageComponent";

const NotificationPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <NotificationPageComponent />
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default NotificationPageProvider;
