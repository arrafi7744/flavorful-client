import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";

function UserReceiptsOrderItems({ orderItem }) {
  const [postRequest, getRequest] = useRequest();
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    try {
      const fetchData = await getRequest(`/orders/src/orderId/${orderItem}`);
      const data = fetchData?.data?.data
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);
  

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 flex items-center h-full">
        <img
          src={`${process.env.REACT_APP_BackendURLIMG}/images/${orderData?.productThumb}`}
          alt="Product"
          className="hidden md:block w-12 h-12 mr-4 rounded-full object-cover border-2 border-orange-600"
        />
        <span>{orderData?.productName}</span>
      </td>
      <td className="p-4 text-left pl-10 md:pl-5">
        {orderData?.totalQuantity} Kg
      </td>
      <td className="p-4">TK {orderData?.productSellingPrice}</td>
      <td className="p-4">TK {orderData?.allTotalPrice}</td>
    </tr>
  );
}

export default UserReceiptsOrderItems;
