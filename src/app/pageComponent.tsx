"use client";

import Dashboard from "@/components/layouts/dashboard";
import HomePageProvider from "./pageProvider";

const HomePageComponent = (props: {}) => {
  return (
    <>
      <HomePageProvider />
      <div style={{  }}>
      </div>
    </>
  );
};

export default HomePageComponent;
