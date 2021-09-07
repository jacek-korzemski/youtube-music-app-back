import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import { Wrapper } from "./Wrappers";
import NewClips from "views/NewClips";

const AppWrapper = () => {
  return (
    <Router>
      <Wrapper>
        <SideBar />
        <Switch>
          <Route path="/new-clips">
            <NewClips />
          </Route>
          <Route path="/channels"></Route>
          <Route path="/top-clips"></Route>
          <Route path="/reviews"></Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default AppWrapper;
