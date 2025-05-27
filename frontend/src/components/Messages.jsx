import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import  {SubscriptionCard}  from "../components/SubscriptionCard"; 

const Messages = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user); 
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Show SubscriptionCard if not premium
  if (!user?.isPremium) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <SubscriptionCard />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle loading state
  if (!connections) return null;

  // If no connections
  if (connections.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center text-gray-700 text-2xl font-semibold">
            No Connections Found
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Premium users view messages
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Message your Connections
          </h1>

          <div className="space-y-6 max-w-5xl mx-auto">
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <div
                  key={_id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <img
                      alt="Profile"
                      src={photoUrl}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="text-left">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {firstName} {lastName}
                      </h2>
                      {age && gender && (
                        <p className="text-sm text-gray-500">
                          {age}, {gender}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">{about}</p>
                    </div>
                  </div>

                  <Link to={`/chat/${_id}`} className="self-end sm:self-center">
                    <button className="btn btn-primary">Chat</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
