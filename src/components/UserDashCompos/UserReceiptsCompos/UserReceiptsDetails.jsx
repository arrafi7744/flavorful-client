import React, { useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";
import UserReceiptsOrderItems from "./UserReceiptsOrderItems";

function UserReceiptsDetails({ receipt, receiptIndex, userDetails }) {
  const [postRequest, getRequest] = useRequest();
  const [userAddress, setUserAddress] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchUserAddress = async () => {
    try {
      const fetchData = await getRequest(
        `users/customer/src/byId/${userDetails?._id}`
      );
      setUserAddress(fetchData?.data?.data?.customerDetails);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchUserAddress();
  }, []);


  return (
    <div>
      <div className="grid grid-cols-2 items-center mt-5 pb-2 border-b-2 border-orange-600">
        <div>
          <h1 className="font-semibold text-sm">
            Invoice Number: <span className="font-normal">{receipt?.uniqueKeyId}</span>
          </h1>
        </div>
        <div className="w-full h-full bg-orange-600 flex justify-center items-center">
          <h1 className="text-5xl font-extrabold text-white">INVOICE</h1>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 px-5 pb-5 border-b-2 border-orange-600">
        <div className="">
          <h1 className="font-bold">Billing From: </h1>
          <p className="text-xs">Flavour Fushion</p>
          <p className="text-xs">31st Street, Deovog, Narayanganj</p>
          <p className="text-xs">flavourfulfushion@gmail.com</p>
          <p className="text-xs">01621754583</p>
        </div>
        <div className="text-right">
          <h1 className="font-bold">Billing To: </h1>
          <p className="text-xs"> {userDetails?.userFullName}</p>
          <p className="text-xs"> {userAddress?.shippingAddress}</p>
          <p className="text-xs"> {userDetails?.userEmail}</p>
          <p className="text-xs"> {userDetails?.phoneNumber}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b-2 border-orange-600">
              <th className="text-left p-4 text-gray-700 font-semibold">
                Product
              </th>
              <th className="text-left p-4 text-gray-700 font-semibold">
                Quantity
              </th>
              <th className="text-left p-4 text-gray-700 font-semibold">
                Products Price
              </th>
              <th className="text-left p-4 text-gray-700 font-semibold">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {receipt.orderIds.map((item) => (
              <UserReceiptsOrderItems
                key={item}
                orderItem={item}
              />
            ))}
          </tbody>
        </table>
        <div className="px-5 mt-5 w-full grid grid-cols-2 items-start">
          <div>
            <h1 className="text-sm font-extrabold">Calculations</h1>
          </div>
          <div className="w-full grid grid-cols-2 text-sm">
            <div className="w-full"></div>
            <div className="w-full">
              <h1 className="font-semibold text-cenrter">
                Product Quantity: <span className="font-normal">{receipt.orderIds.length}</span>
              </h1>
              <div className="font-semibold mt-2 py-2 bg-orange-600 px-5 text-center">
                <h1 className="text-xl font-extrabold text-white">
                  {" "}
                  Total: <span className="font-normal">{receipt?.totalOrderPrice} Tk</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden mt-5 w-full"></div>
      </div>
    </div>
  );
}

export default UserReceiptsDetails;
