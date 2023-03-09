import React from "react";
import "./header.style";
import { StyledHeader } from "./header.style";
import { Outlet } from "react-router-dom";
import { signUserOut } from "../../utils/firebase";

const Header = () => {
  return (
    <>
      <StyledHeader>
        <h1>Exp</h1>
        <button onClick={signUserOut}>SignOut</button>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Header;
