import { Metadata } from "next";
import MainLayout from "@/components/layouts";
import SupplierPageProvider from "./components/SupplierPageProvider";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function OrderManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <SupplierPageProvider/>
      </MainLayout>
    </>
  );
}
