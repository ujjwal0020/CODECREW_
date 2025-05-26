import React, { useState } from "react";
import { TbCardsFilled } from "react-icons/tb";
import { FaUsers, FaUserEdit, FaEye } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { SubscriptionCard } from "./SubscriptionCard";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiContactlessPaymentFill } from "react-icons/pi";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const SidebarLinks = () => (
    <ul className="space-y-6 text-lg font-medium p-6">
      <li>
        <Link
          to="/feed"
          className="flex items-center gap-3 hover:text-blue-600"
          onClick={closeDrawer}
        >
          <TbCardsFilled /> Explore
        </Link>
      </li>
      <li>
        <Link
          to="/connections"
          className="flex items-center gap-3 hover:text-blue-600"
          onClick={closeDrawer}
        >
          <FaUsers /> Connections
        </Link>
      </li>
      <li>
        <Link
          to="/requests"
          className="flex items-center gap-3 hover:text-blue-600"
          onClick={closeDrawer}
        >
          <MdOutlineNotifications /> Notifications
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            openModal();
            closeDrawer();
          }}
          className="flex items-center gap-3 hover:text-blue-600"
        >
          <FaEye /> Views
        </button>
      </li>
      <li>
        <Link
          to="/messages"
          className="flex items-center gap-3 hover:text-blue-600"
          onClick={closeDrawer}
        >
          <AiOutlineMessage /> Messages
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:text-blue-600"
          onClick={closeDrawer}
        >
          <FaUserEdit /> Profile
        </Link>
      </li>
      <li>
        <Link
          to="/premium"
          className="flex items-center gap-3 hover:text-blue-600"
          onClick={closeDrawer}
        >
          <PiContactlessPaymentFill />
          Premium
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button onClick={toggleDrawer} className="btn btn-ghost text-2xl">
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white text-black min-h-screen p-6 shadow-md z-10">
        {SidebarLinks()}
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={closeDrawer}
          ></div>
          <div className="fixed top-0 left-0 h-full w-64 bg-white text-black z-40 shadow-lg">
            {SidebarLinks()}
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-box relative bg-white rounded-lg p-6 w-96 shadow-lg">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
              <SubscriptionCard />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;