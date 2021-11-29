import React from "react";
import styled from "styled-components";

interface ButtonInterface {
  children: object | string,
  onClick?: any,

}

const ButtonWrapper = styled.span`
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

const Button: React.FC<ButtonInterface> = ({children, onClick}: ButtonInterface) => {
  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
};

export default Button;
