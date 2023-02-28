import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

export const useUser = () => {
  const { user, setUser, logout } = useContext(UserContext) || {};

  return {
    user,
    setUser,
    logout
  };
};

export default useUser;
