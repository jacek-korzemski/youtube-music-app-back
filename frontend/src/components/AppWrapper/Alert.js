import React, { useEffect, useContext } from "react";
import { AppContext } from "./AppWrapper";

const Alert = (props) => {
  const app = useContext(AppContext);

  useEffect(() => {
    let timeout = setTimeout(() => {
      app.dismissAlert(props.id);
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, []);

  return <div className="alert">{props.children}</div>;
};

export default Alert;
