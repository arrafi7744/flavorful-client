import React from "react";

function FilterProductsByVendors({allVendorsList, handleSelectVendors}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 text-gray-700">
        Filter By Vendors
      </label>
      <select
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        defaultValue=""
        onChange={handleSelectVendors}
      >
        <option value="" disabled>
          Filter by Vendors
        </option>
        {
          allVendorsList && allVendorsList.map(shop => <option key={shop?._id} value={shop?.userId}>
            {shop?.shopName}
          </option>)
        }
      </select>
    </div>
  );
}

export default FilterProductsByVendors;
