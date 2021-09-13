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

  const pushAlert = (alert) => {
    let alert_id = Math.random();
    let new_alert = { id: alert_id, content: <Alert id={alert_id}>{alert}</Alert> };
    let _alerts = [...alerts, new_alert];
    setAlerts(_alerts);
  };

  const dismissAlert = (id) => {
    let _alerts = [...alerts];
    let _remove_index = _alerts.findIndex((item) => item.id === id);
    _alerts.splice(_remove_index, 1);

    setAlerts(_alerts);
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

  return (
    <AppContext.Provider
      value={{ user: user, setUser: setUser, modal: modal, setModal: setModal, pushAlert: pushAlert, dismissAlert: dismissAlert }}
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
        {alerts.length > 0 && (
          <AlertsWrapper>
            {alerts.map((elem, index) => (
              <React.Fragment key={index}>{elem.content}</React.Fragment>
            ))}
          </AlertsWrapper>
        )}
      </Router>
    </AppContext.Provider>
  );
};

export default AppWrapper;
