"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import DeliveryPageComponent from "./DeliveryPageComponent";

const DeliveryPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <DeliveryPageComponent />
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default DeliveryPageProvider;
