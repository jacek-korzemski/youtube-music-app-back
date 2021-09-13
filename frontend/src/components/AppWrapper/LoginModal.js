import React, { useContext, useState } from "react";
import { LoginModalWrapper } from "./Wrappers";
import { AppContext } from "./AppWrapper";
import Button from "components/Button/Button";
import { api_url } from "Config";

const LoginModal = () => {
  const user = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tryToLogin = async () => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    await fetch(api_url + "/login", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sorry, something went wrong...");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        user.setUser(res.data);
      })
      .then(() => {
        user.setModal(false);
      })
      .then(() => {
        user.addAlert("Successfully loged in!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginModalWrapper>
      <span
        className="close-icon"
        onClick={() => {
          user.setModal(false);
        }}
      >
        [X]
      </span>
      <form autoComplete="new-password">
        <h2>Log in</h2>
        <hr />
        <p>Login:</p>
        <input type="text" name="login" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Password:</p>
        <input type="password" name="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="hidden" style={{ display: "none" }} />
        <p className="buttons-wrapper">
          <Button type="button" onClick={() => tryToLogin()}>
            Login
          </Button>
          <Button type="button" onClick={() => user.setModal(false)}>
            Close
          </Button>
        </p>
      </form>
    </LoginModalWrapper>
  );
};

export default LoginModal;
