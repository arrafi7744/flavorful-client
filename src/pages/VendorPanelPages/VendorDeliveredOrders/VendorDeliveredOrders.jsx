import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import useRequest from "../../../APIServices/useRequest";
import VendorsAllDeliveredOrderTable from "../../../components/VendorsCompos/VendorsAllDeliveredOrderTable/VendorsAllDeliveredOrderTable";

function VendorDeliveredOrders() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [allDeliveredOrders, setAllDeliveredOrders] = useState([]);

  const fetchAllDeliveredOrders = async () => {
    try {
      const fetchData = await getRequest(
        `/orders/src/delivered/orders/bysellerid/${user?._id}`
      );
      setAllDeliveredOrders(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllDeliveredOrders();
  }, []);

  return (
    <>
      {allDeliveredOrders && allDeliveredOrders.length > 0 ? (
        <>
          {user && user.userType === 101 && (
            <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
              <div className="w-full bg-white rounded px-10 pt-10">
                <GlobalHeaders title={"All Delivered Orders"} />
              </div>

              <div className="bg-white w-full pb-10 rounded">
                <VendorsAllDeliveredOrderTable
                  allDeliveredOrders={allDeliveredOrders}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-400 w-full flex items-center justify-center mt-10 pb-10">
          <h1>No Delivered Orders Yet !!</h1>
        </div>
      )}
    </>
  );
}

export default VendorDeliveredOrders;
