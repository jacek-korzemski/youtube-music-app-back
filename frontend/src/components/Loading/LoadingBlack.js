import React from "react";
import "./LoadingBlack.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="snippet" data-title=".dot-falling">
        <div className="stage">
          <div className="dot-falling-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
