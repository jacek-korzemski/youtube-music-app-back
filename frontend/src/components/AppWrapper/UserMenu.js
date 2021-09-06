import React from "react";
import { Link } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const UserMenu = () => {
  return (
    <MainMenuWrapper>
      <li>
        <Link to={"/my-playlists"}>My playlists</Link>
      </li>
      <li>
        <Link to={"/my-reviews"}>My reviews</Link>
      </li>
    </MainMenuWrapper>
  );
};

export default UserMenu;
