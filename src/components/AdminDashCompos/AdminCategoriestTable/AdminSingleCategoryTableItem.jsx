import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";

function AdminSingleCategoryTableItem({ category, item }) {
  const [, getRequest] = useRequest();
  const [prodCount, setProdCount] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchProductCount = async () => {
    try {
      const fetchProdList = await getRequest(
        `/products/src/category/${category?.categoryCode}`
      );

      setProdCount(fetchProdList?.data?.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductCount();
  }, []);

  return (
    <tr>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          {/* <div className="h-11 w-11 flex-shrink-0">
            <img
              className="h-11 w-11 rounded-full"
              src={category.image}
              alt=""
            />
          </div> */}
          <div className="ml-4">
            <div className="font-medium text-lg text-gray-900">
              {category?.categoryName}
            </div>
            <div className="mt-1 text-gray-500 font-semibold">
              created at:{" "}
              <span className="font-light">
                {formatDate(category?.createdDate)}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap py-5 text-sm text-gray-500 text-left pl-10">
        {prodCount}
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {category &&
        category?.isActive === true &&
        category?.isDeleted === false ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            In-Active
          </span>
        )}
      </td>
      {/* <td className="relative whitespace-nowrap py-6 pl-10 text-center text-sm font-medium mr-2 sm:pr-0 flex items-end justify-end">
                      <div className="flex gap-x-2 text-xl">
                        <FiEdit className="text-green-500 hover:cursor-pointer hover:text-green-600 hover:scale-110" />
                        <MdOutlineDeleteOutline className="text-red-500 hover:cursor-pointer hover:text-red-600 hover:scale-110" />
                      </div>
                    </td> */}
    </tr>
  );
}

export default AdminSingleCategoryTableItem;
