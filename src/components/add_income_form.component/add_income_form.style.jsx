import styled from "styled-components";
import { flexBox } from "../main/main.style";

export const Form = styled.form`
  ${flexBox("column", "center", "center", 1)};
  input {
    padding: 1rem 2rem;
    width: 100%;
  }
`;
