const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("hello world");
  res.end();
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("data", async (data) => {
    if (data) {
      io.emit("new-email", data);
    }
  });
});

server.listen(4000, () => {
  console.log("Servido no ar...");
});
