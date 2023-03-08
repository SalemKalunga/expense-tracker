import styled from "styled-components";
import { flexBox, colors } from "../dashboard/dashboard.style";

export const Form = styled.form`
  ${flexBox("column", "center", "center", 1)};
  input {
    padding: 1rem 2rem;
    width: 100%;
  }
`;

export const CloseButton = styled.button`
  padding: 0.4rem;
  border: 0;
  margin: 1rem;
  background-color: ${colors.red};
  border-radius: 0.2rem;
  color: ${colors.white};
  cursor: pointer;
`;