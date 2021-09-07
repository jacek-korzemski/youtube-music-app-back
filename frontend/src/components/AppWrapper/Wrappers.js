import styled from "styled-components";
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
    a {
      font-size: 24px;
      color: white;
      font-weight: 100;
      text-decoration: none;
      border-bottom: 1px solid transparent;
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
  }
  .content {
    margin-top: 30px;
    width: calc(100% - 120px);
    height: calc(100% - 230px);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border: 1px solid white;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8);
    overflow-y: scroll;
    padding: 30px;
  }
`;
