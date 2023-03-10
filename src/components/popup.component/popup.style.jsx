import styled from "styled-components";
import { flexBox } from "../dashboard/dashboard.style";
import { colors } from "../dashboard/dashboard.style";

export const PopupContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${colors.transparant_black_a};
  ${flexBox("column", "center", "center", 0)};
  color: ${colors.white};
`;
