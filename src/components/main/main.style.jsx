import styled from "styled-components";

// make my media queries
export const sizes = {
  small: "550px",
  medium: "850px",
};
export const breakpoints = {
  mobile: ` (max-width:${sizes.small})`,
  tablette: ` (max-width:${sizes.medium})`,
};
const colors = {
  white: "#fff",
  black: "black",
  gray: "#999",
  darkgray: "#333",
  red: "red",
  success: "lightgreen",
  success_dark: "rgb(95, 161, 95)",
  crimson: "crimson",
  crimson_dark: "rgb(189, 15, 50)",
  lightgray: "lightgray",
};
export const responsivePadding = `
    padding:1rem 20rem;
    @media screen and (max-width:850px){
        padding:1rem 5rem;
    }
    @media screen and (max-width:550px){
        padding:1rem 2rem;
    }
`;
const PROPERTIES = {
  boxShadows: {
    a: "box-shadow: 0px 0px 3px lightgray;",
    b: "box-shadow: 0px 3px 3px lightgray;",
    c: "box-shadow: 3px 3px 3px lightgray;",
  },
};
export const TotalDiv = styled.div`
  padding: 1.5rem;
  ${PROPERTIES.boxShadows.c}
  display: inline-block;
  background-color: lightgreen;
  color: ${colors.darkgray};
  margin: 1rem 0rem;
`;
export const Table = styled.table`
  width: 100%;
  margin: auto;
  text-align: center;
  tr {
    &:nth-child(odd) {
      background-color: rgb(250, 250, 250);
    }
    td {
      padding: 1rem;
      p:nth-child(1) {
        font-weight: bold;
      }
    }
  }
`;

export const DepositeTd = styled.td`
  color: ${colors.success};
`;
export const WithdrawTd = styled.td`
  color: ${colors.red};
`;
export const MainPart = styled.main`
  ${responsivePadding}
`;

export const ButtonsContainer = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const button = `
    padding: 1rem 2rem;
    font-size: 1rem;
    @media screen and ${breakpoints.tablette} {
    width: 50%;
    }
    @media screen and ${breakpoints.mobile} {
    width: 100%;
    }
    border:0;
    color:${colors.white};
    text-shadow:0px 0px 3px ${colors.gray};
    transition:all .05s ease-in-out;
    `;

export const AddIncomeButton = styled.button`
  ${button}
  background-color:${colors.success};
  &:hover {
    background-color: ${colors.success_dark};
    transform: translateY(-0.3rem);
    ${PROPERTIES.boxShadows.c}
  }
  &:active {
    transform: translateY(-0.1rem);
    ${PROPERTIES.boxShadows.b}
  }
`;

export const WithdrawButton = styled.button`
  ${button}
  background-color: ${colors.crimson};
  &:hover {
    background-color: ${colors.crimson_dark};
    transform: translateY(-0.3rem);
    ${PROPERTIES.boxShadows.c}
  }
  &:active {
    transform: translateY(-0.1rem);
    ${PROPERTIES.boxShadows.b}
  }
`;
