import React, { useState } from 'react';
import Paginations from '../../GlobalComponents/Paginations/Paginations';

export default function VendorsAllCancelledOrderTablre({ allCancelledOrders }) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const totalPages = Math.ceil(allCancelledOrders.length / entriesPerPage);

  // Slice the data for the current page
  const displayedProduct = allCancelledOrders.slice(
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
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Quantity
                  </th>
                  {/* <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Delivery Fee
                  </th> */}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Selling Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total
                  </th>
                  {/* <th
                    scope="col"
                    className=" py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {displayedProduct.map((order, index) => (
                  <tr key={`${order.email}-${index}`}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src={`${process.env.REACT_APP_BackendURLIMG}/images/${order?.productThumb}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {order.productName}
                          </div>
                          {/* <div className="mt-1 text-gray-500">
                            {product.email}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-5 text-sm text-left  text-gray-500">
                      {order?.userFullName}
                    </td>
                    <td className="whitespace-nowrap py-5 text-sm text-left pl-10 text-gray-500">
                      {order?.totalQuantity} Kg
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {product && product?.deliveryFee
                        ? product?.deliveryFee
                        : 0}
                      TK
                    </td> */}
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order?.productSellingPrice} TK
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {order?.allTotalPrice} Tk
                    </td>
                    {/* <td className="relative whitespace-nowrap py-5 px-3.5 text-right text-sm font-medium sm:pr-0">
                      <div className="flex items-center justify-center gap-x-2">
                        <button
                          onClick={() => confirmOrders(order?._id)}
                          className="px-2 py-1 rounded bg-green-500 text-white font-semibold text-xs hover:bg-green-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => deletePendingOrders(order?._id)}
                          className="px-2 py-1 rounded bg-red-500 text-white font-semibold text-xs hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            {allCancelledOrders && allCancelledOrders.length >= 5 ? (
              <Paginations
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onPageChange={handlePageChange}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
