// const app = require("express")();
// const server = require("http").Server(app);
// const io = require("socket.io")(server);
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev });
// const nextHandler = nextApp.getRequestHandler();

// io.on("connection", socket => {
//   socket.on("message", data => {
//     io.emit("message", data);
//   });
// });

// nextApp.prepare().then(() => {
//   app.get("*", (req, res) => {
//     return nextHandler(req, res);
//   });

//   server.listen(3000, err => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });
