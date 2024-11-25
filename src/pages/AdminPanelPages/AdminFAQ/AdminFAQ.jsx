import React, { useContext, useEffect, useState } from "react";
import AdminAllFaqTable from "../../../components/AdminDashCompos/AdminAllFaqTable/AdminAllFaqTable";
import useRequest from "../../../APIServices/useRequest";
import { AuthContext } from "../../../providers/AuthProviders";
import Swal from "sweetalert2";

function AdminFAQ() {
  const { user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [faqData, setFaqData] = useState({ question: "", answer: "" });
  const [allFAQ, setAllFAQ] = useState([]);
  const [crtState, setCrtState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [dltState, setDltState] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState(selectedFaq?.question || "");
  const [editAnswer, setEditAnswer] = useState(selectedFaq?.answer || "");

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setFaqData({ question: "", answer: "" });
  };

  const fetchAllFAQs = async () => {
    try {
      const fetchData = await getRequest("/faq/src/all");
      setAllFAQ(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllFAQs();
  }, [crtState, editState]);

  const handleCreateFaq = async () => {
    const createFq = await postRequest("/faq/crt", {
      userId: user?._id,
      question: faqData.question,
      answer: faqData.answer,
    });
    if (createFq?.data?.error === false) {
      Swal.fire("Created FAQ");
      setCrtState(!crtState);
      handleCloseCreateModal();
    } else {
      Swal.fire("Failed to Create");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = (faq) => {
    setSelectedFaq(faq);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFaq(null);
    setIsModalOpen(false);
  };

  const handleDeleteFaq = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const saveEditData = await postRequest(
      `/faq/src/updt/${selectedFaq?._id}`,
      { question: editQuestion, answer: editAnswer }
    );

    if (saveEditData?.data?.error === false) {
      Swal.fire("Updated the FAQ successfully");
      handleModalClose();
      setEditState(!editState);
    }
  };

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 py-10 bg-white">
      <div className="w-full flex items-center justify-between px-6 py-6 bg-white shadow rounded-md">
        <div className="flex items-center space-x-5">
          <div className="w-1 h-6 bg-orange-600 rounded"></div>
          <h2 className="text-xl font-semibold">ALL FAQs</h2>
        </div>

        <div className="flex items-center gap-x-5">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search by Title"
              className="px-8 py-2 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-orange-600"
            />
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              🔍
            </span>
          </div> */}

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 text-white bg-orange-600 rounded-3xl hover:bg-orange-500"
          >
            + Add FAQs
          </button>
        </div>
      </div>

      <div className="mt-5 h-full">
        <AdminAllFaqTable
          allFAQ={allFAQ}
          selectedFaq={selectedFaq}
          isModalOpen={isModalOpen}
          editQuestion={editQuestion}
          editAnswer={editAnswer}
          setEditQuestion={setEditQuestion}
          setEditAnswer={setEditAnswer}
          handleSaveChanges={handleSaveChanges}
          handleDeleteFaq={handleDeleteFaq}
          handleEditClick={handleEditClick}
          handleModalClose={handleModalClose}
        />
      </div>

      {/* Create FAQ Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New FAQ</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Question</label>
              <input
                type="text"
                name="question"
                value={faqData.question}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Answer</label>
              <textarea
                name="answer"
                value={faqData.answer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-600"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseCreateModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFaq}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFAQ;
