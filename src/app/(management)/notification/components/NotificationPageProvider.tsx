"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import NotificationPageComponent from "./NotificationPageComponent";

const NotificationPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <div
              className="font-baloo-2"
              style={{ backgroundColor: "#F1F5F9" }}
            >
              <div
                className=" w-full h-full"
                style={{ backgroundColor: "#F1F5F9" }}
              >
                <NotificationPageComponent />
              </div>
            </div>
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default NotificationPageProvider;
