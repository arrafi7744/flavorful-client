import React from "react";

function FilterProductsByProductTypes() {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 text-gray-700">
        Filter by Product Type
      </label>
      <select
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        defaultValue=""
      >
        <option value="" disabled>
          Filter By Product Types
        </option>
        <option value="allProducts">All Products</option>
        <option value="bestSelling">Draft Products</option>
        <option value="priceLowToHigh">Stockout Products</option>
        <option value="priceHighToLow">Pending Products</option>
      </select>
    </div>
  );
}

export default FilterProductsByProductTypes;
