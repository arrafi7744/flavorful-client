import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import VendorsAllCancelledOrderTablre from "../../../components/VendorsCompos/VendorsAllCancelledOrderTable/VendorsAllCancelledOrderTable";

function VendorCancelledOrders() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [allCancelledOrders, setAllCancelledOrders] = useState([]);

  const fetchAllCancelledOrders = async () => {
    try {
      const fetchData = await getRequest(
        `/orders/src/cancelled/orders/bysellerid/${user?._id}`
      );
      setAllCancelledOrders(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCancelledOrders();
  }, []);

  console.log(allCancelledOrders, "All Cancelled Orders");

  return (
    <>
      {allCancelledOrders && allCancelledOrders.length > 0 ? (
        <>
          {user && user.userType === 101 && (
            <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
              <div className="w-full bg-white rounded px-10 pt-10">
                <GlobalHeaders title={"All Cancelled Orders"} />
              </div>

              <div className="bg-white w-full pb-10 rounded">
                <VendorsAllCancelledOrderTablre
                  allCancelledOrders={allCancelledOrders}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-2xl font-bold text-gray-400 w-full flex items-center justify-center mt-10 pb-10">
          <h1>No Cancelled Orders Yet !!</h1>
        </div>
      )}
    </>
  );
}

export default VendorCancelledOrders;
