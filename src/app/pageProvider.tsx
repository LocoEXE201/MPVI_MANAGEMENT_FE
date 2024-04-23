"use client";

import { AppProvider } from "@/contexts/AppContext";
import HomePageComponent from "./pageComponent";
import { AuthProvider } from "@/contexts/JWTContext";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import { AccountRoleCode } from "@/enums/accountRole";

const HomePageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          {/* <AuthGuard> */}
          {/* <RoleBasedGuard
              accessibleRoles={[
                AccountRoleCode.MPVI_SUPER_ADMIN,
                AccountRoleCode.MPVI_ECONOMIC_LEAD,
                AccountRoleCode.MPVI_WAREHOUSE_MANAGER,
              ]}
            > */}
          <HomePageComponent />
          {/* </RoleBasedGuard> */}
          {/* </AuthGuard> */}
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default HomePageProvider;
