import React from "react";
import { Link } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const SearchMenu = () => {
  return (
    <MainMenuWrapper>
      <li>
        <Link to={"/search"}>Search</Link>
      </li>
    </MainMenuWrapper>
  );
};

export default SearchMenu;
