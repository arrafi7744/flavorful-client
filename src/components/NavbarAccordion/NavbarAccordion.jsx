import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

function NavbarAccordion() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <li className="w-full">
      <Menu as="div" className="relative w-full">
        <MenuButton className="w-full group flex justify-between rounded-md p-2 text-sm leading-6 font-semibold text-orange-200 hover:bg-orange-700 hover:text-white">
          Dropdown Menu
          <ChevronDownIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {[
              { name: "Option 1", href: "#" },
              { name: "Option 2", href: "#" },
              { name: "Option 3", href: "#" },
            ].map((option) => (
              <MenuItem key={option.name}>
                {({ active }) => (
                  <a
                    href={option.href}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </li>
  );
}

export default NavbarAccordion;
