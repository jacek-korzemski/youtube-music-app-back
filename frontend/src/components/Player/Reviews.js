import React, { useState } from "react";
import { ReviewsWrapper } from "./Wrappers";
import Button from "components/Button/Button";

const Reviews = () => {
  const [reviews] = useState(false);

  return (
    <ReviewsWrapper className={reviews ? undefined : "no-reviews"}>
      {reviews ? (
        <></>
      ) : (
        <>
          <i className="fi-heart"></i>
          <p>It looks like there is no reviews yet. So, you can be the first one to review!</p>
          <p>
            <Button
              onClick={() => {
                console.log("You clicked!");
              }}
            >
              Add a review!
            </Button>
          </p>
        </>
      )}
    </ReviewsWrapper>
  );
};

export default Reviews;
