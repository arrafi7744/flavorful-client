import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";

function AdminAllConfirmedOrdersTableItems({ order }) {
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
      <td className="whitespace-nowrap py-5 text-sm text-left pl-8 text-gray-500">
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
      {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {order.deliveryFee} $
                      </td> */}

      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {order.allTotalPrice} Tk
      </td>
      {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Active
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 text-center text-sm font-medium sm:pr-0">
                    <p className="text-indigo-600 hover:text-indigo-900">
                      Edit<span className="sr-only">, {order.name}</span>
                    </p>
                  </td> */}
    </tr>
  );
}

export default AdminAllConfirmedOrdersTableItems;
