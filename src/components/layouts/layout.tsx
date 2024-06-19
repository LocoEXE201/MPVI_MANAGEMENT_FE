"use client";
import { AppProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthGoogleContext";
import { AuthProvider } from "@/contexts/JWTContext";
import React from "react";
import SideBar from "./sidebarComponent";
import NavBar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProtectData from "@/hooks/useProtectData";

export default function MainLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  useProtectData();

  return (
    <AppProvider>
      <AuthProvider>
        <AuthContextProvider>
          <div className="flex h-full min-h-screen">
            <SideBar />
            <div className="flex flex-col flex-1 min-h-screen">
              <NavBar />
              <main className="min-h-screen">{children}</main>
            </div>
          </div>
          <ToastContainer />
        </AuthContextProvider>
      </AuthProvider>
    </AppProvider>
  );
}
