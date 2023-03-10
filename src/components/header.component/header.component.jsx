import React, { useContext } from "react";
import "./header.style";
import { StyledHeader } from "./header.style";
import { Outlet } from "react-router-dom";
import { signUserOut } from "../../utils/firebase";
import { UserContext } from "../../contexts/user_context.component";
const Header = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <StyledHeader>
        <img
          src="https://abscongo.com/congo/assets/images/icons/some/logo6.png"
          width={60}
          alt="logo"
        />
        {currentUser && <button onClick={signUserOut}>SignOut</button>}
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Header;
