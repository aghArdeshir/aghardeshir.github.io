import { createServer } from "node:http";
import { Server as SocketIoServer } from "socket.io";
import {
  type MessagesFrontSendsToBack,
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

const playersMap = new Map<string, Player>();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message: MessagesFrontSendsToBack) => {
    if (isMessageNewPlayerJoined(message)) {
      const player = new Player();
      player.setSocket(socket);
      playersMap.set(player.id, player);
      player.informId();
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
