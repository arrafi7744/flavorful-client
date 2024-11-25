import React from "react";

function HomePageSidebarFilters() {
  return (
    <div className="shadow-md w-full h-full rounded-xl sticky top-0 bg-white p-6">
      {/* Filters Section */}
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Category</h3>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Fruits
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Vegetables
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Dairy Products
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Snacks
            </label>
          </li>
        </ul>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Price Range</h3>
        <div className="flex space-x-2 items-center">
          <input
            type="number"
            placeholder="$ Min"
            className="border rounded-md px-2 py-1 w-20"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="$ Max"
            className="border rounded-md px-2 py-1 w-20"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ratings</h3>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" /> 4 Stars & Up
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" /> 3 Stars & Up
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" /> 2 Stars & Up
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" /> 1 Star & Up
            </label>
          </li>
        </ul>
      </div>

      {/* Sorting Section */}
      <h2 className="text-xl font-semibold mb-4">Sort By</h2>
      <div className="mb-6">
        <select className="border rounded-md px-4 py-2 w-full">
          <option>Best Selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Customer Ratings</option>
          <option>New Arrivals</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <div>
        <button className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-600">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default HomePageSidebarFilters;
