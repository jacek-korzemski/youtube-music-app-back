import React from "react";
import { Wrapper } from "./Wrappers";
import Iframe from "./Iframe";
import Interactions from "./Interactions";
import Reviews from "./Reviews";

interface PlayerInterface {
  data: any,
}

const Player: React.FC<PlayerInterface> = ({data}: PlayerInterface) => {
  return (
    <Wrapper>
      <div className="video">
        <Iframe data={data} />
      </div>
      <div className="interactions">
        <Interactions />
      </div>
      <div className="comments">
        <Reviews />
      </div>
    </Wrapper>
  );
};

export default Player;
