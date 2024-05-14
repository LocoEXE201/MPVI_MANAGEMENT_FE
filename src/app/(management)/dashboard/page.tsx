import { Metadata } from "next";
import MainLayout from "@/components/layouts";
import Dashboard from "./DashboardProvider";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function DashboardManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <Dashboard/>
      </MainLayout>
    </>
  );
}
