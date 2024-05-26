import { Metadata } from "next";
import ReportPageProvider from "./components/ReportPageProvider";
import MainLayout from "@/components/layouts";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function ReportManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <ReportPageProvider />
      </MainLayout>
    </>
  );
}
