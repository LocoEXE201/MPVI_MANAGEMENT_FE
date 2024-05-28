"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import ReportPageComponent from "./ReportPageComponent";

const ReportPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <ReportPageComponent />
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default ReportPageProvider;
