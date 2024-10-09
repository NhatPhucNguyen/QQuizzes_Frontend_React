import { io } from "socket.io-client";
import { API } from "../config/API";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? `${API}:4999` : "http://localhost:4999";

export const socket = io(URL, {
  autoConnect: false,
});
