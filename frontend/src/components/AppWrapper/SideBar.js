import React from "react";
import { Link } from "react-router-dom";
// import User from "./User";
import MainMenu from "./MainMenu";
// import SearchMenu from "./SearchMenu";
// import UserMenu from "./UserMenu";
import TermsMenu from "./TermsMenu";
import { SideBarWrapper, Title, Divider } from "./Wrappers";

// temporary
// import userimage from "assets/temp.user.png";

const SideBar = () => {
  return (
    <SideBarWrapper>
      <Title>
        <Link to={"/"}>Metal Catalogue</Link>
      </Title>
      {/* <Divider />
      <User image={userimage} username={"Jacek"} /> */}
      <Divider />
      <MainMenu />
      <Divider />
      {/* <SearchMenu />
      <Divider />
      <UserMenu />
      <Divider /> */}
      <TermsMenu />
    </SideBarWrapper>
  );
};

export default SideBar;
