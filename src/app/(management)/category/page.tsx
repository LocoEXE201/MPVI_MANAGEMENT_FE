import { Metadata } from "next";
import CategoryPageProvider from "./components/CategoryPageProvider";

export const metadata: Metadata = {
  title: "Loco. - Love Connection",
  description: "This is Loco. Category Management Page",
};

export default function CategoryManagementPage() {
  return (
    <>
      <CategoryPageProvider />
    </>
  );
}
