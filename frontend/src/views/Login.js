import React from "react";
import Page from "components/AppWrapper/Page";
import LoginForm from "components/LoginForm/LoginForm";

const Login = (props) => {
  return (
    <Page title="Log in">
      <LoginForm setUser={props.setUser} />
    </Page>
  );
};

export default Login;
