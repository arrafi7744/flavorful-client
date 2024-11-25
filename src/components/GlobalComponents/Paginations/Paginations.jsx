// Pagination.js
import React from "react";

function Paginations({ currentPage, totalPages, onPrevPage, onNextPage, onPageChange }) {
  return (
    <div className="flex justify-end mt-5">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 mr-2 border rounded-md transition-colors duration-300 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-600 hover:text-white border-gray-400"
        }`}
      >
        Prev
      </button>
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
                currentPage === pageNumber
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-700 hover:bg-orange-600 hover:text-white border-gray-400"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ml-2 border rounded-md transition-colors duration-300 ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-600 hover:text-white border-gray-400"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Paginations;
