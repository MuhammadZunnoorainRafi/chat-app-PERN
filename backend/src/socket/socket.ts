import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ['http://localhost:5173'], methods: ['GET', 'POST'] },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('User connected, ', socket.id);
  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  socket.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('User disconnected, ', socket.id);
    delete userSocketMap[userId];
    socket.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server };
