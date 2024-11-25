import React, { useContext, useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import UserPendingOrdersTable from "../../../components/UserDashCompos/UserPendingOrdersTable/UserPendingOrdersTable";
import UserCancelledOrdersTable from "../../../components/UserDashCompos/UserCancelledOrdersTable/UserCancelledOrdersTable";

function UserCancelledOrders() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const fetchAllCancelledOrders = async () => {
    try {
      const fetchData = await postRequest("/orders/src/cancel/all/byusr", {
        userId: user?._id,
      });
      setCancelledOrders(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCancelledOrders();
  }, []);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-0 md:px-10 bg-white">
      <div className="w-full bg-white rounded px-2 md:px-10 pt-0 md:pt-10">
        <GlobalHeaders title={"All Cancelled Orders"} />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        {cancelledOrders && cancelledOrders?.length >= 0 ? (
          <UserCancelledOrdersTable cancelOrderList={cancelledOrders} />
        ) : (
          <div className="mt-5 text-xl flex justify-center text-gray-400">
            <h1>No Cancelled Orders Available</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCancelledOrders;
