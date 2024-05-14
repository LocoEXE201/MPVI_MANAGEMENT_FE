"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import SupplierComponent from "./SupplierPageComponent";

const SupplierPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <SupplierComponent/>
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default SupplierPageProvider;
