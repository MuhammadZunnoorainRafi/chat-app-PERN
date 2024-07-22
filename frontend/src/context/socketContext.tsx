import { createContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthContext } from '../lib/utils';

export type TSocketContext = {
  socket: Socket | null;
  onlineUsers: string[];
};

export const SocketContext = createContext<TSocketContext | undefined>(
  undefined
);
const socketURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:7000' : '/';
export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socketRef = useRef<Socket | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (user && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: user.id,
        },
      });
      socketRef.current = socket;

      socket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!user && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [user, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
