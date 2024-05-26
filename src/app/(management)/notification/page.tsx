import { Metadata } from "next";
import MainLayout from "@/components/layouts";
import NotificationPageProvider from "./components/OrderPageProvider";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Notification Management Page",
};

export default function NotificationManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <NotificationPageProvider />
      </MainLayout>
    </>
  );
}
