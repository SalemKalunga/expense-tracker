import React from "react";
import "./header.style";
import { StyledHeader } from "./header.style";
import { Outlet } from "react-router-dom";
import { signUserOut } from "../../utils/firebase";

const Header = () => {
  return (
    <>
      <StyledHeader>
        <img
          src="https://abscongo.com/congo/assets/images/icons/some/logo6.png"
          width={60}
          alt="logo"
        />
        <button onClick={signUserOut}>SignOut</button>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Header;
