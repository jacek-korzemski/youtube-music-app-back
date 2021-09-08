import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import { Wrapper } from "./Wrappers";
import NewClips from "views/NewClips";
import Clip from "views/Clip";
import Channels from "views/Channels";
import Channel from "views/Channel";
import Index from "views/Index";

const AppWrapper = () => {
  return (
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
    </Router>
  );
};

export default AppWrapper;
