import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
`;
export const ChannelWrapper = styled.div`
  margin-bottom: 30px;
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    max-width: 300px;
    min-width: 300px;
    font-size: 20px;
    color: black;
    text-decoration: none;
    height: 100%;
    .image-wrapper {
      margin: 10px auto;
      img {
        border-radius: 99px;
      }
    }
    .title-wrapper {
      word-wrap: break-word;
      text-align: center;
    }
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }
`;
