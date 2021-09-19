import React, { useContext, useState } from "react";
import { RegisterModalWrapper } from "./Wrappers";
import { AppContext } from "./AppWrapper";
import Button from "components/Button/Button";
import { api_url } from "Config";
import LoadingBlack from "components/Loading/LoadingBlack";

const LoginModal = () => {
  const user = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [warningAccepted, setWarningAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const frontEndValidate = () => {
    if (username.length < 5) {
      user.addAlert("Username must by at least 5 characters long!");
      return false;
    }
    if (email !== email2) {
      user.addAlert("Email address doesn't match!");
      return false;
    }
    if (!validateEmail(email)) {
      user.addAlert("Invalid Email!");
      return false;
    }
    if (!warningAccepted) {
      user.addAlert("You have to read the warning, understand the risks and accept them.");
      return false;
    }
    if (!privacyAccepted) {
      user.addAlert("You have to read the privacy policy, understand it and accept it.");
      return false;
    }
    return true;
  };

  const tryToRegiser = () => {
    if (!frontEndValidate()) {
      return false;
    }
    setLoading(true);
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);

    fetch(api_url + "/register", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Wrong API response.");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res.code === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
          user.addAlert(res.message);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
      {loading ? (
        <div style={{ width: "300px", height: "459px" }}>
          <LoadingBlack />
        </div>
      ) : (
        <>
          {!success ? (
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
              <label htmlFor="warning_checkbox">
                <input
                  type="checkbox"
                  name="warning_checkbox"
                  value={warningAccepted}
                  checked={warningAccepted}
                  onClick={() => setWarningAccepted(!warningAccepted)}
                />
                I've read the warning on the right. I understand and I am accepting the risk.
              </label>
              <br />
              <br />
              <label htmlFor="warning_checkbox">
                <input
                  type="checkbox"
                  name="warning_checkbox"
                  value={privacyAccepted}
                  checked={privacyAccepted}
                  onClick={() => setPrivacyAccepted(!privacyAccepted)}
                />
                I've read the privacy policy, I understand it, and I accept it.
              </label>
              <br />
              <br />
              <p className="buttons-wrapper">
                <Button type="button" onClick={() => tryToRegiser()}>
                  Register
                </Button>
                <Button type="button" onClick={() => user.setModal(false)}>
                  Close
                </Button>
              </p>
            </form>
          ) : (
            <div className="success">
              <div className="info" style={{ borderLeft: "none" }}>
                <h2>Success</h2>
                <hr />
                <p>Register successfull! Check your mail for the passowrd.</p>
                <p style={{ textAlign: "center" }}>
                  <Button type="button" onClick={() => user.setModal(false)}>
                    Close
                  </Button>
                </p>
              </div>
            </div>
          )}
        </>
      )}

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
