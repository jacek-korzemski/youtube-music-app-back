import React from "react";
import { Wrapper } from "./Wrappers";
import Channel from "./Channel";

interface ChannelListInterface {
  data: any[],
}

const ChannelsList: React.FC<ChannelListInterface> = (props) => {
  return (
    <Wrapper>
      {props.data.map((elem, index) => (
        <Channel key={index} data={elem} />
      ))}
    </Wrapper>
  );
};

export default ChannelsList;
