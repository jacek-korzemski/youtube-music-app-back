import React from "react";
import { InteractionsWrapper } from "./Wrappers";
import Stars from "./Stars";
import GoBack from "./GoBack";
import AddToFav from "./AddToFav";

const Interactions = () => {
  return (
    <InteractionsWrapper>
      <GoBack />
      <Stars />
      <AddToFav />
    </InteractionsWrapper>
  );
};

export default Interactions;
