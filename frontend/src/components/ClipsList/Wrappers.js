import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 15px;
  .item {
    width: 200px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    img {
      display: block;
    }
  }
`;
