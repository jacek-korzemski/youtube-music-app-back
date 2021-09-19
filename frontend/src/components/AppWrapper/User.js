import React, { useContext, useState } from "react";
import { AppContext } from "components/AppWrapper/AppWrapper";
import { UserWrapper } from "./Wrappers";
import LoginMenu from "./LoginMenu";
import { api_url } from "Config";
import EditProfile from "components/UserProfile/Edit";
import Loading from "components/Loading/Loading";

const User = () => {
  const user = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const tryToLogout = () => {
    setLoading(true);
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
      .then(() => {
        user.addAlert("Successfully loged out!");
        setLoading(false);
      })
      .catch((err) => {
        user.setUser(false);
        user.addAlert("Successfully loged out!");
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {user?.user ? (
        <>
          {loading ? (
            <div style={{ width: "200px", height: "119px" }}>
              <Loading />
            </div>
          ) : (
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
                  <li className="profile" onClick={() => user.setModal(<EditProfile userId={user.user.id} />)}>
                    Profile
                  </li>
                  <li className="logout" onClick={() => tryToLogout()}>
                    Log out
                  </li>
                </ul>
              </div>
            </UserWrapper>
          )}
        </>
      ) : (
        <LoginMenu />
      )}
    </>
  );
};

export default User;
