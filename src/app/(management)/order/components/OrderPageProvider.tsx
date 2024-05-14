"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import OrderPageComponent from "./OrderPageComponent";

const OrderPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <OrderPageComponent />
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default OrderPageProvider;
