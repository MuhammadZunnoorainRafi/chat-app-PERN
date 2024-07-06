import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/authContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
