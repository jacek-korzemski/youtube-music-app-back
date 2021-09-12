import React, { useContext } from "react";
import { AppContext } from "components/AppWrapper/AppWrapper";
import { UserWrapper } from "./Wrappers";
import LoginMenu from "./LoginMenu";
import { api_url } from "Config";

const User = () => {
  const user = useContext(AppContext);

  const tryToLogout = () => {
    const formData = new FormData();

    formData.append("userId", user.user.userId);
    formData.append("token", user.user.tokenHash);

    fetch(api_url + "/logout", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sorry, something went wrong...");
        } else {
          return res.json();
        }
      })
      .then(() => {
        user.setUser(false);
      })
      .then(() => sessionStorage.removeItem("user"))
      .catch((err) => {
        user.setUser(false);
        console.log(err);
      });
  };

  return (
    <>
      {console.log(user)}
      {user?.user ? (
        <UserWrapper>
          <div className="left">
            <div className="image-wrapper">
              <div style={{ width: "64px", height: "64px", background: "grey" }}></div>
            </div>
          </div>
          <div className="right">
            <div className="username" title={"username"}>
              Username
            </div>
            <ul className="user-navigation">
              <li className="notifications">Notifications</li>
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
