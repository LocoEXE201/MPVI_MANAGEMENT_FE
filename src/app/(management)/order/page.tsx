import { Metadata } from "next";
import OrderPageProvider from "./components/OrderPageProvider";

export const metadata: Metadata = {
  title: "Loco. - Love Connection",
  description: "This is Loco. Category Management Page",
};

export default function OrderManagementPage() {
  return (
    <>
      <OrderPageProvider />
    </>
  );
}
