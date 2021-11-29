import React, { useContext } from "react";
import { MainMenuWrapper } from "./Wrappers";
import { AppContext } from "./AppWrapper";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const SearchMenu: React.FC = () => {
  const user = useContext(AppContext);

  return (
    <MainMenuWrapper>
      <li>
        <span className="link-like" onClick={() => user.setModal && user.setModal(<LoginModal />)}>
          Login
        </span>
      </li>
      <li>
        <span className="link-like" onClick={() => user.setModal && user.setModal(<RegisterModal />)}>
          Register
        </span>
      </li>
    </MainMenuWrapper>
  );
};

export default SearchMenu;
