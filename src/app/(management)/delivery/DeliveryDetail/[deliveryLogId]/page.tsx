"use client";
import { Metadata } from "next";
import DeliveryDetailPageProvider from "./DeliveryDetailPageProvider";
import MainLayout from "@/components/layouts";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function CategoryManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <DeliveryDetailPageProvider />
      </MainLayout>
    </>
  );
}
