
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

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.post("/orders",async(req,res)=>
{
  const {user} = req.body;
  console.log(user);
  io.emit('newOrder',user);
  res.status(200)
  .json({
    message:'order placed successfully'
  })
})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
