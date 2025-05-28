// // import { useState } from "react";
// // import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import { addUser } from "../utils/userSlice";
// // import { useNavigate } from "react-router-dom";
// // import { BASE_URL } from "../utils/constants";

// // const Login = () => {
// //   const [emailId, setEmailId] = useState("shikhar@gmail.com");
// //   const [password, setPassword] = useState("@Shekhuinsta_44");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [age, setAge] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [isLoginForm, setIsLoginForm] = useState(true);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(
// //         BASE_URL + "/login",
// //         { emailId, password },
// //         { withCredentials: true }
// //       );
// //       dispatch(addUser(res.data));
// //       navigate("/feed");
// //     } catch (err) {
// //       setErrorMessage(err?.response?.data?.message || "Something went wrong");
// //     }
// //   };

// //   const handleSignUp = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(
// //         BASE_URL + "/signup",
// //         { emailId, password, firstName, lastName, age, gender },
// //         { withCredentials: true }
// //       );
// //       dispatch(addUser(res.data.data));
// //       navigate("/feed");
// //     } catch (err) {
// //       setErrorMessage(err?.response?.data?.message || "Something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen w-full bg-gray-100">
// //       {/* Left Side Form */}
// //       <div className="flex w-full md:w-1/2 justify-center items-center">
// //         <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
// //           <h2 className="text-3xl font-bold text-gray-800 mb-2">
// //             {isLoginForm ? "Welcome 🙏, CodeCrew" : "Create an Account"}
// //           </h2>
// //           <p className="text-gray-500 mb-6">
// //             {isLoginForm ? "Please login to continue." : "Please fill the form to register."}
// //           </p>

// //           {/* SignUp Fields */}
// //           {!isLoginForm && (
// //             <div className="grid grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="text-sm font-medium">First Name</label>
// //                 <input
// //                   type="text"
// //                   value={firstName}
// //                   onChange={(e) => setFirstName(e.target.value)}
// //                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
// //                   placeholder="First Name"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="text-sm font-medium">Last Name</label>
// //                 <input
// //                   type="text"
// //                   value={lastName}
// //                   onChange={(e) => setLastName(e.target.value)}
// //                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
// //                   placeholder="Last Name"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="text-sm font-medium">Gender</label>
// //                 <select
// //                   value={gender}
// //                   onChange={(e) => setGender(e.target.value)}
// //                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="male">Male</option>
// //                   <option value="female">Female</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="text-sm font-medium">Age</label>
// //                 <input
// //                   type="text"
// //                   value={age}
// //                   onChange={(e) => setAge(e.target.value)}
// //                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
// //                   placeholder="Your Age"
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           {/* Common Fields */}
// //           <div className="mb-4">
// //             <label className="text-sm font-medium">Email</label>
// //             <input
// //               type="email"
// //               value={emailId}
// //               onChange={(e) => setEmailId(e.target.value)}
// //               className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
// //               placeholder="Email"
// //             />
// //           </div>
// //           <div className="mb-4 relative">
// //             <label className="text-sm font-medium">Password</label>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
// //               placeholder="Password"
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
// //             >
// //               {showPassword ? "Hide" : "Show"}
// //             </button>
// //           </div>

// //           {errorMessage && (
// //             <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
// //           )}

// //           <button
// //             onClick={isLoginForm ? handleLogin : handleSignUp}
// //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
// //           >
// //             {isLoginForm ? "Login" : "Sign Up"}
// //           </button>

// //           <div className="mt-6 text-center text-sm text-gray-600">
// //             {isLoginForm ? "Don't have an account?" : "Already have an account?"}
// //             <span
// //               className="ml-1 font-medium text-blue-600 cursor-pointer hover:underline"
// //               onClick={() => setIsLoginForm(!isLoginForm)}
// //             >
// //               {isLoginForm ? "Sign up" : "Login"}
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Side Image */}
// //       <div className="hidden md:flex w-1/2 h-screen">
// //         <img
// //           src={
// //             isLoginForm
// //               ? "https://i.pinimg.com/originals/06/aa/40/06aa408f09f394c3b46d6cbe1efad944.gif"
// //               : "https://i.pinimg.com/originals/a4/07/22/a4072206392b57e4b3ede6588e81d7f3.gif"
// //           }
// //           alt="Login Graphic"
// //           className="w-full h-full object-cover"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api"; // use centralized axios instance

// const Login = () => {
//   const [emailId, setEmailId] = useState("shikhar@gmail.com");
//   const [password, setPassword] = useState("@Shekhuinsta_44");
//   const [showPassword, setShowPassword] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/login", { emailId, password });
//       dispatch(addUser(res.data));
//       navigate("/feed");
//     } catch (err) {
//       setErrorMessage(err?.response?.data || "Something went wrong");
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/signup", {
//         emailId,
//         password,
//         firstName,
//         lastName,
//         age,
//         gender,
//       });
//       dispatch(addUser(res.data));
//       navigate("/feed");
//     } catch (err) {
//       setErrorMessage(err?.response?.data || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full bg-gray-100">
//       {/* Left Side Form */}
//       <div className="flex w-full md:w-1/2 justify-center items-center">
//         <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             {isLoginForm ? "Welcome 🙏, CodeCrew" : "Create an Account"}
//           </h2>
//           <p className="text-gray-500 mb-6">
//             {isLoginForm
//               ? "Please login to continue."
//               : "Please fill the form to register."}
//           </p>

//           {/* SignUp Fields */}
//           {!isLoginForm && (
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="text-sm font-medium">First Name</label>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Last Name</label>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
//                   placeholder="Last Name"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Gender</label>
//                 <select
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Age</label>
//                 <input
//                   type="text"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
//                   placeholder="Your Age"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Common Fields */}
//           <div className="mb-4">
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={emailId}
//               onChange={(e) => setEmailId(e.target.value)}
//               className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
//               placeholder="Email"
//             />
//           </div>
//           <div className="mb-4 relative">
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
//               placeholder="Password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           {errorMessage && (
//             <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
//           )}

//           <button
//             onClick={isLoginForm ? handleLogin : handleSignUp}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
//           >
//             {isLoginForm ? "Login" : "Sign Up"}
//           </button>

//           <div className="mt-6 text-center text-sm text-gray-600">
//             {isLoginForm
//               ? "Don't have an account?"
//               : "Already have an account?"}
//             <span
//               className="ml-1 font-medium text-blue-600 cursor-pointer hover:underline"
//               onClick={() => setIsLoginForm(!isLoginForm)}
//             >
//               {isLoginForm ? "Sign up" : "Login"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Image */}
//       <div className="hidden md:flex w-1/2 h-screen">
//         <img
//           src={
//             isLoginForm
//               ? "https://i.pinimg.com/originals/06/aa/40/06aa408f09f394c3b46d6cbe1efad944.gif"
//               : "https://i.pinimg.com/originals/a4/07/22/a4072206392b57e4b3ede6588e81d7f3.gif"
//           }
//           alt="Login Graphic"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // centralized axios instance

const Login = () => {
  const [emailId, setEmailId] = useState("shikhar@gmail.com");
  const [password, setPassword] = useState("@Shekhuinsta_44");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", { emailId, password });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/signup", {
        emailId,
        password,
        firstName,
        lastName,
        age,
        gender,
      });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Left Side Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isLoginForm ? "Welcome 🙏, CodeCrew" : "Create an Account"}
          </h2>
          <p className="text-gray-500 mb-6">
            {isLoginForm
              ? "Please login to continue."
              : "Please fill the form to register."}
          </p>

          {/* SignUp Fields */}
          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Age</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
                  placeholder="Your Age"
                />
              </div>
            </div>
          )}

          {/* Common Fields */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-gray-100 focus:outline-none text-black"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              isLoginForm ? "Login" : "Sign Up"
            )}
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              className="ml-1 font-medium text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign up" : "Login"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src={
            isLoginForm
              ? "https://i.pinimg.com/originals/06/aa/40/06aa408f09f394c3b46d6cbe1efad944.gif"
              : "https://i.pinimg.com/originals/a4/07/22/a4072206392b57e4b3ede6588e81d7f3.gif"
          }
          alt="Login Graphic"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
