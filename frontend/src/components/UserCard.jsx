import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { VscVerifiedFilled } from "react-icons/vsc";

const UserCard = ({ user }) => {
  if (!user) return null;
  const { _id, firstName, lastName, photoUrl, age, gender, about, isPremium } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    if (!userId) return;
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      // handle error if needed
    }
  };


  return (
    <div className="flex justify-center items-center min-h-[70vh] w-full p-4">
      <div className="card relative w-full max-w-xs rounded-2xl shadow-2xl overflow-hidden bg-base-300 flex flex-col">
        {/* Image container with fixed aspect ratio and limited height */}
        <figure className="relative w-full aspect-[3/4] max-h-[400px]">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover opacity-90"
          />

          {/* Gradient overlay for text */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 z-10">
            {/* Name with badge */}
            <h1 className="text-2xl font-bold text-white drop-shadow-md flex items-center gap-2">
              {firstName} {lastName}
              {(isPremium) && (
                <span className="inline-flex items-center justify-center">
                  <VscVerifiedFilled
                    className="text-green-400 text-xl"
                    title="Premium User"
                  />
                </span>
              )}
            </h1>

            {/* About */}
            {about && (
              <p className="mt-1 text-xs sm:text-sm text-white drop-shadow-md line-clamp-3">
                {about}
              </p>
            )}

            {/* Age & Gender */}
            {(age || gender) && (
              <p className="mt-2 text-xs sm:text-sm text-white drop-shadow-md flex gap-2 items-center">
                <span>🎂 {age || "N/A"}</span>
                {gender && <span>🧑‍🤝‍🧑 {gender.toUpperCase()}</span>}
                <span>🕓 Active few hours ago</span>
              </p>
            )}
          </div>
        </figure>

        {/* Action buttons */}
        <div className="flex justify-center gap-8 p-4 bg-white">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-14 h-14 flex items-center justify-center text-2xl bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
            aria-label="Reject user"
          >
            ❌
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="w-14 h-14 flex items-center justify-center text-2xl bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
            aria-label="Like user"
          >
            💙
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default UserCard;
