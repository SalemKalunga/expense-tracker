import styled from "styled-components";

// make my media queries
export const sizes = {
  small: "550px",
  medium: "850px",
};
export const breakpoints = {
  mobile: ` (max-width:${sizes.small})`,
  mobile: ` (max-width:${sizes.medium})`,
};
const colors = {
  white: "#fff",
  black: "black",
  gray: "#999",
  darkgray: "#333",
  red: "red",
  success: "lightgreen",
};
export const responsivePadding = `
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
  tr {
    td {
      padding: 1rem;
      border-bottom: 1px solid ${colors.gray};
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
