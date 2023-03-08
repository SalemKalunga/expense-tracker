import styled from "styled-components";
import { PROPERTIES, flexBox, colors } from "../dashboard/dashboard.style";
export const SignInContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  ${flexBox}
`;
export const SignInForm = styled.form`
  position: relative;
  height: 20rem;
  width: 20rem;
  margin: auto;
  ${PROPERTIES.boxShadows.d}
  ${flexBox("column", "center", "center", 1)}
  border-radius:.2rem;
`;
export const GoogleButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${colors.success};
  border: 0;
  ${PROPERTIES.boxShadows.d}
  transition:.1s ease-in-out;
  &:active {
    ${PROPERTIES.boxShadows.a}
    background-color: ${colors.success_dark};
    // color: ${colors.white};
    transform: translateY(0.1rem);
  }
`;
