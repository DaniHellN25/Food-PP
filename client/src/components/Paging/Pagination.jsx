const Pagination = ({
  recipesPerPage,
  allRecipes,
  paginate,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumber = [];

  let maxQuantity = Math.ceil(allRecipes / recipesPerPage);

  for (let i = 0; i < maxQuantity; i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div>
      <nav>
        <>
          <ul>
            <button
              disabled={currentPage === 1 || currentPage < 1} //First page
              className="btn-pagination"
              onClick={
                currentPage !== 1 ? () => setCurrentPage(currentPage - 1) : null
              }
            >
              &#x2190;
            </button>
            {pageNumber && //render each number
              pageNumber.map((number) => (
                <li className="list" key={number}>
                  <button
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "current" : null}
                  >
                    {number}
                  </button>
                </li>
              ))}
            <button
              disabled={
                maxQuantity === currentPage || maxQuantity < currentPage //Last page
              }
              className="btn-pagination"
              onClick={
                maxQuantity !== currentPage
                  ? () => setCurrentPage(currentPage + 1)
                  : null
              }
            >
              &#x2192;
            </button>
          </ul>
        </>
      </nav>
    </div>
  );
};

export default Pagination;
