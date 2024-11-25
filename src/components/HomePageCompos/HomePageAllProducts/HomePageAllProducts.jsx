import React, { useState } from "react";
import HomePageIndividualProduct from "../HomePageIndividualProduct/HomePageIndividualProduct";
import Paginations from "../../GlobalComponents/Paginations/Paginations";
import GlobalFilters from "../../GlobalComponents/GlobalFilters/GlobalFilters";

function HomePageAllProducts({ allProds = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts =
    Array.isArray(allProds) && allProds.length > 0
      ? allProds.slice(indexOfFirstProduct, indexOfLastProduct)
      : [];

  const totalPages = Math.ceil(
    (Array.isArray(allProds) ? allProds.length : 0) / itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-6 md:px-10 pt-5 pb-10">
      <GlobalFilters
        searchTerm=""
        onSearch={() => {}}
        sortOption="default"
        onSortChange={() => {}}
      />

      <div className="">
        {currentProducts && currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-5 gap-y-5 md:gap-y-10">
            {currentProducts.map((product) => (
              <HomePageIndividualProduct key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 py-10 border-2 rounded-lg w-full flex items-center justify-center text-2xl text-gray-400 font-semibold">
            <h1>No Products Available</h1>
          </div>
        )}

        {currentProducts.length > 0 && totalPages > 1 ? (
          <Paginations
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onPageChange={handlePageChange}
          />
        ) : null}
      </div>
    </div>
  );
}

export default HomePageAllProducts;
