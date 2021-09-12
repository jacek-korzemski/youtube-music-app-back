import React, { useContext } from "react";
import { AppContext } from "components/AppWrapper/AppWrapper";
import { UserWrapper } from "./Wrappers";
import LoginMenu from "./LoginMenu";
import { api_url } from "Config";

const User = (props) => {
  const user = useContext(AppContext);

  console.log(user);

  const tryToLogout = () => {
    const formData = new FormData();

    formData.append("userId", user.user.id);
    formData.append("token", user.user.token);

    fetch(api_url + "/logout", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sorry, something went wrong...");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        sessionStorage.removeItem("user");
        user.setUser(false);
      })
      .then(() => {
        user.setModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user?.user ? (
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
              <li className="logout" onClick={() => tryToLogout()}>
                Log out
              </li>
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
