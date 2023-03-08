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
export const colors = {
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
  transparant_black_a: "rgba(0, 0, 0, 0.8)",
  transparant_black_b: "rgba(0, 0, 0, 0.5)",
  transparant_black_c: "rgba(0, 0, 0, 0.3)",
};
export const responsivePadding = `
    padding:1rem 20rem;
    @media screen and (max-width:850px){
        padding:1rem 5rem;
    }
    @media screen and (max-width:550px){
        padding:1rem .5rem;
    }
`;
export const PROPERTIES = {
  boxShadows: {
    a: "box-shadow: 0px 0px 3px lightgray;",
    b: "box-shadow: 0px 3px 3px lightgray;",
    c: "box-shadow: 3px 3px 3px lightgray;",
    d: "box-shadow: 0px 0px 5px lightgray;",
  },
};
export const flexBox = (direction, justify, align, gap) => {
  const flex = `
        display:flex;
        flex-direction:${direction};
        justify-content:${justify};
        align-items:${align};
        gap:${gap}rem;
    `;
  return flex;
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
  color: ${colors.gray};
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

export const button = `
    padding: 1rem 2rem;
    font-size: 1rem;
    min-width:40%;
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

const alert = `
  padding: 1rem;
  border: 1px solid;
  text-align: center;
  font-size: 1.1rem;
  width: 50%;
  @media screen and ${breakpoints.tablette} {
    width: 60%;
  }
  @media screen and ${breakpoints.mobile} {
    width: 90%;
  }
  margin:.2rem auto;
  transform:translateY(1rem);
  transition:all .5s ease-in-out;
  `;
export const ErrorMessage = styled.p`
  color: ${colors.red};
  ${alert}
`;
export const SuccessMessage = styled.p`
  color: ${colors.success};
  ${alert}
`;
