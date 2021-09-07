import React from "react";

const Iframe = (props) => {
  return (
    <iframe
      src={"https://www.youtube.com/embed/" + props.data.url + "?rel=0"}
      title={props.data.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style={{ width: "100%", height: "100%", border: "none" }}
    ></iframe>
  );
};

export default Iframe;
