import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    padding: 30px;
    min-height: 100px;
    width: 300px;
    background: white;
    border-radius: 10px;
    p {
      margin: 0;
      text-align: center;
    }
  }
`;
