import React from "react";
import { Wrapper } from "./Wrappers";
import Channel from "./Channel";

const ChannelsList = (props) => {
  return (
    <Wrapper>
      {props.data.map((elem, index) => (
        <Channel key={index} data={elem} />
      ))}
    </Wrapper>
  );
};

export default ChannelsList;
