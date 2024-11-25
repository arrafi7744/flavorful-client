import React from "react";

function FilterByUserType({ userTypes, handleSelectUsers }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 text-gray-700">
        Filter By User Type
      </label>
      <select
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        defaultValue=""
        onChange={handleSelectUsers}
      >
        <option value="" disabled>
          Filter by User
        </option>
        {userTypes &&
          userTypes.map((item) => (
            <option key={item?._id} value={item?.userType}>
              {item?.typeName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default FilterByUserType;
