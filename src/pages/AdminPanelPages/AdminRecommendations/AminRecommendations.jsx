import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";

function AminRecommendations() {
  const [postRequest, getRequest] = useRequest();
  const [allComplains, setAllComplains] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchAllComplains = async () => {
    try {
      const fetchData = await getRequest("/contact/src/all");
      setAllComplains(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllComplains();
  }, []);

  return (
    <div className="flex flex-col items-center px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        User Recommendations
      </h1>
      {allComplains && allComplains.length > 0 ? (
        <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allComplains.map((rec) => (
            <div
              key={rec.id}
              className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
              title={rec.description} // Tooltip with full description
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {rec.userFullName}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{rec.email}</p>
                <h3 className="text-lg font-medium text-blue-600 mb-2">
                  {rec.subject}
                </h3>
                <p className="text-gray-700 mb-4">
                  {rec.description.length > 50
                    ? `${rec.description.substring(0, 50)}...`
                    : rec.description}
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => setSelectedComplaint(rec)}
                  className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors duration-200 w-full"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl font-medium text-center text-gray-500 mt-12">
          <h1>No Complains Passed Yet!</h1>
        </div>
      )}

      {/* Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full px-8 py-6 relative">
            <button
              onClick={() => setSelectedComplaint(null)}
              className="w-10 h-10 absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-500 transition duration-200"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedComplaint.subject}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>User:</strong> {selectedComplaint.userFullName}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Email:</strong> {selectedComplaint.email}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong>
            </p>
            <p className="text-gray-700 leading-relaxed">
              {selectedComplaint.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AminRecommendations;
