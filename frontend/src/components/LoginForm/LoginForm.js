import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Wrapper } from "./Wrappers";
import Button from "components/Button/Button";
import { api_url } from "Config";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const tryToLogin = () => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    fetch(api_url + "/login", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sorry, something went wrong...");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        props.setUser(res.data);
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <form autoComplete="off">
        <p>Login:</p>
        <input type="text" name="login" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Password:</p>
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="text" name="chrome-kurwo-przestan-mi-hasla-przesladowac" style={{ display: "none" }} />
        <p>
          <Button onClick={tryToLogin}>Log in</Button>
        </p>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
