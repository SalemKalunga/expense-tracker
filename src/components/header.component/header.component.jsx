import React from "react";
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selectors";
import Spinner from "../spinner/spinner.component";
const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector((state) => state.expenses.isLoading);
  return (
    <>
      {isLoading && <Spinner />}
      <StyledHeader>
        <img width={50} height={50} src={image} alt="logo" />
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
