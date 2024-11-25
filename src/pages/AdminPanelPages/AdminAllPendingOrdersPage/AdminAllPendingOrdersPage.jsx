import React, { useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import AdminPendingOrderTable from "../../../components/AdminDashCompos/AdminPendingOrderTable/AdminPendingOrderTable";
import useRequest from "../../../APIServices/useRequest";

function AdminAllPendingOrdersPage() {
  const [postRequest, getRequest] = useRequest();
  const [pendingOrdersList, setPendingOrdersList] = useState([]);

  const fetchPendingOrders = async () => {
    const fetchingData = await getRequest("/orders/src/pending/all");
    setPendingOrdersList(fetchingData?.data?.data);
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 pb-10 bg-white">
      <div className="w-full bg-white rounded px-10 pt-10">
        <GlobalHeaders
          title={"All Pending Orders"}
          // searchFilter={"Customer Name"}
        />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        {pendingOrdersList?.length > 0 ? <AdminPendingOrderTable pendingOrdersList={pendingOrdersList} /> : <div className="mt-5 text-xl flex justify-center text-gray-400"><h1>No Pending Orders Available</h1></div>}
      </div>
    </div>
  );
}

export default AdminAllPendingOrdersPage;
