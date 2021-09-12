import React, { useContext } from "react";
import { MainMenuWrapper } from "./Wrappers";
import { AppContext } from "./AppWrapper";
import LoginModal from "./LoginModal";

const SearchMenu = () => {
  const user = useContext(AppContext);

  return (
    <MainMenuWrapper>
      <li>
        <span className="link-like" onClick={() => user.setModal(<LoginModal />)}>
          Login
        </span>
      </li>
      <li>
        <span className="link-like">Register</span>
      </li>
    </MainMenuWrapper>
  );
};

export default SearchMenu;
