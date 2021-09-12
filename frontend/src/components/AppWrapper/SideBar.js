import React, { useContext } from "react";
import { Link } from "react-router-dom";
import User from "./User";
import MainMenu from "./MainMenu";
import SearchMenu from "./SearchMenu";
import UserMenu from "./UserMenu";
import TermsMenu from "./TermsMenu";
import { SideBarWrapper, Title, Divider } from "./Wrappers";
import { AppContext } from "./AppWrapper";

// temporary
import userimage from "assets/temp.user.png";

const SideBar = () => {
  const user = useContext(AppContext);

  return (
    <SideBarWrapper>
      <Title>
        <Link to={"/"}>Metal Catalogue</Link>
      </Title>
      <Divider />
      <User image={userimage} username={"Jacek"} />
      <Divider />
      <MainMenu />
      <Divider />
      <SearchMenu />
      <Divider />
      {user?.user && (
        <>
          <UserMenu />
          <Divider />
        </>
      )}

      <TermsMenu />
    </SideBarWrapper>
  );
};

export default SideBar;
