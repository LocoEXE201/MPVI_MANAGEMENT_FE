import { Metadata } from "next";
import LoginPageProvider from "./components/LoginPageProvider";

export const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Login Page",
};

export default function LoginPage() {
  return (
    <>
      <LoginPageProvider />
    </>
  );
}
