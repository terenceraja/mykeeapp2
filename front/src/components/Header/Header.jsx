import React from "react";
import "./Header.css";
import mvt from "../../assets/mvt.svg";
import logo from "../../assets/kslogo.png";

const Header = () => {
  return (
    <header className="header_mobile">
      <img src={logo} className="logo" alt="navLogo" />
      <img src={mvt} className="icons_mobile" alt="navLogo" />
    </header>
  );
};

export default Header;
