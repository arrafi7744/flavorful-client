import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavPagesDropDown() {
  return (
    <div>
      {" "}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center items-center gap-x-4 rounded-md bg-transparent border border-none px-3 py-2.5 font-bold text-orange-600 ring-1 ring-inset ring-transparent duration-200 hover:duration-200 hover:border-none hover:scale-110">
            <span>Pages</span>
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-orange-600"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute -right-10 md:-right-36 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {/* <MenuItem>
                {({ focus }) => (
                  <p
                    href="#"
                    className={classNames(
                      focus ? "bg-gray-100 text-slate-900 duration-200 hover:cursor-pointer hover:scale-105 hover:duration-200" : "text-slate-600",
                      "group flex items-center px-4 py-2 text-sm font-semibold"
                    )}
                  >
                    Flash Sale
                  </p>
                )}
              </MenuItem> */}
              <MenuItem>
                {({ focus }) => (
                  <Link to="/manufacturers">
                    <p
                      href="#"
                      className={classNames(
                        focus
                          ? "bg-gray-100 text-slate-900 duration-200 hover:cursor-pointer hover:scale-105 hover:duration-200"
                          : "text-slate-600",
                        "group flex items-center px-4 py-2 text-sm font-semibold"
                      )}
                    >
                      Manufacturers/Publishers
                    </p>
                  </Link>
                )}
              </MenuItem>
              {/* <MenuItem>
                {({ focus }) => (
                  <p
                    href="#"
                    className={classNames(
                      focus ? "bg-gray-100 text-slate-900 duration-200 hover:cursor-pointer hover:scale-105 hover:duration-200" : "text-slate-600",
                      "group flex items-center px-4 py-2 text-sm font-semibold"
                    )}
                  >
                    Authors
                  </p>
                )}
              </MenuItem> */}
              <MenuItem>
                {({ focus }) => (
                  <Link to="/faq">
                    <p
                      href="#"
                      className={classNames(
                        focus
                          ? "bg-gray-100 text-slate-900 duration-200 hover:cursor-pointer hover:scale-105 hover:duration-200"
                          : "text-slate-600",
                        "group flex items-center px-4 py-2 text-sm font-semibold"
                      )}
                    >
                      FAQ
                    </p>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link to="/terms">
                    <p
                      // href="#"
                      className={classNames(
                        focus
                          ? "bg-gray-100 text-slate-900 duration-200 hover:cursor-pointer hover:scale-105 hover:duration-200"
                          : "text-slate-600",
                        "group flex items-center px-4 py-2 text-sm font-semibold"
                      )}
                    >
                      Terms & Conditions
                    </p>
                  </Link>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default NavPagesDropDown;
