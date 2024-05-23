import React, { useEffect, useState } from "react";
import { appicons } from "../../constants/index";
import { FaBars, FaList } from "react-icons/fa";
import { format } from "date-fns";
import { getOrders, getClients, completeOrders } from "../../Common";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import arePointsNear from "../../utils";
import { products } from "../../constants/data";
import { notification } from "antd";

function Maindash() {
  const usr = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [localOrders, setlocalOrders] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [centerpoint, setCenterpoint] = useState({});
  const [orderstatus, setOrderstatus] = useState("active");
  // const [ordersum, setOrdersum] = useState("");

  const [singleOrder, setSingleOrder] = useState({});
  const [loading, setloading] = useState(false);
  // const center = {
  //   lat: 0,
  //   lng: -0.23,
  // };

  const completeOrder = (status, orderid) => {
    let data = {
      status: status,
      orderid: orderid,
    };
    completeOrders(data)
      .then((res) => {
        console.log("resssss", res.message);
        if (res?.success === 1) {
          setloading(false);
          notification["success"]({
            message: "Order Status",
            description: res?.message,
          });
        } else {
          setloading(false);
          notification["warning"]({
            message: "Order Status",
            description: res?.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    let neworders = [];
    getOrders()
      .then((res) => {
        console.log(res);
        if (res.success === 1) {
          setOrders(res.data);
          if (usr !== undefined) {
            centerpoint["lng"] = JSON.parse(usr.lnglat)[0];
            centerpoint["lat"] = JSON.parse(usr.lnglat)[1];
            setCenterpoint({ ...centerpoint });
          }

          if (res.data?.length > 0) {
            res.data.map((order, cidx) => {
              var lnglat = order.lnglat
                ? JSON.parse(order.lnglat)
                : { lng: 0, lat: 0 };

              if (
                arePointsNear({ lng: lnglat[0], lat: lnglat[1] }, centerpoint) >
                50
              ) {
                return;
              } else {
                neworders.push(order);
                setlocalOrders(neworders);
                console.log("local", neworders);
              }

              // console.log(
              //   arePointsNear(check, centerpoint),
              //   JSON.parse(usr.lnglat)
              // );
            });
          }
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert(err);
      });

    getClients()
      .then((res) => {
        console.log(res);
        if (res.success === 1) {
          setClients(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const sidebarMenu = document.querySelector(".sidebar-menu");
  const main = document.querySelector(".main");
  if (window.innerWidth < 768) {
    main.classList.toggle("active");
    sidebarOverlay.classList.toggle("hidden");
    sidebarMenu.classList.toggle("-translate-x-full");
  }

  const toggleDash = (e) => {
    e.preventDefault();
    main.classList.toggle("active");
    sidebarOverlay.classList.toggle("hidden");
    sidebarMenu.classList.toggle("-translate-x-full");
  };

  const overlayClick = (e) => {
    e.preventDefault();
    main.classList.add("active");
    sidebarOverlay.classList.add("hidden");
    sidebarMenu.classList.add("-translate-x-full");
  };

  document
    .querySelectorAll(".sidebar-dropdown-toggle")
    .forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const parent = item.closest(".group");
        if (parent.classList.contains("selected")) {
          parent.classList.remove("selected");
        } else {
          document
            .querySelectorAll(".sidebar-dropdown-toggle")
            .forEach(function (i) {
              i.closest(".group").classList.remove("selected");
            });
          parent.classList.add("selected");
        }
      });
    });

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/50 z-50 flex flex-col justify-center">
          <Spinner color="default" />
        </div>
      )}
      {/* <!-- start: Sidebar --> */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
        <a
          href="/#"
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <img
            src={appicons["logo.png"]}
            alt=""
            className="w-20 h-auto rounded-full aspect-square object-contain bg-black p-2"
          />
        </a>
        <ul className="mt-4">
          <li className="mb-1 group active">
            <a
              href="/#"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              href="/#"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <span className="text-sm">Orders</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
            </a>
            <ul className="pl-7 mt-2 hidden group-[.selected]:block">
              <li className="mb-4">
                <a
                  href="/#"
                  onClick={() => setOrderstatus("active")}
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Active order
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/#"
                  onClick={() => setOrderstatus("completed")}
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Completed order
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/#"
                  onClick={() => setOrderstatus("canceled")}
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Canceled order
                </a>
              </li>
            </ul>
          </li>

          <li className="mb-1 group">
            <a
              href="/#"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-settings-2-line mr-3 text-lg"></i>
              <span className="text-sm">Settings</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        onClick={overlayClick}
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
      ></div>
      {/* <!-- end: Sidebar --> */}

      {/* <!-- start: Main --> */}
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button
            type="button"
            className="text-lg text-gray-600 sidebar-toggle"
            onClick={toggleDash}
          >
            {/* <i className="ri-menu-line"></i> */}
            <FaBars />
          </button>
          <ul className="flex items-center text-sm ml-4">
            <li className="mr-2">
              <a
                href="/#"
                className="text-gray-700 hover:text-gray-600 font-medium"
              >
                Dashboard
              </a>
            </li>
            <li className="text-gray-600 mr-2 font-medium">/</li>
            <li className="text-gray-600 mr-2 font-medium">Analytics</li>
          </ul>
          <ul className="ml-auto flex items-center">
            <li className="mr-1 dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-700 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              >
                <i className="ri-search-line"></i>
              </button>
              <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                <form action="" className="p-4 border-b border-b-gray-100">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                      placeholder="Search..."
                    />
                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-700"></i>
                  </div>
                </form>
                <div className="mt-3 mb-2">
                  <div className="text-[13px] font-medium text-gray-700 ml-4 mb-2">
                    Recently
                  </div>
                  <ul className="max-h-64 overflow-y-auto">
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-700">$345</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-700 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              >
                <i className="ri-notification-3-line"></i>
              </button>
              <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                  <button
                    type="button"
                    data-tab="notification"
                    data-tab-page="notifications"
                    className="text-gray-700 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active"
                  >
                    Notifications
                  </button>
                  <button
                    type="button"
                    data-tab="notification"
                    data-tab-page="messages"
                    className="text-gray-700 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1"
                  >
                    Messages
                  </button>
                </div>
                <div className="my-2">
                  <ul
                    className="max-h-64 overflow-y-auto"
                    data-tab-for="notification"
                    data-page="notifications"
                  >
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-700">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-700">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-700">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-700">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-700">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="max-h-64 overflow-y-auto hidden"
                    data-tab-for="notification"
                    data-page="messages"
                  >
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-700">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-700">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-700">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-700">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-700">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="dropdown ml-3">
              <button
                type="button"
                className="dropdown-toggle flex items-center"
              >
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-8 h-8 rounded block object-cover align-middle"
                />
              </button>
              <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                  <a
                    href="/#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="p-6 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold mb-1">
                    {orders?.length > 0 ? orders.length : "0"}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Active orders
                  </div>
                </div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <FaList />
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-100 rounded-full h-4">
                  <div
                    className="h-full bg-blue-500 rounded-full p-1"
                    style={{ width: "60%" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 ml-4">
                  60%
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {clients?.length > 0 ? clients.length : "0"}
                    </div>
                    <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                      +30%
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Clients
                  </div>
                </div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover block"
                />
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover block -ml-3"
                />
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover block -ml-3"
                />
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover block -ml-3"
                />
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover block -ml-3"
                />
              </div>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold mb-1">
                    <span className="text-base font-normal text-gray-700 align-top">
                      kes{" "}
                    </span>
                    {localOrders?.length > 0
                      ? localOrders.map((ord, orindx) => {
                          if (orindx === 0) {
                            let Totalorders = 0,
                              i = -1;
                            while (++i < localOrders.length) {
                              Totalorders += parseInt(
                                localOrders[i].order_price
                              );
                            }

                            // setOrdersum(Totalorders);
                            return (
                              <span className="text-blue-700">
                                {Totalorders}
                              </span>
                            );
                          }
                        })
                      : "0"}

                    {/* {ordersum} */}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Active Orders
                  </div>
                </div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <a
                href="/#"
                className="text-blue-500 font-medium text-sm hover:text-blue-600"
              >
                View details
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-600 shadow-md shadow-black/5 p-6 rounded-md">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Manage orders</div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center mb-4 order-tab">
                <button
                  type="button"
                  data-tab="order"
                  onClick={() => setOrderstatus("active")}
                  data-tab-page="active"
                  className="bg-gray-50 text-sm font-medium text-gray-700 py-2 px-4 rounded-tl-md rounded-bl-md hover:text-gray-600 active"
                >
                  Active
                </button>
                <button
                  type="button"
                  data-tab="order"
                  onClick={() => setOrderstatus("completed")}
                  data-tab-page="completed"
                  className="bg-gray-50 text-sm font-medium text-gray-700 py-2 px-4 hover:text-gray-600"
                >
                  Completed
                </button>
                <button
                  type="button"
                  data-tab="order"
                  onClick={() => setOrderstatus("canceled")}
                  data-tab-page="canceled"
                  className="bg-gray-50 text-sm font-medium text-gray-700 py-2 px-4 rounded-tr-md rounded-br-md hover:text-gray-600"
                >
                  Canceled
                </button>
              </div>
              <div className="overflow-x-auto">
                {orderstatus === "active" && (
                  <table
                    className="w-full min-w-[540px]"
                    data-tab-for="order"
                    data-page="active"
                  >
                    <thead>
                      <tr>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                          Order Id
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                          Type
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                          Quantity
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Price
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {localOrders?.length > 0
                        ? localOrders.reverse().map((order, odnx) => {
                            return (
                              <>
                                {order.order_status === "0" && (
                                  <tr
                                    key={`${order.order_id}-${odnx}`}
                                    onClick={() => {
                                      onOpen();
                                      setSingleOrder(order);
                                    }}
                                    className="hover:bg-teal-600/10 transition-all ease-in-out duration-400 cursor-pointer"
                                  >
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      <div className="flex items-center">
                                        <img
                                          src="https://placehold.co/32x32"
                                          alt=""
                                          className="w-8 h-8 rounded object-cover block"
                                        />
                                        <span className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                                          {order.order_id}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {products?.length > 0 &&
                                        products.map((prod, pidx) => {
                                          return (
                                            <span className="text-[13px] font-medium text-gray-700 grid">
                                              {Object.keys(
                                                JSON.parse(order.order_qty)
                                              ).map((i) => {
                                                let porder = JSON.parse(
                                                  order.order_qty
                                                )[i];

                                                if (
                                                  prod.title
                                                    .toLocaleLowerCase()
                                                    .includes(
                                                      i
                                                        .split("-")[0]
                                                        .toLocaleLowerCase()
                                                    )
                                                ) {
                                                  return <>{prod.title}</>;
                                                }
                                              })}
                                            </span>
                                          );
                                        })}
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {products?.length > 0 &&
                                        products.map((prod, pidx) => {
                                          return (
                                            <span className="text-[13px] font-medium text-gray-700 grid">
                                              {Object.keys(
                                                JSON.parse(order.order_qty)
                                              ).map((i) => {
                                                let porder = JSON.parse(
                                                  order.order_qty
                                                )[i];

                                                if (
                                                  prod.title
                                                    .toLocaleLowerCase()
                                                    .includes(
                                                      i
                                                        .split("-")[0]
                                                        .toLocaleLowerCase()
                                                    )
                                                ) {
                                                  return <>{porder}</>;
                                                }
                                              })}
                                            </span>
                                          );
                                        })}
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      <span className="inline-block p-1 rounded bg-cyan-700/10 text-cyan-700 font-medium text-[12px] leading-none">
                                        kes {order.order_price}
                                      </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {order.order_status !== undefined &&
                                        order.order_status === "0" && (
                                          <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                            In progress
                                          </span>
                                        )}
                                    </td>
                                  </tr>
                                )}
                              </>
                            );
                          })
                        : "No Orders near you yet"}
                    </tbody>
                  </table>
                )}
                {orderstatus === "completed" && (
                  <table
                    className="w-full min-w-[540px]"
                    data-tab-for="order"
                    data-page="active"
                  >
                    <thead>
                      <tr>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                          Order Id
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                          Type
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                          Quantity
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Price
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {localOrders?.length > 0
                        ? localOrders.reverse().map((order, odnx) => {
                            return (
                              <>
                                {order.order_status === "1" && (
                                  <tr
                                    key={`${order.order_id}-${odnx}`}
                                    onClick={() => {
                                      onOpen();
                                      setSingleOrder(order);
                                    }}
                                    className="hover:bg-teal-600/10 transition-all ease-in-out duration-400 cursor-pointer"
                                  >
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      <div className="flex items-center">
                                        <img
                                          src="https://placehold.co/32x32"
                                          alt=""
                                          className="w-8 h-8 rounded object-cover block"
                                        />
                                        <span className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                                          {order.order_id}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {products?.length > 0 &&
                                        products.map((prod, pidx) => {
                                          return (
                                            <span className="text-[13px] font-medium text-gray-700 grid">
                                              {Object.keys(
                                                JSON.parse(order.order_qty)
                                              ).map((i) => {
                                                let porder = JSON.parse(
                                                  order.order_qty
                                                )[i];

                                                if (
                                                  prod.title
                                                    .toLocaleLowerCase()
                                                    .includes(
                                                      i
                                                        .split("-")[0]
                                                        .toLocaleLowerCase()
                                                    )
                                                ) {
                                                  return <>{prod.title}</>;
                                                }
                                              })}
                                            </span>
                                          );
                                        })}
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {products?.length > 0 &&
                                        products.map((prod, pidx) => {
                                          return (
                                            <span className="text-[13px] font-medium text-gray-700 grid">
                                              {Object.keys(
                                                JSON.parse(order.order_qty)
                                              ).map((i) => {
                                                let porder = JSON.parse(
                                                  order.order_qty
                                                )[i];

                                                if (
                                                  prod.title
                                                    .toLocaleLowerCase()
                                                    .includes(
                                                      i
                                                        .split("-")[0]
                                                        .toLocaleLowerCase()
                                                    )
                                                ) {
                                                  return <>{porder}</>;
                                                }
                                              })}
                                            </span>
                                          );
                                        })}
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      <span className="inline-block p-1 rounded bg-cyan-700/10 text-cyan-700 font-medium text-[12px] leading-none">
                                        kes {order.order_price}
                                      </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {order.order_status !== undefined &&
                                        order.order_status === "1" && (
                                          <span className="inline-block p-1 rounded bg-emerald-500/10 text-orange-500 font-medium text-[12px] leading-none">
                                            Delivered
                                          </span>
                                        )}
                                    </td>
                                  </tr>
                                )}
                              </>
                            );
                          })
                        : "No Orders near you yet"}
                    </tbody>
                  </table>
                )}
                {orderstatus === "canceled" && (
                  <table
                    className="w-full min-w-[540px]"
                    data-tab-for="order"
                    data-page="active"
                  >
                    <thead>
                      <tr>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                          Order Id
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                          Type
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                          Quantity
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Price
                        </th>
                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {localOrders?.length > 0
                        ? localOrders.reverse().map((order, odnx) => {
                            return (
                              <>
                                {order.order_status === "2" && (
                                  <tr
                                    key={`${order.order_id}-${odnx}`}
                                    onClick={() => {
                                      onOpen();
                                      setSingleOrder(order);
                                    }}
                                    className="hover:bg-teal-600/10 transition-all ease-in-out duration-400 cursor-pointer"
                                  >
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      <div className="flex items-center">
                                        <img
                                          src="https://placehold.co/32x32"
                                          alt=""
                                          className="w-8 h-8 rounded object-cover block"
                                        />
                                        <span className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                                          {order.order_id}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {products?.length > 0 &&
                                        products.map((prod, pidx) => {
                                          return (
                                            <span className="text-[13px] font-medium text-gray-700 grid">
                                              {Object.keys(
                                                JSON.parse(order.order_qty)
                                              ).map((i) => {
                                                let porder = JSON.parse(
                                                  order.order_qty
                                                )[i];

                                                if (
                                                  prod.title
                                                    .toLocaleLowerCase()
                                                    .includes(
                                                      i
                                                        .split("-")[0]
                                                        .toLocaleLowerCase()
                                                    )
                                                ) {
                                                  return <>{prod.title}</>;
                                                }
                                              })}
                                            </span>
                                          );
                                        })}
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {products?.length > 0 &&
                                        products.map((prod, pidx) => {
                                          return (
                                            <span className="text-[13px] font-medium text-gray-700 grid">
                                              {Object.keys(
                                                JSON.parse(order.order_qty)
                                              ).map((i) => {
                                                let porder = JSON.parse(
                                                  order.order_qty
                                                )[i];

                                                if (
                                                  prod.title
                                                    .toLocaleLowerCase()
                                                    .includes(
                                                      i
                                                        .split("-")[0]
                                                        .toLocaleLowerCase()
                                                    )
                                                ) {
                                                  return <>{porder}</>;
                                                }
                                              })}
                                            </span>
                                          );
                                        })}
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      <span className="inline-block p-1 rounded bg-cyan-700/10 text-cyan-700 font-medium text-[12px] leading-none">
                                        kes {order.order_price}
                                      </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                      {order.order_status !== undefined &&
                                        order.order_status === "2" && (
                                          <span className="inline-block p-1 rounded bg-emerald-500/10 text-red-500 font-medium text-[12px] leading-none">
                                            Canceled
                                          </span>
                                        )}
                                    </td>
                                  </tr>
                                )}
                              </>
                            );
                          })
                        : "No Orders near you yet"}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Manage Products</div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <form action="" className="flex items-center mb-4">
                <div className="relative w-full mr-2">
                  <input
                    type="text"
                    className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                    placeholder="Search..."
                  />
                  <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-700"></i>
                </div>
                <select className="text-sm py-2 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]">
                  <option value="">All</option>
                </select>
              </form>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px]">
                  <thead>
                    <tr>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                        Product
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                        Price/litre
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                        Stock
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="w-8 h-8 rounded object-cover block"
                          />
                          <a
                            href="/#"
                            className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                          >
                            Vanilla
                          </a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          kes 230
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          Available
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="dropdown-toggle text-gray-700 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                          >
                            <i className="ri-more-2-fill"></i>
                          </button>
                          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Profile
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="w-8 h-8 rounded object-cover block"
                          />
                          <a
                            href="/#"
                            className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                          >
                            Strawberry
                          </a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          kes 230
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          Available
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="dropdown-toggle text-gray-700 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                          >
                            <i className="ri-more-2-fill"></i>
                          </button>
                          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Profile
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="w-8 h-8 rounded object-cover block"
                          />
                          <a
                            href="/#"
                            className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                          >
                            Passion
                          </a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          kes 230
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          Available
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="dropdown-toggle text-gray-700 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                          >
                            <i className="ri-more-2-fill"></i>
                          </button>
                          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Profile
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="w-8 h-8 rounded object-cover block"
                          />
                          <a
                            href="/#"
                            className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                          >
                            Mango
                          </a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          kes 230
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          Available
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="dropdown-toggle text-gray-700 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                          >
                            <i className="ri-more-2-fill"></i>
                          </button>
                          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Profile
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="w-8 h-8 rounded object-cover block"
                          />
                          <a
                            href="/#"
                            className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                          >
                            Blackcurrant
                          </a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          kes 230
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-gray-700">
                          Available
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="dropdown-toggle text-gray-700 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                          >
                            <i className="ri-more-2-fill"></i>
                          </button>
                          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Profile
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Order Statistics</div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="rounded-md border border-dashed border-gray-200 p-4">
                  <div className="flex items-center mb-0.5">
                    <div className="text-xl font-semibold">10</div>
                    <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                      $80
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm">Active</span>
                </div>
                <div className="rounded-md border border-dashed border-gray-200 p-4">
                  <div className="flex items-center mb-0.5">
                    <div className="text-xl font-semibold">50</div>
                    <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                      +$469
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm">Completed</span>
                </div>
                <div className="rounded-md border border-dashed border-gray-200 p-4">
                  <div className="flex items-center mb-0.5">
                    <div className="text-xl font-semibold">4</div>
                    <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
                      -$130
                    </span>
                  </div>
                  <span className="text-gray-700 text-sm">Canceled</span>
                </div>
              </div>
              <div>
                <canvas id="order-chart"></canvas>
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Manage Clients</div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="dropdown-toggle text-gray-700 hover:text-gray-600"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px]">
                  <thead>
                    <tr>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                        Name
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                        Email
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients?.length > 0
                      ? clients.map((client, cindx) => {
                          return (
                            <tr>
                              <td className="py-2 px-4 border-b border-b-gray-50">
                                <div className="flex items-center">
                                  <img
                                    src="https://placehold.co/32x32"
                                    alt=""
                                    className="w-8 h-8 rounded object-cover block"
                                  />
                                  <a
                                    href="/#"
                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                  >
                                    {client.client_fname} + +{" "}
                                    {client.client_lname}
                                  </a>
                                </div>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50">
                                <span className="text-[13px] font-medium text-emerald-500">
                                  {client.client_email}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b border-b-gray-50">
                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                  {client.client_phone}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
      </main>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {singleOrder?.order_id !== ""
                  ? singleOrder.order_id
                  : "No details"}
              </ModalHeader>
              <ModalBody>
                <table>
                  <thead>
                    <tr>
                      <th scope="col" colspan="2">
                        Item
                      </th>
                      <th scope="col">Qty</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        {products?.length > 0 &&
                          products.map((prod, pidx) => {
                            return (
                              <span className="text-[13px] font-medium text-gray-700 grid">
                                {Object.keys(
                                  JSON.parse(singleOrder.order_qty)
                                ).map((i) => {
                                  let porder = JSON.parse(
                                    singleOrder.order_qty
                                  )[i];

                                  if (
                                    prod.title
                                      .toLocaleLowerCase()
                                      .includes(
                                        i.split("-")[0].toLocaleLowerCase()
                                      )
                                  ) {
                                    return <>{prod.title}</>;
                                  }
                                })}
                              </span>
                            );
                          })}
                      </td>
                      <td class="item-stock"></td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        {products?.length > 0 &&
                          products.map((prod, pidx) => {
                            return (
                              <span className="text-[13px] font-medium text-gray-700 grid">
                                {Object.keys(
                                  JSON.parse(singleOrder.order_qty)
                                ).map((i) => {
                                  let porder = JSON.parse(
                                    singleOrder.order_qty
                                  )[i];

                                  if (
                                    prod.title
                                      .toLocaleLowerCase()
                                      .includes(
                                        i.split("-")[0].toLocaleLowerCase()
                                      )
                                  ) {
                                    return <>{porder}</>;
                                  }
                                })}
                              </span>
                            );
                          })}
                      </td>
                      <td class="item-price">
                        kes{" "}
                        {singleOrder?.order_price !== ""
                          ? singleOrder.order_price
                          : "No details"}
                      </td>
                    </tr>
                    <tr>
                      <td>Delivery Date(s)</td>
                      <td></td>
                      <td></td>
                      <td>
                        {/* {singleOrder?.order_date} */}
                        {JSON.parse(singleOrder?.order_date).length > 0
                          ? JSON.parse(singleOrder.order_date).map((d, idx) => {
                              return (
                                <span key={idx}>
                                  {" "}
                                  {format(new Date(d), "dd MMM yyyy")} |{" "}
                                </span>
                              );
                            })
                          : ""}
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr class="text-offset">
                      <td colspan="3">SubTotal</td>
                      <td>
                        kes{" "}
                        {singleOrder?.order_price !== ""
                          ? singleOrder.order_price
                          : "No details"}
                      </td>
                    </tr>
                    <tr class="text-offset">
                      <td colspan="3">Delivery</td>
                      <td>kes 0</td>
                    </tr>
                    <tr class="text-offset">
                      <td colspan="3">Total</td>
                      <td>
                        kes{" "}
                        {singleOrder?.order_price !== ""
                          ? parseInt(singleOrder.order_price)
                          : "No details"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                  onClick={() => completeOrder("1", singleOrder.order_id)}
                >
                  Complete Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Maindash;
