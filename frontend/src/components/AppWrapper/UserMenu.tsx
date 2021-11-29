import React from "react";
import { NavLink } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const UserMenu = () => {
  return (
    <MainMenuWrapper>
      <li>
        <NavLink to={"/my-playlists"}>My playlists</NavLink>
      </li>
      <li>
        <NavLink to={"/my-reviews"}>My reviews</NavLink>
      </li>
    </MainMenuWrapper>
  );
};

export default UserMenu;
