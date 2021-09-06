import React from "react";
import { Link } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const MainMenu = () => {
  return (
    <MainMenuWrapper>
      <li>
        <Link to="/new-clips">New clips</Link>
      </li>
      <li>
        <Link to="/channels">Channels</Link>
      </li>
      <li>
        <Link to="/top-clips">Top clips</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
    </MainMenuWrapper>
  );
};

export default MainMenu;
