"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import CategoryPageComponent from "./CategoryPageComponent";

const CategoryPageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <CategoryPageComponent />
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default CategoryPageProvider;
