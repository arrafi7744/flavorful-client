import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";

function AdminPendingOrderTableItems({ person }) {
  const [postRequest, getRequest] = useRequest();
  const [sellers, setSellers] = useState([]);

  console.log("person pending orders data", person);

  const fetchSellerInfo = async () => {
    try {
      const fetchData = await getRequest(`/users/src/byId/${person?.sellerId}`);
      setSellers(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSellerInfo();
  }, []);

  return (
    <tr>
      <td className="whitespace-nowrap py-5 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">{person.userName}</div>
            <div className="mt-1 text-gray-500">{person.email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap py-5 text-sm text-left pl-8 text-gray-500">
        {person?.totalQuantity ? person?.totalQuantity : 0} Kg
      </td>
      <td className="whitespace-nowrap py-5 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="">
            <div className="font-medium text-gray-900">
              {sellers?.userFullName}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {person?.productSellingPrice ? person?.productSellingPrice : 0} TK
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {person?.allTotalPrice ? person?.allTotalPrice : 0} TK
      </td>
    </tr>
  );
}

export default AdminPendingOrderTableItems;
