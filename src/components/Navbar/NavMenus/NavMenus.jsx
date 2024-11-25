import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavPagesDropDown from "../NavPagesDropDown/NavPagesDropDown";
import { AuthContext } from "../../../providers/AuthProviders";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import useRequest from "../../../APIServices/useRequest";

function NavMenus() {
  const [postRequest, getRequest] = useRequest();
  const { user, setUser, cartItem } = useContext(AuthContext);

  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    localStorage.removeItem("userCreds");
    Swal.fire("Logged Out");
    setUser(null);
    navigate("/");
  };

  const userNavigation = [
    {
      navigate: "/userdash",
      text: "Profile",
    },
  ];

  const vendorNavigation = [
    {
      navigate: "/vendordash",
      text: "Profile",
    },
  ];

  const adminNavigation = [
    {
      navigate: "/admindash",
      text: "Profile",
    },
  ];
  const links = (
    <>
      <NavLink
        to="/shops"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-orange-600"
            : "duration-200 hover:duration-200 hover:scale-110"
        }
      >
        Branches
      </NavLink>
      {/* <NavLink
        to="/offers"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-orange-600"
            : "duration-200 hover:duration-200 hover:scale-110"
        }
      >
        Offers
      </NavLink> */}
      <NavLink
        to="/contact"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-orange-600"
            : "duration-200 hover:duration-200 hover:scale-110"
        }
      >
        Contact
      </NavLink>
      <NavPagesDropDown />
    </>
  );

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-end md:gap-x-6">
      <div className="ml-5 md:ml-0 flex items-center gap-x-4 md:gap-x-6 font-semibold">{links}</div>
      {user ? (
        <div className="flex items-center gap-x-6 md:gap-x-6">
          {/* Cart Icon with Item Count for userType === 103 */}
          {user.userType === 103 && (
            <Link to="/usercarts">
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 6M7 13l1.4 6m10-6l-1.4 6M7 19h10M9 23a1 1 0 102 0m4 0a1 1 0 102 0"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItem ? cartItem.length : 0}
                </span>
              </div>
            </Link>
          )}

          {/* User Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>

              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {user?.userName}
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {user &&
                  (user.userType === 103 ||
                    user.userType === 109 ||
                    user.userType === 101) && (
                    <>
                      {/* Render user-specific navigation */}
                      {(user.userType === 103
                        ? userNavigation
                        : user.userType === 109
                        ? adminNavigation
                        : vendorNavigation
                      ).map((item) => (
                        <div key={item.name}>
                          <MenuItem>
                            {({ focus }) => (
                              <Link to={item.navigate}>
                                <p
                                  className={classNames(
                                    focus ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  {item.text}
                                </p>
                              </Link>
                            )}
                          </MenuItem>
                        </div>
                      ))}

                      {/* Logout Button */}
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          className="pl-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Logout
                        </button>
                      </MenuItem>
                    </>
                  )}
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="flex items-center gap-x-2 md:gap-x-6">
          <Link to="/login">
            <button className="text-md md:text-md px-4 py-1 font-semibold rounded bg-orange-600 text-white duration-200 hover:bg-orange-700 hover:scale-110">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="text-md md:text-md px-4 py-1 font-semibold rounded bg-orange-600 text-white duration-200 hover:bg-orange-700 hover:scale-110">
              Become a Seller/Buyer
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavMenus;
