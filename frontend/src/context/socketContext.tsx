import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

type TSocketContext = {
  socket: Socket;
  onlineUsers: string[];
};

const socketContext = createContext();
