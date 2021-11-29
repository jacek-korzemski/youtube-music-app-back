import React from "react";
import { TermsMenuWrapper } from "./Wrappers";

const TermsMenu: React.FC = () => {
  return (
    <TermsMenuWrapper>
      <div className="text-button">Privacy policy</div>
      <div className="text-button">About app</div>
      <div className="text-button">Contact</div>
    </TermsMenuWrapper>
  );
};

export default TermsMenu;
