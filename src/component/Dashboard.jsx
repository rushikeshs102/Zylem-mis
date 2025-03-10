import { MdOutlineMenuOpen, MdOutlineLogout } from "react-icons/md";
import { LuLayoutDashboard, LuAlarmClock } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";


function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[var(--primary-bg)] ${
          isSidebarCollapsed ? "w-16" : "w-[15%]"
        } border-r-1 border-gray-300 shadow-sm h-screen fixed flex flex-col transition-all duration-300`}
      >
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <img
            src={logo}
            alt="logo"
            className={`h-8 ${isSidebarCollapsed ? "hidden" : "block"}`}
          />
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <MdOutlineMenuOpen className="text-xl" />
          </button>
        </div>

        {/* Search Bar */}
        {!isSidebarCollapsed && (
          <div className="mb-4 flex mt-4 px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-8 bg-gray-300 p-2 text-gray-600 rounded-xl border border-gray-300"
            />
          </div>
        )}

        {/* Menu List */}
        <ul className="text-[#121212] space-y-4 flex-grow mt-4 px-4">
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <LuLayoutDashboard className="text-xl" />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <MdOutlineMenuOpen className="text-xl" />
            {!isSidebarCollapsed && <span>Menu</span>}
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            {!isSidebarCollapsed && <span>Quick Links</span>}
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <FaRegStar className="text-xl" />
            {!isSidebarCollapsed && <span>Favorite</span>}
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <LuAlarmClock className="text-xl" />
            {!isSidebarCollapsed && <span>Scheduler</span>}
          </li>
        </ul>

        {/* Logout Button */}
        <button className="text-red-700 pb-2 mb-14 flex items-center hover:bg-red-100 p-2 rounded-lg mx-4">
          <MdOutlineLogout className="text-2xl mr-2" />
          {!isSidebarCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className={`${isSidebarCollapsed ? "ml-16" : "ml-[15%]"} flex-1 flex flex-col transition-all duration-300`}
      >
        {/* Navbar */}
        <nav className="bg-[var(--primary-bg)] w-full z-10 flex items-center p-3 border-b border-1 border-gray-300 shadow-sm">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4 18 L 4 19 L 10.269531 19 A 2 2 0 0 0 10 20 A 2 2 0 0 0 12 22 A 2 2 0 0 0 14 20 A 2 2 0 0 0 13.728516 19 L 20 19 L 20 18 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 12 6 C 14.206 6 16 7.794 16 10 L 16 16 L 16 16.828125 L 16.171875 17 L 7.828125 17 L 8 16.828125 L 8 16 L 8 10 C 8 7.794 9.794 6 12 6 z"></path>
              </svg>
            </button>

            {/* Settings Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z"></path>
              </svg>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Admin"
                className="h-8 w-8 rounded-xl"
              />
              <span className="text-gray-700 font-medium">Admin</span>
            </div>
          </div>
        </nav>

        {/* Navigation Breadcrumbs */}
        <div className="flex items-center p-4 text-gray-500 text-sm">
          <span>Report</span>
          <span className="mx-2">›</span>
          <span>Sales</span>
          <span className="mx-2">›</span>
          <span className="font-medium text-gray-700">Sales Analysis</span>
        </div>

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
