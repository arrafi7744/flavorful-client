import React, { useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import AdminCancelledOrdersPage from "../../../components/AdminDashCompos/AdminCancelledOrdersTable/AdminCancelledOrdersTable";
import useRequest from "../../../APIServices/useRequest";

function AdminAllCancelledOrdersPage() {
  const [, getRequest] = useRequest();
  const [allCancelledOrders, setAllCancelledOrders] = useState([]);

  const fetchCancelledOrders = async()=>{
    try{
        const ordersList = await getRequest('/orders/src/cancel/all');
        setAllCancelledOrders(ordersList?.data?.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchCancelledOrders();
  },[])


  console.log(allCancelledOrders);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 pb-10 bg-white">
      <div className="w-full bg-white rounded px-10 pt-10">
        <GlobalHeaders title={'All Cancelled Orders'} 
        // searchFilter={'Customer Name'}
        />
      </div>

      <div className="bg-white w-full pb-10 rounded">
       <AdminCancelledOrdersPage allCancelledOrders={allCancelledOrders}/>
      </div>
    </div>
  );
}

export default AdminAllCancelledOrdersPage;
