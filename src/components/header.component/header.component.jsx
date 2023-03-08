import React from "react";
import "./header.style";
import { StyledHeader } from "./header.style";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <StyledHeader>
        <h1>Exp</h1>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Header;
