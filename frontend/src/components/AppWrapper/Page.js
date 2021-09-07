import React from "react";
import { PageWrapper } from "./Wrappers";

const Page = (props) => {
  return (
    <PageWrapper>
      <div className="title">{props.title}</div>
      <div className="content">{props.children}</div>
    </PageWrapper>
  );
};

export default Page;
