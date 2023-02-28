import { fetchUser, logout as logoutApi } from 'apis/user';
import React, { useEffect, useState, createContext, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [fetched, setFetched] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await fetchUser();
        if (res.data?.isAuthenticated) setUser(res.data);
      } catch (e) {
      } finally {
        setFetched(true);
      }
    };

    fn();
  }, []);

  const logout = useCallback(() => {
    logoutApi().then(() => {
      setUser();
      navigate('/login');
    });
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout
    }),
    [user, logout]
  );

  if (!fetched) return null;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
