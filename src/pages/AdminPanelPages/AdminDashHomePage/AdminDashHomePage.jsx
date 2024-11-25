import React, { useEffect, useState } from "react";
import SummaryDataCards from "../../../components/GlobalComponents/SummaryDataCards/SummaryDataCards";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcFactoryBreakdown } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import AdminDashRecentOrdersTable from "../../../components/AdminDashCompos/AdminDashRecentOrdersTable/AdminDashRecentOrdersTable";
import { FaSearch } from "react-icons/fa";
import AdminDashPopularProuctsTable from "../../../components/AdminDashCompos/AdminDashPopularProductsTable/AdminDashPopularProuctsTable";
import useRequest from "../../../APIServices/useRequest";

function AdminDashHomePage() {
  const [postRequest, getRequest] = useRequest();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderNumber, setTotalOrderNumber] = useState(0);
  const [totalUserNumber, setTotalUserNumber] = useState(0);
  const [totalVendorNumber, setTotalVendorNumber] = useState(0);
  const [totalPendingOrdersNumber, setTotalPendingOrdersNumber] = useState(0);
  const [totalConfirmedOrdersNumber, setTotalConfirmedOrdersNumber] =
    useState(0);
  const [totalDeliveredOrdersNumber, setTotalDeliveredOrdersNumber] =
    useState(0);
  const [totalCancelledOrdersNumber, setTotalCancelledOrdersNumber] =
    useState(0);
  const [popularProductsList, setPopularProductList] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const fetchTotalOrderNumbers = async () => {
    let totalNumber = await getRequest("/orders/src/all");
    setTotalOrderNumber(totalNumber?.data?.data?.length);
  };

  const fetchTotalRevenueNumbers = async () => {
    let totalNumber = await getRequest("/products/src/rev");
    setTotalRevenue(totalNumber?.data?.data?.totalRevenue);
  };

  const fetchTotalUserNumbers = async () => {
    let totalNumber = await getRequest("/users/src/all");
    setTotalUserNumber(totalNumber?.data?.data?.length);
  };

  const fetchTotalVendorNumbers = async () => {
    let totalNumber = await getRequest("/shop/src/all");
    setTotalVendorNumber(totalNumber?.data?.data);
  };

  const fetchTotalPendingOrderNumbers = async () => {
    let totalNumber = await getRequest("/orders/src/pending/all");
    setTotalPendingOrdersNumber(totalNumber?.data?.data.length);
  };

  const fetchTotalConfirmedOrderNumbers = async () => {
    let totalNumber = await getRequest("/orders/src/confirmed/all");
    setTotalConfirmedOrdersNumber(totalNumber?.data?.data.length);
  };

  const fetchTotalDeliveredOrderNumbers = async () => {
    let totalNumber = await getRequest("/orders/src/delivered/all");
    setTotalDeliveredOrdersNumber(totalNumber?.data?.data.length);
  };

  const fetchTotalCancelledOrderNumbers = async () => {
    let totalNumber = await getRequest("/orders/src/cancel/all");
    setTotalCancelledOrdersNumber(totalNumber?.data?.data.length);
  };

  const fetchPopularProducts = async () => {
    let allProducts = await getRequest("/products/src/popular");
    setPopularProductList(allProducts?.data?.data);
  };

  useEffect(() => {
    fetchTotalRevenueNumbers();
    fetchTotalOrderNumbers();
    fetchTotalUserNumbers();
    fetchTotalVendorNumbers();
    fetchTotalPendingOrderNumbers();
    fetchTotalConfirmedOrderNumbers();
    fetchTotalDeliveredOrderNumbers();
    fetchTotalCancelledOrderNumbers();
    fetchPopularProducts();
  }, []);

  console.log("Popular Products", popularProductsList);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-5 py-10 bg-white">
      <h1 className="pl-5 border-l-4 border-orange-600 font-extrabold">
        Summary
      </h1>
      <div className="mt-5 w-full grid grid-cols-4 gap-x-4">
        <SummaryDataCards
          title="Total Revenue"
          amount={totalRevenue}
          borderLColor="border-green-400"
          borderBColor="border-b-green-400"
          isAmount={true}
          icons={FcCurrencyExchange}
        />
        <SummaryDataCards
          title="Total Order"
          amount={totalOrderNumber}
          borderLColor="border-red-400"
          borderBColor="border-b-red-400"
          isAmount={false}
          icons={FcMoneyTransfer}
        />
        <SummaryDataCards
          title="Vendor"
          amount={totalVendorNumber.length}
          borderLColor="border-blue-400"
          borderBColor="border-b-blue-400"
          isAmount={false}
          icons={FcFactoryBreakdown}
        />
        <SummaryDataCards
          title="Total Users"
          amount={totalUserNumber}
          borderLColor="border-orange-400"
          borderBColor="border-b-orange-400"
          isAmount={false}
          icons={FcBusinessman}
        />
      </div>

      <h1 className="mt-20 pl-5 border-l-4 border-orange-600 font-extrabold">
        Order Status
      </h1>
      <div className="mt-5 w-full grid grid-cols-4 gap-x-4">
        <SummaryDataCards
          title="Pending Orders"
          amount={totalPendingOrdersNumber}
          borderLColor="border-purple-400"
          borderBColor="border-b-purple-400"
          isAmount={false}
          icons={FcAlarmClock}
        />
        <SummaryDataCards
          title="Confirmed Orders"
          amount={totalConfirmedOrdersNumber}
          borderLColor="border-orange-400"
          borderBColor="border-b-orange-400"
          isAmount={false}
          icons={FcBarChart}
        />
        <SummaryDataCards
          title="Delivered Orders"
          amount={totalDeliveredOrdersNumber}
          borderLColor="border-sky-400"
          borderBColor="border-b-sky-400"
          isAmount={false}
          icons={FcApproval}
        />
        <SummaryDataCards
          title="Cancelled Orders"
          amount={totalCancelledOrdersNumber}
          borderLColor="border-red-400"
          borderBColor="border-b-red-400"
          isAmount={false}
          icons={FcCancel}
        />
      </div>

      {recentOrders && recentOrders?.length > 0 ? (
        <>
          <div className="mt-20 pl-5 border-l-4 border-orange-600 grid grid-cols-5 items-center justify-between">
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
          </div>

          <AdminDashRecentOrdersTable />
        </>
      ) : (
        <></>
      )}

      {popularProductsList && popularProductsList.length > 0 ? (
        <>
          <h1 className="mt-20 pl-5 border-l-4 border-orange-600 font-extrabold">
            Popular Products
          </h1>
          <AdminDashPopularProuctsTable
            popularProductsList={popularProductsList}
          />{" "}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdminDashHomePage;
