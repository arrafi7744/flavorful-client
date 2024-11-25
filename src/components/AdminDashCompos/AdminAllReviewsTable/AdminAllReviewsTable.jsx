import React, { useState } from "react";
import Paginations from "../../GlobalComponents/Paginations/Paginations";
import { FaStar } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminAllReviewsTable({
  allReviews,
  activateReview,
  deleteReview,
  activateState,
  deleteState,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const totalPages = Math.ceil(allReviews.length / entriesPerPage);

  // Slice the data for the current page
  const displayedreviews = allReviews.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Pagination handler functions
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


  const handleDeleteProd = ({reviewId}) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#db5800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReview(reviewId);
        if (deleteState?.data?.error === false) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Review has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleActivateProd = ({reviewId}) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#db5800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        activateReview(reviewId);
        if (activateState?.data?.error === false) {
          Swal.fire({
            title: "Activated!",
            text: "Your Product has been Activated.",
            icon: "success",
          });
        }
      }
    });
  };


  return (
    <div className="px-4 sm:px-6 lg:px-0 w-full h-full">
      {allReviews && allReviews.length > 0 ? (
        <div className="mt-8 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Product Title
                  </th>
                  <th
                    scope="col"
                    className="w-40 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Review
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {displayedreviews.map((review, index) => (
                  <tr key={review?._id} className="">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                      <h1>{review?.productName}</h1>
                    </td>
                    <td className="w-60 px-3 py-4 text-sm text-gray-900 break-words">
                      <p className="text-xs font-semibold text-gray-700 hover:cursor-default">
                        Review By:{" "}
                        <span className="text-orange-600">
                          {review?.userFullName}
                        </span>
                      </p>
                    </td>
                    <td className="px-3 py-4 text-sm text-orange-600">
                      <div className="flex items-center gap-x-1">
                        <FaStar />
                        <p>{review?.rating}</p>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <p>{review?.review}</p>
                    </td>
                    <td className="py-4 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      {review &&
                      review?.isActive === true &&
                      review?.isDeleted === false ? (
                        <IoTrashBinOutline
                          onClick={()=> handleDeleteProd(review?._id)}
                          className="text-red-600 duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
                        />
                      ) : (
                        <FaUndo
                          onClick={()=>handleActivateProd(review?._id)}
                          className="text-green-600 duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {allReviews && allReviews.length > 5 ? (
            <div className="py-3 px-4 sm:px-6 lg:px-8">
              <Paginations
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="mt-10 w-full flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-500">
            No Reviews Available
          </h1>
        </div>
      )}
    </div>
  );
}
