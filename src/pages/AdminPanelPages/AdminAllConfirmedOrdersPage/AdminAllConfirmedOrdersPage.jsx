import React, { useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import AdminAllConfirmedOrdersTable from "../../../components/AdminDashCompos/AdminAllConfirmedOrdersTable/AdminAllConfirmedOrdersTable";
import useRequest from "../../../APIServices/useRequest";

function AdminAllConfirmedOrdersPage() {
  const [, getRequest] = useRequest();
  const [confirmedOrders, setConfirmedOrders] = useState([]);

const fetchOrdersList = async () =>{
  try{
    const orderData = await getRequest('/orders/src/confirmed/all');
    setConfirmedOrders(orderData?.data?.data);
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  fetchOrdersList();
},[])

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 pb-10 bg-white">
      <div className="w-full bg-white rounded px-10 pt-10">
        <GlobalHeaders
          title={"All Confirmed Orders"}
          // searchFilter={"Customer Name"}
        />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        <AdminAllConfirmedOrdersTable confirmedOrders={confirmedOrders} />
      </div>
    </div>
  );
}

export default AdminAllConfirmedOrdersPage;
 