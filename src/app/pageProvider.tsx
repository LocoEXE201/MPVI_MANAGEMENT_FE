"use client";

import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/JWTContext";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import { AccountRoleCode } from "@/enums/accountRole";
import React, { useEffect, useState } from "react";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import { PATH_MAIN } from "@/routes/paths";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import MainLayoutComponent from "@/components/layouts/layout";
import SideBar from "@/components/layouts/sidebarComponent";
import SideBarComponent from "@/components/layouts/sidebarComponent/SideBarComponent";
import MainLayout from "@/components/layouts";
import CategoryManagementPage from "./(management)/category/page";
import OrderManagementPage from "./(management)/order/page";
import { Metadata } from "next";
import DashBoardComponent from "./(management)/dashboard/components/DashBoardComponent";


interface HomePageProviderProps {
  metadata: Metadata;
}

const HomePageProvider: React.FC<HomePageProviderProps> = ({ metadata }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE);
    }
  }, []);

  // const [currentPage, setCurrentPage] = useState(PATH_MAIN.root)

  // const handleCategoryClick = () => {
  //   setCurrentPage(PATH_MAIN.category)
  // }

  return (
    //   <AppProvider>
    //     <MainLayoutComponent>
    //       {/* <Dashboard /> */}
    //       {/* {currentPage === PATH_MAIN.category && <Category />} */}
    //       {/* <Order /> */}
    //      <Category />
    //     </MainLayoutComponent>
    //   </AppProvider>
    <AppProvider>
      <AuthProvider>
        <AuthGuard>
          <RoleBasedGuard
            accessibleRoles={[
              AccountRoleCode.SUPER_ADMIN,
              AccountRoleCode.ECONOMIC_LEAD,
              AccountRoleCode.WAREHOUSE_MANAGER,
            ]}
          >
            <MainLayout metadata={metadata}>
              <DashBoardComponent />
              
            </MainLayout>
          </RoleBasedGuard>
        </AuthGuard>
      </AuthProvider>
    </AppProvider>
  );
};

export default HomePageProvider;
{
}
