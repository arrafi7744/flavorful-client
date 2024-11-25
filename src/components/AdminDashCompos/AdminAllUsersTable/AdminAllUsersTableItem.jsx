import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";

function AdminAllUsersTableItem({
  person,
  activateState,
  deleteState,
  activateUser,
  deleteUser,
}) {
  const handleDeleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#db5800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(person?._id);
        if (deleteState?.data?.error === false) {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleActivateUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#db5800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        activateUser(person?._id);
        if (activateState?.data?.error === false) {
          Swal.fire({
            title: "Activated!",
            text: "Your User has been Activated.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <tr key={person?._id}>
      <td className="whitespace-nowrap py-5 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          {/* <div className="h-11 w-11 flex-shrink-0">
            <img
              className="h-11 w-11 rounded-full"
              src={person?.userImg}
              alt=""
            />
          </div> */}
          <div className="">
            <div className="font-medium text-gray-900">{person?.userName}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        {person?.userEmail}
      </td>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        {person?.userType}
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-left">
        {person && person?.isActive === true && person?.isDeleted === false ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            Deleted
          </span>
        )}
      </td>
      <td className="whitespace-nowrap py-5 pl-10 text-2xl font-medium">
        {person && person?.isActive === true && person?.isDeleted === false ? (
          <IoTrashBinOutline
            onClick={handleDeleteUser}
            className="text-red-600 duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
          />
        ) : (
          <FaUndo
            onClick={handleActivateUser}
            className="text-green-600 duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
          />
        )}
      </td>
    </tr>
  );
}

export default AdminAllUsersTableItem;
