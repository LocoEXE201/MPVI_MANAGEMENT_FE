import { Metadata } from "next";
import OrderPageProvider from "./components/OrderPageProvider";
import MainLayout from "@/components/layouts";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function OrderManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <OrderPageProvider />
      </MainLayout>
    </>
  );
}
