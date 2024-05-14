"use client"
import { Metadata } from "next";
import CategoryPageProvider from "./components/CategoryPageProvider";
import MainLayout from "@/components/layouts";

const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function CategoryManagementPage() {
  return (
    <>
      <MainLayout metadata={metadata}>
        <CategoryPageProvider />
      </MainLayout>
    </>
  );
}
