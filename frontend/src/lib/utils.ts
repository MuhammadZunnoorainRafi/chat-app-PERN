import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/authContext';
import { ChatContext, ConversationState } from '../context/chatContext';

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

export const errorHandler = (error: ErrorT) => {
  return error?.response?.data?.message || error.message;
};
