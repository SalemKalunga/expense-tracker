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