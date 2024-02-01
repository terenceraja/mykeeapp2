import React from "react";
import { Outlet } from "react-router-dom";
import NavBarMobile from "../../components/NavBarMobile/NavBarMobile";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <NavBarMobile />
    </>
  );
};

export default Layout;
