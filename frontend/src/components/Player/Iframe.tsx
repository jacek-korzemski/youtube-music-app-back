import React from "react";

interface IframeIntarface {
  data: {
    url: string,
    title: string,
  }
}

const Iframe: React.FC<IframeIntarface> = ({data}: IframeIntarface) => {
  return (
    <iframe
      src={"https://www.youtube.com/embed/" + data.url + "?rel=0"}
      title={data.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ width: "100%", height: "100%", border: "none" }}
    ></iframe>
  );
};

export default Iframe;
