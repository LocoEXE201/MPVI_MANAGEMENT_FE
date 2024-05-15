"use client";
import { Metadata } from "next";
import DeliveryPageProvider from "./components/DeliveryPageProvider";
import MainLayout from "@/components/layouts";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function CategoryManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <DeliveryPageProvider />
      </MainLayout>
    </>
  );
}
