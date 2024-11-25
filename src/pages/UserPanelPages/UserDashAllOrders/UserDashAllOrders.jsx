import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import UserOrdersList from "../../../components/UserDashCompos/UserOrdersCompos/UserOrdersList/UserOrdersList";
import UserOrdersDetailsCompo from "../../../components/UserDashCompos/UserOrdersCompos/UserOrdersDetailsCompo/UserOrdersDetailsCompo";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useIsSmallScreen from "../../../hooks/useIsSmallScreen";

// Set app element for accessibility
Modal.setAppElement("#root");

function UserDashAllOrders() {
  const { user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [deliverState, setDeliverState] = useState(false);
  const [orderStatusMap, setOrderStatusMap] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const isSmallScreen = useIsSmallScreen(); // Check if the screen is small

  const fetchOrdersList = async () => {
    try {
      const fetchData = await getRequest(`/orders/src/user/byid/${user?._id}`);
      setOrdersList(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersList();
  }, [deliverState]);

  const handleOrderDelivered = async (id) => {
    try {
      const deliverConfirm = await getRequest(
        `/orders/delivery/confirm/byid/${id}`
      );
      if (deliverConfirm?.data?.error === false) {
        Swal.fire("Delivery Confirmed !!");
        setOrderStatusMap((prevStatus) => ({
          ...prevStatus,
          [id]: "Delivered",
        }));
        setDeliverState(!deliverState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectOrder = (order, index) => {
    setSelectedOrder(order);
    setSelectedOrderIndex(index);
    if (isSmallScreen) setIsModalOpen(true); // Open modal only on small screens
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {ordersList && ordersList.length > 0 ? (
        <div className="h-[86vh] grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-3 h-full overflow-y-auto pr-5">
            <h1 className="text-xl font-bold">
              Orders List{" "}
              <span className="text-orange-600">({ordersList.length})</span>
            </h1>
            <div className="mt-5">
              {ordersList.map((order, index) => (
                <UserOrdersList
                  key={order?._id}
                  order={{
                    ...order,
                    currentState:
                      orderStatusMap[order._id] || order.currentState,
                  }}
                  index={index + 1}
                  onSelect={() => handleSelectOrder(order, index + 1)}
                  isSelected={selectedOrderIndex === index + 1}
                />
              ))}
            </div>
          </div>
          <div className="col-span-9 hidden md:block">
            {selectedOrder ? (
              <UserOrdersDetailsCompo
                order={{
                  ...selectedOrder,
                  currentState:
                    orderStatusMap[selectedOrder._id] ||
                    selectedOrder.currentState,
                }}
                index={selectedOrderIndex}
                handleOrderDelivered={handleOrderDelivered}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-xl text-gray-500">
                No orders selected yet. Please select an order.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 w-full h-[85vh] rounded-lg flex items-center justify-center text-3xl font-semibold text-gray-300">
          <h1 className="underline">No Orders are Placed Yet</h1>
        </div>
      )}

      {/* Modal for smaller screens */}
      {isSmallScreen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-5 w-[90%] md:w-[60%]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          {selectedOrder && (
            <UserOrdersDetailsCompo
              order={{
                ...selectedOrder,
                currentState:
                  orderStatusMap[selectedOrder._id] ||
                  selectedOrder.currentState,
              }}
              index={selectedOrderIndex}
              handleOrderDelivered={handleOrderDelivered}
            />
          )}
          <button
            onClick={closeModal}
            className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            Close
          </button>
        </Modal>
      )}
    </>
  );
}

export default UserDashAllOrders;
