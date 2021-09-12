import React from "react";
import Page from "components/AppWrapper/Page";

const Index = () => {
  return (
    <Page title={"Home page"}>
      <div className="standard-text">
        <h1>Metal Catalogue - version 0.1.4</h1>
        <h3>Working features:</h3>
        <ul>
          <li>
            New ones:
            <ul>
              <li>Registering</li>
              <li>Loging in</li>
              <li>Loging out (yeah, it's also very important feature!)</li>
            </ul>
          </li>
          <li>
            Old ones:
            <ul>
              <li>Browsing new clips</li>
              <li>Browsing channels</li>
              <li>Listening to clips</li>
            </ul>
          </li>
        </ul>
        <h3>Incoming features</h3>
        <ul>
          <li>Searching</li>
          <li>Informations: privacy policy, about app, contact</li>
          <li>Disabled functionalities for guests</li>
          <li>Add user profiles</li>
          <li>Add user playlists</li>
          <li>Add reviews feature</li>
          <li>Add rating</li>
        </ul>
      </div>
    </Page>
  );
};

export default Index;
