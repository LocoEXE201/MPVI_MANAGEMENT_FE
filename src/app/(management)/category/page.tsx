import { Metadata } from "next";
import CategoryPageProvider from "./components/CategoryPageProvider";

export const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Category Management Page",
};

export default function CategoryManagementPage() {
  return (
    <>
      <CategoryPageProvider />
    </>
  );
}
