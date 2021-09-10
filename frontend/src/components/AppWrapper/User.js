import React, { useContext } from "react";
import { UserContext } from "components/AppWrapper/AppWrapper";
import { UserWrapper } from "./Wrappers";
import LoginMenu from "./LoginMenu";

const User = (props) => {
  const user = useContext(UserContext);

  return (
    <>
      {user ? (
        <UserWrapper>
          <div className="left">
            <div className="image-wrapper">
              <img src={props.image} alt="user avatar" />
            </div>
          </div>
          <div className="right">
            <div className="username" title={props.username}>
              {props.username}
            </div>
            <ul className="user-navigation">
              <li className="notifications">Notifications {props.notifications && <>({props.notifications.length})</>}</li>
              <li className="profile">Profile</li>
            </ul>
          </div>
        </UserWrapper>
      ) : (
        <LoginMenu />
      )}
    </>
  );
};

export default User;
