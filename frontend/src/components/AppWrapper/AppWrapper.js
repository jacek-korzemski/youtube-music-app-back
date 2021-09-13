import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import { Wrapper, ModalWrapper, AlertsWrapper } from "./Wrappers";
import NewClips from "views/NewClips";
import Clip from "views/Clip";
import Channels from "views/Channels";
import Channel from "views/Channel";
import Index from "views/Index";

export const AppContext = React.createContext(false);

const AppWrapper = () => {
  const firstUpdate = useRef(true);
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

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    window.alertTimeout = setTimeout(() => {
      let _alerts = [...alerts];
      _alerts.shift();
      setAlerts(_alerts);
    }, 5000);

    return () => clearTimeout(window.alertTimeout);
    // eslint-disable-next-line
  }, [alerts]);

  return (
    <AppContext.Provider value={{ user: user, setUser: setUser, modal: modal, setModal: setModal, alerts: alerts, setAlerts: setAlerts }}>
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
              <React.Fragment key={index}>{elem}</React.Fragment>
            ))}
          </AlertsWrapper>
        )}
      </Router>
    </AppContext.Provider>
  );
};

export default AppWrapper;
