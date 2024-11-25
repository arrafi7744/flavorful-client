import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import UserPersonalInfo from "../../../components/UserDashCompos/UserDashboardCompos/UserPersonalInfo";
import UserUpdateInformationCompo from "../../../components/UserDashCompos/UserDashboardCompos/UserUpdateInformationCompo";
import Swal from "sweetalert2";

function UserDashHomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: "",
    userFullName: "",
    userEmail: "",
    phoneNumber: "",
    gender: "",
    shippingAddress: "",
    shippingState: "",
    shippingPostalCode: "",
  });


  const [postRequest, getRequest] = useRequest();
  const [customerDetails, setCustomerDetails] = useState();
  const [uptUserInfo, setUptUserInfo] = useState(false);

  const updateUserInfo = async (updatedInfo) => {
    try {
      const getCookie = JSON.parse(localStorage.getItem("userCreds"));

      const updatedData = {
        ...getCookie,
        userName: formData.userName,
        userEmail: formData.userEmail,
        phoneNumber: formData.phoneNumber,
        userFullName: formData.userFullName,
        gender: formData.gender,
      };

      const updateData = postRequest(`/users/upt/${user?._id}`, {
        updatedInfo,
      });
      if (updateData) {
        setUser(updatedData);
        Swal.fire(`Successfully Update`);
        setUptUserInfo(!uptUserInfo);
        localStorage.setItem("userCreds", JSON.stringify(updatedData));
      } else {
        Swal.fire("Failed to Update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      const fetchedData = await getRequest(
        `/users/customer/src/byId/${user?._id}`
      );
      setCustomerDetails(fetchedData?.data?.data?.customerDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, [uptUserInfo]);

  return (
    <div className="md:mx-5 md:my-5 border-2 rounded-lg shadow-md px-5 py-5">
      <div>
        <h1 className="text-lg font-semibold underline underline-offset-8">
          User Information
        </h1>
        <UserPersonalInfo customerDetails={customerDetails} user={user} />
      </div>
      <div className="mt-10">
        <UserUpdateInformationCompo
          formData={formData}
          setFormData={setFormData}
          customerDetails={customerDetails}
          user={user}
          updateUserInfo={updateUserInfo}
        />
      </div>
    </div>
  );
}

export default UserDashHomePage;
