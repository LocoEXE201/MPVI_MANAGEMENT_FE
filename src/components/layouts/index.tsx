import React from "react";
import MainLayoutComponent from "./layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayoutComponent>{children}</MainLayoutComponent>
    </>
  );
}
