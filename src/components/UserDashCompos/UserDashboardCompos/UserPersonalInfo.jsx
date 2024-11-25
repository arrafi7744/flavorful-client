import React from "react";

function UserPersonalInfo({ customerDetails, user }) {
  return (
    <div className="mt-5 flex flex-col md:flex-row justify-between">
      <div>
        <p className="font-semibold">
          Username: <span className="ml-2 font-normal">{user?.userName}</span>
        </p>
        <p className="mt-2 font-semibold">
          Full Name:{" "}
          <span className="ml-2 font-normal">{user?.userFullName}</span>
        </p>
        <p className="mt-2 font-semibold">
          Email: <span className="ml-2 font-normal">{user?.userEmail}</span>
        </p>
        <p className="mt-2 font-semibold">
          Phone Number:{" "}
          <span className="ml-2 font-normal">{user?.phoneNumber}</span>
        </p>
        <p className="mt-2 font-semibold">
          Gender: <span className="ml-2 font-normal">{user?.gender}</span>
        </p>
      </div>
      <div className="mt-2 md:mt-0">
        <p className="font-semibold">
          Country: <span className="ml-2 font-normal">Bangladesh</span>
        </p>
        <p className="mt-2 font-semibold">
          State:{" "}
          <span className="ml-2 font-normal">
            {customerDetails?.shippingState}
          </span>
        </p>
        <p className="mt-2 font-semibold">
          Address:{" "}
          <span className="ml-2 font-normal">
            {customerDetails?.shippingAddress}
          </span>
        </p>
        <p className="mt-2 font-semibold">
          Postal Code:{" "}
          <span className="ml-2 font-normal">
            {customerDetails?.shippingPostalCode}
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserPersonalInfo;
