import React, { useEffect, useState } from "react";

function UserUpdateInformationCompo({ customerDetails, user, updateUserInfo, formData, setFormData }) {

  const [hasChanged, setHasChanged] = useState({});
  const [isAnyFieldChanged, setIsAnyFieldChanged] = useState(false);

  useEffect(() => {
    if (user && customerDetails) {
      setFormData({
        userName: user.userName || "",
        userFullName: user.userFullName || "",
        userEmail: user.userEmail || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "",
        shippingAddress: customerDetails.shippingAddress || "",
        shippingState: customerDetails.shippingState || "",
        shippingPostalCode: customerDetails.shippingPostalCode || "",
      });
    }
  }, [user, customerDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const originalValue = user[name] || customerDetails[name];

    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldChanged = value !== originalValue;
    setHasChanged((prev) => ({ ...prev, [name]: fieldChanged }));

    setIsAnyFieldChanged(
      Object.values({ ...hasChanged, [name]: fieldChanged }).some(Boolean)
    );
  };

  const handleUpdate = () => {
    const updatedData = Object.keys(hasChanged)
      .filter((key) => hasChanged[key])
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});

    updateUserInfo(updatedData);
    setHasChanged({});
    setIsAnyFieldChanged(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-0 md:p-6 bg-white">
      {/* UserName Field */}
      <div className="relative flex flex-col">
        <label htmlFor="userName" className="mb-1 text-gray-600 capitalize">
          Username
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* UserFullName Field */}
      <div className="relative flex flex-col">
        <label htmlFor="userFullName" className="mb-1 text-gray-600 capitalize">
          Full Name
        </label>
        <input
          type="text"
          id="userFullName"
          name="userFullName"
          value={formData.userFullName}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* UserEmail Field */}
      <div className="relative flex flex-col">
        <label htmlFor="userEmail" className="mb-1 text-gray-600 capitalize">
          Email
        </label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="relative flex flex-col">
        <label htmlFor="phoneNumber" className="mb-1 text-gray-600 capitalize">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Gender Field */}
      <div className="relative flex flex-col">
        <label htmlFor="gender" className="mb-1 text-gray-600 capitalize">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* ShippingAddress Field */}
      <div className="relative flex flex-col">
        <label
          htmlFor="shippingAddress"
          className="mb-1 text-gray-600 capitalize"
        >
          Shipping Address
        </label>
        <input
          type="text"
          id="shippingAddress"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* ShippingState Field */}
      <div className="relative flex flex-col">
        <label
          htmlFor="shippingState"
          className="mb-1 text-gray-600 capitalize"
        >
          Shipping State
        </label>
        <input
          type="text"
          id="shippingState"
          name="shippingState"
          value={formData.shippingState}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* ShippingPostalCode Field */}
      <div className="relative flex flex-col">
        <label
          htmlFor="shippingPostalCode"
          className="mb-1 text-gray-600 capitalize"
        >
          Postal Code
        </label>
        <input
          type="text"
          id="shippingPostalCode"
          name="shippingPostalCode"
          value={formData.shippingPostalCode}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {isAnyFieldChanged && (
        <div className="col-span-2">
          <button
            onClick={handleUpdate}
            className="w-full px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-700"
          >
            Update Changed Fields
          </button>
        </div>
      )}
    </div>
  );
}

export default UserUpdateInformationCompo;
