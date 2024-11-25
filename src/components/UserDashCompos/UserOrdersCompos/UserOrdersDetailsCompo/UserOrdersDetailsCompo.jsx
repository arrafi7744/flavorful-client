import React, { useEffect, useState } from 'react';

function UserOrdersDetailsCompo({ order, index, handleOrderDelivered }) {
  const [currentState, setCurrentState] = useState(null);

  const orderStateHandle = async () => {
    try {
      if (order.isCancelled === true) {
        setCurrentState('Cancelled');
      } else if (
        order.isConfirmed === true &&
        order.isLaunched === true &&
        order.isDelivered === false
      ) {
        setCurrentState('Released');
      } else if (order.isPending === true) {
        setCurrentState('Processing');
      } else if (order.isDelivered === true) {
        setCurrentState('Delivered');
      } else {
        setCurrentState('Cancelled');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderStateHandle();
  }, [order]);

  // Function to determine color class based on currentState
  const getStateColor = () => {
    switch (currentState) {
      case 'Cancelled':
        return 'text-red-600';
      case 'Released':
        return 'text-blue-600';
      case 'Processing':
        return 'text-green-600';
      case 'Delivered':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="mt-40 md:mt-0 mx-0 md:mx-5 h-full">
      <h1 className="font-bold md:text-lg">
        Details of Order No: <span className="text-orange-600">{index}</span>
      </h1>
      {/* Scrollable container for mobile */}
      <div className="mt-5 md:border-2 rounded-lg px-0 md:px-5 py-0 md:py-5 overflow-y-auto max-h-[80vh] md:max-h-none">
        {/* Content remains unchanged */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-x-2 justify-start font-semibold">
            <h1>Cart ID:</h1>
            <p className="text-orange-600">{order?.cartId}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="font-bold">Order Status: </h1>
            <div className={`font-extrabold ${getStateColor()}`}>
              <p>{currentState}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-x-2 justify-start font-semibold"></div>
            <div className="flex items-center gap-x-2 justify-start font-semibold">
              {order.isConfirmed &&
              order.isLaunched === true &&
              order.isDelivered === false ? (
                <div className="flex items-center gap-1 text-seventh font-semibold text-sm">
                  <h1 className="text-xs">Is Product Delivered ?</h1>
                  <button
                    onClick={() => handleOrderDelivered(order._id)}
                    className="px-4 py-1 font-bold rounded-lg shadow-md bg-green-700 text-white duration-700 hover:cursor-pointer hover:duration-700 hover:bg-green-400"
                  >
                    Yes
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Other content */}
        <div className="mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-12 items-start">
          <div className="col-span-8 text-left">
            <div className="">
              <h1 className="font-bold">Shipping Address: </h1>
              <p className="text-sm">{order?.userAddress}</p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold">Billing Address: </h1>
              <p className="text-sm">{order?.userAddress}</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:pl-5 col-span-4 text-left text-sm md:border-l-2">
            <div className="flex items-center justify-between">
              <h1 className="">Product Price: </h1>
              <p className="">{order?.productSellingPrice} TK</p>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="">Product Quantity: </h1>
              <p className="">{order?.totalQuantity} Kg</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h1 className="">Sub Total: </h1>
              <p className="">
                {order.productSellingPrice * order?.totalQuantity} TK
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="">Discount: </h1>
              <p className="">{order?.discount} %</p>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <h1 className="">Delivery Fee: </h1>
              <p className="">{order?.deliveryFee} TK</p>
            </div>
            <hr />
            <div className="mt-2 flex items-center justify-between font-extrabold">
              <h1 className="">Total Cost: </h1>
              <p className="">{order?.allTotalPrice} TK</p>
            </div>
          </div>
        </div>

        {/* Table content */}
        <div className="my-10 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Product
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Quantity
                </th>
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Products Price
                </th>
                {/* <th className="text-left p-4 text-gray-700 font-semibold">
                  Delivery Fee
                </th> */}
                <th className="text-left p-4 text-gray-700 font-semibold">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center">
                  <img
                    src={`${process.env.REACT_APP_BackendURLIMG}/images/${order?.productThumb}`}
                    alt="Product"
                    className="hidden md:block w-12 h-12 mr-4 rounded-full object-cover border-2 border-orange-600"
                  />
                  <span>{order?.productName}</span>
                </td>
                <td className="p-4 pl-5 md:pl-0">{order?.totalQuantity} Kg</td>
                <td className="p-4">TK {order?.productSellingPrice}</td>
                {/* <td className="p-4">TK {order?.deliveryFee}</td> */}
                <td className="p-4">TK {order?.allTotalPrice}</td>
              </tr>
            </tbody>
          </table>
          <div className="block md:hidden mt-5 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default UserOrdersDetailsCompo;
