import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/authContext';
import { ChatContext, ConversationState } from '../context/chatContext';
import { SocketContext, TSocketContext } from '../context/socketContext';

export type ErrorT = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  return context as ConversationState;
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return context as TSocketContext;
};

export const errorHandler = (error: ErrorT) => {
  return error?.response?.data?.message || error.message;
};
