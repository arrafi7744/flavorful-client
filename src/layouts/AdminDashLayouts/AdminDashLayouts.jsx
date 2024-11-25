/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { CiShop } from "react-icons/ci";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  FolderIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  ArrowUturnUpIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  UserCircleIcon,
  UserGroupIcon,
  HomeModernIcon,
  XCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";

const navigation = [
  {
    name: "Dashboard",
    href: "#",
    icon: HomeIcon,
    current: false,
    accordion: false,
    navigation: "/admindash",
  },
  {
    name: "Products",
    href: "#",
    icon: ArchiveBoxIcon,
    current: false,
    accordion: false,
    navigation: "/allproducts",
  },
  // {
  //   name: "Vendors",
  //   href: "#",
  //   icon: FolderIcon,
  //   current: false,
  //   accordion: false,
  //   navigation: "/allvendors",
  // },
  {
    name: "Catgories",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
    accordion: false,
    navigation: "/allcategories",
  },
  {
    name: "Recommendations",
    href: "#",
    icon: StarIcon,
    current: false,
    accordion: false,
    navigation: "/recommendations",
  },
];

const navigationTwo = [
  {
    name: "Pending",
    href: "#",
    icon: ChartPieIcon,
    current: false,
    accordion: false,
    navigation: "/allpendingorders",
  },
  {
    name: "Cancelled",
    href: "#",
    icon: XCircleIcon,
    current: false,
    accordion: false,
    navigation: "/allcancelledorders",
  },
  {
    name: "Confirmed",
    href: "#",
    icon: ArrowUturnUpIcon,
    current: false,
    accordion: false,
    navigation: "/allconfirmedorders",
  },
  {
    name: "Delivered",
    href: "#",
    icon: ShoppingBagIcon,
    current: false,
    accordion: false,
    navigation: "/alldeliveredorders",
  },
];

const navigationThree = [
  {
    name: "Home Page",
    href: "#",
    icon: HomeModernIcon,
    current: false,
    accordion: false,
    navigation: "/",
  },
  {
    name: "FAQs",
    href: "#",
    icon: QuestionMarkCircleIcon,
    current: false,
    accordion: false,
    navigation: "/allfaq",
  },
  {
    name: "Reviews",
    href: "#",
    icon: SparklesIcon,
    current: false,
    accordion: false,
    navigation: "/allreviews",
  },
];

const navigationFour = [
  {
    name: "All Users",
    href: "#",
    icon: UserGroupIcon,
    current: false,
    accordion: false,
    navigation: "/allusers",
  },
  // {
  //   name: "All Admin",
  //   href: "#",
  //   icon: UserCircleIcon,
  //   current: false,
  //   accordion: false,
  //   navigation: "/alladmins",
  // },
  {
    name: "All Vendors",
    href: "#",
    icon: UserGroupIcon,
    current: false,
    accordion: false,
    navigation: "/allvendors",
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashLayouts() {
  const { user, setUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userCreds");
    Swal.fire("Logged Out");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div>
        <Transition show={sidebarOpen}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-orange-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Flavourfull Fushion"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-orange-700 text-white"
                                      : "text-orange-200 hover:text-white hover:bg-orange-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-orange-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <p className="text-orange-600 font-poppins font-semibold text-sm">
                          E-Commerce Management
                        </p>
                        <li>
                          <ul role="list" className="-mx-2 -mt-4">
                            {navigationTwo.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-orange-700 text-white"
                                      : "text-orange-200 hover:text-white hover:bg-orange-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-orange-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <p className="text-orange-600 font-poppins font-semibold text-sm">
                          Layout Controlls
                        </p>
                        <li>
                          <ul role="list" className="-mx-2 -mt-4">
                            {navigationThree.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-orange-700 text-white"
                                      : "text-orange-200 hover:text-white hover:bg-orange-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-orange-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <p className="text-orange-600 font-poppins font-semibold text-sm">
                          User Controlls
                        </p>
                        <li>
                          <ul role="list" className="-mx-2 -mt-4">
                            {navigationFour.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-orange-700 text-white"
                                      : "text-orange-200 hover:text-white hover:bg-orange-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-orange-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li className="mt-auto">
                          <p
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-orange-200 hover:bg-orange-700 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-orange-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </p>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-slate-900 px-6 pb-4">
            <Link to="/">
              <div className="flex h-16 shrink-0 items-center justify-center">
                <h1 className="text-white text-xl font-bold">
                  <span className="text-orange-600">Flavourfull </span> Fushion
                </h1>
              </div>
            </Link>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li>
                        <NavLink
                          to={item.navigation}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-orange-700 text-white"
                                : "text-orange-200 hover:text-white hover:bg-orange-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-orange-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <p className="text-orange-600 font-poppins font-semibold">
                  E-Commerce Management
                </p>
                <li>
                  <ul role="list" className="-mx-2 -mt-4">
                    {navigationTwo.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.navigation}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-orange-700 text-white"
                                : "text-orange-200 hover:text-white hover:bg-orange-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-orange-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <p className="text-orange-600 font-poppins font-semibold">
                  Layout Controls
                </p>
                <li>
                  <ul role="list" className="-mx-2 -mt-4">
                    {navigationThree.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.navigation}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-orange-700 text-white"
                                : "text-orange-200 hover:text-white hover:bg-orange-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-orange-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <p className="text-orange-600 font-poppins font-semibold">
                  User Controlls
                </p>
                <li>
                  <ul role="list" className="-mx-2 -mt-4">
                    {navigationFour.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.navigation}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-orange-700 text-white"
                                : "text-orange-200 hover:text-white hover:bg-orange-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )
                          }
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-orange-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="mt-auto">
                  <p
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-orange-600 hover:bg-orange-700 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-orange-600 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Settings
                  </p>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Link to="/">
                  <button className="px-4 py-2 rounded-3xl text-sm font-semibold bg-orange-600 text-white duration-200 hover:duration-200 hover:cursor-pointer hover:bg-orange-700">
                    Visit Site
                  </button>
                </Link>

                {/* <Link to="">
                  <button className="flex items-center gap-x-2 px-4 py-2 rounded-3xl text-sm font-semibold border border-orange-600 text-orange-600 duration-200 hover:duration-200 hover:cursor-pointer hover:bg-orange-500 hover:text-white">
                    <CiShop className="text-xl" />
                    Create Shop
                  </button>
                </Link> */}

                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {/* <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
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
                      <MenuItem>
                        {({ focus }) => (
                          <p
                            onClick={handleLogout}
                            // href={item.href}
                            className={classNames(
                              focus ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Logout
                          </p>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-5 w-full bg-white">
            <div className="px-4 sm:px-6 lg:px-5 w-full h-full bg-white">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
