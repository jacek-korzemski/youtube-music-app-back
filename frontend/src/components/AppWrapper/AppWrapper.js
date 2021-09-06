import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import { Wrapper } from "./Wrappers";

const AppWrapper = () => {
  return (
    <Router>
      <Wrapper>
        <SideBar />
        <Switch>
          <Route path="/new-clips">
            <div style={{ color: "white" }}>New clips</div>
          </Route>
          <Route path="/channels">
            <div style={{ color: "white" }}>Channels</div>
          </Route>
          <Route path="/top-clips">
            <div style={{ color: "white" }}>Top clips</div>
          </Route>
          <Route path="/reviews">
            <div style={{ color: "white" }}>Reviews</div>
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default AppWrapper;
