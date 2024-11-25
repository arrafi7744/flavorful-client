import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import VendorsConfirmOrdersTable from "../../../components/VendorsCompos/VendorsConfirmOrdersTable/VendorsConfirmOrdersTable";
import useRequest from "../../../APIServices/useRequest";

function VendorConfirmedOrders() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  const fetchConfirmedOrders = async () => {
    try {
      const fetchData = await getRequest(
        `/orders/src/confirmed/orders/bysellerid/${user?._id}`
      );
      setConfirmedOrders(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConfirmedOrders();
  }, []);

  return (
    <>
      {confirmedOrders && confirmedOrders.length > 0 ? (
        <>
          {user && user.userType === 101 && (
            <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
              <div className="w-full bg-white rounded px-10 pt-10">
                <GlobalHeaders title={"All Confirmed Orders"} />
              </div>

              {confirmedOrders && confirmedOrders.length > 0 ? (
                <div className="bg-white w-full pb-10 rounded">
                  <VendorsConfirmOrdersTable
                    confirmedOrders={confirmedOrders}
                    // confirmOrders={confirmOrders}
                    // deletePendingOrders={deletePendingOrders}
                  />
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-400 w-full flex items-center justify-center mt-10 pb-10">
                  <h1>No Confirmed Orders Yet !!</h1>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-xl font-bold text-gray-400 w-full flex items-center justify-center mt-0 pb-10">
          <h1>No Confirmed Orders Yet !!</h1>
        </div>
      )}
    </>
  );
}

export default VendorConfirmedOrders;
