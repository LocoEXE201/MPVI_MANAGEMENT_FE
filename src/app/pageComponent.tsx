"use client";

import HomePageProvider from "./pageProvider";

const HomePageComponent = (props: {}) => {
  return (
    <>
      <HomePageProvider />
      <div style={{ minHeight: "100vh" }}>Main Content Here</div>
    </>
  );
};

export default HomePageComponent;
