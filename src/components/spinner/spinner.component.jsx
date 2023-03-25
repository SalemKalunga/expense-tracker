import React from "react";
import { SpinnerContainer } from "./spinner.styles";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <div className="spinner">
        <span>&nbsp;</span>
      </div>
    </SpinnerContainer>
  );
};

export default Spinner;
