const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { WebcastPushConnection } = require("tiktok-live-connector");

let username = "samm0101010";
let tiktokChatConnector = new WebcastPushConnection(username);

tiktokChatConnector.connect().then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch((err) => {
    console.error('Failed to connect', err);
});

app.use(express.static("public"));

io.on("connection", (socket) => {
    tiktokChatConnector.on("gift", (data) => {
        socket.emit("gift", data)
    });
    
    tiktokChatConnector.on("like", (data) => {
        socket.emit("likes", data)
    });
});

server.listen(3000);