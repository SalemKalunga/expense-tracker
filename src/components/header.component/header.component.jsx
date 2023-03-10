import React, { useContext } from "react";
import "./header.style";
import {
  LogoutButton,
  ProfileImage,
  ProfileImageContainer,
  StyledHeader,
} from "./header.style";
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
        <ProfileImageContainer>
          {currentUser && (
            <LogoutButton onClick={signUserOut}>SignOut</LogoutButton>
          )}
          {currentUser && (
            <ProfileImage src={currentUser.photoURL} width={50} alt="profile" />
          )}
        </ProfileImageContainer>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default Header;
