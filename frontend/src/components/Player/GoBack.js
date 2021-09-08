import React from "react";
import { useHistory } from "react-router-dom";
import { GoBackWrapper } from "./Wrappers";

const GoBack = (props) => {
  const history = useHistory();

  return (
    <GoBackWrapper onClick={() => history.goBack()}>
      <i className="fi-arrow-left"></i>
      <p>Go back</p>
    </GoBackWrapper>
  );
};

export default GoBack;
