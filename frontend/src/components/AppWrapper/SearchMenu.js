import React from "react";
import { NavLink } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const SearchMenu = () => {
  return (
    <MainMenuWrapper>
      <li>
        <NavLink to={"/search"}>Search</NavLink>
      </li>
    </MainMenuWrapper>
  );
};

export default SearchMenu;
