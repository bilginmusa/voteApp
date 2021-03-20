const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const votes = {
  netCore: 0,
  php: 0,
  javaScript: 0,
  go: 0,
};
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Connected");
  socket.emit("votes", votes);

  socket.on("newVote", (voteName) => {
    votes[voteName] = votes[voteName] + 1;
    console.log("Votes", votes);
    io.emit("votes", votes);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
