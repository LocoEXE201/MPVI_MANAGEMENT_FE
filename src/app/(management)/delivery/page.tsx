import { Metadata } from "next";
import DeliveryPageProvider from "./components/DeliveryPageProvider";

export const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function DeliveryManagementPage() {
  return (
    <>
      <DeliveryPageProvider />
    </>
  );
}
