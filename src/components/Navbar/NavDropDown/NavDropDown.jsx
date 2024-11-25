import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { LuVegan } from "react-icons/lu";
import { GiFruitTree } from "react-icons/gi";
import { GiFruiting } from "react-icons/gi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavDropDown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="bg-white inline-flex w-full justify-center items-center gap-x-4 rounded-md border border-white px-3 py-2.5 text-sm font-bold text-orange-600 shadow-sm ring-1 ring-inset ring-white duration-200 hover:border-white hover:cursor-pointer hover:scale-110">
          <div className="flex items-center gap-x-2">
            <span className="text-lg">
              <LuVegan />
            </span>
            <span>Vegetables</span>
          </div>
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <p
                  href="#"
                  className={classNames(
                    focus ? "bg-gray-100 text-slate-900 duration-200 hover:duration-200 hover:cursor-pointer hover:scale-105" : "text-slate-600",
                    "group flex items-center px-4 py-2 text-sm font-semibold"
                  )}
                >
                  <GiFruiting
                    className="mr-3 h-5 w-5 text-slate-600 group-hover:text-slate-500"
                    aria-hidden="true"
                  />
                  Fruits
                </p>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <p
                  href="#"
                  className={classNames(
                    focus ? "bg-gray-100 text-slate-900 duration-200 hover:duration-200 hover:cursor-pointer hover:scale-105" : "text-slate-600",
                    "group flex items-center px-4 py-2 text-sm font-semibold"
                  )}
                >
                  <GiFruitTree
                    className="mr-3 h-5 w-5 text-slate-600 group-hover:text-slate-500"
                    aria-hidden="true"
                  />
                  Others
                </p>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
