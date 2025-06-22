const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let activeUsers = 0;

app.use(express.static("public"));

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("updateCount", activeUsers);

  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("updateCount", activeUsers);
  });
});

const PORT = 5000;
http.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
