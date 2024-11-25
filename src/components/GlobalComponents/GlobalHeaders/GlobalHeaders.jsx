import React from "react";
import { FaSearch } from "react-icons/fa";

function GlobalHeaders({ title, searchFilter }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center pb-5 border-b-2">
      <h1 className="font-extrabold pl-5 border-l-4 border-orange-600">
        {title}
      </h1>
      {searchFilter ? (
        <div className="relative w-full">
          <input
            type="search"
            name="productName"
            id="productName"
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-0 focus:outline-none focus:border-orange-500"
            placeholder={`Search by ${searchFilter}`}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GlobalHeaders;
