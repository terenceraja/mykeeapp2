// REACT
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { NavBarData } from "../../data/NavBarData";
//REDUCERS
import { clearStore } from "../../reducers/primaryKeys";

import "./NavBarMobile.css";
const NavBarMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navList = NavBarData.map((item, key) => {
    return (
      <li key={key}>
        <NavLink className="link_mobile" to={item.path}>
          <img src={item.icon} className="icons_mobile" alt="navLogo" />
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="nav_mobile">
      <ul className="nav_rows_container_mobile">{navList}</ul>
    </nav>
  );
};

export default NavBarMobile;
