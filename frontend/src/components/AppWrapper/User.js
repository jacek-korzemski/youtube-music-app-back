import React from "react";
import { UserWrapper } from "./Wrappers";

const User = (props) => {
  return (
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
  );
};

export default User;
