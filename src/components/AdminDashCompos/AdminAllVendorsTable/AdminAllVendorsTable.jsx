import React, { useState } from "react";
import Paginations from "../../GlobalComponents/Paginations/Paginations";
import { AiFillDelete } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaUndo } from "react-icons/fa";

export default function AdminAllVendorsTable({
  allVendors,
  handleActivateVendor,
  handleInActiveVendor,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const totalPages = Math.ceil(allVendors.length / entriesPerPage);

  // Slice the data for the current page
  const displayedPeople = allVendors.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Pagination handler functions
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Vendor Info
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {displayedPeople.map((person, index) => (
                  <tr key={`${person.email}-${index}`}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="">
                          <div className="font-medium text-gray-900">
                            {person?.userName}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person?.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-left">
                      {person?.isActive === false &&
                      person?.isDeleted === false ? (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          In-Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-5 text-center text-xs font-medium sm:pr-0">
                      {person && person?.isDeleted === false ? (
                        person?.isActive === false ? (
                          <button
                            onClick={()=>handleActivateVendor(person)}
                            className="w-20 bg-green-700 px-2 py-1 rounded text-white shadow-md duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            onClick={()=>handleInActiveVendor(person)}
                            className="w-20 bg-red-700 px-2 py-1 rounded text-white shadow-md duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
                          >
                            Inactivate
                          </button>
                        )
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
