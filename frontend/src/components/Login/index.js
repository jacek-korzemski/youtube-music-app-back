import React, { useState } from "react";
import { api_url } from "../../Config";
import "./style.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const formHandler = async (e) => {
    e.preventDefault();
    getToken().then((res) => {
      props.setToken(res.tokenHash);
      props.setUserId(res.userId);
    });
  };

  const getToken = async () => {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await fetch(api_url + "/login", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data;
  };

  const inputHandler = (e, field) => {
    let temp_data = { ...credentials };
    temp_data[field] = e.target.value;
    setCredentials(temp_data);
  };

  return (
    <div className="login-overlay">
      <form className="login-box" onSubmit={formHandler}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={(e) => inputHandler(e, "username")}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={(e) => inputHandler(e, "password")}
        />
        <input type="submit" name="submit" value="log in" />
      </form>
    </div>
  );
};

export default Login;
