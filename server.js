const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
let emails = [];

app.use(express.json());
app.use(cors());

app.post("/delete/app", (req, res) => {
  const { id } = req.body;
  const newEmail = emails.filter((email) => email.id !== id);
  emails = [...newEmail];
  return res.json({ message: "E-mail excluido com sucesso", data: emails });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Um novo usuário se conectou com o ID:${socket.id}`);
  socket.on("data", async (data) => {
    if (data) {
      io.emit("new-email", data);
      emails.push(data);
    }
  });
});

server.listen(4000, () => {
  console.log("Servido no ar...");
});
