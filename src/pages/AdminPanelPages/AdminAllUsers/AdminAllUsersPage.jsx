import React, { useState, useEffect } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import AdminAllUsersTable from "../../../components/AdminDashCompos/AdminAllUsersTable/AdminAllUsersTable";
import useRequest from "../../../APIServices/useRequest";
import FilterByUserType from "../../../components/GlobalComponents/FilterByUserType/FilterByUserType";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";

function AdminAllUsersPage() {
  const [postRequest, getRequest] = useRequest();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteState, setDeleteState] = useState([]);
  const [activateState, setActivateState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [adminCrtState, setAdminCrtState] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const userData = await getRequest("/users/src/all");
      setAllUsers(userData?.data?.data);
      setFilteredUsers(userData?.data?.data); // Set filtered users to all users initially
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [deleteState, activateState, adminCrtState]);

  const deleteUser = async (id) => {
    try {
      const dltProd = await getRequest(`/users/del/${id}`);
      setDeleteState(dltProd?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const activateUser = async (id) => {
    try {
      const activateProd = await getRequest(`/users/actv/${id}`);
      setActivateState(activateProd?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userTypes = [
    { typeName: "All", userType: "" },
    { typeName: "Admin", userType: 109 },
    { typeName: "Customers", userType: 103 },
    { typeName: "Vendors", userType: 101 },
  ];

  const handleSelectUsers = (event) => {
    const selectedType = event.target.value;
    if (selectedType === "") {
      setFilteredUsers(allUsers); // Show all users
    } else {
      const filtered = allUsers.filter(
        (user) => user.userType === parseInt(selectedType, 10)
      );
      setFilteredUsers(filtered); // Show filtered users
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const crtAdmin = await postRequest("users/crt/admin/info", {
        userEmail,
        userPass,
        userName,
      });
      if (crtAdmin?.data?.error === false) {
        setAdminCrtState(!adminCrtState);
        Swal.fire(`Created Admin with Email : ${userEmail}`);
        setUserEmail("");
        setUserPass("");
        setUserName("");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire(`${error?.response?.data?.message}`);
    }
  };

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
      <div className="w-full bg-white rounded px-10 pt-10">
        <GlobalHeaders title={"All Users/Customers/Buyers"} />
      </div>
      <div className="mt-10 px-10 grid grid-cols-2 items-end">
        <FilterByUserType
          userTypes={userTypes}
          handleSelectUsers={handleSelectUsers}
        />
        <div className="w-full flex items-center justify-end">
          <button
            className="flex items-center gap-x-2 px-6 py-2 rounded-lg text-white font-semibold leading-2 bg-orange-600 duration-200 hover:duration-200 hover:bg-orange-700"
            onClick={() => setIsModalOpen(true)}
          >
            <FaUserPlus />
            <span>Add Admin</span>
          </button>
        </div>
      </div>

      <div className="bg-white w-full pb-10 rounded">
        <AdminAllUsersTable
          activateState={activateState}
          deleteState={deleteState}
          activateUser={activateUser}
          deleteUser={deleteUser}
          allUsers={filteredUsers} // Use filteredUsers here
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/3 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Add Admin</h2>
            <div className="mb-4">
              <label htmlFor="userEmail" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                placeholder="Enter admin email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userPass" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="userPass"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                placeholder="Enter admin password"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                placeholder="Enter admin username"
              />
            </div>
            <div className="flex justify-end gap-x-4">
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-gray-100 hover:bg-red-700"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white font-semibold ${
                  userEmail && userPass
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!userEmail || !userPass}
                onClick={handleCreateAdmin}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAllUsersPage;
