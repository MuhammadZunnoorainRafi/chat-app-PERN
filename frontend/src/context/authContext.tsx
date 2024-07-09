import { createContext, ReactNode } from 'react';
import { useAuthVerify } from '../actions/auth-actions';

export type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { authVerifiedData, isError, isLoading } = useAuthVerify();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !isError, user: authVerifiedData, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   return context as AuthContextType;
// };
