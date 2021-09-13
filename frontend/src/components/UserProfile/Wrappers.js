import styled, { keyframes } from "styled-components";

const fadeInDrop = keyframes`
  0% {
    transform: translateY(-300px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const EditWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 75vh;
  overflow-y: auto;
  max-width: 500px;
  background: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  animation: ${fadeInDrop} 0.3s linear forwards;
  .close-icon {
    display: block;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: red;
    }
  }
  .section-title {
    font-size: 12px;
    margin: 20px 0 10px 0;
  }
  .blank {
    padding: 5px 15px;
    background: rgba(0, 0, 0, 0.07);
    display: inline-block;
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.5);
    margin: 0;
  }
  .channels {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 10px;
    .channel {
      display: block;
      padding: 6px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.23);
      a {
        color: black;
        text-decoration: none;
        display: inline-block;
        margin-right: 7px;
      }
      .cancel {
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
`;
