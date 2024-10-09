import { io } from "socket.io-client";

import { API } from "../config/API";

// remove api keyword
const absoluteAPI = API.slice(0, API.length - 4);
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? absoluteAPI : "http://localhost:4999";

export const socket = io(URL, {
  autoConnect: false,
});
