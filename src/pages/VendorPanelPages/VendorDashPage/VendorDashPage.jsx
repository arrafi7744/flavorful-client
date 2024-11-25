import React, { useContext, useEffect, useState } from "react";
import SummaryDataCards from "../../../components/GlobalComponents/SummaryDataCards/SummaryDataCards";
import { Link } from "react-router-dom";

// import { FcMoneyTransfer } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcFactoryBreakdown } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import useRequest from "../../../APIServices/useRequest";
import { AuthContext } from "../../../providers/AuthProviders";
import { FcShop } from "react-icons/fc";

function VendorDashPage() {
  const { user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [totalRevenues, setTotalRevenues] = useState(0);
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalPendingOrders, setTotalPendingOrders] = useState([]);
  const [totalConfirmedOrders, setTotalConfirmedOrders] = useState([]);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState([]);
  const [totalCancelledOrders, setTotalCancelledOrders] = useState([]);
  const [totalShops, setTotalShops] = useState([]);

  const fetchVendorRevenues = async () => {
    const fetchData = await postRequest("/products/src/rev/byusr", {
      userId: user?._id,
    });
    setTotalRevenues(fetchData?.data?.data?.totalRevenue);
  };

  const fetchTotalProducts = async () => {
    try {
      const data = await postRequest("/products/src/all/byusrid", {
        userId: user?._id,
      });

      setTotalProducts(data?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalShops = async () => {
    try {
      const fetchData = await postRequest("/shop/src/alshop/byuserid", {
        userId: user?._id,
      });
      setTotalShops(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingOrders = async () => {
    try {
      const fetechedData = await getRequest(
        `/orders/src/pending/orders/bysellerid/${user?._id}`
      );
      setTotalPendingOrders(fetechedData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCancelOrders = async () => {
    try {
      const fetechedData = await getRequest(
        `/orders/src/cancelled/orders/bysellerid/${user?._id}`
      );
      setTotalCancelledOrders(fetechedData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConfirmOrders = async () => {
    try {
      const fetechedData = await getRequest(
        `/orders/src/confirmed/orders/bysellerid/${user?._id}`
      );
      setTotalConfirmedOrders(fetechedData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeliveredOrders = async () => {
    try {
      const fetechedData = await getRequest(
        `/orders/src/delivered/orders/bysellerid/${user?._id}`
      );
      setTotalDeliveredOrders(fetechedData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorRevenues();
    fetchTotalProducts();
    fetchPendingOrders();
    fetchCancelOrders();
    fetchConfirmOrders();
    fetchDeliveredOrders();
    fetchTotalShops();
  }, []);

  console.log("totalShops", totalShops);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-5 py-10 bg-white">
      <h1 className="pl-5 border-l-4 border-orange-600 font-extrabold">
        Summary
      </h1>
      <div className="mt-5 w-full grid grid-cols-4 gap-x-4">
        <SummaryDataCards
          title="Total Revenue"
          amount={totalRevenues}
          borderLColor="border-green-400"
          borderBColor="border-b-green-400"
          isAmount={true}
          icons={FcCurrencyExchange}
        />
        <SummaryDataCards
          title="Total Products"
          amount={
            totalProducts && totalProducts.length > 0 ? totalProducts.length : 0
          }
          borderLColor="border-blue-400"
          borderBColor="border-b-blue-400"
          isAmount={false}
          icons={FcFactoryBreakdown}
        />
        <SummaryDataCards
          title="Total Orders"
          amount={
            totalOrders && totalOrders?.length > 0 ? totalOrders.length : 0
          }
          borderLColor="border-orange-400"
          borderBColor="border-b-orange-400"
          isAmount={false}
          icons={FcBusinessman}
        />

        <SummaryDataCards
          title="Total Shops"
          amount={totalShops?.length}
          borderLColor="border-yellow-400"
          borderBColor="border-b-yellow-400"
          isAmount={false}
          icons={FcShop}
        />
      </div>

      <h1 className="mt-20 pl-5 border-l-4 border-orange-600 font-extrabold">
        Order Status
      </h1>
      <div className="mt-5 w-full grid grid-cols-4 gap-x-4">
        <SummaryDataCards
          title="Pending Orders"
          amount={totalPendingOrders ? totalPendingOrders.length : 0}
          borderLColor="border-purple-400"
          borderBColor="border-b-purple-400"
          isAmount={false}
          icons={FcAlarmClock}
        />
        <SummaryDataCards
          title="Confirmed Orders"
          amount={totalConfirmedOrders ? totalConfirmedOrders.length : 0}
          borderLColor="border-orange-400"
          borderBColor="border-b-orange-400"
          isAmount={false}
          icons={FcBarChart}
        />
        <SummaryDataCards
          title="Delivered Orders"
          amount={totalDeliveredOrders ? totalDeliveredOrders.length : 0}
          borderLColor="border-sky-400"
          borderBColor="border-b-sky-400"
          isAmount={false}
          icons={FcApproval}
        />
        <SummaryDataCards
          title="Cancelled Orders"
          amount={totalCancelledOrders ? totalCancelledOrders.length : 0}
          borderLColor="border-red-400"
          borderBColor="border-b-red-400"
          isAmount={false}
          icons={FcCancel}
        />
      </div>

      {/* <div className="mt-20 pl-5 border-l-4 border-orange-600 grid grid-cols-5 items-center justify-between">
        <h1 className="font-extrabold col-span-3">Recent Orders</h1>
        <div className="relative col-span-2 w-full">
          <input
            type="search"
            name="productName"
            id="productName"
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-0 focus:outline-none focus:border-orange-500"
            placeholder="Search by product name"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div> */}
      {/* <AdminDashRecentOrdersTable /> */}

      {/* <h1 className="mt-20 pl-5 border-l-4 border-orange-600 font-extrabold">
        Popular Products
      </h1>
      <AdminDashPopularProuctsTable popularProductsList={popularProductsList} /> */}
    </div>
  );
}

export default VendorDashPage;
