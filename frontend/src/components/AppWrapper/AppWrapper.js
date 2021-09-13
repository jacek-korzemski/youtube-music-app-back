import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./SideBar";
import { Wrapper, ModalWrapper, AlertsWrapper } from "./Wrappers";
import NewClips from "views/NewClips";
import Clip from "views/Clip";
import Channels from "views/Channels";
import Channel from "views/Channel";
import Index from "views/Index";
import "react-toastify/dist/ReactToastify.css";
import "assets/toastyfy.css";

export const AppContext = React.createContext(false);

const AppWrapper = () => {
  const [user, setUser] = useState(false);
  const [modal, setModal] = useState(false);

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

  const addAlert = (text) => {
    toast(<>{text}</>);
  };

  return (
    <AppContext.Provider value={{ user: user, setUser: setUser, modal: modal, setModal: setModal, addAlert: addAlert }}>
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
          <ToastContainer position="top-right" autoClose={5000} />
        </AlertsWrapper>
      </Router>
    </AppContext.Provider>
  );
};

export default AppWrapper;
