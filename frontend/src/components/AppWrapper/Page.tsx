import React from "react";
import { PageWrapper } from "./Wrappers";

interface PagePropsInterface {
  title?: string,
  children?: string | object,
}

const Page: React.FC<PagePropsInterface> = (props) => {
  return (
    <PageWrapper>
      <div className="title">{props.title}</div>
      <div className="content">{props.children}</div>
    </PageWrapper>
  );
};

export default Page;
