import styled from "styled-components";
import { flexBox } from "../dashboard/dashboard.style";
export const PaginationContainer = styled.div`
  position: relative;
  height: 3rem;
  width: 100%;
  //   border: 2px solid crimson;
  margin: 1rem 0;
  ${flexBox("row", "center", "center", 0.2)}
  button {
    padding: 0.5rem;
  }
`;
