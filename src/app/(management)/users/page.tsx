"use client";
import { Metadata } from "next";
import MainLayout from "@/components/layouts";
import UserListComponent from "./components/UserProvider";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. User Management Page",
};

const UserManagementPage = (props: {}) => {
  return (
    <>
      <MainLayout metadata={metadata}>
        <UserListComponent />
      </MainLayout>
    </>
  );
};

export default UserManagementPage;
