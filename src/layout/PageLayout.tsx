import React from "react";
import Footer from "../patterns/footer/Footer";
import Header from "../patterns/header/Header";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
