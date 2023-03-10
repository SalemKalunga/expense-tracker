import styled from "styled-components";
import { flexBox, responsivePadding } from "../dashboard/dashboard.style";
export const StyledHeader = styled.header`
  box-shadow: 0px 3px 3px lightgray;
  ${responsivePadding}
  ${flexBox("row", "space-between", "space-between", 1)};
  button {
    padding: 0.2rem 1rem;
    display: inline-block;
  }
`;
export const ProfileImageContainer = styled.div`
  position: relative;
  height: 100%;
  ${flexBox("row", "space-between", "space-between", 1)};
`;
export const ProfileImage = styled.img`
  border-radius: 50%;
`;
export const LogoutButton = styled.button`
  padding: 0.1rem;
  border: 0.2rem solid transparent;
  border-radius: 0.2rem;
  cursor: pointer;
  &:active {
    border-color: royalblue;
  }
`;