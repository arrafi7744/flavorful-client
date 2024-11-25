import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useRequest from "../../../APIServices/useRequest";

function RatingReviewShow({reviewData}) {
    const [postRequest, getRequest] = useRequest();
    const [usersDetails, setUserDetails] = useState([]);

    const fetchUserDetails = async () =>{
        try{
            const fetchData = await getRequest(`/users/src/byId/${reviewData?.userId}`);
            setUserDetails(fetchData?.data?.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchUserDetails();
    },[])
  return (
    <div
      className="p-4 border h-32 rounded-md bg-gray-50 flex flex-col gap-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-800">
          {usersDetails?.userFullName || "Anonymous"}
        </span>
        <div className="flex items-center">
          {[...Array(5)].map((_, idx) => (
            <FaStar
              key={idx}
              className={`w-4 h-4 ${
                idx < reviewData.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-600">
        {reviewData?.review || "No review text provided."}
      </p>
    </div>
  );
}

export default RatingReviewShow;
