import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const navigate = useNavigate();

  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    //open razorpay dialog box

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Purchase Membership",
      order_id: orderId,
      prefill: {
        name: `${notes.firstName} ${notes.lastName}`,
        email: `${notes.emailId}`,
        contact: "9876543210",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div className="max-w-2xl mx-auto mt-20 px-6 py-10 bg-green-100 border border-green-300 rounded-2xl shadow-lg text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        🌟 Premium Access Granted!
      </h1>
      <p className="text-lg text-green-700 mb-6">
        You are already enjoying all the premium features. Thank you for being a
        valued member!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Go to Profile
        </button>
        <button
          onClick={() => navigate("/messages")}
          className="bg-white border border-green-600 text-green-700 font-semibold py-2 px-6 rounded-full hover:bg-green-50 transition"
        >
          Go to Messages
        </button>
      </div>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Choose Your Membership
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Silver */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            🥈 Silver
          </h2>
          <ul className="text-gray-600 mb-6 space-y-2">
            <li>✓ Chat with other people</li>
            <li>✓ 100 connection requests/day</li>
            <li>✓ Blue Tick</li>
            <li>✓ 3 months validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-full transition"
          >
            Buy Silver
          </button>
        </div>

        {/* Gold */}
        <div className="bg-yellow-100 rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-center text-yellow-700 mb-4">
            🥇 Gold
          </h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>✓ Chat with other people</li>
            <li>✓ Unlimited connection requests</li>
            <li>✓ Blue Tick</li>
            <li>✓ 6 months validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-full transition"
          >
            Buy Gold
          </button>
        </div>

        {/* Diamond */}
        <div className="bg-blue-100 rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
            💎 Diamond
          </h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>✓ All Gold features</li>
            <li>✓ Priority Support</li>
            <li>✓ Profile Boosting</li>
            <li>✓ 1 Year validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("diamond")}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition"
          >
            Buy Diamond
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
