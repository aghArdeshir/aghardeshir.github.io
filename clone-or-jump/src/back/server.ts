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
      const player = Player.getPlayerById(message.playerId);
      if (player) player.setSocket(socket);
      else Player.createNewPlayer({ socket, playerId: message.playerId });
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
