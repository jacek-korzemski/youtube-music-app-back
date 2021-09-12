import styled, { keyframes } from "styled-components";
import bg from "./bg.png";

export const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url("${bg}") center center;
  background-size: cover;
`;

export const SideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  z-index: 10;
  padding-top: 64px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8);
  border-right: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 30px;
  line-height: 36px;
  font-weight: 100;
  a {
    color: white;
    text-decoration: none;
  }
`;

export const Divider = styled.div`
  width: 200px;
  height: 1px;
  background: white;
  margin: 15px auto;
`;

export const UserWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 200px;
  gap: 20px;
  padding: 10px 0;
  .left {
    width: 100%;
    max-width: 64px;
    height: 100%;
    .image-wrapper {
      width: 64px;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: block;
      }
    }
  }
  .right {
    color: white;
    .username {
      font-size: 20px;
      font-weight: 100;
    }
    .user-navigation {
      list-style-type: none;
      margin: 10px 0;
      padding: 0;
      li {
        margin: 4px 0;
        font-size: 14px;
        color: #81d3f8;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const MainMenuWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: white;
  li {
    margin: 15px 0;
    text-align: center;
    a,
    .link-like {
      font-size: 24px;
      color: white;
      font-weight: 100;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      &:hover {
        border-bottom: 1px solid white;
      }
      &.active {
        color: red;
        &:hover {
          border-bottom: 1px solid red;
        }
      }
    }
  }
`;

export const TermsMenuWrapper = styled.div`
  display: flex;
  gap: 10px;
  color: #81d3f8;
  font-size: 14px;
  padding-top: 20px;
  margin-left: 5px;
  .text-button {
    padding-right: 10px;
    border-right: 1px solid #81d3f8;
    &:last-child {
      border-right: none;
    }
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const PageWrapper = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .title {
    margin-top: 30px;
    font-size: 30px;
    font-weight: 100;
    padding-bottom: 5px;
    border-bottom: 1px solid white;
    color: white;
    text-align: center;
    width: fit-content;
    min-height: 40px;
  }
  .content {
    position: relative;
    margin-top: 30px;
    width: calc(100% - 120px);
    height: calc(100% - 230px);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border: 1px solid white;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8);
    overflow-y: auto;
    padding: 30px;
    .standard-text {
      color: white;
      font-weight: 100;
    }
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  animation: 0.3s ${fadeIn} ease-out forwards;
`;

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

export const LoginModalWrapper = styled.div`
  width: 300px;
  min-height: 300px;
  padding: 30px;
  background: white;
  box-shadow: 1px 2px 3px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -100px;
  animation-delay: 2.6s;
  animation: 0.3s ${fadeInDrop} ease-out forwards;
  position: relative;
  p {
    margin: 0;
  }
  hr {
    margin-bottom: 30px;
  }
  h2 {
    text-align: center;
    margin-top: 0;
  }
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
`;

export const RegisterModalWrapper = styled.div`
  min-width: 300px;
  min-height: 300px;
  padding: 30px;
  background: white;
  box-shadow: 1px 2px 3px black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-top: -100px;
  animation-delay: 2.6s;
  animation: 0.3s ${fadeInDrop} ease-out forwards;
  position: relative;
  p {
    margin: 0;
  }
  hr {
    margin-bottom: 30px;
  }
  h2 {
    text-align: center;
    margin-top: 0;
  }
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
  .info {
    width: 100%;
    max-width: 300px;
    border-left: 1px solid gray;
    margin-left: 15px;
    padding: 0 15px;
    p {
      margin-bottom: 15px;
      span {
        display: inline-block;
      }
    }
  }
`;
