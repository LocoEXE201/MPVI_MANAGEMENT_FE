"use client";
import { Metadata } from "next";
import MainLayout from "@/components/layouts";
import UserListComponent from "./components/UserProvider";
import useProtectData from "@/hooks/useProtectData";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. User Management Page",
};

const UserManagementPage = (props: {}) => {
  useProtectData();
  return (
    <>
      <MainLayout metadata={metadata}>
        <UserListComponent />
      </MainLayout>
    </>
  );
};

export default UserManagementPage;
