import { Metadata } from "next";
import HomePageProvider from "./pageProvider";

export const metadata: Metadata = {
  title: "Loco. - Quản Lý",
  description: "This is Loco. Landing Page",
};

export default function Home() {
  return (
    <>
      <HomePageProvider metadata={metadata} />
    </>
  );
}
