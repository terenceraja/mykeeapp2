// REACT
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { NavBarData } from "../data/NavBarData.jsx";

//REDUCERS
import { clearStore } from "../reducers/primaryKeys";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navList = NavBarData.map((item, key) => {
    return (
      <li key={key} className="nav_row">
        <NavLink className="link" to={item.path}>
          <img src={item.icon} className="icons" alt="navLogo" />
          {item.icon}

          <h2>{item.label}</h2>
        </NavLink>
      </li>
    );
  });

  return (
    <nav className={styles.nav_Bar}>
      <ul className={styles.nav_rows_container}>{navList}</ul>
    </nav>
  );
};

export default NavBar;
