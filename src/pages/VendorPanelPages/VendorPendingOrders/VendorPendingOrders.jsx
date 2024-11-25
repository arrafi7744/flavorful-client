import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import VendorsAllPendingOrdersTable from "../../../components/VendorsCompos/VendorsAllPendingOrdersTable/VendorsAllPendingOrdersTable";
import useRequest from "../../../APIServices/useRequest";
import Swal from "sweetalert2";

function VendorPendingOrders() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmState, setConfirmState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const fetchAllPendingOrders = async () => {
    try {
      const fetchOrders = await getRequest(
        `/orders/src/pending/orders/bysellerid/${user?._id}`
      );
      setPendingOrders(fetchOrders?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPendingOrders();
  }, [confirmState, deleteState]);


  const confirmOrders = async (id) =>{
    try{
        const confirmData = await getRequest(`/orders/confirm/byid/${id}`);
        if(confirmData?.data?.error === false){
          Swal.fire("Confirmed the Order");
          setConfirmState(!confirmState);
        };
    }catch(error){
      console.log(error);
    }
  }

  const deletePendingOrders = async (id) =>{
    try{
      const dlt = await getRequest(`/orders/cancel/byid/${id}`);
      if(dlt?.data?.error === false){
        Swal.fire("Pending Order Cancelled");
        setDeleteState(!deleteState);
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {user && user.userType === 101 && (
       <>
        {pendingOrders && pendingOrders.length > 0 ?  <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
          <div className="w-full bg-white rounded px-10 pt-10">
            <GlobalHeaders title={"All Pending Orders"} />
          </div>

          <div className="bg-white w-full pb-10 rounded">
            <VendorsAllPendingOrdersTable
              pendingOrdersList={pendingOrders}
              confirmOrders={confirmOrders}
              deletePendingOrders={deletePendingOrders}
            />
          </div>
        </div> : <div className="w-full flex items-center justify-center text-xl font-bold text-gray-400"><h1>No Pending Orders Yet</h1></div>}
       </>
      )}
    </>
  );
}

export default VendorPendingOrders;
