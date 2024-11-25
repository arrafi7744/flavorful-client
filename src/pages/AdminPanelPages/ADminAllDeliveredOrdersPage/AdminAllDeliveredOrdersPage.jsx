import React, { useContext, useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import AdminAllDeliveredOrdersTable from "../../../components/AdminDashCompos/AdminAllDeliveredOrdersTable/AdminAllDeliveredOrdersTable";
import useRequest from "../../../APIServices/useRequest";
import { AuthContext } from "../../../providers/AuthProviders";

function AdminAllDeliveredOrdersPage() {
  const [postRequest, getRequest] = useRequest();
  const { loading, setLoading } = useContext(AuthContext);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const fetchOrderList = async () => {
    try {
      setLoading(true);
      const orderData = await getRequest("/orders/src/delivered/all");
      setDeliveredOrders(orderData?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 pb-10 bg-white">
      <div className="w-full bg-white rounded px-10 pt-10">
        <GlobalHeaders
          title={"All Delivered Orders"}
          // searchFilter={'Customer Name'}
        />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        {loading === true ? (
          <div className="w-full h-[20vh] flex items-center justify-center text-4xl font-extrabold text-gray-400">
            <h1 className="animate-pulse">Data Fetching .....</h1>
          </div>
        ) : (
          <AdminAllDeliveredOrdersTable deliveredOrders={deliveredOrders} />
        )}
      </div>
    </div>
  );
}

export default AdminAllDeliveredOrdersPage;
