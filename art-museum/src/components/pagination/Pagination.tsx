import React, { useState } from "react";
import "./Pagination.scss";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [currentButtonSet, setCurrentButtonSet] = useState(0);
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const buttonsPerPage = 4;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentButtonSet < Math.ceil(totalPages / buttonsPerPage) - 1) {
      setCurrentButtonSet(currentButtonSet + 1);
    }
  };

  const handlePrev = () => {
    if (currentButtonSet > 0) {
      setCurrentButtonSet(currentButtonSet - 1);
    }
  };

  const startIndex = currentButtonSet * buttonsPerPage;
  const endIndex = startIndex + buttonsPerPage;
  const visiblePages = pages.slice(startIndex, endIndex);

  const pageClickHandler = (page: number) => {
    return () => handleClick(page);
  };
  

  return (
    <div className="pagination">
      <button
        className="prev-next-btn"
        onClick={handlePrev}
        disabled={currentButtonSet === 0}
      >
        Prev
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={pageClickHandler(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button
        className="prev-next-btn"
        onClick={handleNext}
        disabled={endIndex >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
