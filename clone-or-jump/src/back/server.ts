import { createServer } from "node:http";
import { Server as SocketIoServer } from "socket.io";
import {
  type MessagesFrontSendsToBack,
  isMessageExistingPlayerJoined,
  isMessageNewPlayerJoined,
} from "../common/messageTypes.ts";
import { Player } from "./Player.ts";

const port = process.env.PORT;
if (!port) throw new Error("PORT is not defined in env.");

const httpServer = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    '<html style="background-color: black; color: red;"><body><code>TODO: redirect to front</code></body></html>'
  );
});

const io = new SocketIoServer(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message: MessagesFrontSendsToBack) => {
    if (isMessageNewPlayerJoined(message)) {
      Player.createNewPlayer({ socket });
    } else if (isMessageExistingPlayerJoined(message)) {
      const existingPlayer = Player.getPlayerById(message.playerId);
      if (existingPlayer) {
        existingPlayer.setSocket(socket);
        existingPlayer.informReadyToPlay();
      } else {
        const newPlayer = Player.createNewPlayer({
          socket,
          playerId: message.playerId,
        });
        newPlayer.setSocket(socket);
        newPlayer.informReadyToPlay();
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
