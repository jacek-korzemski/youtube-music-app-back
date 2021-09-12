import React, { useContext, useState } from "react";
import { RegisterModalWrapper } from "./Wrappers";
import { AppContext } from "./AppWrapper";
import Button from "components/Button/Button";
import { api_url } from "Config";

const LoginModal = () => {
  const user = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const frontEndValidate = () => {
    if (username.length < 5) {
      alert("Username must by at least 5 characters long!");
      return false;
    }
    if (email !== email2) {
      alert("Email address doesn't match!");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Invalid Email!");
      return false;
    }
    return true;
  };

  const tryToLogin = () => {
    if (!frontEndValidate()) {
      return false;
    }
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);

    fetch(api_url + "/register", { method: "POST", body: formData }).then(() => {
      /* TODO */
    });
  };

  return (
    <RegisterModalWrapper>
      <span
        className="close-icon"
        onClick={() => {
          user.setModal(false);
        }}
      >
        [X]
      </span>
      <form autoComplete="new-password">
        <h2>Register</h2>
        <hr />
        <p>Login:</p>
        <input type="text" name="login" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Email:</p>
        <input type="text" name="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>Repeat email:</p>
        <input type="text" name="email2" autoComplete="off" value={email2} onChange={(e) => setEmail2(e.target.value)} />
        <input type="hidden" style={{ display: "none" }} />
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            type="button"
            onClick={() => {
              tryToLogin();
            }}
          >
            Register
          </Button>
        </p>
      </form>
      <div className="info">
        <h2>Warning!</h2>
        <hr />
        <p>
          Please keep in mind, that this is just a student project. It security features wasn't tested. I'm not respinsible for any data
          loss. You are signing in at your own risk.
        </p>
        <p>
          If you want to try it, don't use your main <span>e-mail</span> adress. After signing in, you will recive random generated
          password. Never change it for another password, that you are already using somewhere else.
        </p>
        <p>
          Don't leave anywhere here your sensitive data! I'm trying to make this app look as proffesional as I can, but I'm still learning
          and I cannot guarantee security for the data that you leave here.
        </p>
        <p>But all in all - have fun :)</p>
      </div>
    </RegisterModalWrapper>
  );
};

export default LoginModal;
