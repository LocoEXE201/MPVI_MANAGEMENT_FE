"use client";

import { AppProvider } from "@/contexts/AppContext";
import HomePageComponent from "./pageComponent";
import { AuthProvider } from "@/contexts/JWTContext";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import { AccountRoleCode } from "@/enums/accountRole";
import MainLayout from "@/components/layouts";
import { useEffect } from "react";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import { PATH_MAIN } from "@/routes/paths";

const HomePageProvider = (props: {}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE);
    }
  }, []);

  return (
    <>
      {/* <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <RoleBasedGuard
              accessibleRoles={[
                AccountRoleCode.SUPER_ADMIN,
                AccountRoleCode.ECONOMIC_LEAD,
                AccountRoleCode.WAREHOUSE_MANAGER,
              ]}
            >
              <MainLayout>
                <div>Main content here</div>
                <HomePageComponent />
              </MainLayout>
            </RoleBasedGuard>
          </AuthGuard>
        </AuthProvider>
      </AppProvider> */}
      <MainLayout>
        <div>Test main layout</div>
      </MainLayout>
    </>
  );
};

export default HomePageProvider;
