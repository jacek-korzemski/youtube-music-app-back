import React from "react";
import { Wrapper } from "./Wrappers";

const ClipsList = (props) => {
  return (
    <Wrapper>
      {props.data.map((elem, index) => (
        <div className="item">
          <img src={elem.high_thumbnail} alt={elem.title} />
        </div>
      ))}
    </Wrapper>
  );
};

export default ClipsList;
