import { Metadata } from "next";
import HomePageProvider from "./pageProvider";

export const metadata: Metadata = {
  title: "Loco. - Love Connection",
  description: "This is Loco. Landing Page",
};

export default function Home() {
  return (
    <>
      <HomePageProvider />
    </>
  );
}
