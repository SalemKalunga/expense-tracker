import React, { useContext } from "react";
import image from "../../images/ico-512x512.png";
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
        <img width={100} height={100} src={image} alt="logo" />
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
