import type { MessagesFrontSendsToBack } from "../common/messageTypes";
import { io as createSocketIoClient } from "socket.io-client";

const socket = createSocketIoClient("ws://localhost:3000"); // TODO: move to env
socket.on("connect", () => {
  console.log("Connected to server");
});

export function sendMessageToBack(message: MessagesFrontSendsToBack) {
  socket.emit("message", message);
}
