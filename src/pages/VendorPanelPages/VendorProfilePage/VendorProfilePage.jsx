import React, { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import Swal from "sweetalert2";

function VendorProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [postRequest] = useRequest();
  const [modalData, setModalData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAvatarLetter = () => {
    return user?.userFullName ? user.userFullName.charAt(0).toUpperCase() : "U";
  };

  const openModal = (field, value) => {
    setModalData({ field, value });
    setInputValue(value);
  };

  const handleSave = async () => {
    setIsLoading(true);

    const getCookie = JSON.parse(localStorage.getItem("userCreds"));

    if (!modalData || !inputValue || !modalData.field) {
      Swal.fire("Error", "Missing field data", "error");
      setIsLoading(false);
      return;
    }

    const payload = { [modalData.field]: inputValue };
    // console.log(payload, "Modal Data");
    try {
      const response = await postRequest(`/users/upt/${user._id}`, {
        updatedInfo: payload,
      });

      const newData = {
        ...getCookie,
        ...payload
      }

      localStorage.setItem("userCreds", JSON.stringify(newData));
      if (response && response.status === 200) {
        setUser({ ...user, ...payload });
        Swal.fire("Update Successful", "", "success");
        setModalData(null);
      } else {
        Swal.fire("Update Failed", "Please try again.", "error");
      }
    } catch (error) {
      console.error("Error during save:", error);
      Swal.fire("Error", error.message || "An unknown error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Vendor Profile
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Vendor Name",
                value: user?.userFullName,
                field: "userFullName",
              },
              { label: "Email", value: user?.userEmail, field: "userEmail" },
              {
                label: "Contact",
                value: user?.phoneNumber,
                field: "phoneNumber",
              },
              { label: "Username", value: user?.userName, field: "userName" },
              { label: "Gender", value: user?.gender, field: "gender" },
            ].map(({ label, value, field }) => (
              <div key={field} className="flex items-center gap-2 group">
                <span className="w-32 text-gray-500 font-medium">{label}:</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">{value || "N/A"}</span>
                  <button
                    onClick={() => openModal(field, value)}
                    className="text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl font-bold">
          {getAvatarLetter()}
        </div>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit {modalData.field}</h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalData(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorProfilePage;
