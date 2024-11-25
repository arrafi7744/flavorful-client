import React, { useState } from "react";
import Paginations from "../../GlobalComponents/Paginations/Paginations";

export default function AdminAllFaqTable({
  allFAQ,
  selectedFaq,
  isModalOpen,
  setEditQuestion,
  setEditAnswer,
  editQuestion,
  editAnswer,
  handleSaveChanges,
  handleDeleteFaq,
  handleEditClick,
  handleModalClose,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewFaqContent, setViewFaqContent] = useState(null);
  const entriesPerPage = 6;
  const totalPages = Math.ceil(allFAQ.length / entriesPerPage);

  const displayedFaqs = allFAQ.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewClick = (faq) => {
    setViewFaqContent(faq);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setViewFaqContent(null);
  };

  return (
    <div className="container mx-auto px-6 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {displayedFaqs.map((faq) => (
          <div
            key={faq?._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-sm break-words">
                {faq.answer.length > 100
                  ? `${faq.answer.slice(0, 100)}...`
                  : faq.answer}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => handleViewClick(faq)}
                className="px-4 py-1 bg-geen-600 text-white text-xs rounded hover:bg-green-800"
              >
                View
              </button>
              <button
                onClick={() => handleEditClick(faq)}
                className="px-4 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFaq(faq?._id)}
                className="px-4 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {allFAQ.length > entriesPerPage && (
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* View Modal */}
      {viewModalOpen && viewFaqContent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">{viewFaqContent.question}</h2>
            <p className="text-gray-700 mb-6">{viewFaqContent.answer}</p>
            <div className="flex justify-end">
              <button
                onClick={handleViewModalClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && selectedFaq && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Edit FAQ</h2>
            <form onSubmit={handleSaveChanges}>
              <label className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Answer
              </label>
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
