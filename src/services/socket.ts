import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? `${process.env.VITE_PRODUCTION_API!}:4999` : "http://localhost:4999";

export const socket = io(URL, {
  autoConnect: false,
});
