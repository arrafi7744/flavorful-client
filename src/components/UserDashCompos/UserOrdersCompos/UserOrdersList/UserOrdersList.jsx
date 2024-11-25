import React, { useEffect, useState } from "react";

function UserOrdersList({ order, index, onSelect, isSelected }) {
  const [currentState, setCurrentState] = useState(null);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  const orderStateHandle = async () => {
    try {
      if (order.isCanceled === true) {
        setCurrentState("Cancelled");
      } else if (
        order.isConfirmed === true &&
        order.isLaunched === true &&
        order.isDelivered === false
      ) {
        setCurrentState("Released");
      } else if (order.isPending === true) {
        setCurrentState("Processing");
      } else if (order.isDelivered === true) {
        setCurrentState("Delivered");
      } else {
        setCurrentState("Cancelled");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderStateHandle();
  }, [order]);

  // Define color based on the current state
  const getStatusColor = () => {
    switch (currentState) {
      case "Cancelled":
        return "text-red-500";
      case "Released":
        return "text-blue-500";
      case "Processing":
        return "text-green-500";
      case "Delivered":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={`ml-5 md:ml-0 py-3 px-3 border rounded-lg mb-5 cursor-pointer hover:bg-orange-50 ${
        isSelected ? "border-green-600" : "border-orange-600"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xs font-semibold">
          Order <span className="text-orange-600">{index}</span>
        </h1>
        <div className="text-xs flex items-center gap-x-2">
          <p className="font-semibold">Order Status:</p>
          <p className={`${getStatusColor()} font-extrabold`}>{currentState}</p>
        </div>
      </div>
      <div className="mt-5 text-xs font-semibold">
        <div className="mb-2 flex items-center justify-between">
          <p>Product Name: </p>
          <p>{order.productName}</p>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p>Total Quantity:</p>
          <p>{order.totalQuantity} Kg</p>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p>Order Placing Date:</p>
          <p>{formatDate(order.createdDate)}</p>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <p>Total Price:</p>
          <p>{order.allTotalPrice} TK</p>
        </div>
        <div className="h-0.5 border-2 border-orange-300"></div>
        <div className="mt-2 mb-2 flex items-center justify-between">
          <p>Delivery Shift:</p>
          <p>{order.deliveryShift || ""}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Delivery Price:</p>
          <p>{order.deliveryFee || 0} TK</p>
        </div>
      </div>
    </div>
  );
}

export default UserOrdersList;
