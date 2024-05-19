import { Metadata } from "next";
import MainLayout from "@/components/layouts";
import UserListComponent from "./components/UserProvider";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function OrderManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <UserListComponent/>
      </MainLayout>
    </>
  );
}
