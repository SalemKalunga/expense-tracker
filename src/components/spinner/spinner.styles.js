import styled from "styled-components";
import { colors } from "../dashboard/dashboard.style";

const spin = `
@keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
export const SpinnerContainer = styled.section`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  color: red;
  z-index: 1;
  div {
    border: 5px solid ${colors.white};
    height: 5rem;
    width: 5rem;
    border-top-color: ${colors.crimson};
    border-bottom-color: ${colors.crimson};
    border-radius: 50%;
    transform: translateY(-5rem);
    ${spin}
    animation: spin 1s ease infinite;
  }
`;
