import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";

function AdminAllDeliveredOrdersTableItem({ order, index }) {
  const [postRequest, getRequest] = useRequest();
  const [vendorData, setVendorData] = useState([]);

  const fetchVendorData = async () => {
    try {
      const fetchData = await getRequest(`/users/src/byId/${order?.sellerId}`);
      setVendorData(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);


  return (
    <tr>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <img
              className="h-11 w-11 rounded-full"
              src={`${process.env.REACT_APP_BackendURLIMG}/images/${order?.productThumb}`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {order?.productName}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap py-5 text-sm text-left pl-10 text-gray-500">
        {order?.totalQuantity} Kg
      </td>
      <td className="whitespace-nowrap py-5 text-sm text-left pl-0 text-gray-500">
        {vendorData?.userFullName}
      </td>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {order.userFullName}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {order.allTotalPrice} Tk
      </td>
    </tr>
  );
}

export default AdminAllDeliveredOrdersTableItem;
