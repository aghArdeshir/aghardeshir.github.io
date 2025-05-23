import { createServer } from "node:http";
import { Server as SocketIoServer } from "socket.io";

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
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log("message from front", message);
  });
});

httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
