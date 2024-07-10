import React from 'react';
import { useAuthContext } from '../lib/utils';
import { Navigate } from 'react-router-dom';

function Protect({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  return <>{user ? children : <Navigate to="/" />}</>;
}

export default Protect;
