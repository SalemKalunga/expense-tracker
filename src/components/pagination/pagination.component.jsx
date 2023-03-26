import { PaginationContainer } from "./pagination.styles";
const Pagination = ({ perPage, totalExpenses, setCurrentPage }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalExpenses.length / perPage); i++) {
    pages.push(i);
  }
  return (
    <PaginationContainer>
      {pages.map((el, index) => {
        return (
          <button onClick={() => setCurrentPage(el)} key={index}>
            {el}
          </button>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
