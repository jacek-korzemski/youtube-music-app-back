import { NavLink } from "react-router-dom";
import { MainMenuWrapper } from "./Wrappers";

const MainMenu: React.FC = () => {
  return (
    <MainMenuWrapper>
      <li>
        <NavLink to="/new-clips" activeClassName="active">
          New clips
        </NavLink>
      </li>
      <li>
        <NavLink to="/channels" activeClassName="active">
          Channels
        </NavLink>
      </li>
      <li>
        <NavLink to="/top-clips" activeClassName="active">
          Top clips
        </NavLink>
      </li>
      <li>
        <NavLink to="/reviews" activeClassName="active">
          Reviews
        </NavLink>
      </li>
    </MainMenuWrapper>
  );
};

export default MainMenu;
