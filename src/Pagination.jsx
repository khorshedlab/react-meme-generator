import { useState } from "react";
import "./styles/Pagination.css";

export default function Pagination({ func }) {
  const { currentPage, setCurrentPage, pages } = func;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pageNumberLimit = 5;

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  function handleClick(item) {
    // not yet implemented
    setCurrentPage(item);
  }
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button className="pagination__btn" onClick={handleNextBtn}>
        &hellip;
      </button>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button className="pagination__btn" onClick={handlePrevBtn}>
        &hellip;
      </button>
    );
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          key={number}
          onClick={() => handleClick(number)}
          className={`pagination__btn ${
            number === currentPage ? "pagination__btn--active" : null
          }`}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  return (
    <div className="pagination">
      <button
        onClick={handlePrevBtn}
        disabled={currentPage === 1}
        className={`pagination__btn pagination__btn--big ${
          currentPage === 1 ? "pagination__btn--disable" : null
        }`}
      >
        Pre
      </button>
      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      <button
        disabled={currentPage === pages.length}
        onClick={handleNextBtn}
        className={`pagination__btn pagination__btn--big ${
          currentPage === pages.length ? "pagination__btn--disable" : null
        }`}
      >
        Next
      </button>
    </div>
  );
}
