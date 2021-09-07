import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  background: white;
  margin: auto;
  h1 {
    font-size: 60px;
    font-weight: 100;
    margin: 0;
    text-align: center;
  }
  p {
    font-size: 20px;
    font-weight: 100;
    text-align: center;
    margin: 30px 0;
  }
`;

export const Error = (props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    switch (props.code) {
      case 404:
        setError({
          code: "404",
          message: "Could not find the data you are looking for :(",
        });
        break;
      default:
        setError({
          code: "609",
          message: "It looks like some undefined error has occured :O",
        });
        break;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {error ? (
        <>
          <h1>{error.code}</h1>
          <p>{error.message}</p>
        </>
      ) : (
        <>
          <h1>609</h1>
          <p>It looks like some undefined error has occured :O</p>
        </>
      )}
    </Wrapper>
  );
};
