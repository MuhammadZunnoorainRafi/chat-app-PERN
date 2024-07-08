import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/authContext';

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

export const errorHandler = (error: ErrorT) => {
  return error?.response?.data?.message || error.message;
};
