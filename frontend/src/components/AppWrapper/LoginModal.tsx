import React, { useContext, useState } from "react";
import { LoginModalWrapper } from "./Wrappers";
import { AppContext } from "./AppWrapper";
import Button from "components/Button/Button";
import { api_url } from "Config";
import Loading from "components/Loading/LoadingBlack";

const LoginModal: React.FC = () => {
  const user = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const tryToLogin = () => {
    setLoading(true);
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
        if (res.code === 200) {
          sessionStorage.setItem("user", JSON.stringify(res.data));
          user.setUser && user.setUser(res.data);
        } else {
          throw new Error("Please, check your use and password and try again. If the error keep happening again, please try again later.");
        }
      })
      .then(() => {
        user.setModal && user.setModal(false);
      })
      .then(() => {
        user.addAlert && user.addAlert("Successfully loged in!");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        user.addAlert && user.addAlert("Please, check your use and password and try again. If the error keep happening again, please try again later.");
      });
  };

  return (
    <LoginModalWrapper>
      <span
        className="close-icon"
        onClick={() => {
          user.setModal && user.setModal(false);
        }}
      >
        [X]
      </span>
      {loading ? (
        <Loading />
      ) : (
        <form autoComplete="new-password">
          <h2>Log in</h2>
          <hr />
          <p>Login:</p>
          <input type="text" name="login" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
          <p>Password:</p>
          <input type="password" name="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="hidden" style={{ display: "none" }} />
          <p className="buttons-wrapper">
            <Button onClick={() => tryToLogin()}>
              Login
            </Button>
            <Button onClick={() => user.setModal && user.setModal(false)}>
              Close
            </Button>
          </p>
        </form>
      )}
    </LoginModalWrapper>
  );
};

export default LoginModal;
