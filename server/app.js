
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.set('io', io);

import userRouter from "./routes/user.route.js"

app.use("/api/v1/users",userRouter)

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

export {
  io,
  app,
  server
}
