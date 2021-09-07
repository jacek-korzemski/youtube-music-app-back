import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid red;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: red;
    color: white;
  }
`;

const Button = (props) => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};

export default Button;
