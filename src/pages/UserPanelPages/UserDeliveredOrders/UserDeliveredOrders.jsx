import React, { useContext, useEffect, useState } from 'react'
import GlobalHeaders from '../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders'
import { AuthContext } from '../../../providers/AuthProviders'
import useRequest from '../../../APIServices/useRequest';
import UserDeliveredOrdersTable from '../../../components/UserDashCompos/UserDeliveredOrdersTable/UserDeliveredOrdersTable';

function UserDeliveredOrders() {
  const {user} = useContext(AuthContext);
  
  const [postRequest, getRequest] = useRequest();
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const fetchDeliveredOrders = async () =>{
    try{
      const fetchData = await postRequest(`/orders/src/delivered/all/byusr`, {userId: user?._id});
      setDeliveredOrders(fetchData?.data?.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchDeliveredOrders();
  },[])


  return (
    <div className="w-full h-full rounded-lg shadow-md px-0 md:px-10 bg-white">
      <div className="w-full bg-white rounded px-2 md:px-10 pt-0 md:pt-10">
        <GlobalHeaders title={"All Delivered Orders"} />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        {deliveredOrders?.length > 0 ? (
          <UserDeliveredOrdersTable deliveredOrders={deliveredOrders}/>
        ) : (
          <div className="mt-5 text-xl flex justify-center text-gray-400">
            <h1>No Delivered Orders Available</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDeliveredOrders