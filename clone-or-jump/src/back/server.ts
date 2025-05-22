import net from "node:net";

const port = process.env.PORT;
if(!port) throw new Error("PORT is not defined");

const socketServer = new net.Server();
socketServer.listen(port);
console.log(socketServer.address());

socketServer.on("connection", (socket) => {
  console.log("client connected");
})