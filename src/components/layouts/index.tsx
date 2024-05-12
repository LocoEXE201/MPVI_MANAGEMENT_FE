import React from "react";
import MainLayoutComponent from "./layout";
import { Metadata } from "next";

export default function MainLayout({
  children, metadata
}: {
  children: React.ReactNode;
  metadata: Metadata
}) {
  return (
    <>
      <MainLayoutComponent>{children}</MainLayoutComponent>
    </>
  );
}
