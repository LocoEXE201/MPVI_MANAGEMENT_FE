"use client"

import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/JWTContext";
import DashBoardComponent from "./DashBoardComponent";
import AuthGuard from "@/guards/AuthGuard";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import React from "react";
import { PATH_MAIN } from "@/routes/paths";

const Dashboard = (props: {}) => {
  React.useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem(
        LOCALSTORAGE_CONSTANTS.CURRENT_PAGE,
        PATH_MAIN.dashboard
      );
    }
  }, []);
  return (
    <AppProvider>
      <AuthProvider>
        <AuthGuard>
          <DashBoardComponent />
        </AuthGuard>
      </AuthProvider>
    </AppProvider>
  );
};

export default Dashboard;
