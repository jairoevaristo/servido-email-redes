import { Server } from "socket.io";
import http from "http";

import { api } from "./services/api";

let dataResult = "";

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
  console.log(`Uma novo usuario se conectou: ${socket.id}`);

  socket.on("data", async (data) => {
    dataResult = data;
    if (!dataResult) {
      return;
    }

    try {
      const result = await api.post("http://localhost:8080/app", {
        entidade: dataResult,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(4000, () => {
  console.log("Servido no ar...");
});
