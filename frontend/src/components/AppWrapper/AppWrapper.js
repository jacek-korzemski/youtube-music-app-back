import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import { Wrapper, ModalWrapper, AlertsWrapper } from "./Wrappers";
import Alert from "./Alert";
import NewClips from "views/NewClips";
import Clip from "views/Clip";
import Channels from "views/Channels";
import Channel from "views/Channel";
import Index from "views/Index";

export const AppContext = React.createContext(false);

const AppWrapper = () => {
  const [user, setUser] = useState(false);
  const [modal, setModal] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const checkUserInSession = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") && checkUserInSession(sessionStorage.getItem("user"))) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    } else {
      if (sessionStorage.getItem("user")) {
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const randomIdForAlertGenerator = (length) => {
    let result = "";
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const unmountHandler = () => {
    let _alerts = [...alerts];
    _alerts.shift();
    setAlerts(_alerts);
  };

  const addAlert = (content) => {
    let _alerts = [...alerts];
    _alerts.push({ id: randomIdForAlertGenerator(64), content: content });
    setAlerts(_alerts);
  };

  const updateToken = (newToken) => {
    setUser({
      tokenExpire: newToken.expired_date,
      tokenHash: newToken.token,
      tokenId: newToken.id,
      userId: user.userId,
    });
  };

  return (
    <AppContext.Provider
      value={{ user: user, setUser: setUser, modal: modal, setModal: setModal, addAlert: addAlert, updateToken: updateToken }}
    >
      <Router>
        <Wrapper>
          <SideBar />
          <Switch>
            <Route path="/" exact>
              <Index />
            </Route>
            <Route path="/new-clips">
              <NewClips />
            </Route>
            <Route path="/channels">
              <Channels />
            </Route>
            <Route path="/top-clips"></Route>
            <Route path="/reviews"></Route>
            <Route path="/clip/:id">
              <Clip />
            </Route>
            <Route path="/channel/:id">
              <Channel />
            </Route>
          </Switch>
        </Wrapper>
        {modal && <ModalWrapper>{modal}</ModalWrapper>}
        <AlertsWrapper>
          {alerts?.map((elem) => (
            <Alert value={elem.content} key={elem.id} onUnmount={unmountHandler} />
          ))}
        </AlertsWrapper>
      </Router>
    </AppContext.Provider>
  );
};

export default AppWrapper;
