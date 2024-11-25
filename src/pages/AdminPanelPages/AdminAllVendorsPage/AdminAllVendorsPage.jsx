import React, { useContext, useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import AdminAllVendorsTable from "../../../components/AdminDashCompos/AdminAllVendorsTable/AdminAllVendorsTable";
import useRequest from "../../../APIServices/useRequest";
import { AuthContext } from "../../../providers/AuthProviders";

function AdminAllVendorsPage() {
  const [postRequest, getRequest] = useRequest();
  const [allVendors, setAllVendors] = useState([]);
  const [activateState, setActivateState] = useState([]);
  const [deactivateState, setDeactivateState] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchAllVendors = async () => {
    try {
      const vendorDetails = await getRequest("/users/src/all/vendors");
      setAllVendors(vendorDetails?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllVendors();
  }, [activateState, deactivateState]);

  const handleActivateVendor = async (person) => {
    try {
      const data = {
        userId: person?._id,
        approvalId: user?._id,
      };
      const activate = await postRequest("/users/usr/accpt", data);
      setActivateState(activate);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInActiveVendor = async (person) => {
    try {
      const data = {
        userId: person?._id,
        approvalId: user?._id,
      };
      const deactivate = await postRequest("/users/usr/rjct", data);
      setDeactivateState(deactivate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
      <div className="w-full bg-white rounded px-10 pt-10">
        <GlobalHeaders
          title={"All Vendors/Sellers/Shoppers"}
          // searchFilter={"User Full Name"}
        />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        <AdminAllVendorsTable
          allVendors={allVendors}
          handleActivateVendor={handleActivateVendor}
          handleInActiveVendor={handleInActiveVendor}
        />
      </div>
    </div>
  );
}

export default AdminAllVendorsPage;
