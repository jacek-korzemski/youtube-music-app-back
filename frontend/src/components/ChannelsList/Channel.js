import React from "react";
import { Link } from "react-router-dom";
import { ChannelWrapper } from "./Wrappers";
import { channelImage } from "./helpers";

const ChannelsList = (props) => {
  return (
    <ChannelWrapper>
      <Link to={"/channel/" + props.data.id}>
        <div className="image-wrapper">
          <img src={channelImage(props.data.id)} alt={props.data.channel_title} />
        </div>
        <div className="title-wrapper">{props.data.channel_title}</div>
      </Link>
    </ChannelWrapper>
  );
};

export default ChannelsList;
