import {
  isMessageInformPlayerId,
  isMessagePlayerReadyToPlay,
  type MessagesFrontSendsToBack,
} from "../common/messageTypes";
import { io as createSocketIoClient } from "socket.io-client";
import { player } from "./Player";
import { showPlayButton } from "./main";

const socket = createSocketIoClient("ws://localhost:3000"); // TODO: move to env

socket.on("message", (message) => {
  if (isMessageInformPlayerId(message)) {
    player.setId(message.playerId);
  } else if (isMessagePlayerReadyToPlay(message)) {
    showPlayButton();
  }
});

export function sendMessageToBack(message: MessagesFrontSendsToBack) {
  socket.emit("message", message);
}
