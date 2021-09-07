import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 30px;
  a {
    display: block;
    text-decoration: none;
    margin-bottom: 30px;
    color: black;
    &:hover {
      .item {
        background: white;
      }
    }
    .item {
      width: 200px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 15px;
      overflow: hidden;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.7);
      height: 100%;
      img {
        display: block;
      }
      h2 {
        font-size: 20px;
        font-weight: 100;
        margin: 10px 0 10px 0;
      }
      p {
        margin: 2px 0;
      }
    }
  }
`;
