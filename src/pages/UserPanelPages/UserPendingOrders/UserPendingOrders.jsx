import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import UserPendingOrdersTable from "../../../components/UserDashCompos/UserPendingOrdersTable/UserPendingOrdersTable";
import Swal from "sweetalert2";

function UserPendingOrders() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deleteState, setDeleteState] = useState(false);

  const fetchAllPendingOrders = async () => {
    try {
      const fetchData = await postRequest("/orders/src/pending/all/byusr", {
        userId: user?._id,
      });
      setPendingOrders(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPendingOrders();
  }, [deleteState]);


  const deletePendingOrders = async (id) => {
    try{
      const deletedData = await getRequest(`/orders/cancel/byid/${id}`);
      if(deletedData?.data?.error === false){
        Swal.fire("Cancelled the Orders");
        setDeleteState(!deleteState);
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full rounded-lg shadow-md px-0 md:px-10 bg-white">
      <div className="w-full bg-white rounded px-2 md:px-10 pt-0 md:pt-10">
        <GlobalHeaders title={"All Pending Orders"} />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        {pendingOrders?.length > 0 ? (
          <UserPendingOrdersTable pendingOrdersList={pendingOrders} deletePendingOrders={deletePendingOrders}/>
        ) : (
          <div className="mt-5 text-xl flex justify-center text-gray-400">
            <h1>No Pending Orders Available</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPendingOrders;
