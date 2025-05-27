// import io from 'socket.io-client';
// import { BASE_URL } from './constants';

// export const createSocketConnection = () => {
//     return io (BASE_URL);
// }


import io from "socket.io-client";
import { BASE_URL } from "./constants";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      withCredentials: true, // if you need credentials for cookie auth
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
