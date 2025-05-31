import {
  isMessageInformGameState,
  isMessageInformPlayerId,
  isMessagePlayerReadyToPlay,
  type MessagesFrontSendsToBack,
} from "../common/messageTypes";
import { io as createSocketIoClient } from "socket.io-client";
import { player } from "./Player";
import { renderGame, showPlayButton } from "./main";

const socket = createSocketIoClient("ws://localhost:3000"); // TODO: move to env

socket.on("message", (message) => {
  if (isMessageInformPlayerId(message)) {
    player.setId(message.playerId);
  } else if (isMessagePlayerReadyToPlay(message)) {
    showPlayButton();
  } else if (isMessageInformGameState(message)) {
    renderGame(message.gameState);
  }
});

function ping() {
  socket.emitWithAck("ping").then((response) => {
    player.setLastPing({
      selfLastOnlineDate: new Date(),
      otherPlayerLastOnlineDate: response.otherPlayerLastOnline,
    });
    setTimeout(ping, 1000);
  });
}

setTimeout(() => {
  ping();
}, 1000); // Initial ping after 1 second

export function sendMessageToBack(message: MessagesFrontSendsToBack) {
  socket.emit("message", message);
}
