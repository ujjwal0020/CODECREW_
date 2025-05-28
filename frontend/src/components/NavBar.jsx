// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { removeUser } from "../utils/userSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
//       dispatch(removeUser());
//       return navigate("/login");
//     } catch (err) {
//       // Optional: Handle error
//     }
//   };

//   return (
//     <div className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Left: Logo */}
//         <div className="flex items-center gap-2">
//           <Link
//             to={user ? "/feed" : "/"}
//             className="text-2xl text-black font-bold hover:text-yellow-500 transition"
//           >
//             <span className="mr-2">🦸🏻</span> CodeCrew
//           </Link>
//         </div>

//         {/* Center: Navigation Links (Desktop) */}
//         <nav className="hidden md:flex gap-20 font-medium text-black">
//           <Link
//             to={user ? "/feed" : "/"}
//             className="hover:bg-yellow-300 hover:text-black px-4 py-2 rounded-full transition"
//           >
//             Home
//           </Link>

//           <Link
//             to="/about"
//             className="hover:bg-yellow-300 hover:text-black px-4 py-2 rounded-full transition"
//           >
//             About Us
//           </Link>
//           <Link
//             to="/contact"
//             className="hover:bg-yellow-300 hover:text-black px-4 py-2 rounded-full transition"
//           >
//             Contact Us
//           </Link>
//         </nav>

//         {/* Right: Auth/Login/Profile */}
//         <div className="flex items-center gap-4">
//           {!user ? (
//             <Link to="/login">
//               <button className="hidden md:inline-flex items-center px-5 py-2.5 text-base transition hover:bg-yellow-300 hover:text-black font-semibold text-black bg-white border border-gray-300 rounded-full">
//                 Login
//               </button>
//             </Link>
//           ) : (
//             <div className="text-sm font-medium text-gray-700">
//               Welcome, {user.firstName || user.data.firstName}
//             </div>
//           )}

//           {user && (
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="user-avatar"
//                     src={user.photoUrl || user.data.photoUrl}
//                   />
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-white rounded-box w-52 text-black "
//               >
//                 <li>
//                   <a onClick={handleLogout}>Logout</a>
//                 </li>
//               </ul>
//             </div>
//           )}

//           {/* Hamburger (Mobile) */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-800 focus:outline-none"
//             >
//               {isMobileMenuOpen ? (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white px-4 pb-4 space-y-2">
//           <Link
//             to="/"
//             className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             About Us
//           </Link>
//           <Link
//             to="/contact"
//             className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             Contact Us
//           </Link>
//           {!user && (
//             <Link
//               to="/login"
//               className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // Optional: handle error
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to={user ? "/feed" : "/"}
            className="text-2xl text-black font-bold hover:text-yellow-500 transition"
          >
            <span className="mr-2">🦸🏻</span> CodeCrew
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-20 font-medium text-black">
          <Link
            to={user ? "/feed" : "/"}
            className="hover:bg-yellow-300 hover:text-black px-4 py-2 rounded-full transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:bg-yellow-300 hover:text-black px-4 py-2 rounded-full transition"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:bg-yellow-300 hover:text-black px-4 py-2 rounded-full transition"
          >
            Contact Us
          </Link>
        </nav>

        {/* Right: Auth/Login/Profile */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
          {!user ? (
            <Link to="/login">
              <button className="hidden md:inline-flex items-center px-5 py-2.5 text-base transition hover:bg-yellow-300 hover:text-black font-semibold text-black bg-white border border-gray-300 rounded-full">
                Login
              </button>
            </Link>
          ) : (
            <div className="text-sm font-medium text-gray-700">
              Welcome, {user.firstName || user.data.firstName}
            </div>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user-avatar"
                    src={user.photoUrl || user.data.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-white rounded-box w-52 text-black"
              >
                <li>
                  <a
                    onClick={handleLogout}
                    className="hover:bg-yellow-300"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
          {!user && (
            <Link
              to="/login"
              className="block px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
