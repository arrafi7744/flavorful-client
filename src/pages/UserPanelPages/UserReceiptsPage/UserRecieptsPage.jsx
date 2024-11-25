import React, { useContext, useEffect, useState } from "react";
import useRequest from "../../../APIServices/useRequest";
import { AuthContext } from "../../../providers/AuthProviders";
import UserReceiptsDetails from "../../../components/UserDashCompos/UserReceiptsCompos/UserReceiptsDetails";

function UserRecieptsPage() {
  const [postRequest, getRequest] = useRequest();
  const { user } = useContext(AuthContext);
  const [allReceipts, setAllReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receiptIndex, setReceiptIndex] = useState(null); // State for the selected receipt's index

  const fetchAllReceitps = async () => {
    try {
      const fetchData = await getRequest(`/receipts/src/byUserId/${user?._id}`);
      setAllReceipts(fetchData?.data?.data);
      if (fetchData?.data?.data?.length > 0) {
        setSelectedReceipt(fetchData?.data?.data[0]);
        setReceiptIndex(0); // Default to the first receipt
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllReceitps();
  }, []);
  

  return (
    <div className="w-full h-[86vh]">
      {allReceipts && allReceipts.length > 0 ? (
        <div className="h-full w-full grid grid-cols-12 gap-x-2">
          <div className="col-span-3 w-full h-full overflow-y-auto pr-2">
            <h1 className="ml-2 mb-2 text-xl font-bold">Receipts List</h1>
            {allReceipts.map((receipt, index) => (
              <div
                key={receipt?._id}
                onClick={() => {
                  setSelectedReceipt(receipt);
                  setReceiptIndex(index); // Update index state
                }}
                className={`mb-2 rounded-lg w-full h-[20vh] flex flex-col justify-between border-2 px-3 py-2 ${
                  selectedReceipt?._id === receipt?._id
                    ? "bg-orange-200 border-orange-700"
                    : "bg-orange-50 border-orange-600 hover:bg-orange-300"
                } hover:cursor-pointer`}
              >
                <div>
                  <div className="">
                    <h1 className="font-extrabold text-sm">Invoice Number: </h1>
                    <p className="text-sm">{receipt?.uniqueKeyId}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-2 flex items-center justify-between">
                    <h1 className="font-bold text-sm">Date: </h1>
                    <p className="text-xs">
                      {new Date(receipt.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <h1 className="font-bold text-sm">Product Quantity: </h1>
                    <p className="text-xs">{receipt?.totalProductQuantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-9 w-full h-full mx-2">
            <h1 className="text-xl font-bold">Receipt Details</h1>
            {selectedReceipt ? (
              <UserReceiptsDetails
                receipt={selectedReceipt}
                receiptIndex={receiptIndex + 1}
                userDetails={user}
              />
            ) : (
              <div className="text-gray-500 text-center mt-5">
                <p>Please select a receipt to view its details.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full text-2xl font-bold text-center py-10 border-2 border-gray-200 rounded-lg flex justify-center items-center text-gray-400">
          <h1>No Receipts Generated Yet !!</h1>
        </div>
      )}
    </div>
  );
}

export default UserRecieptsPage;
