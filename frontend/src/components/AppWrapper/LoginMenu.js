import React from "react";
import { NavLink } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const SearchMenu = () => {
  return (
    <MainMenuWrapper>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register</NavLink>
      </li>
    </MainMenuWrapper>
  );
};

export default SearchMenu;
