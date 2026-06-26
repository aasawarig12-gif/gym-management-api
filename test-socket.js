const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Connected to server");

  socket.emit("sendMessage", {
    message: "Hello from test client",
  });
});

socket.on("receiveMessage", (data) => {
  console.log("📩 Received from server:", data);
});