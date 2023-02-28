import { useUser } from 'hooks/useUser';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthedRoute = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
