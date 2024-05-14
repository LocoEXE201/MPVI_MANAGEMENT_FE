import { Metadata } from "next";
import OrderPageProvider from "./components/OrderPageProvider";

export const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function OrderManagementPage() {
  return (
    <>
      <OrderPageProvider />
    </>
  );
}
